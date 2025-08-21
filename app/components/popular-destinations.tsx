import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";

type DestinationCardProps = {
  image: string;
  city: string;
  country: string;
  startingPrice: string;
  departureCountry?: string;
  containerClassName?: string;
};

function DestinationCard(props: DestinationCardProps) {
  const {
    city,
    country,
    departureCountry,
    image,
    startingPrice,
    containerClassName,
  } = props;

  return (
    <div className={containerClassName}>
      <Link
        href="/"
        className="group relative flex h-full w-full flex-col justify-end overflow-hidden rounded-md shadow-[0_0_2px_0_#252a3129,0_1px_4px_0_#252a311f] transition-shadow duration-300 hover:shadow-[0_1px_4px_0_#252a3129,0_4px_8px_0_#252a311f]"
      >
        <div className="overflow-hidden absolute bottom-0 left-0 right-0 top-0 transition-transform duration-300 group-hover:-translate-y-1/4">
          <Image
            width={251}
            height={234}
            className="absolute m-auto block h-0 max-h-full min-h-full w-0 min-w-full max-w-full border-none p-0 inset-0 object-cover"
            alt="image"
            src={image}
          />
          <div className="pointer-events-none absolute block h-0 max-h-full min-h-full w-0 min-w-full max-w-full bg-[rgb(245,247,249)] transition-opacity duration-300 ease-out inset-0 opacity-0">
            <svg
              aria-labelledby=":rcs:-title"
              className="animate-pulse rtl:-scale-x-100"
              role="img"
              style={{
                height: "100%",
                maxHeight: "100%",
                width: "100%",
              }}
            >
              <title id=":rcs:-title">loading</title>
              <rect
                role="presentation"
                x="0"
                y="0"
                width="100%"
                height="100%"
                clipPath="url(#:rcs:-clip-clip)"
                style={{
                  fill: "rgb(232, 237, 241)",
                }}
              ></rect>
              <defs>
                <clipPath id=":rcs:-clip-clip">
                  <rect
                    x="0"
                    y="0"
                    rx="3"
                    ry="3"
                    height="100%"
                    width="100%"
                  ></rect>
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>

        <div className="absolute bg-[linear-gradient(#0000,#0003_45%,#0009)] inset-0" />

        <div className="z-[1] grid">
          <div className="z-[1] col-start-1 row-start-1 p-3 text-white transition-colors duration-300 group-hover:text-[rgb(37,42,49)] group-hover:bg-white rounded-t-md">
            <span className="translate-y-2 leading-normal opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:text-[rgb(79,94,113)] group-hover:opacity-100">
              {departureCountry}
              <svg
                className="inline-block shrink-0 fill-current align-middle rtl:-scale-x-100 h-5 w-5"
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
              >
                <path d="m6.074 12.11-.086.073-2.804 2.921c-.22.22-.243.537-.066.732l.066.06 2.804 2.922a.56.56 0 0 0 .429.182c.331 0 .563-.197.606-.503l.007-.106V16.4l8.063.001a.905.905 0 0 0 .9-.787L16 15.5a.903.903 0 0 0-.793-.893l-.114-.007-8.063-.001v-1.99a.655.655 0 0 0-.184-.426.594.594 0 0 0-.772-.072Zm11.08-6.927a.655.655 0 0 0-.184.426v1.99L8.907 7.6l-.114.007A.903.903 0 0 0 8 8.5l.007.113a.905.905 0 0 0 .9.787l8.063-.001v1.992l.007.106c.043.306.275.503.606.503a.56.56 0 0 0 .43-.182l2.803-2.922.066-.06c.177-.195.155-.513-.066-.732l-2.803-2.921-.087-.073a.594.594 0 0 0-.772.073Z"></path>
              </svg>
            </span>

            <div className="mb-1 flex items-center justify-between">
              <h3 className="text-[22px] font-medium leading-7">
                {city}
                <span className="hidden group-hover:inline">, {country}</span>
              </h3>
              <svg
                className="inline-block shrink-0 fill-current align-middle rtl:-scale-x-100 h-6 w-6"
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
              >
                <path d="m8.746 16.089 4.23-3.825.029-.03a.4.4 0 0 0-.03-.565l-4.18-3.753a.904.904 0 0 1-.07-1.275.898.898 0 0 1 1.27-.07l5.257 4.72c.398.358.399.983.002 1.342L9.952 17.43a.898.898 0 0 1-1.271-.066.904.904 0 0 1 .065-1.274Z"></path>
              </svg>
            </div>
            <p className="leading-normal font-normal text-sm">
              Billets à partir de{" "}
              <span className="font-semibold">DZD {startingPrice}</span>
            </p>
          </div>
          <div className="col-start-1 row-start-1 translate-y-2 bg-white-normal opacity-0 transition duration-300 inset-0 group-hover:translate-y-0 group-hover:opacity-100" />
        </div>
      </Link>
    </div>
  );
}

