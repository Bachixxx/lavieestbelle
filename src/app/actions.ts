"use server"

import * as z from "zod";

const contactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

export async function submitContactForm(values: z.infer<typeof contactFormSchema>) {
  const validatedFields = contactFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, error: "Invalid fields" };
  }
  
  // Here you would typically save to Firestore
  // Example:
  // import { firestore } from '@/lib/firebase';
  // await firestore.collection('messages').add(validatedFields.data);
  
  console.log("Form data received:", validatedFields.data);

  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { success: true };
}
