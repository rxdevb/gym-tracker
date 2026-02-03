import React, { useState } from 'react';
import {
  HStack,
  Input,
  Button,
  Box
} from '@chakra-ui/react';
import { addExercise } from './api';

interface Props {
  workoutId: number;
  onExerciseAdded: () => void;
}

export const AddExerciseForm: React.FC<Props> = ({ workoutId, onExerciseAdded }) => {
  const [name, setName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !sets || !reps || !weight) return;

    setIsLoading(true);
    try {
      await addExercise(workoutId, {
        name,
        sets: parseInt(sets),
        reps: parseInt(reps),
        weight: parseFloat(weight)
      });

      setName('');
      setSets('');
      setReps('');
      setWeight('');
      onExerciseAdded();

    } catch (error) {
      alert("Error adding exercise");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack mt={4} gap={3}>
        <Box flex={3}>
          <Input
            placeholder="Exercise Name"
            size="sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            borderRadius="none"
            bg="white"
          />
        </Box>
        <Box flex={1}>
          <Input
            placeholder="Sets"
            type="number"
            size="sm"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            borderRadius="none"
            bg="white"
          />
        </Box>
        <Box flex={1}>
          <Input
            placeholder="Reps"
            type="number"
            size="sm"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            borderRadius="none"
            bg="white"
          />
        </Box>
        <Box flex={1}>
          <Input
            placeholder="kg"
            type="number"
            size="sm"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            borderRadius="none"
            bg="white"
          />
        </Box>

        <Button type="submit" size="sm" variant="surface" colorPalette="gray" loading={isLoading} borderRadius="none">
          ADD
        </Button>
      </HStack>
    </form>
  );
};