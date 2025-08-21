const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchOffres = async () => {
  const offres = await fetch(`${BASE_URL}/api/offres`);

  return offres?.json();
};

export default async function Offres() {
  const offres = await fetchOffres();

  return (
    <div className="bg-[rgba(0,53,140,0.05)]">
      <div className="container">
        <div className="pb-4 pt-10">
          <h2 className="text-[rgb(37,42,49)] m-0 text-heading-foreground text-[22px] leading-7 font-medium text-start mb-2">
            Offres d&apos;emploi
          </h2>
          <p className="mb-6 text-sm leading-normal font-normal text-[rgb(37,42,49)]">
            Freebird recherche des femmes et des hommes à fort potentiel
            désireux de prendre part à un projet d’entreprise ambitieux.
          </p>
          {/* STARTING OFFRES SECTION */}
          <div className="bg-blue-light py-3 py-md-5 ">
            {offres?.map?.(
              ({
                id,
                title,
                pays,
                wilaya,
                type_contrat,
                nature,
              }: {
                id: number;
                title: string;
                pays: string;
                wilaya: string;
                type_contrat: string;
                nature: string;
              }) => (
                <div
                  key={id}
                  className="emploi-single flex-[1_0_0%] flex justify-center my-6 px-1 md:px-12"
                >
                  <div className="emploi-content">
                    <div className="titre md:text-start md:mb-0 mb-6 md:w-1/3 md:flex-[0_0_auto] flex-[0_0_auto] w-full">
                      [{nature}] {title}
                    </div>
                    <div className="w-1/2 flex-[0_0_auto] md:w-1/4 mb-6 md:mb-0 picto location">
                      {wilaya}, {pays}
                    </div>
                    <div className="w-1/2 flex-[0_0_auto] md:w-1/4 mb-6 md:mb-0 picto contrat">
                      {type_contrat}
                    </div>
                    <div className="w-full flex-[0_0_auto] md:w-1/6 md:text-end">
                      <a href={`/emploi/${id}`} className="btn btn-cm-primary">
                        <span>Postuler</span>
                      </a>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
          {/* END OFFRES SECTION */}
        </div>
      </div>
    </div>
  );
}
