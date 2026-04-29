'use client'
import useAuth from "../context/auth";


export default function AuthStateChanged({children}) {
    const { loading } = useAuth();

    if(loading) {
        return null;
    }
    return children;
}