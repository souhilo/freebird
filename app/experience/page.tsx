import Image from "next/image";

export default function Page() {
  return (
    <div className="container py-10 space-y-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1b4965] to-[#0b2545] text-white p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Expérience voyage</h1>
            <p className="text-white/90">
              Découvrez le confort, l’hospitalité et les services à bord qui rendent chaque vol unique.
            </p>
          </div>
          <div className="relative h-[200px] md:h-[260px] rounded-xl overflow-hidden">
            <Image alt="Cabine" src="/static/destinations/lyon.avif" fill className="object-cover opacity-90" />
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { t: "Confort", d: "Sièges ergonomiques et ambiance apaisante pour une détente optimale." },
          { t: "Hospitalité", d: "Équipage attentionné et service orienté vers votre bien-être." },
          { t: "Connectivité", d: "Solutions connectées pour rester productif et diverti." },
        ].map((f, i) => (
          <div key={i} className="rounded-xl border border-[#dadfe6] bg-white p-5 shadow-sm">
            <div className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-[#ffb400] text-[#0b2545] font-bold">{i + 1}</div>
            <h3 className="mt-3 text-lg font-medium text-[rgb(37,42,49)]">{f.t}</h3>
            <p className="text-sm text-[rgb(79,94,113)]">{f.d}</p>
          </div>
        ))}
      </section>

      {/* Alternating section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="relative h-[260px] lg:h-[360px] overflow-hidden rounded-xl">
          <Image alt="Repas à bord" src="/static/destinations/marseille.avif" fill className="object-cover" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-[rgb(37,42,49)] mb-3">Saveurs et attentions</h2>
          <p className="text-[16px] leading-7 text-[rgb(37,42,49)]">
            Des menus soignés et des attentions particulières pour rehausser votre expérience, quelle que soit la durée du vol.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl bg-[#f5f7fa] border border-[#e8edf1] p-6 md:p-8 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-[rgb(37,42,49)]">Prêt à vivre l’expérience Freebird ?</h3>
          <p className="text-[rgb(79,94,113)]">Réservez votre prochain vol dès aujourd’hui.</p>
        </div>
        <a href="/reservation" className="inline-flex rounded-lg bg-[#0b2545] text-white px-5 py-3 hover:bg-[#153e75]">Réserver</a>
      </section>
    </div>
  );
}
