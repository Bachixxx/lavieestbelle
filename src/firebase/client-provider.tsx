'use client';
import { initializeFirebase } from '@/firebase';
import { FirebaseProvider } from '@/firebase/provider';

// This provider is responsible for initializing Firebase on the client side.
// It should be used as a wrapper around the root of your application.
export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { app, auth, firestore, storage } = initializeFirebase();
  console.log("FirebaseClientProvider initialized:", { hasApp: !!app, hasAuth: !!auth, hasFirestore: !!firestore, hasStorage: !!storage }); // DEBUG

  return (
    <FirebaseProvider app={app} auth={auth} firestore={firestore} storage={storage}>
      {children}
    </FirebaseProvider>
  );
}
