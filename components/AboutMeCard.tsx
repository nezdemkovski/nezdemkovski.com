import Link from 'next/link';

const AboutMeCard = () => (
  <div className="relative inline-block h-[295px] w-[335px] rounded-3xl bg-black px-7 py-5 transition duration-300">
    <h2 className="pb-5 font-unbounded text-2xl font-bold text-white sm:text-3xl">
      About me
    </h2>
    <p className="pb-5 font-iawriterquattro text-sm text-white sm:text-base">
      Hello there, I&apos;m{' '}
      <span className="rounded-md bg-stone-800 px-2 py-1 font-bold">Yuri</span>{' '}
      — a seasoned web developer with over 10 years of experience. Now, as a
      developer manager, I&apos;m passionate about leading teams and delivering
      top-notch results.{' '}
      <Link href="/contact">
        <span className="p-1 font-bold underline hover:no-underline">
          Open to opportunities from mid-April 2023
        </span>
      </Link>
      .
    </p>
  </div>
);

export default AboutMeCard;
