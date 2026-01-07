
export const initialServiceCategories = [
    { id: 'visage', title: 'Soins du Visage', description: 'Des soins experts pour révéler la beauté naturelle de votre peau.', previewDescription: 'Soins experts pour une peau éclatante et saine.', imageId: 'service-visage' },
    { id: 'corps', title: 'Soins du Corps', description: 'Des rituels de bien-être pour une relaxation profonde et une peau sublimée.', previewDescription: 'Rituels de bien-être pour une relaxation profonde.', imageId: 'service-corps' },
    { id: 'epilation', title: 'Épilations Douceur', description: 'Une technique professionnelle pour une peau lisse et nette, tout en douceur.', previewDescription: 'Technique professionnelle pour une peau lisse et nette.', imageId: 'service-epilation' },
    { id: 'onglerie', title: 'Beauté des Mains et des Pieds', description: 'Manucure, pédicure et pose de vernis pour des ongles parfaits.', previewDescription: 'Manucure, pédicure et pose de vernis pour des ongles parfaits.', imageId: 'service-onglerie' },
    { id: 'teinture', title: 'Teinture Cils & Sourcils', description: 'Intensifiez et sublimez votre regard avec nos teintures professionnelles.', previewDescription: 'Intensifiez et sublimez votre regard durablement.', imageId: 'service-teinture' },
    { id: 'coiffure', title: 'Coiffure & Soins du Cheveu', description: 'Coupes, couleurs et soins profonds par notre spécialiste pour une chevelure éclatante.', previewDescription: 'Coupes, couleurs et soins profonds par notre spécialiste.', imageId: 'service-coiffure' },
];

export const initialServices = [
    // Soins du visage
    { id: 'v1', category: 'visage', name: 'Soin Nettoyant Profond', duration: '60 min', price: '120 CHF', description: 'Nettoyage en profondeur, gommage, vapeur, extraction des comédons et masque purifiant.' },
    { id: 'v2', category: 'visage', name: 'Soin Hydratant Intense', duration: '75 min', price: '150 CHF', description: 'Un bain d\'hydratation pour les peaux déshydratées, avec masque au collagène.' },
    { id: 'v3', category: 'visage', name: 'Soin Anti-Âge Premium', duration: '90 min', price: '180 CHF', description: 'Soin régénérant global, lisse les rides et raffermit l\'ovale du visage.' },
    { id: 'v4', category: 'visage', name: 'Soin Apaisant Peaux Sensibles', duration: '60 min', price: '130 CHF', description: 'Calme les rougeurs et renforce la barrière cutanée des peaux réactives.' },

    // Soins du corps
    { id: 'c1', category: 'corps', name: 'Gommage Corps Rénovateur', duration: '45 min', price: '90 CHF', description: 'Gommage aux sels marins pour une peau douce et soyeuse.' },
    { id: 'c2', category: 'corps', name: 'Massage Relaxant Californien', duration: '60 min', price: '130 CHF', description: 'Mouvements lents et enveloppants pour une détente absolue du corps et de l\'esprit.' },
    { id: 'c3', category: 'corps', name: 'Soin Jambes Légères', duration: '45 min', price: '85 CHF', description: 'Soin drainant et rafraîchissant pour soulager les sensations de lourdeur.' },

    // Épilation
    { id: 'e1', category: 'epilation', name: 'Sourcils (création de ligne)', duration: '20 min', price: '30 CHF', description: '' },
    { id: 'e2', category: 'epilation', name: 'Lèvre supérieure ou menton', duration: '15 min', price: '20 CHF', description: '' },
    { id: 'e3', category: 'epilation', name: 'Aisselles', duration: '15 min', price: '25 CHF', description: '' },
    { id: 'e4', category: 'epilation', name: 'Demi-jambes', duration: '30 min', price: '45 CHF', description: '' },
    { id: 'e5', category: 'epilation', name: 'Jambes complètes', duration: '45 min', price: '65 CHF', description: '' },
    { id: 'e6', category: 'epilation', name: 'Bikini simple', duration: '20 min', price: '35 CHF', description: '' },

    // Onglerie
    { id: 'o1', category: 'onglerie', name: 'Manucure Express', duration: '30 min', price: '40 CHF', description: 'Limage, cuticules et application d\'une base fortifiante.' },
    { id: 'o2', category: 'onglerie', name: 'Pose de vernis semi-permanent', duration: '45 min', price: '60 CHF', description: 'Couleur longue tenue et brillance extrême.' },
    { id: 'o3', category: 'onglerie', name: 'Beauté des pieds complète', duration: '60 min', price: '80 CHF', description: 'Soin complet avec gommage, masque et massage.' },

    // Teinture
    { id: 'te1', category: 'teinture', name: 'Teinture des cils', duration: '25 min', price: '35 CHF', description: 'Pour un regard intense dès le réveil.' },
    { id: 'te2', category: 'teinture', name: 'Teinture des sourcils', duration: '20 min', price: '30 CHF', description: 'Redessine et densifie la ligne de vos sourcils.' },

    // Coiffure
    { id: 'co1', category: 'coiffure', name: 'Shampoing, Coupe & Brushing', duration: '60 min', price: '95 CHF', description: '(Cheveux courts à mi-longs)' },
    { id: 'co2', category: 'coiffure', name: 'Couleur (racines)', duration: '90 min', price: '80 CHF', description: 'Application en racines, hors coupe et brushing.' },
    { id: 'co3', category: 'coiffure', name: 'Soin Profond Kératine', duration: '45 min', price: '70 CHF', description: 'Réparation intense pour cheveux abîmés et secs.' }
];

export const initialAboutContent = {
    id: 'content',
    title: 'Notre Histoire, Votre Bien-être',
    subtitle: 'L\'institut de beauté La Vie est Belle a ouvert ses portes à Bellevue le 7 octobre 2016. Nous offrons des soins de beauté du visage, du corps ainsi que des cheveux tant pour les dames que pour les messieurs.',
    catherineTitle: 'Catherine Nussbaumer - Directrice & Esthéticienne',
    catherineText: 'Catherine a achevé un CFC d\'assistante en pharmacie en 2000 pour ensuite réaliser des études en esthétique. Après avoir travaillé 10 ans dans un salon privé, elle a décidé de se lancer comme indépendante et a ouvert son institut à Bellevue.',
    soniaTitle: 'Sonia - Spécialiste Coiffure',
    soniaText: 'Sonia, sa collaboratrice, est au bénéfice d\'une expérience de plus de 25 ans dans le domaine de la coiffure et est spécialisée dans les soins du cheveu.',
    conclusion: 'Vous y serez toujours bien accueillis et reçus avec bienveillance pour recevoir les meilleurs conseils en matière de bien-être et de soins esthétiques.',
    imageId: 'about-portrait',
};
