'use client';
import { createContext, useContext, useMemo } from 'react';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';

import { getStorage, FirebaseStorage } from 'firebase/storage';
// ...
interface FirebaseContextValue {
  app: FirebaseApp | null;
  auth: Auth | null | undefined;
  firestore: Firestore | null;
  storage: FirebaseStorage | null;
}

const FirebaseContext = createContext<FirebaseContextValue>({
  app: null,
  auth: null,
  firestore: null,
  storage: null,
});

export function FirebaseProvider({
  children,
  app,
  auth,
  firestore,
  storage,
}: {
  children: React.ReactNode;
  app: FirebaseApp;
  auth?: Auth;
  firestore: Firestore;
  storage: FirebaseStorage;
}) {
  const value = useMemo(
    () => ({
      app,
      auth,
      firestore,
      storage,
    }),
    [app, auth, firestore, storage]
  );

  return (
    <FirebaseContext.Provider value={value}>
      {children}
      <FirebaseErrorListener />
    </FirebaseContext.Provider>
  );
}

export const useFirebase = () => useContext(FirebaseContext);

// ... existing hooks

export const useStorage = () => {
  const { storage } = useFirebase();
  if (!storage) {
    throw new Error('Firebase Storage not available in context');
  }
  return storage;
};

export const useFirebaseApp = () => {
  const { app } = useFirebase();
  if (!app) {
    throw new Error('Firebase app not available in context');
  }
  return app;
};

export const useAuth = () => {
  const { auth } = useFirebase();
  // Auth is now optional/lazy-loaded. 
  // Consumers must handle potential null/undefined.
  return auth;
};

export const useFirestore = () => {
  const { firestore } = useFirebase();
  if (!firestore) {
    throw new Error('Firestore not available in context');
  }
  return firestore;
};
