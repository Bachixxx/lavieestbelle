import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

// Hooks and providers
export { FirebaseProvider, useFirebase, useFirebaseApp, useAuth, useFirestore, useStorage } from './provider';
export { FirebaseClientProvider } from './client-provider';
export { useUser } from './auth/use-user';
export { useCollection } from './firestore/use-collection';
export { useDoc } from './firestore/use-doc';

import { getStorage, FirebaseStorage } from 'firebase/storage';

type FirebaseInstances = {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
  storage: FirebaseStorage;
};

let instances: FirebaseInstances;

// This is a server-side only initialization function.
// It should not be used on the client.
// We guard against client-side usage by checking for `window`.
export function initializeFirebaseServer(): FirebaseInstances {
  if (typeof window !== 'undefined') {
    throw new Error('initializeFirebaseServer() should not be used on the client');
  }
  if (instances) {
    return instances;
  }

  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const storage = getStorage(app);

  instances = { app, auth, firestore, storage };
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
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const storage = getStorage(app);

  instances = { app, auth, firestore, storage };
  return instances;
}
