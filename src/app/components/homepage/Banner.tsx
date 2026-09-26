import Image from "next/image";
const Banner = () => (
  <section className="grid-bg border-b border-[#242424]">
    <div className="container-fit grid min-h-[620px] items-center gap-10 py-16 lg:grid-cols-[1.05fr_.95fr]">
      <div>
        <p className="mb-5 text-sm font-black tracking-[.28em] lime">
          WORKOUT LIBRARY
        </p>
        <h1 className="font-display max-w-3xl text-6xl leading-[.92] uppercase sm:text-7xl lg:text-8xl">
          TRAIN WITH INTENT.
          <br />
          <span className="lime">LOG EVERY SET.</span>
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-400">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into
          today&apos;s plan, and watch the week&apos;s work add up.
        </p>
        <a
          href="#library"
          className="btn-lime mt-9 inline-flex items-center gap-3 rounded-md px-7 py-4 text-sm"
        >
          BROWSE WORKOUTS <span>↓</span>
        </a>
      </div>
      <div className="relative flex min-h-[400px] items-end justify-center overflow-hidden rounded-2xl border border-[#292929] bg-[#111]">
        <Image
          src="/banner.png"
          alt="Workout"
          width={700}
          height={700}
          className="h-[500px] w-full object-contain object-bottom"
          priority
        />
      </div>
    </div>
  </section>
);
export default Banner;
