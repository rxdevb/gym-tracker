export interface Exercise {
    id: number;
    name: string;
    sets: number;
    reps: number;
    weight: number;
}

export interface Workout {
    id: number;
    name: string;
    date: string;
    duration: number;
    exercises: Exercise[];
}

export type WorkoutUpdateData = Omit<Workout, 'id' | 'exercises'>;

export type NewWorkoutData = {
    name: string;
    date: string;
    duration: number;
};

export type NewExerciseData = Omit<Exercise, 'id'>;
