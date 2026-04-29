'use client'
import { createContext, useState, useContext, useEffect } from "react";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import AuthService from "../services/authservice";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export default function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            setUser(user ?? null);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const loginWithGoogle = async () => {
        const { user, error } = await AuthService.LoginWithGoogle()
        if (error) {
            setError(error);
            return;
        }
        setUser(user ?? null);
        setError("");
        router.push('/dashboard');
    }

    const logOut = async () => {
        await AuthService.LogOut();
        setUser(null);
        router.push('/login');
    }

    const createUserWithEmailAndPassword = async (email, password, name) => {
        if (email && password) {
            const { user, error } = await AuthService.createUserWithEmailAndPassword(email, password, name);
            if (error) {
                setError(error);
                return;
            }
            setUser(user ?? null);
            router.push(`/verify-email?email=${encodeURIComponent(email)}`);
        } else {
            setError("Email and password are required");
        }
    }

    const signInUserWithEmailAndPassword = async (email, password) => {
        if (email && password) {
            const { user, error } = await AuthService.signInUserWithEmailAndPassword(email, password);
            if (error) {
                setError(error);
                return;
            }
            setUser(user ?? null);
            setError("");
            if (user.emailVerified) {
                router.push('/dashboard');
            } else {
                router.push(`/verify-email?email=${encodeURIComponent(user.email)}`);
            }
        } else {
            setError("Email and password are required");
        }
    }

    const resetPassword = async (email) => {
        if (email) {
            const error = await AuthService.resetPassword(email);
            if (error) {
                setError(error);
                return error;
            }
            setError("");
            router.push(`/forgot-password?sent=true&email=${encodeURIComponent(email)}`);
            return null;
        } else {
            setError("Email cannot be empty");
            return "Email cannot be empty";
        }
    };

    const deleteAccount = async () => {
        const error = await AuthService.deleteAccount();
        if (error) {
            setError(error);
            return;
        }
        setUser(null);
        router.push('/login');
    };

    const updatePassword = async (currentPassword, newPassword) => {
        const error = await AuthService.updatePassword(currentPassword, newPassword);
        if (error) {
            setError(error);
            return error;
        }
        setError("");
        return null;
    };

    const updateProfile = async (displayName, photoURL) => {
        const error = await AuthService.updateProfile(displayName, photoURL);
        if (error) {
            setError(error);
            return;
        }
        setUser(prev => prev ? Object.assign(Object.create(Object.getPrototypeOf(prev)), prev, { displayName, photoURL: photoURL ?? prev.photoURL }) : prev);
        setError("");
    };

    const resendVerificationEmail = async () => {
        if (!user) return 'No user is signed in.';
        try {
            await user.sendEmailVerification({
                url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login`
            });
            return null;
        } catch (e) {
            return e.message;
        }
    };

    const reloadUser = async () => {
        const currentUser = firebase.auth().currentUser;
        if (!currentUser) return false;
        await currentUser.reload();
        return firebase.auth().currentUser?.emailVerified ?? false;
    };

    const value = {
        user,
        loading,
        error,
        loginWithGoogle,
        logOut,
        createUserWithEmailAndPassword,
        signInUserWithEmailAndPassword,
        resetPassword,
        deleteAccount,
        updatePassword,
        updateProfile,
        resendVerificationEmail,
        reloadUser,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}