"use client";

import { NextResponse } from "next/server";
import { useEffect, useRef, useState } from "react";

export default function CVForm({
  poste,
  offres,
}: {
  poste: string;
  offres: { id: number; title: string }[];
}) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [validationErrors, setValidationErrors] = useState("");

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

  // Form submission (attach listener correctly)
  useEffect(() => {
    const form = document.getElementById(
      "contact-form-1000"
    ) as HTMLFormElement | null;
    if (!form) return;

    const handleSubmit = async (e: Event) => {
      e.preventDefault();

      const formData = new FormData(form);

      // Get array values properly (either rely on getAll or your custom query)
      const mobilite = formData.getAll("mobilite[]").map(String);
      // Optional: remove the raw key if you don’t want it in `data`
      // formData.delete("mobilite[]");

      const data = Object.fromEntries(formData.entries());
      data.mobilite_geographique = mobilite.join(",");

      fetch("/api/candidatures", {
        method: "POST",
        body: formData,
      })
        .then(async (res) => {
          const response = await res?.json();

          if (res?.status === 400) {
            setValidationErrors(`${response?.message} : ${response?.errors}`);
          } else {
            return response;
          }
        })
        .catch((e) => {
          console.log({ e });
        });
    };

    form.addEventListener("submit", handleSubmit);
    return () => form.removeEventListener("submit", handleSubmit);
  }, [poste]);

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
                        <label>Désignation :</label>
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
                            aria-required="true"
                            aria-invalid="false"
                            defaultValue=""
                            type="text"
                            name="nom"
                          />
                        </span>
                        <span className="iconContact nomPicto" />
                        <span className="floating-label">Nom*</span>
                      </p>
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
                            aria-required="true"
                            aria-invalid="false"
                            defaultValue=""
                            type="text"
                            name="prenom"
                          />
                        </span>
                        <span className="iconContact prenomPicto" />
                        <span className="floating-label">Prénom*</span>
                      </p>
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
                            aria-required="true"
                            aria-invalid="false"
                            defaultValue=""
                            type="email"
                            name="email"
                          />
                        </span>
                        <span className="iconContact emailPicto" />
                        <span className="floating-label">Email*</span>
                      </p>
                    </div>
                    <div className="inputDiv">
                      <p>
                        <span
                          className="wpcf7-form-control-wrap"
                          data-name="pays"
                        >
                          <select
                            className="wpcf7-form-control wpcf7-select wpcf7-validates-as-required inputContact"
                            aria-required="true"
                            aria-invalid="false"
                            name="pays"
                            defaultValue="Algérie"
                          >
                            <option value="Algérie">Algérie</option>
                            <option value="France">France</option>
                            <option value="Tunisie">Tunisie</option>
                          </select>
                        </span>
                        <span className="iconContact paysPicto" />
                      </p>
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
                            aria-required="true"
                            aria-invalid="false"
                            defaultValue=""
                            type="text"
                            name="ville"
                          />
                        </span>
                        <span className="iconContact villePicto" />
                        <span className="floating-label">Ville*</span>
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
                            value={poste}
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
                    </div>
                    <div className="checkDiv">
                      <p>
                        <label>Mobilité géographique* :</label>
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
                            aria-required="true"
                            aria-invalid="false"
                            name="disponibilite"
                            defaultValue=""
                          >
                            <option value="">Disponibilité*</option>
                            <option value="Immédiate">Immédiate</option>
                            <option value="1 mois">1 mois</option>
                            <option value="3 mois">3 mois</option>
                          </select>
                        </span>
                        <span className="iconContact dispoPicto" />
                      </p>
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
                              Origine de votre candidature*
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

                    {validationErrors && validationErrors?.length > 0 && (
                      <div className="w-full flex-[0_0_auto] mt-4">
                        <p className="text-red-600">{validationErrors}</p>
                      </div>
                    )}

                    <div className="wpcf7-response-output" aria-hidden="true" />
                    <span
                      className="wpcf7-form-control-wrap CF7_DIST_EMAIL"
                      data-name="CF7_DIST_EMAIL"
                    >
                      <input
                        type="hidden"
                        name="CF7_DIST_EMAIL"
                        className="wpcf7-form-control wpcf7-hidden wpcf7dtx wpcf7dtx-hidden"
                        aria-invalid="false"
                        defaultValue="souhil.ben1337@gmail.com"
                      />
                    </span>
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
