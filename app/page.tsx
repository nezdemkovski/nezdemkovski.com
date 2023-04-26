import AboutMeCard from '@/components/AboutMeCard';
import BusinessInfoCard from '@/components/BusinessInfoCard';
import SpotifyCard from '@/components/SpotifyCard';

const RootPage = () => {
  return (
    <main className="px-7 py-5">
      <div className="mb-5 flex flex-wrap justify-center gap-5 sm:justify-normal">
        <AboutMeCard />
        <BusinessInfoCard />
        <SpotifyCard />
      </div>
    </main>
  );
};

export default RootPage;
