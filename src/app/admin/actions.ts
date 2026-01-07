'use server';

import { initializeFirebase } from '@/firebase/index.server';
import { initialServiceCategories, initialServices } from '@/lib/initial-data';
import { collection, writeBatch } from 'firebase/firestore';

export async function populateDatabase() {
  try {
    const { firestore } = initializeFirebase();
    const batch = writeBatch(firestore);

    // Populate serviceCategories
    const categoriesCollection = collection(firestore, 'serviceCategories');
    initialServiceCategories.forEach(category => {
      const docRef = collection(categoriesCollection, category.id).parent;
      if (docRef) {
          batch.set(docRef, category);
      }
    });

    // Populate services
    const servicesCollection = collection(firestore, 'services');
    initialServices.forEach(service => {
        const docRef = collection(servicesCollection, service.id).parent;
        if(docRef) {
            batch.set(docRef, service);
        }
    });

    await batch.commit();

    return { 
        success: true, 
        counts: {
            categories: initialServiceCategories.length,
            services: initialServices.length
        }
    };
  } catch (error: any) {
    console.error("Error populating database:", error);
    return { success: false, error: error.message || "Failed to populate database." };
  }
}
