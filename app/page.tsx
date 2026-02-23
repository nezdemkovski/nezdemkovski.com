import AboutMeWidget from '@/components/AboutMeWidget';
import BusinessInfoWidget from '@/components/BusinessInfoWidget';
import CountriesWidget from '@/components/CountriesWidget';
import CurrentLocationWidget from '@/components/CurrentLocationWidget';
import GamesWidget from '@/components/GamesWidget';

const RootPage = () => {
  return (
    <main className="px-7 py-5">
      <div className="mb-5 flex flex-wrap justify-center gap-5 sm:justify-normal">
        <AboutMeWidget />
        <BusinessInfoWidget />
        <CurrentLocationWidget />
        <GamesWidget />
        <CountriesWidget />
      </div>
    </main>
  );
};

export default RootPage;
