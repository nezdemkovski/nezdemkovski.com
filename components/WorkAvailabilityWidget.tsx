import Link from 'next/link';

const WorkAvailabilityWidget = () => (
  <Link href="/contact">
    <div className="h-[300px] w-[335px] rounded-3xl bg-gradient-to-l from-[#5C5C5C] to-[#0F1015] transition duration-300 hover:-translate-y-1">
      <div className="flex h-[300px] w-[335px] cursor-pointer justify-center rounded-3xl bg-[url('/noise.svg')] bg-cover px-7 py-5">
        <p className="flex flex-col self-center pb-5 text-center font-iawriterquattro text-2xl font-bold text-white sm:text-3xl sm:leading-tight">
          <span className="uppercase">Open to</span>
          <span className="uppercase">opportunities</span>
          <span className="text-xl uppercase sm:text-2xl">
            from mid-April 2023
          </span>
          <span className="text-sm sm:text-base">(click to read more)</span>
        </p>
      </div>
    </div>
  </Link>
);

export default WorkAvailabilityWidget;
