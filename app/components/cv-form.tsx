"use client";

export const dynamic = "force-dynamic";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function CVForm({
  poste,
  offres,
}: {
  poste: string;
  offres: { id: number; title: string }[];
}) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const router = useRouter();

  // Move span on input focus (scoped to the form instead of document)
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const handleFocus = (e: Event) => {
      const target = e.target as HTMLElement;
      target.closest(".inputDiv")?.classList.add("move-span");
    };

    const handleBlur = (e: Event) => {
      const t = e.target as
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLSelectElement;
      if (!t.value) t.closest(".inputDiv")?.classList.remove("move-span");
    };

    const inputs = form.querySelectorAll<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >(".inputDiv input, .inputDiv textarea, .inputDiv select");
    inputs.forEach((el) => {
      el.addEventListener("focus", handleFocus);
      el.addEventListener("blur", handleBlur);
    });

    return () => {
      inputs.forEach((el) => {
        el.removeEventListener("focus", handleFocus);
        el.removeEventListener("blur", handleBlur);
      });
    };
  }, []);

  // Get filename for file input
  useEffect(() => {
    const fileInput = document.getElementById(
      "piece"
    ) as HTMLInputElement | null;
    const handleFileChange = (e: Event) => {
      const input = e.target as HTMLInputElement;
      const fileNameDisplay = document.getElementById("nom_fichier");
      if (fileNameDisplay && input.files && input.files.length > 0) {
        fileNameDisplay.textContent = `Fichier sélectionné : ${input.files[0].name}`;
      }
    };
    if (fileInput) fileInput.addEventListener("change", handleFileChange);
    return () => fileInput?.removeEventListener("change", handleFileChange);
  }, []);

  // ✅ handle submit
  // Form submission (attach listener correctly)
  useEffect(() => {
    const form = document.getElementById(
      "contact-form-1000"
    ) as HTMLFormElement | null;
    if (!form) return;

    const handleSubmit = async (e: Event) => {
      e.preventDefault();

      const formData = new FormData(form);

      // collect mobilite[]
      const mobilite = formData.getAll("mobilite[]").map(String);
      formData.delete("mobilite[]"); // optional cleanup
      formData.append("mobilite_geographique", mobilite.join(","));

      try {
        const res = await fetch("/api/candidatures", {
          method: "POST",
          body: formData,
          cache: "no-store",
        });

        const response = await res?.json();

        if (res?.status === 400) {
          setValidationErrors(response.errors || {});
          toast.error("Erreur de validation !");
        } else {
          toast.success("Votre candidature a été envoyée avec succès 🎉");
          form.reset();
          setValidationErrors({});
          setTimeout(() => router.push("/emploi"), 2500);
        }
      } catch (e) {
        console.log({ e });
        toast.error("Une erreur est survenue !");
      }
    };

    form.addEventListener("submit", handleSubmit);
    return () => form.removeEventListener("submit", handleSubmit);
  }, [poste, router]);

  return (
    <section id="offre-spontanee-cv" className="pb-12">
      <div className="container">
        <div className="flex flex-col justify-center">
          <div className="w-5/6 flex-[0_0_auto] md:w-2/3 text-center mx-auto py-12">
            <h2 className="titre_1 text-center">Formulaire de candidature</h2>
            <p className="description_1 text-center"></p>
          </div>
          <div className="mb-12 mx-auto w-full flex-[0_0_auto] md:w-2/3">
            <div id="formulaire-contact" className="pt-4 pb-12">
              <div
                className="wpcf7 js"
                id="wpcf7-f1000-o1"
                lang="fr-FR"
                dir="ltr"
                data-wpcf7-id={1000}
              >
                <div className="screen-reader-response">
                  <p role="status" aria-live="polite" aria-atomic="true" />{" "}
                  <ul />
                </div>
                <form
                  ref={formRef}
                  method="post"
                  className="wpcf7-form init"
                  id="contact-form-1000"
                  aria-label="Formulaire de contact"
                  encType="multipart/form-data"
                  noValidate
                  data-status="init"
                >
                  <div
                    id="contact_form"
                    className="text-center mx-auto flex-[0_0_auto] w-5/6 md:w-7/12 justify-center"
                  >
                    <h3 className="titre_1 !items-start pt-6">Identité</h3>
                    <div className="checkDiv">
                      <p>
                        <label>Désignation* :</label>
                        <span
                          className="wpcf7-form-control-wrap"
                          data-name="designation"
                        >
                          <span className="wpcf7-form-control wpcf7-radio inputContact">
                            <span className="wpcf7-list-item first">
                              <input
                                type="radio"
                                name="designation"
                                defaultValue="M."
                                defaultChecked
                              />
                              <span className="wpcf7-list-item-label">M.</span>
                            </span>
                            <span className="wpcf7-list-item">
                              <input
                                type="radio"
                                name="designation"
                                defaultValue="Mme."
                              />
                              <span className="wpcf7-list-item-label">
                                Mme.
                              </span>
                            </span>
                            <span className="wpcf7-list-item last">
                              <input
                                type="radio"
                                name="designation"
                                defaultValue="Mlle."
                              />
                              <span className="wpcf7-list-item-label">
                                Mlle.
                              </span>
                            </span>
                          </span>
                        </span>
                      </p>
                    </div>
                    <div className="inputDiv">
                      <p>
                        <span
                          className="wpcf7-form-control-wrap"
                          data-name="nom"
                        >
                          <input
                            size={40}
                            maxLength={400}
                            className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required inputContact"
                            defaultValue=""
                            type="text"
                            name="nom"
                            required
                          />
                        </span>
                        <span className="iconContact nomPicto" />
                        <span className="floating-label">Nom*</span>
                      </p>
                      {validationErrors.nom && (
                        <p className="text-red-600 text-sm mt-1">
                          {validationErrors.nom}
                        </p>
                      )}
                    </div>
                    <div className="inputDiv">
                      <p>
                        <span
                          className="wpcf7-form-control-wrap"
                          data-name="prenom"
                        >
                          <input
                            size={40}
                            maxLength={400}
                            className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required inputContact"
                            defaultValue=""
                            type="text"
                            name="prenom"
                            required
                          />
                        </span>
                        <span className="iconContact prenomPicto" />
                        <span className="floating-label">Prénom*</span>
                      </p>
                      {validationErrors.prenom && (
                        <p className="text-red-600 text-sm mt-1">
                          {validationErrors.prenom}
                        </p>
                      )}
                    </div>
                    <h3 className="titre_1 !items-start pt-6">Coordonnées</h3>
                    <div className="inputDiv">
                      <p>
                        <span
                          className="wpcf7-form-control-wrap"
                          data-name="email"
                        >
                          <input
                            size={40}
                            maxLength={400}
                            className="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email inputContact"
                            defaultValue=""
                            type="email"
                            name="email"
                            required
                          />
                        </span>
                        <span className="iconContact emailPicto" />
                        <span className="floating-label">Email*</span>
                      </p>
                      {validationErrors.email && (
                        <p className="text-red-600 text-sm mt-1">
                          {validationErrors.email}
                        </p>
                      )}
                    </div>
                    <div className="inputDiv">
                      <p>
                        <span
                          className="wpcf7-form-control-wrap"
                          data-name="pays"
                        >
                          <select
                            className="wpcf7-form-control wpcf7-select wpcf7-validates-as-required inputContact"
                            name="pays"
                            defaultValue=""
                            required
                          >
                            <option value="">Pays*</option>
                            <option value="Algérie">Algérie</option>
                            <option value="France">France</option>
                          </select>
                        </span>
                        <span className="iconContact paysPicto" />
                      </p>
                      {validationErrors.pays && (
                        <p className="text-red-600 text-sm mt-1">
                          {validationErrors.pays}
                        </p>
                      )}
                    </div>
                    <div className="inputDiv">
                      <p>
                        <span
                          className="wpcf7-form-control-wrap"
                          data-name="ville"
                        >
                          <input
                            size={40}
                            maxLength={400}
                            className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required inputContact"
                            defaultValue=""
                            type="text"
                            name="ville"
                          />
                        </span>
                        <span className="iconContact villePicto" />
                        <span className="floating-label">Ville</span>
                      </p>
                    </div>
                    <h3 className="titre_1 !items-start pt-6">Candidature</h3>
                    <div className="inputDiv">
                      <p>
                        <span
                          className="wpcf7-form-control-wrap"
                          data-name="poste"
                        >
                          <select
                            className="wpcf7-form-control wpcf7-select inputContact"
                            name="poste"
                            disabled
                            defaultValue={poste}
                          >
                            {offres?.map((o) => (
                              <option key={o?.id} value={o?.title}>
                                {o?.title}
                              </option>
                            ))}
                          </select>
                        </span>
                        <span className="iconContact fonctionPicto" />
                      </p>
                      {validationErrors.poste && (
                        <p className="text-red-600 text-sm mt-1">
                          {validationErrors.poste}
                        </p>
                      )}
                    </div>
                    <div className="inputDiv">
                      <input
                        className="wpcf7-form-control wpcf7-hidden inputContact"
                        defaultValue={poste}
                        type="hidden"
                        name="poste_hidden"
                      />
                    </div>
                    <div className="inputDiv pjDiv">
                      <p>
                        <label htmlFor="piece" className="inputContact inputPJ">
                          <span id="nom_fichier">
                            Ajouter votre CV*{" "}
                            <small className="block">
                              Formats acceptés : PDF, DOC, DOCX
                            </small>
                          </span>
                          <span
                            className="wpcf7-form-control-wrap"
                            data-name="cv_file"
                          >
                            <input
                              size={40}
                              className="wpcf7-form-control wpcf7-file wpcf7-validates-as-required inputContact"
                              id="piece"
                              accept=".pdf,.doc,.docx"
                              type="file"
                              name="cv_file"
                              required
                            />
                          </span>
                          <span className="iconContact pjPicto" />
                        </label>
                      </p>
                      {validationErrors.cv && (
                        <p className="text-red-600 text-sm mt-1">
                          {validationErrors.cv}
                        </p>
                      )}
                    </div>
                    <div className="checkDiv">
                      <p>
                        <label>Mobilité géographique :</label>
                        <span
                          className="wpcf7-form-control-wrap"
                          data-name="mobilite"
                        >
                          <span className="wpcf7-form-control wpcf7-checkbox wpcf7-validates-as-required inputContact">
                            <span className="wpcf7-list-item first">
                              <input
                                type="checkbox"
                                name="mobilite[]"
                                defaultValue="Nationale"
                                className="mobilite-checkbox"
                              />
                              <span className="wpcf7-list-item-label">
                                Nationale
                              </span>
                            </span>
                            <span className="wpcf7-list-item last">
                              <input
                                type="checkbox"
                                name="mobilite[]"
                                defaultValue="Internationale"
                                className="mobilite-checkbox"
                              />
                              <span className="wpcf7-list-item-label">
                                Internationale
                              </span>
                            </span>
                          </span>
                        </span>
                      </p>
                    </div>
                    <div className="inputDiv">
                      <p>
                        <span
                          className="wpcf7-form-control-wrap"
                          data-name="disponibilite"
                        >
                          <select
                            className="wpcf7-form-control wpcf7-select wpcf7-validates-as-required inputContact"
                            name="disponibilite"
                            defaultValue=""
                            required
                          >
                            <option value="">Disponibilité*</option>
                            <option value="Immédiate">Immédiate</option>
                            <option value="1 mois">1 mois</option>
                            <option value="3 mois">3 mois</option>
                          </select>
                        </span>
                        <span className="iconContact dispoPicto" />
                      </p>
                      {validationErrors.disponibilite && (
                        <p className="text-red-600 text-sm mt-1">
                          {validationErrors.disponibilite}
                        </p>
                      )}
                    </div>
                    <div className="inputDiv">
                      <p>
                        <span
                          className="wpcf7-form-control-wrap"
                          data-name="origine_candidature"
                        >
                          <select
                            className="wpcf7-form-control wpcf7-select wpcf7-validates-as-required inputContact"
                            aria-required="true"
                            aria-invalid="false"
                            name="origine_candidature"
                            defaultValue=""
                          >
                            <option value="">
                              Origine de votre candidature
                            </option>
                            <option value="Candidature spontannée">
                              Candidature spontannée
                            </option>
                            <option value="Recommendation">
                              Recommendation
                            </option>
                            <option value="Salon d'emploi">
                              Salon d&apos;emploi
                            </option>
                            <option value="Agence d'emploi">
                              Agence d&apos;emploi
                            </option>
                            <option value="Université">Université</option>
                            <option value="Site d'emploi">
                              Site d&apos;emploi
                            </option>
                            <option value="Séminaire">Séminaire</option>
                            <option value="Réseaux sociaux">
                              Réseaux sociaux
                            </option>
                          </select>
                        </span>
                        <span className="iconContact naturePicto" />
                      </p>
                    </div>
                    <div className="w-full flex-[0_0_auto]">
                      <p>
                        <small>
                          Ce site est protégé par reCAPTCHA et la{" "}
                          <a href="https://policies.google.com/privacy">
                            politique de confidentialité
                          </a>{" "}
                          et les{" "}
                          <a href="https://policies.google.com/terms">
                            conditions d&apos;utilisation
                          </a>{" "}
                          s&apos;appliquent.
                        </small>
                      </p>
                    </div>

                    <p>
                      <button
                        type="submit"
                        className="btn btn-cm-secondary secondary-blue-border mt-12 me-6"
                      >
                        <span className="icon-arrow-right">Envoyer</span>
                      </button>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
