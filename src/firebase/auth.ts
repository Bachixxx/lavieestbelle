'use client';

import { useState, useEffect } from "react";
import { getApp } from "firebase/app";
import { User, Auth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

// We use a singleton promise to load Auth SDK only once
let authPromise: Promise<Auth> | null = null;

async function getFirebaseAuth(): Promise<Auth> {
    if (authPromise) return authPromise;

    authPromise = (async () => {
        const { getAuth } = await import("firebase/auth");
        const app = getApp();
        return getAuth(app);
    })();

    return authPromise;
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let unsubscribe: (() => void) | undefined;

        const initAuth = async () => {
            try {
                const auth = await getFirebaseAuth();
                // Need to import onAuthStateChanged dynamically as well if we want to be 100% split?
                // Actually, if we import types from 'firebase/auth' it's fine (erased at runtime).
                // But the functions `onAuthStateChanged` need to be imported from the module.
                // The dynamic import above returns `getAuth` but we also need other functions.

                // Let's re-import effectively
                const { onAuthStateChanged } = await import("firebase/auth");

                unsubscribe = onAuthStateChanged(auth, (user) => {
                    setUser(user);
                    setLoading(false);
                });
            } catch (err) {
                console.error("Failed to load Firebase Auth", err);
                setLoading(false);
            }
        };

        initAuth();

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    return { user, loading };
}

export async function signIn(email: string, pass: string) {
    try {
        const auth = await getFirebaseAuth();
        const { signInWithEmailAndPassword } = await import("firebase/auth");
        const userCredential = await signInWithEmailAndPassword(auth, email, pass);
        return { user: userCredential.user, error: null };
    } catch (error: any) {
        return { user: null, error: error.message };
    }
}

export async function logOut() {
    try {
        const auth = await getFirebaseAuth();
        const { signOut } = await import("firebase/auth");
        await signOut(auth);
        return { error: null };
    } catch (error: any) {
        return { error: error.message };
    }
}
