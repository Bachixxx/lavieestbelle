import { PlaceHolderImages } from "./placeholder-images";
import type { ImagePlaceholder } from "./placeholder-images";

export const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Soins" },
  { href: "/about", label: "À Propos" },
  { href: "/contact", label: "Contact" },
];

export interface Service {
  id: string;
  category: 'visage' | 'corps' | 'epilation' | 'onglerie' | 'teinture' | 'coiffure';
  name: string;
  duration?: string;
  price?: string;
  description: string;
}

export interface ServiceCategory {
  id: 'visage' | 'corps' | 'epilation' | 'onglerie' | 'teinture' | 'coiffure';
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

export const testimonials: Testimonial[] = [
    { id: 't1', text: 'Un moment de pure détente. Catherine est d\'un professionnalisme et d\'une douceur incroyables. Je recommande vivement !', author: 'Marie D.', rating: 5 },
    { id: 't2', text: 'Le meilleur soin du visage que j\'ai jamais eu. Ma peau est transformée. L\'institut est un havre de paix.', author: 'Sophie L.', rating: 5 },
    { id: 't3', text: 'Un service impeccable et une hygiène irréprochable. Je suis fidèle depuis des années et je ne suis jamais déçue.', author: 'Isabelle F.', rating: 5 },
    { id: 't4', text: 'La manucure semi-permanente est parfaite et tient très longtemps. L\'accueil est toujours chaleureux.', author: 'Laura P.', rating: 5 },
]
