"use client";

import { IWorkout } from "../types/workout.type";
import React, { createContext, ReactNode, useEffect, useState } from "react";

interface IFitlogContext {
  plan: IWorkout[];
  saved: IWorkout[];
  done: string[];
  addToPlan: (workout: IWorkout) => boolean;
  removeFromPlan: (id: string | number) => void;
  saveWorkout: (workout: IWorkout) => void;
  removeSaved: (id: string | number) => void;
  markDone: (id: string | number) => void;
}

export const FitlogContext = createContext<IFitlogContext>({
  plan: [], saved: [], done: [], addToPlan: () => false, removeFromPlan: () => {}, saveWorkout: () => {}, removeSaved: () => {}, markDone: () => {},
});

const FitlogProvider = ({ children }: { children: ReactNode }) => {
  const [plan, setPlan] = useState<IWorkout[]>([]);
  const [saved, setSaved] = useState<IWorkout[]>([]);
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    try {
      setPlan(JSON.parse(localStorage.getItem("fitlog-plan") || "[]"));
      setSaved(JSON.parse(localStorage.getItem("fitlog-saved") || "[]"));
      setDone(JSON.parse(localStorage.getItem("fitlog-done") || "[]"));
    } catch (error) { console.error(error); }
  }, []);
  useEffect(() => { localStorage.setItem("fitlog-plan", JSON.stringify(plan)); }, [plan]);
  useEffect(() => { localStorage.setItem("fitlog-saved", JSON.stringify(saved)); }, [saved]);
  useEffect(() => { localStorage.setItem("fitlog-done", JSON.stringify(done)); }, [done]);

  const addToPlan = (workout: IWorkout) => {
    if (plan.length >= 5 || plan.some((item) => String(item.id) === String(workout.id))) return false;
    setPlan((items) => [...items, workout]); return true;
  };
  const removeFromPlan = (id: string | number) => setPlan((items) => items.filter((item) => String(item.id) !== String(id)));
  const saveWorkout = (workout: IWorkout) => setSaved((items) => items.some((item) => String(item.id) === String(workout.id)) ? items : [...items, workout]);
  const removeSaved = (id: string | number) => setSaved((items) => items.filter((item) => String(item.id) !== String(id)));
  const markDone = (id: string | number) => setDone((items) => items.includes(String(id)) ? items : [...items, String(id)]);

  return <FitlogContext.Provider value={{ plan, saved, done, addToPlan, removeFromPlan, saveWorkout, removeSaved, markDone }}>{children}</FitlogContext.Provider>;
};
export default FitlogProvider;
