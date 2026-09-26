import Banner from "./components/homepage/Banner";
import Workouts from "./components/homepage/Workouts";
import { getWorkouts } from "./lib/api";
import React from "react";
const Page = async () => {
  const workouts = await getWorkouts();
  return (
    <main>
      <Banner />
      {workouts.length ? (
        <Workouts workouts={workouts} />
      ) : (
        <section id="library" className="container-fit py-24 text-center">
          <div className="spinner mx-auto" />
          <p className="mt-5 text-zinc-500">Loading workouts…</p>
        </section>
      )}
    </main>
  );
};
export default Page;
