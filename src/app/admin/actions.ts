
"use server";

import { initializeFirebase } from "@/firebase/index.server";
import { testimonials as initialTestimonials } from "@/lib/data";
import { initialServiceCategories, initialServices, initialAboutContent, initialContactInfo } from "@/lib/initial-data";
import { writeBatch, doc, collection, setDoc } from "firebase/firestore";

const { firestore } = initializeFirebase();

async function batchWrite(collectionName: string, data: any[]) {
    const batch = writeBatch(firestore);
    const collectionRef = collection(firestore, collectionName);

    data.forEach((item) => {
        const docRef = doc(collectionRef, item.id);
        batch.set(docRef, item);
    });
    await batch.commit();
}


export async function populateDatabase() {
  try {
    await batchWrite('serviceCategories', initialServiceCategories);
    await batchWrite('services', initialServices);
    
    return { success: true };
  } catch (error: any) {
    console.error("Error populating database: ", error);
    return { success: false, error: error.message };
  }
}

export async function populateTestimonials() {
  try {
    await batchWrite('testimonials', initialTestimonials);
    return { success: true };
  } catch (error: any) {
    console.error("Error populating testimonials: ", error);
    return { success: false, error: error.message };
  }
}

export async function populateAboutContent() {
  try {
    const docRef = doc(firestore, "aboutContent", initialAboutContent.id);
    await setDoc(docRef, initialAboutContent);
    return { success: true };
  } catch (error: any) {
    console.error("Error populating about content: ", error);
    return { success: false, error: error.message };
  }
}

export async function populateContactInfo() {
    try {
      const docRef = doc(firestore, "contactInfo", initialContactInfo.id);
      await setDoc(docRef, initialContactInfo);
      return { success: true };
    } catch (error: any) {
      console.error("Error populating contact info: ", error);
      return { success: false, error: error.message };
    }
  }

