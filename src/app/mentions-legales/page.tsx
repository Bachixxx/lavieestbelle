export default function MentionsLegalesPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-secondary/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary mb-6">
            Mentions Légales <br /> & Politique de Confidentialité
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-light">
            Transparence et confiance sont au cœur de notre engagement.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24 space-y-16">

        {/* 1. Éditeur */}
        <section className="space-y-6">
          <h2 className="text-3xl font-heading font-semibold text-primary">1. Éditeur du site</h2>
          <div className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-primary/10 shadow-sm">
            <p className="text-lg mb-4 text-foreground/80">Le présent site internet est la propriété de :</p>
            <div className="space-y-2 text-foreground/70">
              <p className="font-bold text-xl text-primary">Soin esthétique Nussbaumer Sàrl</p>
              <p>Route de Lausanne 341</p>
              <p>1293 Bellevue, Suisse</p>
              <div className="pt-4 space-y-1">
                <p><span className="font-medium text-primary/80">Responsable de publication :</span> Catherine Nussbaumer</p>
                <p><span className="font-medium text-primary/80">Téléphone :</span> +41 22 774 00 93</p>
                <p><span className="font-medium text-primary/80">E-mail :</span> catherine.jardelspena@gmail.com</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Informations juridiques */}
        <section className="space-y-6">
          <h2 className="text-3xl font-heading font-semibold text-primary">2. Informations juridiques</h2>
          <div className="prose prose-stone max-w-none text-foreground/80">
            <p className="mb-2"><span className="font-medium">Inscription au Registre du Commerce (Canton de Genève) :</span></p>
            <ul className="list-none space-y-2 pl-0">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                Nom de la société : Soin esthétique Nussbaumer Sàrl
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                Numéro d'identification (IDE/UID) : CHE-274.654.516
              </li>
            </ul>
          </div>
        </section>

        {/* 3. Hébergement */}
        <section className="space-y-6">
          <h2 className="text-3xl font-heading font-semibold text-primary">3. Hébergement</h2>
          <div className="bg-secondary/10 p-6 rounded-xl border border-border/40">
            <p className="mb-2 font-medium text-foreground/90">Le site est hébergé par :</p>
            <div className="text-foreground/70">
              <p className="font-semibold">Infomaniak Network SA</p>
              <p>Rue Eugène-Marziano 25</p>
              <p>1227 Les Acacias (GE), Suisse</p>
            </div>
          </div>
        </section>

        {/* 4. Protection des données */}
        <section className="space-y-6">
          <h2 className="text-3xl font-heading font-semibold text-primary">4. Protection des données (nLPD)</h2>
          <div className="space-y-4 text-foreground/80 leading-relaxed">
            <p>Conformément à la Loi fédérale sur la protection des données (nLPD) en vigueur en Suisse, nous vous informons que :</p>
            <ul className="space-y-4">
              <li className="bg-background p-4 rounded-lg border border-border/40 shadow-sm">
                <span className="block font-medium text-primary mb-1">Collecte des données</span>
                Les données personnelles collectées sur ce site (via le formulaire de contact ou la prise de rendez-vous) sont limitées au strict nécessaire (Nom, E-mail, Téléphone).
              </li>
              <li className="bg-background p-4 rounded-lg border border-border/40 shadow-sm">
                <span className="block font-medium text-primary mb-1">Finalité</span>
                Ces informations sont utilisées exclusivement pour répondre à vos demandes ou gérer vos rendez-vous au sein de l'institut.
              </li>
              <li className="bg-background p-4 rounded-lg border border-border/40 shadow-sm">
                <span className="block font-medium text-primary mb-1">Conservation</span>
                Vos données ne sont pas vendues à des tiers. Elles sont conservées de manière sécurisée et uniquement pour la durée nécessaire à la finalité du traitement.
              </li>
              <li className="bg-background p-4 rounded-lg border border-border/40 shadow-sm">
                <span className="block font-medium text-primary mb-1">Vos droits</span>
                Vous disposez d’un droit d’accès, de rectification, de portabilité et de suppression de vos données. Pour toute demande, veuillez nous contacter à l'adresse e-mail mentionnée ci-dessus.
              </li>
            </ul>
          </div>
        </section>

        {/* 5. Cookies */}
        <section className="space-y-6">
          <h2 className="text-3xl font-heading font-semibold text-primary">5. Utilisation des cookies</h2>
          <div className="text-foreground/80 space-y-4">
            <p>Ce site utilise des cookies techniques et analytiques pour améliorer votre expérience de navigation et mesurer l'audience du site de manière anonyme.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-secondary/5 p-4 rounded-lg">
                <span className="font-medium text-primary block mb-1">Qu'est-ce qu'un cookie ?</span>
                Un petit fichier texte enregistré sur votre appareil lors de votre visite.
              </div>
              <div className="bg-secondary/5 p-4 rounded-lg">
                <span className="font-medium text-primary block mb-1">Gestion</span>
                Vous pouvez à tout moment configurer votre navigateur pour bloquer les cookies.
              </div>
            </div>
          </div>
        </section>

        {/* 6. Propriété intellectuelle */}
        <section className="space-y-6">
          <h2 className="text-3xl font-heading font-semibold text-primary">6. Propriété intellectuelle</h2>
          <p className="text-foreground/80 leading-relaxed">
            Tous les contenus présents sur ce site (textes, logos, images, graphismes) sont la propriété de Soin esthétique Nussbaumer Sàrl ou font l'objet d'une autorisation d'utilisation. Toute reproduction ou diffusion non autorisée est interdite.
          </p>
        </section>

        {/* 7. Droit applicable */}
        <section className="space-y-6 border-t border-primary/10 pt-8">
          <h2 className="text-3xl font-heading font-semibold text-primary">7. Droit applicable</h2>
          <p className="text-foreground/80">
            Le présent site et ses mentions légales sont soumis au droit suisse. Le for juridique est à Genève, Suisse.
          </p>
        </section>
      </div>
    </div>
  );
}
