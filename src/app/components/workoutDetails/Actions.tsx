
// "use client";

// import { useContext } from "react";
// import { FitlogContext } from "../../context/FitlogContext";
// import { IWorkout } from "../../types/workout.type";
// import { notify } from "../../lib/toast";

// const Actions = ({ workout }: { workout: IWorkout }) => {
//   const {
//     addToPlan,
//     saveWorkout,
//     plan,
//     saved,
//   } = useContext(FitlogContext);

//   const alreadyInPlan = plan.some(
//     (item) => String(item.id) === String(workout.id)
//   );

//   const alreadySaved = saved.some(
//     (item) => String(item.id) === String(workout.id)
//   );

//   const handleAddToPlan = () => {
//     if (addToPlan(workout)) {
//       notify("Added to today's plan");
//     } else {
//       notify(
//         plan.length >= 5
//           ? "Today's plan is full (5 lifts)"
//           : "Already in today's plan"
//       );
//     }
//   };

//   const handleSave = () => {
//     saveWorkout(workout);
//     notify("Saved for later");
//   };

//   return (
//     <div className="mt-7 flex flex-wrap gap-3">

//       {/* Add to Plan */}
//       <button
//         onClick={handleAddToPlan}
//         disabled={alreadyInPlan || plan.length >= 5}
//         className="flex items-center gap-2 rounded-lg bg-[#ccff00] px-5 py-3 text-sm font-black text-black transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
//       >
//         <span className="text-base">▣</span>

//         {alreadyInPlan
//           ? "Already in today's plan"
//           : "Add to today's plan"}
//       </button>

//       {/* Save */}
//       <button
//         onClick={handleSave}
//         className="flex items-center gap-2 rounded-lg border border-[#343b48] bg-transparent px-5 py-3 text-sm font-medium text-zinc-200 transition hover:border-zinc-500"
//       >
//         <span className="text-base">
//           {alreadySaved ? "🔖" : "♡"}
//         </span>

//         {alreadySaved ? "Saved" : "Save for later"}
//       </button>

//     </div>
//   );
// };

// export default Actions;




"use client";

import { useContext } from "react";
import { FitlogContext } from "../../context/FitlogContext";
import { IWorkout } from "../../types/workout.type";
import { notify } from "../../lib/toast";

const Actions = ({ workout }: { workout: IWorkout }) => {
  const {
    addToPlan,
    saveWorkout,
    plan,
    saved,
  } = useContext(FitlogContext);

  const alreadyInPlan = plan.some(
    (item) => String(item.id) === String(workout.id)
  );

  const alreadySaved = saved.some(
    (item) => String(item.id) === String(workout.id)
  );

  const handleAddToPlan = () => {
    if (addToPlan(workout)) {
      notify("Added to today's plan");
    } else {
      notify(
        plan.length >= 5
          ? "Today's plan is full (5 lifts)"
          : "Already in today's plan"
      );
    }
  };

  const handleSave = () => {
    // Already saved হলে আর কিছু করবে না
    if (alreadySaved) {
      return;
    }

    saveWorkout(workout);
    notify("Saved for later");
  };

  return (
    <div className="mt-7 flex flex-wrap gap-3">

      {/* Add to Plan */}
      <button
        type="button"
        onClick={handleAddToPlan}
        disabled={alreadyInPlan || plan.length >= 5}
        className="flex items-center gap-2 rounded-lg bg-[#ccff00] px-5 py-3 text-sm font-black text-black transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span className="text-base">▣</span>

        {alreadyInPlan
          ? "Already in today's plan"
          : "Add to today's plan"}
      </button>

      {/* Save */}
      <button
  type="button"
  onClick={handleSave}
  disabled={alreadySaved}
  className={`flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium transition ${
    alreadySaved
      ? "cursor-not-allowed border-[#343b48] bg-[#17191e] text-zinc-500"
      : "cursor-pointer border-[#343b48] bg-transparent text-zinc-200 hover:border-zinc-500"
  }`}
>
  <span className="text-base">
    {alreadySaved ? "🔖" : "♡"}
  </span>

  {alreadySaved ? "Saved" : "Save for later"}
</button>

    </div>
  );
};

export default Actions;