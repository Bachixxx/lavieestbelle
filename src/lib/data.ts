import { PlaceHolderImages } from "./placeholder-images";
import type { ImagePlaceholder } from "./placeholder-images";

export const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Soins" },
  { href: "/about", label: "À Propos" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
];

export interface Service {
  id: string;
  category: string;
  name: string;
  duration?: string;
  price?: string;
  description?: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  previewDescription: string;
  imageId: string;
}

export const getImageById = (id: string): ImagePlaceholder | undefined => {
    return PlaceHolderImages.find(img => img.id === id);
}

export interface Testimonial {
    id: string;
    text: string;
    author: string;
    rating: number;
}
