import AboutMeCard from '@/components/AboutMeCard';
import BusinessInfoCard from '@/components/BusinessInfoCard';
import CountriesWidget from '@/components/CountriesWidget';
import CurrentLocation from '@/components/CurrentLocation';
import SpotifyCard from '@/components/SpotifyCard';
import WorkAvailability from '@/components/WorkAvailability';

const RootPage = () => {
  return (
    <main className="px-7 py-5">
      <div className="mb-5 flex flex-wrap justify-center gap-5 sm:justify-normal">
        <AboutMeCard />
        <WorkAvailability />
        <BusinessInfoCard />
        <CurrentLocation />
        <SpotifyCard />
        <CountriesWidget />
      </div>
    </main>
  );
};

export default RootPage;
