import type { Service, ServiceCategory } from './data';

export const initialServiceCategories: ServiceCategory[] = [
  {
    id: 'visage',
    title: 'Soins du Visage',
    description: 'Nos soins du visage sont conçus pour purifier, hydrater et rajeunir votre peau.',
    previewDescription: 'Des soins personnalisés pour une peau éclatante et saine.',
    imageId: 'service-visage'
  },
  {
    id: 'corps',
    title: 'Soins du Corps',
    description: 'Détendez-vous avec nos gommages, enveloppements et massages relaxants.',
    previewDescription: 'Une évasion sensorielle pour un corps détendu et une peau douce.',
    imageId: 'service-corps'
  },
  {
    id: 'epilation',
    title: 'Épilations',
    description: 'Une épilation douce et efficace pour une peau lisse et nette durablement.',
    previewDescription: 'Profitez d\'une épilation professionnelle pour une douceur incomparable.',
    imageId: 'service-epilation'
  },
  {
    id: 'onglerie',
    title: 'Onglerie',
    description: 'Manucure, pédicure, pose de vernis classique ou semi-permanent pour des mains et des pieds parfaits.',
    previewDescription: 'Sublimez vos mains et vos pieds avec nos soins d\'onglerie experts.',
    imageId: 'service-onglerie'
  },
  {
    id: 'teinture',
    title: 'Teinture Cils & Sourcils',
    description: 'Intensifiez votre regard avec une teinture des cils et des sourcils.',
    previewDescription: 'Un regard de biche sans maquillage, c\'est possible.',
    imageId: 'service-teinture'
  },
  {
    id: 'coiffure',
    title: 'Coiffure',
    description: 'Coupes, colorations, balayages et soins capillaires pour une chevelure de rêve.',
    previewDescription: 'Confiez vos cheveux à nos experts pour un style qui vous ressemble.',
    imageId: 'service-coiffure'
  },
];

export const initialServices: Service[] = [
  { id: 'v1', category: 'visage', name: 'Soin Purifiant', duration: '60 min', price: 'CHF 120', description: 'Nettoyage en profondeur pour les peaux à problèmes.' },
  { id: 'v2', category: 'visage', name: 'Soin Hydratant Intense', duration: '75 min', price: 'CHF 150', description: 'Un bain d\'hydratation pour les peaux sèches et déshydratées.' },
  { id: 'v3', category: 'visage', name: 'Soin Anti-Âge Premium', duration: '90 min', price: 'CHF 180', description: 'Lisse les rides et raffermit la peau avec des techniques de pointe.' },
  { id: 'c1', category: 'corps', name: 'Gommage Corps Complet', duration: '45 min', price: 'CHF 90', description: 'Exfolie en douceur pour une peau incroyablement douce.' },
  { id: 'c2', category: 'corps', name: 'Massage Relaxant Californien', duration: '60 min', price: 'CHF 130', description: 'Des mouvements amples et fluides pour une relaxation totale.' },
  { id: 'e1', category: 'epilation', name: 'Épilation Jambes Complètes', duration: '45 min', price: 'CHF 70', description: 'Cire tiède ou chaude selon votre type de peau.' },
  { id: 'e2', category: 'epilation', name: 'Épilation Maillot Brésilien', duration: '30 min', price: 'CHF 50', description: 'Pour une finition parfaite et nette.' },
  { id: 'e3', category: 'epilation', name: 'Épilation Sourcils', duration: '15 min', price: 'CHF 25', description: 'Restructuration de la ligne du sourcil.' },
  { id: 'o1', category: 'onglerie', name: 'Manucure Complète & Pose de Vernis', duration: '60 min', price: 'CHF 80', description: 'Soin des ongles, cuticules et pose de vernis.' },
  { id: 'o2', category: 'onglerie', name: 'Pose de Vernis Semi-Permanent', duration: '45 min', price: 'CHF 60', description: 'Une couleur éclatante et durable pour 2-3 semaines.' },
  { id: 't1', category: 'teinture', name: 'Teinture des Cils', duration: '20 min', price: 'CHF 30', description: 'Pour un regard intense sans mascara.' },
  { id: 't2', category: 'teinture', name: 'Teinture des Sourcils', duration: '15 min', price: 'CHF 25', description: 'Redessine et comble les sourcils clairsemés.' },
  { id: 'h1', category: 'coiffure', name: 'Shampoing, Coupe & Brushing', duration: '60 min', price: 'CHF 100', description: 'Cheveux courts à mi-longs.' },
  { id: 'h2', category: 'coiffure', name: 'Couleur & Brushing', duration: '90 min', price: 'CHF 150', description: 'Couverture des cheveux blancs et brillance.' },
];
