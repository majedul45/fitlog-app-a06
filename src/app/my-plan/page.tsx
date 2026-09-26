

"use client";

import PlanCard from "../components/myPlan/PlanCard";
import { FitlogContext } from "../context/FitlogContext";
import Link from "next/link";
import { useContext, useMemo, useState } from "react";




type SortOption = "duration" | "calories" | "rating" | "name";

const Page = () => {
  const { plan, saved } = useContext(FitlogContext);

  const [tab, setTab] = useState<"plan" | "saved">("plan");

  const [sortBy, setSortBy] =
    useState<SortOption>("duration");

  const list = tab === "plan" ? plan : saved;

  const minutes = plan.reduce(
    (a, b) => a + b.duration,
    0
  );

  const calories = plan.reduce(
    (a, b) => a + b.calories,
    0
  );

  /* =========================
     SORT CARDS
  ========================== */

  const sortedList = useMemo(() => {
    const sorted = [...list];

    switch (sortBy) {
      case "duration":
        // Short duration first
        return sorted.sort(
          (a, b) => a.duration - b.duration
        );

      case "calories":
        // Higher calories first
        return sorted.sort(
          (a, b) => b.calories - a.calories
        );

      case "rating":
        // Higher rating first
        return sorted.sort(
          (a, b) => b.rating - a.rating
        );

      case "name":
        // A → Z
        return sorted.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

      default:
        return sorted;
    }
  }, [list, sortBy]);

  return (
    <main className="container-fit py-14">

      {/* =========================
          PAGE HEADER
      ========================== */}

      <div className="border-b border-[#292929] pb-10">

        <p className="lime text-xs font-black tracking-[.3em]">
          THE LOG
        </p>

        <h1 className="font-display mt-3 text-6xl sm:text-7xl">
          MY PLAN
        </h1>

        <p className="mt-3 text-zinc-500">
          Cap of five lifts for today. Finish them, then load more.
        </p>

      </div>

      {/* =========================
          STATS
      ========================== */}

      <div className="grid gap-3 py-8 sm:grid-cols-3">

        {/* Exercises */}
        <div className="card-dark rounded-xl p-5">
          <p className="text-xs text-zinc-500">
            EXERCISES
          </p>

          <p className="font-display text-[#ccff00] mt-2 text-4xl">
            {plan.length}
          </p>
        </div>

        {/* Minutes */}
        <div className="card-dark rounded-xl p-5">
          <p className="text-xs text-zinc-500">
            MINUTES
          </p>

          <p className="font-display mt-2 text-4xl">
            {minutes}
          </p>
        </div>

        {/* Calories */}
        <div className="card-dark rounded-xl p-5">
          <p className="text-xs text-zinc-500">
            CALORIES
          </p>

          <p className="font-display mt-2 text-4xl">
            {calories}
          </p>
        </div>

      </div>

      {/* =========================
          TABS + SORT
      ========================== */}

      <div className="mb-6 flex items-end justify-between border-b border-[#292929]">

        {/* Tabs */}
        <div className="flex gap-2">

          {/* Today's Plan */}
          <button
            type="button"
            onClick={() => setTab("plan")}
            className={`px-5 py-3 text-xs font-black ${
              tab === "plan"
                ? "border-b-2 border-[#ccff00] lime"
                : "text-zinc-500"
            }`}
          >
            TODAY&apos;S PLAN ({plan.length})
          </button>

          {/* Saved */}
          <button
            type="button"
            onClick={() => setTab("saved")}
            className={`px-5 py-3 text-xs font-black ${
              tab === "saved"
                ? "border-b-2 border-[#ccff00] lime"
                : "text-zinc-500"
            }`}
          >
            SAVED ({saved.length})
          </button>

        </div>

        {/* =========================
            SORT BY
        ========================== */}

        <div className="mb-2 flex items-center gap-2">

          <span className="text-xs text-zinc-500">
            Sort By
          </span>

          <select
            value={sortBy}
            onChange={(event) =>
              setSortBy(
                event.target.value as SortOption
              )
            }
            className="cursor-pointer rounded-md border border-[#292929] bg-[#111] px-3 py-2 text-xs text-zinc-300 outline-none transition focus:border-[#ccff00]"
          >
            <option value="duration">
              Duration
            </option>

            <option value="calories">
              Calories
            </option>

            <option value="rating">
              Rating
            </option>

            <option value="name">
              Name
            </option>
          </select>

        </div>

      </div>

      {/* =========================
          WORKOUT CARDS
      ========================== */}

      {sortedList.length ? (
        <div className="space-y-4">

          {sortedList.map((x) => (
            <PlanCard
              key={String(x.id)}
              workout={x}
              saved={tab === "saved"}
            />
          ))}

        </div>
      ) : (
        /* =========================
            EMPTY STATE
        ========================== */

        <div className="rounded-xl border border-dashed border-[#333] py-20 text-center">

          <h2 className="font-display text-4xl">
            NOTHING HERE YET
          </h2>

          <p className="mx-auto mt-3 max-w-md text-zinc-500">
            Browse the library and add a lift to get today moving.
          </p>

          <Link
            href="/"
            className="btn-lime mt-7 inline-block rounded-md px-6 py-3 text-xs font-black"
          >
            GO TO WORKOUTS
          </Link>

        </div>
      )}

    </main>
  );
};

export default Page;

