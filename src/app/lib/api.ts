import { IWorkout } from "../types/workout.type";
import { FALLBACK_WORKOUTS } from "./fallback-workouts";

export const API_URL = "https://api.abcz.workers.dev/api/fitlog";

const value = (obj: Record<string, unknown>, keys: string[], fallback: unknown = ""): unknown => {
  for (const key of keys) if (obj[key] !== undefined && obj[key] !== null) return obj[key];
  return fallback;
};

export const normalizeWorkout = (raw: Record<string, unknown>, index = 0): IWorkout => {
  const categoriesRaw = value(raw, ["categories", "category", "tags", "muscleGroups"], ["FITNESS"]);
  const categories = Array.isArray(categoriesRaw) ? categoriesRaw.map(String) : String(categoriesRaw).split(",").map((x) => x.trim()).filter(Boolean);
  const instructionsRaw = value(raw, ["instructions", "steps", "howTo"], []);
  const instructions = Array.isArray(instructionsRaw) ? instructionsRaw.map(String) : [String(instructionsRaw || "Warm up and use controlled form.")];
  return {
    id: value(raw, ["id", "_id", "workoutId", "exerciseId"], index + 1) as string | number,
    name: String(value(raw, ["name", "workoutName", "exerciseName", "title"], "UNTITLED WORKOUT")),
    image: String(value(raw, ["image", "imageUrl", "thumbnail", "illustration"], "/banner.png")),
    categories,
    equipment: String(value(raw, ["equipment", "equipments"], "Gym Equipment")),
    duration: Number(value(raw, ["duration", "durationMinutes", "minutes"], 25)),
    calories: Number(value(raw, ["calories", "caloriesBurned", "kcal"], 180)),
    rating: Number(value(raw, ["rating", "score"], 4.8)),
    difficulty: String(value(raw, ["difficulty", "level"], "Intermediate")),
    sets: Number(value(raw, ["sets"], 4)),
    reps: String(value(raw, ["reps", "repetitions"], "6-8")),
    description: String(value(raw, ["description", "review", "details"], "A focused movement designed to build strength and improve training consistency.")),
    instructions: instructions.length ? instructions : ["Set up your position.", "Brace your core and control the movement.", "Complete each repetition with clean form.", "Rack the weight safely when finished."],
  };
};

export const getWorkouts = async (): Promise<IWorkout[]> => {
  try {
    const response = await fetch(API_URL, { next: { revalidate: 300 } });
    if (!response.ok) throw new Error("Failed to fetch workouts");
    const data = await response.json();
    const list = Array.isArray(data) ? data : data?.data || data?.workouts || data?.exercises || [];
    return list.map((item: Record<string, unknown>, index: number) => normalizeWorkout(item, index));
  } catch (error) {
    console.error("Error fetching fitlog data:", error);
    console.error("Using local fallback workout data.");
    return FALLBACK_WORKOUTS;
  }
};

export const getWorkout = async (id: string): Promise<IWorkout | null> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { next: { revalidate: 300 } });
    if (!response.ok) throw new Error("Failed to fetch workout");
    const data = await response.json();
    return normalizeWorkout((data?.data || data?.workout || data) as Record<string, unknown>);
  } catch (error) {
    console.error("Error fetching workout:", error);
    const all = await getWorkouts();
    return all.find((item) => String(item.id) === String(id)) || FALLBACK_WORKOUTS.find((item) => String(item.id) === String(id)) || null;
  }
};
