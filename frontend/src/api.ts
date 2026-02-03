import type { Workout, WorkoutUpdateData, NewWorkoutData, NewExerciseData } from './types';

const API_URL = 'http://127.0.0.1:5000/api/workouts';

export const fetchWorkouts = async (): Promise<Workout[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch data from server.');
    }
    return response.json();
};

export const createWorkout = async (data: NewWorkoutData): Promise<Workout> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add workout.');
    }
    return response.json();
};

export const deleteWorkout = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete workout.');
    }
};

export const updateWorkout = async (id: number, data: WorkoutUpdateData): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update workout.');
    }
};

export const addExercise = async (workoutId: number, data: NewExerciseData): Promise<void> => {
    const response = await fetch(`${API_URL}/${workoutId}/exercises`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add exercise.');
    }
};

export const deleteExercise = async (id: number): Promise<void> => {
    const response = await fetch(`http://127.0.0.1:5000/api/exercises/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Error deleting exercise');
    }
};

export const updateExercise = async (id: number, data: NewExerciseData): Promise<void> => {
    const response = await fetch(`http://127.0.0.1:5000/api/exercises/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Error updating exercise');
    }
};
