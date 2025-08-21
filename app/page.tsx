import DownloadApp from "./components/download-app";
import PopularDestinations from "./components/popular-destinations";
import Usp from "./components/usp";

export default function Home() {
  return (
    <div className="relative md:rounded-t-[32px] mt-0 rounded-t-none md:-mt-8 bg-[#f5f7fa]">
      <div className="container flex flex-col">
        <Usp />
        <PopularDestinations />
        <DownloadApp />
      </div>
    </div>
  );
}
