import Image from "next/image";

export default function Page() {
  return (
    <div className="container py-10 space-y-12">
      {/* Header card */}
      <section className="relative overflow-hidden rounded-2xl border border-[#e8edf1] bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-[rgb(37,42,49)] mb-3">
              Planifier et voyager
            </h1>
            <p className="text-[16px] leading-7 text-[rgb(37,42,49)]">
              Vous envisagez de voyager bientôt ? Voici quelques options pour vous aider à démarrer.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { n: 1, t: "Recherchez", d: "Choisissez destination et dates." },
                { n: 2, t: "Comparez", d: "Tarifs, horaires et services." },
                { n: 3, t: "Réservez", d: "Paiement sécurisé et rapide." },
              ].map((s) => (
                <div key={s.n} className="rounded-lg border border-[#dadfe6] p-4">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#ffb400] text-[#0b2545] font-bold">
                    {s.n}
                  </div>
                  <h4 className="mt-3 font-medium text-[rgb(37,42,49)]">{s.t}</h4>
                  <p className="text-sm text-[rgb(79,94,113)]">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[220px] hidden md:block">
            <Image
              alt="Planifier"
              src="/static/destinations/tunis.avif"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-white/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* App highlight */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="order-2 lg:order-1">
          <h2 className="text-2xl font-semibold text-[rgb(37,42,49)] mb-3">
            Découvrez plus sur notre application
          </h2>
          <p className="text-[16px] leading-7 text-[rgb(37,42,49)]">
            Accédez à des fonctionnalités pratiques, des offres exclusives et des notifications utiles pour gérer vos voyages en toute simplicité.
          </p>
          <div className="mt-4 flex gap-3">
            <a href="/" className="inline-flex rounded-lg bg-[#0b2545] text-white px-4 py-2 hover:bg-[#153e75]">Télécharger</a>
            <a href="/reservation" className="inline-flex rounded-lg border border-[#0b2545] text-[#0b2545] px-4 py-2 hover:bg-[#0b2545] hover:text-white">Réserver un vol</a>
          </div>
        </div>
        <div className="relative h-[260px] lg:h-[360px] overflow-hidden rounded-xl order-1 lg:order-2">
          <Image
            alt="Application Freebird"
            src="/static/app-dl-bg.avif"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </section>

      {/* Tips band */}
      <section className="rounded-2xl bg-[#f5f7fa] border border-[#e8edf1] p-6 md:p-8">
        <h3 className="text-xl font-semibold text-[rgb(37,42,49)] mb-2">Conseils rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            "Arrivez à l’aéroport 2h avant le départ (vols régionaux).",
            "Vérifiez les documents de voyage et les politiques de bagages.",
            "Activez les notifications pour les mises à jour de vol.",
          ].map((t, i) => (
            <div key={i} className="rounded-xl bg-white p-4 border border-[#dadfe6]">
              <p className="text-sm text-[rgb(79,94,113)]">{t}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
