import { useState, useEffect } from 'react';
import {
  Container,
  VStack,
  Heading,
  Text,
  Box,
  Separator,
  Spinner
} from '@chakra-ui/react';

import { AddWorkoutForm } from './AddWorkoutForm';
import { EditWorkoutForm } from './EditWorkoutForm';
import { WorkoutCard } from './components/WorkoutCard';
import { AddExerciseForm } from './AddExerciseForm';
import type { Workout, WorkoutUpdateData, NewExerciseData } from './types';
import { fetchWorkouts, deleteWorkout, updateWorkout, deleteExercise, updateExercise } from './api';

function App() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingWorkoutId, setEditingWorkoutId] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const loadWorkouts = async () => {
    try {
      setErrorMsg(null);
      const data = await fetchWorkouts();
      setWorkouts(data);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Fetch error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWorkouts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this workout?")) return;

    try {
      await deleteWorkout(id);
      loadWorkouts();
    } catch (err) {
      alert("Error deleting workout");
    }
  };

  const handleUpdate = async (id: number, data: WorkoutUpdateData) => {
    try {
      await updateWorkout(id, data);
      setEditingWorkoutId(null);
      loadWorkouts();
    } catch (err) {
      alert("Error updating workout");
    }
  };

  const handleUpdateExercise = async (id: number, data: NewExerciseData) => {
    try {
      await updateExercise(id, data);
      loadWorkouts();
    } catch (err) {
      alert("Error updating exercise");
    }
  };

  const handleDeleteExercise = async (id: number) => {
    if (!window.confirm("Delete this exercise?")) return;
    try {
      await deleteExercise(id);
      loadWorkouts();
    } catch (err) {
      alert("Error deleting exercise");
    }
  };

  return (
    <Container maxW="container.md" py={12}>
      <VStack gap={10} align="stretch">
        <Box textAlign="center">
          <Heading size="3xl" mb={3} letterSpacing="tight">
            GYM TRACKER
          </Heading>
          <Text color="gray.500" fontSize="lg">Workout Log</Text>
          {errorMsg && <Box mt={4} p={2} bg="red.100" color="red.800" borderRadius="none">{errorMsg}</Box>}
        </Box>

        <AddWorkoutForm onWorkoutAdded={loadWorkouts} />

        <Separator borderColor="gray.200" />

        <Box>
          <Heading size="lg" mb={6} textAlign="center" fontWeight="light">YOUR WORKOUTS</Heading>

          {isLoading ? (
            <VStack py={10} gap={4}>
              <Spinner size="xl" color="gray.500" />
              <Text color="gray.400">Loading...</Text>
            </VStack>
          ) : (
            <>
              {workouts.length === 0 ? (
                <Text textAlign="center" color="gray.500" fontStyle="italic">
                  No workouts yet. Start by adding one above.
                </Text>
              ) : (
                <VStack gap={6} align="stretch">
                  {workouts.map((workout) => (
                    <Box key={workout.id}>
                      {editingWorkoutId === workout.id ? (
                        <EditWorkoutForm
                          workout={workout}
                          onSave={(data) => handleUpdate(workout.id, data)}
                          onCancel={() => setEditingWorkoutId(null)}
                        />
                      ) : (
                        <>
                          <WorkoutCard
                            workout={workout}
                            onEdit={() => setEditingWorkoutId(workout.id)}
                            onDelete={handleDelete}
                            onUpdateExercise={handleUpdateExercise}
                            onDeleteExercise={handleDeleteExercise}
                          />
                          <Box mt={-1} mb={4} p={6} bg="gray.50" borderBottomWidth="1px" borderColor="gray.200" borderTopWidth="0">
                            <AddExerciseForm workoutId={workout.id} onExerciseAdded={loadWorkouts} />
                          </Box>
                        </>
                      )}
                    </Box>
                  ))}
                </VStack>
              )}
            </>
          )}
        </Box>
      </VStack >
    </Container >
  );
}

export default App;