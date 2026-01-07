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

export const services: Service[] = [
  // Soins du visage
  { id: 'v1', category: 'visage', name: 'Soin coup d’éclat', duration: '50 min', price: '50 CHF', description: 'Rapide et efficace, ce soin comprend un gommage et un masque et se déroule à la manière d\'un soin classique (démaquillage, tonification, gommage, masque, sérum et crème de jour).' },
  { id: 'v2', category: 'visage', name: 'Soin pureté', duration: '1h00', price: '100 CHF', description: 'Ce soin vise à nettoyer la peau en profondeur et suit un déroulement classique avec, en prime, l\'extraction des comédons.' },
  { id: 'v3', category: 'visage', name: 'Soin douceur', duration: '1h00', price: '100 CHF', description: 'Ce traitement contribue à assouplir la peau et à lui donner un aspect velouté.' },

  // Soins du corps
  { id: 'c1', category: 'corps', name: 'Soin du dos', duration: '45 min', price: 'Sur demande', description: 'Un soin complet incluant un massage et un nettoyage/gommage en cas d\'impuretés.' },
  { id: 'c2', category: 'corps', name: 'Gommage corporel', duration: '45 min', price: 'Sur demande', description: 'Gommage du corps entier pratiqué avec une crème légèrement humidifiée favorisant la micro-circulation, suivi d\'une douche en cabine.' },
  { id: 'c3', category: 'corps', name: 'Modelage relaxant (1-2 zones)', duration: '30 min', price: 'Sur demande', description: 'Un massage insistant sur les parties nouées pour une détente ciblée.' },
  { id: 'c4', category: 'corps', name: 'Modelage relaxant (corps entier)', duration: '1h00', price: 'Sur demande', description: 'Un massage complet du corps insistant sur les parties nouées pour une relaxation totale.' },

  // Épilation
  { id: 'e1', category: 'epilation', name: 'Épilation à la cire chaude', description: 'Au Monoï (Depilève) pour femmes et hommes. Notre cire spéciale ne durcit pas, ce qui rend l\'épilation moins douloureuse et respecte la sensibilité de la peau.', price: 'Sur demande' },
  { id: 'e2', category: 'epilation', name: 'Épilation définitive à la lumière pulsée', description: 'La photo-épilation Athon 2 permet d\'ôter tous les poils sur tous phototypes de peau et toutes zones. Compter 8 à 10 séances par zone.', price: 'Sur demande' },

  // Beauté des mains et des pieds
  { id: 'o1', category: 'onglerie', name: 'Soin classique des mains', description: 'Combine crème à l\'acide de fruits, massage, gommage, limage des ongles et soin des cuticules pour des mains impeccables.' },
  { id: 'o2', category: 'onglerie', name: 'Pose de vernis classique', description: 'Application d\'un vernis OPI parmi une large gamme de couleurs.' },
  { id: 'o3', category: 'onglerie', name: 'Pose de manucure "French"', description: 'Pour une élégance intemporelle et soignée.' },

  // Teinture
  { id: 't1', category: 'teinture', name: 'Teinture des cils et/ou sourcils', description: 'Nous réalisons des teintures temporaires (2-3 semaines) avec les produits Refectocil, disponibles en plusieurs couleurs (brun, gris, etc.).' },

  // Coiffure
  { id: 'co1', category: 'coiffure', name: 'Coupes, brushing, colorations, mèches', description: 'Nous proposons les prestations de coiffure habituelles pour dames, messieurs et enfants. Colorations avec les produits Majirel de L\'Oréal.' }
];


export interface ServiceCategory {
  id: 'visage' | 'corps' | 'epilation' | 'onglerie' | 'teinture' | 'coiffure';
  title: string;
  description: string;
  previewDescription: string;
  imageId: string;
}

export const serviceCategories: ServiceCategory[] = [
    { id: 'visage', title: 'Soins du Visage', description: 'Nous réalisons nos soins avec les produits de la gamme Matis.', previewDescription: 'Soins personnalisés pour révéler l\'éclat de votre peau.', imageId: 'service-visage'},
    { id: 'corps', title: 'Soins du Corps', description: 'Des soins pour relaxer et revitaliser votre corps.', previewDescription: 'Des soins pour relaxer et revitaliser votre corps.', imageId: 'service-corps'},
    { id: 'epilation', title: 'Épilation', description: 'Méthodes à la cire ou à la lumière pulsée pour une peau douce.', previewDescription: 'Méthodes à la cire ou à la lumière pulsée pour une peau douce.', imageId: 'service-epilation'},
    { id: 'onglerie', title: 'Beauté des Mains & Pieds', description: 'Sublimez vos ongles avec nos prestations de manucure.', previewDescription: 'Sublimez vos ongles avec nos prestations de manucure.', imageId: 'service-onglerie'},
    { id: 'teinture', title: 'Teinture Cils & Sourcils', description: 'Intensifiez votre regard avec une teinture durable.', previewDescription: 'Intensifiez votre regard avec une teinture durable.', imageId: 'service-teinture'},
    { id: 'coiffure', title: 'Coiffure', description: 'Coupes, couleurs et soins pour dames, messieurs et enfants.', previewDescription: 'Coupes, couleurs et soins pour toute la famille.', imageId: 'service-coiffure'},
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
