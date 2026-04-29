import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import "@/app/backend/firebase/client";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

const AuthService = {

    // Sign in with Google
    LoginWithGoogle: async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        try {
            const userCredentials = await firebase.auth().signInWithPopup(provider);
            return {
                user: userCredentials.user
            }
        }
        catch (e) {
            return {
                error: e.message
            }

        }    
    },

    // Sign out
    LogOut: async () => {
        await firebase.auth().signOut();
    },

    // Sign up with email and password
    createUserWithEmailAndPassword: async (email, password, name) => {
        try {
            const userCred = await firebase.auth().createUserWithEmailAndPassword(email, password);
            await userCred.user.updateProfile({ displayName: name });
            await userCred.user.sendEmailVerification({
                url: `${APP_URL}/login`
            });
            return {
                user: userCred.user
            }
        }
        catch (e) {
            return {
                error: e.message
            }
        }
    },

    // Sign in with email and password
    signInUserWithEmailAndPassword: async (email, password) => {
        try {
            const userCred = await firebase.auth().signInWithEmailAndPassword(email, password);
            return {
                user: userCred.user
            }
        }
        catch (e) {
            return {
                error: e.message
            }
        }
    },

    // Reset password
    resetPassword: async (email) => {
        try {
            await firebase.auth().sendPasswordResetEmail(email, {
                url: `${APP_URL}/login`
            });
        }
        catch (e) {
            return e.message;
        }
    },

    // Delete user
    deleteAccount: async () => {
        try {
            await firebase.auth().currentUser.delete();
        }
        catch (e) {
            if (e.code === 'auth/requires-recent-login') {
                try {
                    const currentUser = firebase.auth().currentUser;
                    const providerIds = currentUser.providerData.map(p => p.providerId);

                    if (providerIds.includes('google.com')) {
                        const provider = new firebase.auth.GoogleAuthProvider();
                        await currentUser.reauthenticateWithPopup(provider);
                    } else {
                        return 'Please log out and log back in before deleting your account.';
                    }

                    await currentUser.delete();
                } catch (reauthError) {
                    return reauthError.message;
                }
            } else {
                return e.message;
            }
        }
    },

    // Update profile (displayName and/or photoURL)
    updateProfile: async (displayName, photoURL) => {
        try {
            const updates = {};
            if (displayName !== undefined) updates.displayName = displayName;
            if (photoURL !== undefined) updates.photoURL = photoURL;
            await firebase.auth().currentUser.updateProfile(updates);
        }
        catch (e) {
            return e.message;
        }
    },

    // Update password (requires current password for reauthentication)
    updatePassword: async (currentPassword, newPassword) => {
        try {
            const user = firebase.auth().currentUser;
            const credential = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
            await user.reauthenticateWithCredential(credential);
            await user.updatePassword(newPassword);
        }
        catch (e) {
            return e.message;
        }
    },

    // Resend email verification
    resendVerificationEmail: async () => {
        try {
            const user = firebase.auth().currentUser;
            if (!user) return 'No user is signed in.';
            await user.sendEmailVerification({
                url: `${APP_URL}/login`
            });
        }
        catch (e) {
            return e.message;
        }
    }

}

export default AuthService;