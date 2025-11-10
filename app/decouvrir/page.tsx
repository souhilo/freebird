import Image from "next/image";

export default function Page() {
  return (
    <div className="container py-10 space-y-12">
      {/* Intro highlight */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0b2545] via-[#153e75] to-[#1b4965] text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <p className="uppercase tracking-wider text-[#ffb400] text-xs mb-2">Découvrir</p>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
              Les ailes libres ne connaissent point de frontière
            </h1>
            <p className="text-white/90 text-base leading-7">
              Freebird Airways : L’Art de la Liberté dans les Cieux.
            </p>
          </div>
          <div className="relative min-h-[220px] hidden md:block">
            <Image
              alt="Découvrir Freebird"
              src="/static/destinations/paris.avif"
              fill
              className="object-cover opacity-90 mix-blend-luminosity"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[#0b2545]/70 to-transparent" />
          </div>
        </div>
      </section>

      {/* Alternating media blocks */}
      <section className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative h-[260px] lg:h-[360px] overflow-hidden rounded-xl shadow-sm">
            <Image
              alt="L’art de la liberté"
              src="/static/destinations/instanbul.avif"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="px-1">
            <h2 className="text-2xl font-semibold text-[rgb(37,42,49)] mb-3">
              L’art de la liberté dans les cieux
            </h2>
            <p className="text-[16px] leading-7 text-[rgb(37,42,49)]">
              Née d’un rêve audacieux, Freebird Airways incarne la liberté de conquérir de nouveaux horizons. Plus qu’une simple compagnie aérienne, nous sommes les architectes d’une nouvelle ère du voyage, où chaque décollage est une promesse d’évasion et chaque atterrissage, le début d’une aventure inoubliable.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="px-1 order-2 lg:order-1">
            <h2 className="text-2xl font-semibold text-[rgb(37,42,49)] mb-3">
              Une flotte qui défie les limites
            </h2>
            <p className="text-[16px] leading-7 text-[rgb(37,42,49)]">
              Notre flotte moderne, aux couleurs vibrantes de gris, jaune et bleu, symbolise l’élégance, l’énergie et l’infini des cieux. Emblématique, le majestueux condor, gravé sur chaque appareil, incarne notre esprit intrépide et notre engagement envers l’innovation technologique. Nous repoussons les frontières du voyage aérien pour vous offrir une expérience fluide, connectée et résolument avant-gardiste.
            </p>
          </div>
          <div className="relative h-[260px] lg:h-[360px] overflow-hidden rounded-xl shadow-sm order-1 lg:order-2">
            <Image
              alt="Flotte Freebird"
              src="/static/destinations/marseille.avif"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative h-[260px] lg:h-[360px] overflow-hidden rounded-xl shadow-sm">
            <Image
              alt="Art du voyage"
              src="/static/destinations/lyon.avif"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="px-1">
            <h2 className="text-2xl font-semibold text-[rgb(37,42,49)] mb-3">
              Redéfinir l’art du voyage
            </h2>
            <p className="text-[16px] leading-7 text-[rgb(37,42,49)]">
              Chez Freebird Airways, le voyage n’est pas une simple traversée : c’est une rencontre avec l’inattendu. Des métropoles électrisantes aux rivages paisibles, chaque destination devient une toile où s’écrivent vos plus belles histoires.
            </p>
          </div>
        </div>
      </section>

      {/* Value cards */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-[rgb(37,42,49)]">Nos engagements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Ponctualité et fiabilité",
              text: "Des itinéraires optimisés et une flotte moderne pour vous emmener à bon port.",
            },
            {
              title: "Hospitalité à bord",
              text: "Une expérience chaleureuse et attentive, du décollage à l’atterrissage.",
            },
            {
              title: "Innovation continue",
              text: "Des services connectés et fluides pour un voyage sans friction.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="rounded-xl border border-[#dadfe6] bg-white p-5 shadow-sm hover:shadow transition"
            >
              <h4 className="font-medium text-[rgb(37,42,49)] mb-1">{card.title}</h4>
              <p className="text-sm leading-6 text-[rgb(79,94,113)]">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="rounded-2xl bg-gradient-to-r from-[#ffd166] to-[#ffb400] p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-[#0b2545]">Votre aventure commence ici</h3>
          <p className="text-[#0b2545]/80">
            Prenez votre envol. L’horizon vous attend.
          </p>
        </div>
        <a
          href="/reservation"
          className="mt-4 md:mt-0 inline-flex items-center justify-center rounded-lg bg-[#0b2545] px-5 py-3 text-white hover:bg-[#153e75]"
        >
          Réserver maintenant
        </a>
      </section>
    </div>
  );
}