const destinations: ComponentProps<typeof DestinationCard>[] = [
  {
    city: "Instanbul",
    country: "Turquie",
    image: "/static/destinations/instanbul.avif",
    startingPrice: "57,420",
  },
  {
    city: "Paris",
    country: "France",
    image: "/static/destinations/paris.avif",
    startingPrice: "24,840",
    containerClassName: "md:col-span-2 lg:col-span-1",
  },
  {
    city: "Tunis",
    country: "Tunisie",
    image: "/static/destinations/tunis.avif",
    startingPrice: "38,160",
  },
  {
    city: "Marseille",
    country: "France",
    image: "/static/destinations/marseille.avif",
    startingPrice: "17,100",
    containerClassName: "xl:col-span-2",
  },
  {
    city: "Montréal",
    country: "Canada",
    image: "/static/destinations/montreak.avif",
    startingPrice: "130,320",
    containerClassName: "lg:col-span-2",
  },
  {
    city: "Lyon",
    country: "France",
    image: "/static/destinations/lyon.avif",
    startingPrice: "24,480",
    containerClassName: "hidden xl:block",
  },
];

export default function PopularDestinations() {
  return (
    <div className="container">
      <div className="pb-4 pt-10">
        <h2 className="text-[rgb(37,42,49)] m-0 text-heading-foreground text-[22px] leading-7 font-medium text-start mb-2">
          Destinations populaires depuis Alger
        </h2>
        <p className="mb-6 text-sm leading-normal font-normal text-[rgb(37,42,49)]">
          Ces destinations attrayantes au départ de Alger ont été sélectionnées
          juste pour vous.
        </p>
        <div className="mb-3 grid [grid-auto-rows:234px] gap-3 md:mb-4 md:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
          {destinations?.map((destination, i) => (
            <DestinationCard
              key={i}
              departureCountry="Alger"
              {...destination}
            />
          ))}

          <div className="row-start-3 md:col-span-3 lg:col-span-2 lg:col-start-3 xl:col-start-4 lg:row-start-2">
            <div className="flex h-full flex-col rounded-sm bg-white shadow-[0_0_2px_0_#252a3129,0_1px_4px_0_#252a311f] md:flex-row">
              <div className="relative hidden w-full md:block md:w-[234px] shrink-0">
                <div className="overflow-hidden relative inline-block max-w-full">
                  <div className="block max-w-full aspect-square">
                    <Image
                      alt=""
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjM0IiBoZWlnaHQ9IjIzNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                      width={234}
                      height={234}
                    />
                  </div>
                  <Image
                    alt="Promo code"
                    src="/static/promo-img.avif"
                    width={234}
                    height={234}
                    className="absolute m-auto block h-0 max-h-full min-h-full w-0 min-w-full max-w-full border-none p-0 inset-0"
                  />
                </div>
              </div>

              <div className="flex grow flex-col justify-center p-4">
                <div className="flex flex-col">
                  <h3 className="m-0 text-[rgb(37,42,49)] text-lg leading-6 font-medium text-start">
                    Obtenez un code promotionnel d&apos;une valeur de 4500 DZD
                  </h3>
                  <div className="mt-3 w-full md:mt-4">
                    <div className="mt-1">
                      <p className="text-xs leading-4 font-normal text-[rgb(37,42,49)] m-0">
                        Invitez vos amis à voyager avec nous et recevez un code
                        promotionnel de 4500 DZD à chaque fois que l&apos;un
                        d&apos;entre eux crée un compte et réserve un voyage.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex sm:justify-start justify-start">
                  <Link
                    href="/"
                    className="space-x-xs rtl:space-x-reverse h-11 text-sm bg-[rgb(232,237,241)] hover:bg-[rgb(220,227,233)] active:bg-[rgb(220,227,233)] text-[rgb(37,42,49)] hover:text-[rgb(24,27,32)] px-4 duration-[.15s] group relative max-w-full items-center justify-center border-none text-center leading-none transition-all [&>*]:align-middle flex-none rounded-md md:rounded-[3px] cursor-pointer hover:no-underline focus:no-underline active:no-underline inline-flex font-medium"
                  >
                    <div className="inline-block justify-center flex-1">
                      Parrainer un ami
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
