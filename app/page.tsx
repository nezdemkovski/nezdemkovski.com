import AboutMeCard from '@/components/AboutMeCard';
import BusinessInfoCard from '@/components/BusinessInfoCard';
import CurrentLocation from '@/components/CurrentLocation';
import WorkAvailability from '@/components/WorkAvailability';

// import SpotifyCard from '@/components/SpotifyCard';

const RootPage = () => {
  return (
    <main className="px-7 py-5">
      <div className="mb-5 flex flex-wrap justify-center gap-5 sm:justify-normal">
        <AboutMeCard />
        <WorkAvailability />
        <BusinessInfoCard />
        <CurrentLocation />
        {/*<SpotifyCard />*/}
      </div>
    </main>
  );
};

export default RootPage;
