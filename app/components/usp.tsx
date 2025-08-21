import Image from "next/image";
import { ComponentProps, ReactNode } from "react";

type UspCardProps = {
  icon: string;
  title: string;
  children: ReactNode;
};

function UspCard(props: UspCardProps) {
  const { children, icon, title } = props;
  return (
    <div className="flex flex-auto lg:flex-[1_1] box-border rounded-lg bg-transparent contain-paint border border-solid border-[#dadfe6]">
      <div className="flex flex-col m-4 gap-y-2">
        <div>
          <Image alt={title} src={icon} width={42} height={42} />
        </div>
        <div className="flex flex-col">
          <span className="text-blue-primary font-medium text-lg leading-6">
            {title}
          </span>
          <span className="text-[#8692a6] font-normal text-sm leading-[22px]">
            {children}
          </span>
        </div>
      </div>
    </div>
  );
}

const cards: ComponentProps<typeof UspCard>[] = [
  {
    icon: "/static/global.svg",
    title: "Nous sommes mondiaux",
    children:
      "Approuvé par 10 millions de voyageurs. Couvrant plus de 40 pays.",
  },
  {
    icon: "/static/fast-supp.svg",
    title: "Prise en charge dans environ 30s",
    children:
      "Nous répondons généralement aux appels téléphoniques dans les 30 secondes.",
  },
  {
    icon: "/static/app.svg",
    title: "Offres exceptionnelles sur l'application",
    children:
      "Obtenez des économies instantanées en réservant avec l'application.",
  },
];

export default function Usp() {
  return (
    <div className="mt-12 flex flex-col bg-transparent gap-y-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-start">
          {/* <div className="w-14 h-20 bg-[url(/static/logo-no-text.png)] bg-contain bg-no-repeat" /> */}
          <h2 className="text-[rgb(37,42,49)] m-0 text-heading-foreground text-[22px] leading-7 font-medium text-start mb-2">
            Votre compagnon de voyage de confiance
          </h2>
          <p className="text-sm leading-normal font-normal text-[rgb(37,42,49)]">
            Rejoignez plus de 10 millions de voyageurs annuels qui réservent des
            itinéraires en toute simplicité.
          </p>
        </div>
        {/* <div className="flex justify-start items-center gap-x-2 cursor-pointer">
          <span className="text-blue-primary text-lg leading-6 font-light">
            Contact us
          </span>
          <i className="fi-icon fi-icon_dropdown_line rotate-[270deg]" />
        </div> */}
      </div>
      <div className="flex flex-wrap gap-4">
        {cards?.map((card, i) => (
          <UspCard key={i} {...card} />
        ))}
      </div>
    </div>
  );
}
