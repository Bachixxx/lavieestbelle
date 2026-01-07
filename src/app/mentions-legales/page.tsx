export default function MentionsLegalesPage() {
  return (
    <div className="bg-background py-12 md:py-24">
      <div className="container mx-auto max-w-4xl px-4 space-y-10 text-foreground/80 text-base">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline text-primary">
            Mentions Légales & Politique de Confidentialité
          </h1>
        </div>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold font-headline text-primary/90">1. Éditeur du site</h2>
          <p>Le présent site internet est la propriété de :</p>
          <div className="pl-4 border-l-2 border-primary/50">
            <p className="font-semibold">Soin esthétique Nussbaumer Sàrl</p>
            <p>Route de Lausanne 341</p>
            <p>1293 Bellevue, Suisse</p>
            <p className="mt-2"><span className="font-medium text-foreground">Responsable de publication :</span> Catherine Nussbaumer</p>
            <p><span className="font-medium text-foreground">Téléphone :</span> +41 22 774 00 93</p>
            <p><span className="font-medium text-foreground">E-mail :</span> catherine.jardelspena@gmail.com</p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold font-headline text-primary/90">2. Informations juridiques</h2>
          <p><span className="font-medium text-foreground">Inscription au Registre du Commerce (Canton de Genève) :</span></p>
          <ul className="list-disc list-inside pl-4">
            <li>Nom de la société : Soin esthétique Nussbaumer Sàrl</li>
            <li>Numéro d'identification (IDE/UID) : CHE-274.654.516</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold font-headline text-primary/90">3. Hébergement</h2>
          <p>Le site est hébergé par :</p>
          <div className="pl-4 border-l-2 border-primary/50">
            <p>Google Cloud EMEA Ltd. (Firebase Hosting)</p>
            <p>70 Sir John Rogerson's Quay</p>
            <p>Dublin 2, Irlande</p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold font-headline text-primary/90">4. Protection des données personnelles (nLPD)</h2>
          <p>Conformément à la Loi fédérale sur la protection des données (nLPD) en vigueur en Suisse, nous vous informons que :</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><span className="font-medium text-foreground">Collecte des données :</span> Les données personnelles collectées sur ce site (via le formulaire de contact ou la prise de rendez-vous) sont limitées au strict nécessaire (Nom, E-mail, Téléphone).</li>
            <li><span className="font-medium text-foreground">Finalité :</span> Ces informations sont utilisées exclusivement pour répondre à vos demandes ou gérer vos rendez-vous au sein de l'institut.</li>
            <li><span className="font-medium text-foreground">Conservation :</span> Vos données ne sont pas vendues à des tiers. Elles sont conservées de manière sécurisée et uniquement pour la durée nécessaire à la finalité du traitement.</li>
            <li><span className="font-medium text-foreground">Vos droits :</span> Vous disposez d’un droit d’accès, de rectification, de portabilité et de suppression de vos données. Pour toute demande, veuillez nous contacter à l'adresse e-mail mentionnée ci-dessus.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold font-headline text-primary/90">5. Utilisation des cookies</h2>
          <p>Ce site utilise des cookies techniques et analytiques pour améliorer votre expérience de navigation et mesurer l'audience du site de manière anonyme.</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><span className="font-medium text-foreground">Qu'est-ce qu'un cookie ?</span> Un petit fichier texte enregistré sur votre appareil lors de votre visite.</li>
            <li><span className="font-medium text-foreground">Gestion des cookies :</span> Vous pouvez à tout moment configurer votre navigateur pour bloquer les cookies. Notez toutefois que certaines fonctionnalités du site pourraient être limitées.</li>
            <li><span className="font-medium text-foreground">Analyses :</span> Nous utilisons des outils d'analyse (Google/Firebase Analytics) qui respectent l'anonymat de votre adresse IP.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold font-headline text-primary/90">6. Propriété intellectuelle</h2>
          <p>Tous les contenus présents sur ce site (textes, logos, images, graphismes) sont la propriété de Soin esthétique Nussbaumer Sàrl ou font l'objet d'une autorisation d'utilisation. Toute reproduction ou diffusion non autorisée est interdite.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold font-headline text-primary/90">7. Droit applicable</h2>
          <p>Le présent site et ses mentions légales sont soumis au droit suisse. Le for juridique est à Genève, Suisse.</p>
        </section>
      </div>
    </div>
  );
}
