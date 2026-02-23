import WidgetCard from '@/components/WidgetCard';

const AboutMeWidget = () => (
  <WidgetCard>
    <h2 className="font-unbounded pb-4 text-3xl font-bold text-white sm:text-3xl">
      About me
    </h2>
    <p className="font-iawriterquattro pb-5 text-base leading-relaxed text-white">
      Hello there, I&apos;m{' '}
      <span className="rounded-md bg-white/30 px-2 py-0.5 font-bold">Yuri</span>{' '}
      — a seasoned Web Developer with over 10 years of experience. I&apos;m
      passionate about delivering top-notch results and leading teams.
    </p>
  </WidgetCard>
);

export default AboutMeWidget;
