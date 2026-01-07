// This file should only be imported on the server.
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

type FirebaseInstances = {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
};

let instances: FirebaseInstances;

// Initializes Firebase for server-side usage.
export function initializeFirebase(): FirebaseInstances {
  // Singleton pattern to avoid re-initializing
  if (instances) {
    return instances;
  }

  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  
  instances = { app, auth, firestore };
  return instances;
}
