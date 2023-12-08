import Card from './ui/Card';

const AboutMeWidget = () => (
  <Card size="md">
    <h2 className="pb-4 font-unbounded text-3xl font-bold text-white sm:text-3xl">
      About me
    </h2>
    <p className="pb-5 font-iawriterquattro text-base leading-relaxed text-white">
      Hello there, I&apos;m{' '}
      <span className="rounded-md bg-white bg-opacity-30 px-2 py-0.5 font-bold">
        Yuri
      </span>{' '}
      — a seasoned web developer with over 10 years of experience. Now, as a
      developer manager, I&apos;m passionate about leading teams and delivering
      top-notch results.
    </p>
  </Card>
);

export default AboutMeWidget;
