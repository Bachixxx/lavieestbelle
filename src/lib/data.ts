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
  category: 'visage' | 'corps' | 'epilation' | 'onglerie';
  name: string;
  duration?: string;
  price: string;
  description: string;
}

export const services: Service[] = [
  { id: 'v1', category: 'visage', name: 'Soin Purifiant', duration: '60 min', price: '120 CHF', description: 'Nettoyage en profondeur pour une peau saine et éclatante.' },
  { id: 'v2', category: 'visage', name: 'Soin Hydratant Intense', duration: '75 min', price: '150 CHF', description: 'Un bain d\'hydratation pour les peaux assoiffées.' },
  { id: 'v3', category: 'visage', name: 'Soin Anti-Âge Premium', duration: '90 min', price: '180 CHF', description: 'Lisse les rides et raffermit la peau pour un effet jeunesse.' },
  { id: 'c1', category: 'corps', name: 'Gommage Corps Relaxant', duration: '45 min', price: '90 CHF', description: 'Exfoliation douce pour une peau de velours.' },
  { id: 'c2', category: 'corps', name: 'Massage Californien', duration: '60 min', price: '130 CHF', description: 'Un massage enveloppant pour une détente profonde.' },
  { id: 'e1', category: 'epilation', name: 'Épilation Jambes Complètes', duration: '40 min', price: '70 CHF', description: 'Cire traditionnelle pour un résultat impeccable.' },
  { id: 'e2', category: 'epilation', name: 'Épilation Maillot', price: 'dès 30 CHF', description: 'Différentes options pour répondre à vos besoins.' },
  { id: 'o1', category: 'onglerie', name: 'Manucure Complète', duration: '50 min', price: '60 CHF', description: 'Soin des mains et pose de vernis classique.' },
  { id: 'o2', category: 'onglerie', name: 'Pose de Vernis Semi-Permanent', duration: '45 min', price: '55 CHF', description: 'Une couleur durable pour des semaines de tranquillité.' },
];

export interface ServiceCategory {
  id: 'visage' | 'corps' | 'epilation' | 'onglerie';
  title: string;
  description: string;
  imageId: string;
}

export const serviceCategories: ServiceCategory[] = [
    { id: 'visage', title: 'Soins du Visage', description: 'Révélez l\'éclat de votre peau avec nos soins sur mesure.', imageId: 'service-visage'},
    { id: 'corps', title: 'Soins du Corps', description: 'Offrez-vous une parenthèse de bien-être et de relaxation.', imageId: 'service-corps'},
    { id: 'epilation', title: 'Épilation Douceur', description: 'Une peau lisse et nette grâce à notre savoir-faire.', imageId: 'service-epilation'},
    { id: 'onglerie', title: 'Beauté des Mains & Pieds', description: 'Sublimez vos ongles avec nos prestations de manucure et pédicure.', imageId: 'service-onglerie'},
]

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
