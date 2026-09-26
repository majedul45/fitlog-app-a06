
import Image from "next/image";
import Link from "next/link";
import Actions from "../../components/workoutDetails/Actions";
import { getWorkout } from "../../lib/api";

interface IProps {
  params: Promise<{ id: string }>;
}

const WorkoutDetailsPage = async ({ params }: IProps) => {
  const { id } = await params;

  const workout = await getWorkout(id);

  if (!workout) {
    return (
      <main className="container-fit py-10">
        <Link
          href="/"
          className="mb-7 inline-block text-xs font-black text-zinc-500 hover:text-white"
        >
          ← BACK TO LIBRARY
        </Link>

        <div className="rounded-xl border border-[#292929] bg-[#121212] p-10 text-center">
          <h1 className="font-display text-3xl">
            WORKOUT NOT FOUND
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="container-fit py-8 sm:py-10">

      {/* Back */}
      <Link
        href="/"
        className="mb-6 inline-block text-xs font-black text-zinc-500 transition hover:text-white"
      >
        ← BACK TO LIBRARY
      </Link>

      {/* Main Details Layout */}
      <div className="grid overflow-hidden rounded-2xl border border-[#292929] bg-[#0f1014] lg:grid-cols-2">

        {/* =========================
            LEFT SIDE - IMAGE
        ========================== */}
        <div className="relative min-h-[420px] bg-[#17191f] lg:min-h-[700px]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* =========================
            RIGHT SIDE - CONTENT
        ========================== */}
        <div className="flex flex-col p-6 sm:p-8 lg:p-9">

          {/* Title */}
          <h1 className="font-display text-4xl leading-[0.95] sm:text-5xl">
            {workout.name.toUpperCase()}
          </h1>

          {/* Description */}
          <p className="mt-3 max-w-2xl text-sm leading-5 text-zinc-400">
            {workout.description}
          </p>

          {/* Categories */}
          <div className="mt-4 flex flex-wrap gap-2">
            {workout.categories.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#cfff00] px-4 py-1 text-[10px] font-black text-black"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* =========================
              INFORMATION TABLE
          ========================== */}
          <div className="mt-6 overflow-hidden rounded-xl border border-[#292d36] bg-[#151820]">

            {/* Equipment */}
            <div className="flex min-h-[38px] items-center justify-between border-b border-[#242832] px-4">
              <span className="text-[9px] font-black tracking-wider text-zinc-500">
                EQUIPMENT
              </span>

              <span className="text-[11px] text-zinc-200">
                {workout.equipment}
              </span>
            </div>

            {/* Difficulty */}
            <div className="flex min-h-[38px] items-center justify-between border-b border-[#242832] px-4">
              <span className="text-[9px] font-black tracking-wider text-zinc-500">
                DIFFICULTY
              </span>

              <span className="text-[11px] text-zinc-200">
                {workout.difficulty}
              </span>
            </div>

            {/* Sets */}
            <div className="flex min-h-[38px] items-center justify-between border-b border-[#242832] px-4">
              <span className="text-[9px] font-black tracking-wider text-zinc-500">
                SETS
              </span>

              <span className="text-[11px] text-zinc-200">
                {workout.sets}
              </span>
            </div>

            {/* Reps */}
            <div className="flex min-h-[38px] items-center justify-between border-b border-[#242832] px-4">
              <span className="text-[9px] font-black tracking-wider text-zinc-500">
                REPS
              </span>

              <span className="text-[11px] text-zinc-200">
                {workout.reps}
              </span>
            </div>

            {/* Duration */}
            <div className="flex min-h-[38px] items-center justify-between border-b border-[#242832] px-4">
              <span className="text-[9px] font-black tracking-wider text-zinc-500">
                DURATION
              </span>

              <span className="text-[11px] text-zinc-200">
                {workout.duration} min
              </span>
            </div>

            {/* Calories */}
            <div className="flex min-h-[38px] items-center justify-between border-b border-[#242832] px-4">
              <span className="text-[9px] font-black tracking-wider text-zinc-500">
                CALORIES
              </span>

              <span className="text-[11px] text-zinc-200">
                {workout.calories} kcal
              </span>
            </div>

            {/* Rating */}
            <div className="flex min-h-[38px] items-center justify-between px-4">
              <span className="text-[9px] font-black tracking-wider text-zinc-500">
                RATING
              </span>

              <span className="text-[11px] text-zinc-200">
                {workout.rating}
              </span>
            </div>

          </div>

          {/* =========================
              INSTRUCTIONS
          ========================== */}
          <section className="mt-6">

            <h2 className="font-display text-xl">
              INSTRUCTIONS
            </h2>

            <ol className="mt-3 space-y-2">
              {workout.instructions.slice(0, 4).map((step, index) => (
                <li
                  key={index}
                  className="flex gap-3 text-[11px] leading-5 text-zinc-400"
                >
                  <span className="w-3 shrink-0 text-zinc-500">
                    {index + 1}.
                  </span>

                  <span>{step}</span>
                </li>
              ))}
            </ol>

          </section>

          {/* =========================
              ACTION BUTTONS
          ========================== */}
          <Actions workout={workout} />

        </div>
      </div>
    </main>
  );
};

export default WorkoutDetailsPage;