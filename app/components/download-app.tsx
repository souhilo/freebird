import Image from "next/image";
import Link from "next/link";

export default function DownloadApp() {
  return (
    <div className="relative mx-auto max-h-full lg:max-h-[424px] max-w-[1400px] overflow-hidden transition-shadow duration-300 ease-out lg:block">
      <div className="flex flex-col lg:flex-row border-0 border-t border-solid border-[rgb(232,237,241)]">
        <div className="z-[1] flex grow items-center py-6">
          <div>
            <h2 className="m-0 text-[rgb(37,42,49)] text-[28px] leading-8 font-bold text-start mb-4">
              Profitez encore plus de Freebird.com grâce à notre application
              mobile
            </h2>
            <p className="text-[16px] leading-6 font-normal text-[rgb(37,42,49)] text-start mb-6 m-0">
              Téléchargez l&apos;application Freebird et, en une touche, accédez
              à votre prochaine aventure touristique. Avec l&apos;application
              mobile Freebird, vous aurez accès à des fonctionnalités cachées et
              à des offres spéciales.
            </p>

            <div className="mb-4 flex">
              <div className="flex flex-col">
                <div className="mb-4 inline-flex items-center gap-3">
                  <svg
                    className="inline-block shrink-0 fill-current align-middle w-5 h-5"
                    viewBox="0 0 24 24"
                    preserveAspectRatio="xMidYMid meet"
                    style={{
                      color: "rgb(0, 169, 145)",
                    }}
                  >
                    <path d="M8.445 12.668a.9.9 0 1 0-1.303 1.242l2.573 2.745a.9.9 0 0 0 1.335-.036l5.591-7.037a.9.9 0 0 0-1.367-1.17l-4.655 5.913a.4.4 0 0 1-.607.025l-1.567-1.682ZM2 12C2 6.5 6.5 2 12 2s10 4.5 10 10-4.5 10-10 10S2 17.5 2 12Z"></path>
                  </svg>
                  <p className="text-sm leading-6 font-normal text-[rgb(79,94,113)] text-start m-0">
                    Télécharger les cartes d&apos;embarquement
                  </p>
                </div>
                <div className="mb-4 inline-flex items-center gap-3">
                  <svg
                    className="inline-block shrink-0 fill-current align-middle w-5 h-5"
                    viewBox="0 0 24 24"
                    preserveAspectRatio="xMidYMid meet"
                    style={{
                      color: "rgb(0, 169, 145)",
                    }}
                  >
                    <path d="M8.445 12.668a.9.9 0 1 0-1.303 1.242l2.573 2.745a.9.9 0 0 0 1.335-.036l5.591-7.037a.9.9 0 0 0-1.367-1.17l-4.655 5.913a.4.4 0 0 1-.607.025l-1.567-1.682ZM2 12C2 6.5 6.5 2 12 2s10 4.5 10 10-4.5 10-10 10S2 17.5 2 12Z"></path>
                  </svg>
                  <p className="text-sm leading-6 font-normal text-[rgb(79,94,113)] text-start m-0">
                    Obtenir des offres et des tarifs exclusifs
                  </p>
                </div>
              </div>

              <div className="flex flex-col ml-10">
                <div className="mb-4 inline-flex items-center gap-3">
                  <svg
                    className="inline-block shrink-0 fill-current align-middle w-5 h-5"
                    viewBox="0 0 24 24"
                    preserveAspectRatio="xMidYMid meet"
                    style={{
                      color: "rgb(0, 169, 145)",
                    }}
                  >
                    <path d="M8.445 12.668a.9.9 0 1 0-1.303 1.242l2.573 2.745a.9.9 0 0 0 1.335-.036l5.591-7.037a.9.9 0 0 0-1.367-1.17l-4.655 5.913a.4.4 0 0 1-.607.025l-1.567-1.682ZM2 12C2 6.5 6.5 2 12 2s10 4.5 10 10-4.5 10-10 10S2 17.5 2 12Z"></path>
                  </svg>
                  <p className="text-sm leading-6 font-normal text-[rgb(79,94,113)] text-start m-0">
                    Réserver en un clic
                  </p>
                </div>

                <div className="mb-4 inline-flex items-center gap-3">
                  <svg
                    className="inline-block shrink-0 fill-current align-middle w-5 h-5"
                    viewBox="0 0 24 24"
                    preserveAspectRatio="xMidYMid meet"
                    style={{
                      color: "rgb(0, 169, 145)",
                    }}
                  >
                    <path d="M8.445 12.668a.9.9 0 1 0-1.303 1.242l2.573 2.745a.9.9 0 0 0 1.335-.036l5.591-7.037a.9.9 0 0 0-1.367-1.17l-4.655 5.913a.4.4 0 0 1-.607.025l-1.567-1.682ZM2 12C2 6.5 6.5 2 12 2s10 4.5 10 10-4.5 10-10 10S2 17.5 2 12Z"></path>
                  </svg>
                  <p className="text-sm leading-6 font-normal text-[rgb(79,94,113)] text-start m-0">
                    Notifications de voyage
                  </p>
                </div>
              </div>
            </div>

            <div className="flex safe-space-x-md">
              <Link className="inline-block h-[40px]" href="/">
                <Image
                  alt="App store"
                  src="/static/app-store.webp"
                  width={120}
                  height={40}
                />
              </Link>

              <Link className="inline-block h-[40px] ml-4" href="/">
                <Image
                  alt="Play store"
                  src="/static/play-store.webp"
                  width={134}
                  height={40}
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="me-[-120px] mt-[61px] flex max-h-[363px] max-w-[550px] shrink-0 items-start justify-center xl:me-0">
          <div className="relative flex shrink-0 justify-center">
            <div className="overflow-hidden relative inline-block max-w-full">
              <div className="block max-w-full aspect-[2.06612/1]">
                <Image
                  alt="DL App"
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzUwIiBoZWlnaHQ9IjM2MyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                  width={750}
                  height={363}
                />
              </div>
              <Image
                alt="app download"
                src="/static/app-dl-bg.avif"
                width={750}
                height={363}
                className="absolute m-auto block h-0 max-h-full min-h-full w-0 min-w-full max-w-full border-none p-0 inset-0"
              />
            </div>
            <div className="absolute left-[250px] top-[79px]">
              <div className="overflow-hidden relative inline-block max-w-full mb-2">
                <div className="block max-w-full aspect-[0.994413/1]">
                  <Image
                    alt=""
                    className="block max-w-full"
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTc4IiBoZWlnaHQ9IjE3OSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                    width={178}
                    height={178}
                  />
                </div>
                <Image
                  alt="QR Code"
                  src="/static/qrcode.png"
                  width={178}
                  height={178}
                  className="absolute m-auto block h-0 max-h-full min-h-full w-0 min-w-full max-w-full border-none p-0 inset-0"
                />
              </div>
              <p className="text-sm leading-4 font-normal text-[rgb(37,42,49)] text-center m-0">
                Scanner pour télécharger
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
