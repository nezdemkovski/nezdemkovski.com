import WidgetCard from "@/components/WidgetCard";

const BusinessInfoWidget = () => (
  <WidgetCard>
    <h2 className="flex flex-col pb-4 font-unbounded text-2xl font-bold text-white sm:text-3xl">
      <span>Business</span>
      <span>details</span>
    </h2>
    <p className="pb-5 font-iawriterquattro text-base leading-relaxed text-white">
      I am a Prague-based (Czechia) solopreneur registered with the company registration number
      (IČO) <span className="rounded-md bg-white/30 px-2 py-0.5">07605901</span>.
    </p>
  </WidgetCard>
);

export default BusinessInfoWidget;
