import Image from "next/image";

export default function TopWrapper() {
  return (
    <div className="relative pb-0 lg:pb-16 -mt-[100px] hidden lg:block">
      <div className="h-[300px] hidden lg:block" />
      <div className="relative lg:absolute top-0 left-0 w-full h-full z-0">
        <Image
          alt="Hero"
          src="/static/hero-bg.jpg"
          className="xl:-top-52 relative w-full min-[1900px]:top-[-20rem] min-[2300px]:top-[-30rem] min-[2950px]:top-[-40rem]"
          width={1792}
          height={669}
          fetchPriority="high"
        />
        <div className="bg-black/60 backdrop-blur-[2px] size-full absolute inset-0" />
        {/* Airplane overlay top-right */}
        {/* <div className="pointer-events-none absolute right-6 top-6 z-10 opacity-90">
          <svg width="160" height="64" viewBox="0 0 320 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden xl:block">
            <path d="M10 64c60-10 120-35 180-58 12-4 28 2 36 12 8 10 6 22-6 28-20 10-58 26-92 36-36 11-86 16-124 14-8 0-12-12-4-32z" fill="#FFD166" />
            <path d="M50 72c80-10 150-40 230-56" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
            <text x="20" y="40" fill="#0B2545" fontSize="28" fontWeight="700">Freebird</text>
          </svg>
        </div> */}
      </div>
      <div className="z-[2] lg:relative lg:top-0 container -mt-32 pb-10 lg:px-14 top-[80px] md:top-[100px] absolute">
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
