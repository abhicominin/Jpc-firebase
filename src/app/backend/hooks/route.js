'use client'
import useAuth from "../context/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export function withPublicRoute(Component) {
    return function withPublicRoute(props) {
        const auth = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (auth.loading) return;
            if (auth.user && auth.user.emailVerified) {
                router.replace("/dashboard");
            } else if (auth.user && !auth.user.emailVerified) {
                router.replace(`/verify-email?email=${encodeURIComponent(auth.user.email)}`);
            }
        }, [auth.loading, auth.user, router]);

        if (auth.loading || auth.user) {
            return null;
        }

        return <Component auth={auth} {...props} />;
    }
}

export function withProtectedRoute(Component) {
    return function withProtectedRoute(props) {
        const auth = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!auth.loading && (!auth.user || !auth.user.emailVerified)) {
                router.push("/login");
            }
        }, [auth.loading, auth.user, router]);

        if (auth.loading || !auth.user || !auth.user.emailVerified) {
            return null;
        }

        return <Component auth={auth} {...props} />;
    }
}

export function withUnverifiedRoute(Component) {
    return function withUnverifiedRoute(props) {
        const auth = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (auth.loading) return;
            if (!auth.user) {
                router.replace("/login");
            } else if (auth.user.emailVerified) {
                router.replace("/dashboard");
            }
        }, [auth.loading, auth.user, router]);

        if (auth.loading || !auth.user || auth.user.emailVerified) {
            return null;
        }

        return <Component auth={auth} {...props} />;
    }
}