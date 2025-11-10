export default function Page() {
  return (
    <div className="container py-10 space-y-8">
      <section className="rounded-2xl border border-[#e8edf1] bg-white p-8 md:p-10">
        <h1 className="text-3xl font-bold text-[rgb(37,42,49)] mb-2">Réservation</h1>
        <p className="text-[16px] leading-7 text-[rgb(37,42,49)]">
          Portail de réservation. Indiquez l’URL exacte si vous souhaitez une redirection vers une plateforme externe.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="/planifier" className="inline-flex rounded-lg bg-[#0b2545] text-white px-4 py-2 hover:bg-[#153e75]">Planifier un voyage</a>
          <a href="/achat" className="inline-flex rounded-lg border border-[#0b2545] text-[#0b2545] px-4 py-2 hover:bg-[#0b2545] hover:text-white">Aller à l’achat</a>
        </div>
      </section>

      <section className="rounded-2xl bg-gradient-to-r from-[#ffd166] to-[#ffb400] p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-[#0b2545]">Prêt à réserver ?</h2>
        <p className="text-[#0b2545]/80">Nous pouvons aussi connecter ce portail à votre système externe.</p>
      </section>
    </div>
  );
}
