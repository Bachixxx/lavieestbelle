'use client';
import { useState, useEffect } from 'react';
import {
  onSnapshot,
  query,
  collection,
  where,
  orderBy,
  limit,
  startAt,
  startAfter,
  endAt,
  endBefore,
  type DocumentData,
  type FirestoreError,
  type Query,
  type Unsubscribe,
} from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

type QueryConstraint =
  | ReturnType<typeof where>
  | ReturnType<typeof orderBy>
  | ReturnType<typeof limit>
  | ReturnType<typeof startAt>
  | ReturnType<typeof startAfter>
  | ReturnType<typeof endAt>
  | ReturnType<typeof endBefore>;

export function useCollection<T extends DocumentData>(
  collectionPath: string,
  ...queryConstraints: QueryConstraint[]
) {
  const firestore = useFirestore();
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    if (!firestore) {
      return;
    }

    const collectionRef = collection(firestore, collectionPath);
    const q: Query = query(collectionRef, ...queryConstraints);

    const unsubscribe: Unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const data: T[] = querySnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as T)
        );
        setData(data);
        setLoading(false);
      },
      (err: FirestoreError) => {
        setError(err);
        setLoading(false);
        if (err.code === 'permission-denied') {
          errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: collectionPath,
            operation: 'list',
          }));
        }
      }
    );

    return () => unsubscribe();
  }, [firestore, collectionPath, ...queryConstraints]);

  return { data, loading, error };
}
