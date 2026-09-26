export interface IWorkout {
  id: string | number;
  name: string;
  image: string;
  categories: string[];
  equipment: string;
  duration: number;
  calories: number;
  rating: number;
  difficulty: string;
  sets: number;
  reps: string;
  description: string;
  instructions: string[];
}
