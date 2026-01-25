import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
// Removed static import of firebase/auth to save bundle size
// import { getAuth, Auth } from 'firebase/auth'; 
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

// Hooks and providers
export { FirebaseProvider, useFirebase, useFirebaseApp, useAuth, useFirestore, useStorage } from './provider';
export { FirebaseClientProvider } from './client-provider';
export { useCollection } from './firestore/use-collection';
export { useDoc } from './firestore/use-doc';

import { getStorage, FirebaseStorage } from 'firebase/storage';

// We define Auth as optional/dynamic now
type Auth = import('firebase/auth').Auth;

type FirebaseInstances = {
  app: FirebaseApp;
  auth?: Auth; // Made optional
  firestore: Firestore;
  storage: FirebaseStorage;
};

let instances: FirebaseInstances;

// ... initializeFirebaseServer ... (omitted for brevity, assume similar change if needed or just leave as is since server side bundle size is less critical, but good to keep consistent)
// Actually we should update it to avoid errors if we change the type.

export function initializeFirebaseServer(): FirebaseInstances {
  if (typeof window !== 'undefined') {
    throw new Error('initializeFirebaseServer() should not be used on the client');
  }
  if (instances) {
    return instances;
  }

  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  // Server side might still need it? If so we can keep it here but better to be consistent.
  // For now, let's just NOT initialize it here either, assuming server components for Admin also use the dynamic way or don't need it (we don't use SSR auth much yet).
  // const auth = getAuth(app); 
  const firestore = getFirestore(app);
  const storage = getStorage(app);

  instances = { app, firestore, storage };
  return instances;
}

// Initializes Firebase and returns the app, auth, and firestore instances.
// This function is idempotent, meaning it can be called multiple times without
// creating new instances.
export function initializeFirebase(): FirebaseInstances {
  if (instances && instances.storage) {
    return instances;
  }
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  // const auth = getAuth(app); // REMOVED
  const firestore = getFirestore(app);
  const storage = getStorage(app);

  instances = { app, firestore, storage };
  return instances;
}
