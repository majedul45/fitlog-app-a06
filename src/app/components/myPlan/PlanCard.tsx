

"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

import { FitlogContext } from "../../context/FitlogContext";
import { IWorkout } from "../../types/workout.type";
import { notify } from "../../lib/toast";

const PlanCard = ({
  workout,
  saved = false,
}: {
  workout: IWorkout;
  saved?: boolean;
}) => {
  const {
    removeFromPlan,
    markDone,
    done,
    removeSaved,
  } = useContext(FitlogContext);

  const id = String(workout.id);

  const isDone = done.includes(id);

  /* =========================
     REMOVE SAVED
  ========================== */

  const handleRemoveSaved = () => {
    removeSaved(workout.id);

    notify("Removed from saved", "error");
  };

  /* =========================
     MARK AS DONE
  ========================== */

  const handleMarkDone = () => {
    markDone(workout.id);

    notify("Workout marked as done");
  };

  /* =========================
     REMOVE FROM PLAN
  ========================== */

  const handleRemoveFromPlan = () => {
    removeFromPlan(workout.id);

    notify("Removed from today's plan", "error");
  };

  return (
    <div
      className={`rounded-xl border border-[#292e38] bg-[#14171d] p-4 transition ${
        isDone ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-center gap-4">

        {/* =========================
            IMAGE
        ========================== */}

        <div className="relative h-[84px] w-[132px] shrink-0 overflow-hidden rounded-lg bg-[#20242c] sm:h-[90px] sm:w-[135px]">

          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
            sizes="135px"
          />

        </div>

        {/* =========================
            WORKOUT INFO
        ========================== */}

        <div className="min-w-0 flex-1">

          <h3 className="font-display truncate text-xl sm:text-2xl">
            {workout.name.toUpperCase()}
          </h3>

          <p className="mt-0.5 truncate text-xs text-zinc-500">
            {workout.equipment}
          </p>

          {/* Stats */}
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-zinc-400">

            {/* Duration */}
            <span className="flex items-center gap-1">
              <span className="text-[#ccff00]">
                ◷
              </span>

              {workout.duration} min
            </span>

            {/* Calories */}
            <span className="flex items-center gap-1">
              <span className="text-[#ccff00]">
                ♨
              </span>

              {workout.calories} kcal
            </span>

            {/* Rating */}
            <span className="flex items-center gap-1">
              <span className="text-[#ccff00]">
                ☆
              </span>

              {workout.rating}
            </span>

          </div>

        </div>

        {/* =========================
            ACTIONS
        ========================== */}

        <div className="hidden shrink-0 items-center gap-3 sm:flex">

          {/* View Details */}
          <Link
            href={`/workout/${workout.id}`}
            className="rounded-full border border-[#37404d] px-5 py-2.5 text-xs font-medium text-zinc-200 transition hover:border-zinc-500 hover:text-white"
          >
            View Details
          </Link>

          {saved ? (
            /* Remove Saved */
            <button
              type="button"
              onClick={handleRemoveSaved}
              className="rounded-full border border-red-900 px-5 py-2.5 text-xs font-bold text-red-400 transition hover:border-red-500 hover:bg-red-950/30"
            >
              ×
            </button>
          ) : (
            <>
              {/* Mark Done */}
              <button
                type="button"
                onClick={handleMarkDone}
                className="rounded-full bg-[#ccff00] px-5 py-2.5 text-xs font-black text-black transition hover:brightness-95"
              >
                ✓&nbsp; Mark as Done
              </button>

              {/* Remove */}
              <button
                type="button"
                onClick={handleRemoveFromPlan}
               className="rounded-full border border-red-900 px-5 py-2.5 text-xs font-bold text-red-400 transition hover:border-red-500 hover:bg-red-950/30"
              >
                ×
              </button>
            </>
          )}

        </div>

        {/* =========================
            MOBILE ACTIONS
        ========================== */}

        <div className="flex shrink-0 flex-col gap-2 sm:hidden">

          <Link
            href={`/workout/${workout.id}`}
            className="rounded-lg border border-[#37404d] px-3 py-2 text-center text-[10px] font-bold"
          >
            DETAILS
          </Link>

          {saved ? (
            <button
              type="button"
              onClick={handleRemoveSaved}
              className="rounded-lg border border-red-900 px-3 py-2 text-[10px] font-bold text-red-400"
            >
              REMOVE
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={handleMarkDone}
                className="rounded-lg bg-[#ccff00] px-3 py-2 text-[10px] font-black text-black"
              >
                ✓ DONE
              </button>

              <button
                type="button"
                onClick={handleRemoveFromPlan}
                className="rounded-lg border border-red-900 px-3 py-2 text-[10px] font-bold text-red-400"
              >
                × REMOVE
              </button>
            </>
          )}

        </div>

      </div>
    </div>
  );
};

export default PlanCard;