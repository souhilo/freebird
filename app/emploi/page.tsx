import Offres from "../components/offres";
import DownloadApp from "../components/download-app";

export default function Emploi() {
  return (
    <div className="relative md:rounded-t-[32px] mt-0 rounded-t-none md:-mt-8 bg-[#f5f7fa]">
      <Offres />
      <div className="container">
        <DownloadApp />
      </div>
    </div>
  );
}
