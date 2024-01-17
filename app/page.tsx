import AboutMeWidget from '@/components/AboutMeWidget';
import BusinessInfoWidget from '@/components/BusinessInfoWidget';
import CountriesWidget from '@/components/CountriesWidget';
import CurrentLocationWidget from '@/components/CurrentLocationWidget';
import GamesWidget from '@/components/GamesWidget';
import PortfolioWidget from '@/components/PortfolioWidget';

// import SpotifyWidget from '@/components/SpotifyWidget';
// import WorkAvailabilityWidget from '@/components/WorkAvailabilityWidget';

const RootPage = () => (
  <main>
    <div className="mx-auto flex flex-wrap gap-4 sm:w-[41rem] md:w-[41.25rem] md:gap-5 lg:w-[62.5rem] 2xl:w-auto">
      <AboutMeWidget />
      {/*<WorkAvailabilityWidget />*/}
      <BusinessInfoWidget />
      <CurrentLocationWidget />
      {/* <SpotifyWidget /> */}
      <GamesWidget />
      <CountriesWidget />
      <PortfolioWidget />
    </div>
  </main>
);

export default RootPage;
