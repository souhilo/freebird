import Image from "next/image";

export default function TopWrapper() {
  return (
    <div className="relative pb-0 lg:pb-16 -mt-[100px]">
      <div className="h-[100px]" />
      <div className="relative lg:absolute top-0 left-0 w-full h-full z-0">
        <Image
          alt="Hero"
          src="/static/hero-bg.webp"
          width={1792}
          height={669}
          fetchPriority="high"
        />
      </div>
      <div className="z-[2] lg:relative lg:top-0 container pt-10 lg:px-14 top-[80px] md:top-[100px] absolute">
        <div>
          <h1 className="mb-4 text-white font-bold text-3xl lg:text-[40px] leading-9 lg:leading-[68px] tracking-normal [text-shadow:0_1px_1px_rgba(15,41,77,0.2)] lg:mb-0">
            Commencez à planifier votre prochain voyage
            <span className="inline-block w-3 h-3 rounded-[50%] ml-2.5 bg-[#ffb400]" />
          </h1>
          <p className="text-[16px] leading-6 font-normal text-white text-start mb-6 m-0">
            Vous envisagez de voyager quelque part bientôt ? Voici quelques
            options pour vous aider à démarrer.
          </p>
        </div>
        <div className="[transition:width_0.3s,height_0.3s] mt-2 rounded-lg">
          {/* <BookingBar /> */}
        </div>
      </div>
    </div>
  );
}
