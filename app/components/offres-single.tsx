import CVForm from "./cv-form";

export const dynamic = "force-dynamic";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const fetchOffre = async (id: string) => {
  const offre = await fetch(`${BASE_URL}/api/offres/${id}`, {
    cache: "no-store",
  });

  const fetchedOffre = await offre?.json();

  return fetchedOffre;
};

const fetchOffres = async () => {
  const offres = await fetch(`${BASE_URL}/api/offres`, {
    cache: "no-store",
  });

  const fetchedOffres = (await offres?.json())?.map((o: any) => ({
    id: o?.id,
    title: o?.jobTitle,
  }));

  return fetchedOffres;
};

export default async function OffreSingle({ id }: { id: string }) {
  const offre = await fetchOffre(id);
  const offres = await fetchOffres();

  return (
    <div className="bg-white">
      <div className="container">
        <div className="pb-4 pt-10">
          <h2 className="text-[#00358c] m-0 text-heading-foreground text-4xl leading-7 text-start mb-2 font-bold">
            Offre d&apos;emploi
          </h2>
          <p className="mb-0 text-4xl leading-normal font-medium text-[#00358c]">
            {offre?.title}
          </p>
          {/* OFFRE CONTENT */}
          <div className="py-3 py-md-5 ">
            <div className="content-single-offre content py-5">
              <div className="container">
                <div className="row profil-recherche py-3">
                  <div className="col col-md-9 d-flex justify-content-center flex-column mx-auto">
                    <h3 className="titre_1 !items-start">
                      Description du poste
                    </h3>
                    <div
                      className="description_about pt-3"
                      dangerouslySetInnerHTML={{
                        __html: offre?.jobDescription,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="row profil-recherche py-3">
                  <div className="col col-md-9 d-flex justify-content-center flex-column mx-auto">
                    <h3 className="titre_1 !items-start">Profil recherché :</h3>
                    <div
                      className="description_about pt-3"
                      dangerouslySetInnerHTML={{
                        __html: offre?.requiredProfile,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="row autre py-3">
                  <div className="col col-md-9 d-flex justify-content-center flex-column mx-auto">
                    <h3 className="titre_1 !items-start">
                      Autres informations :
                    </h3>
                    <div
                      className="description_about pt-3"
                      dangerouslySetInnerHTML={{
                        __html: offre?.autre,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="row profil-recherche py-3">
                  <div className="col col-md-9 d-flex justify-content-center flex-column mx-auto">
                    <div className="description_about py-3">
                      <p>
                        Si vous souhaitez améliorer le quotidien de milliers de
                        personnes, n’hésitez pas à postuler !&nbsp;&nbsp;
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-3 text-center">
                  <a href="#offre-spontanee-cv" className="btn btn-cm-primary">
                    <span>Remplissez le formulaire de candidature</span>
                  </a>
                </div>
              </div>
            </div>

            {/* FORM */}
            <CVForm poste={offre?.jobTitle} offres={offres} />
            {/* END FORM */}
          </div>
          {/* END OFFRE CONTENT */}
        </div>
      </div>
    </div>
  );
}
