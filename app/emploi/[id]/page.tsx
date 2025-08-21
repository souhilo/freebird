import DownloadApp from "@/app/components/download-app";
import OffreSingle from "@/app/components/offres-single";

export default function SingleEmploi({ params }: { params: { id: string } }) {
  return (
    <div className="relative md:rounded-t-[32px] mt-0 rounded-t-none md:-mt-8 bg-[#f5f7fa]">
      <OffreSingle id={params.id} />
      <div className="container">
        <DownloadApp />
      </div>
    </div>
  );
}
