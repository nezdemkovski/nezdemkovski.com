import AboutMeWidget from '@/components/AboutMeWidget';
import BusinessInfoWidget from '@/components/BusinessInfoWidget';
import CountriesWidget from '@/components/CountriesWidget';
import CurrentLocationWidget from '@/components/CurrentLocationWidget';
import GamesWidget from '@/components/GamesWidget';

import SpotifyWidget from '@/components/SpotifyWidget';
// import WorkAvailabilityWidget from '@/components/WorkAvailabilityWidget';

const RootPage = () => {
  return (
    <main>
      <div className="flex flex-wrap gap-5">
        <AboutMeWidget />
        {/*<WorkAvailabilityWidget />*/}
        <BusinessInfoWidget />
        <CurrentLocationWidget />
        <SpotifyWidget />
        <GamesWidget />
        <CountriesWidget />
      </div>
    </main>
  );
};

export default RootPage;
