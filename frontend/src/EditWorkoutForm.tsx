import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  HStack,
  Text
} from '@chakra-ui/react';
import type { Workout, WorkoutUpdateData } from './types';

interface Props {
  workout: Workout;
  onSave: (updatedData: WorkoutUpdateData) => void;
  onCancel: () => void;
}

export const EditWorkoutForm: React.FC<Props> = ({ workout, onSave, onCancel }) => {
  const [name, setName] = useState(workout.name);
  const [date, setDate] = useState(workout.date);
  const [duration, setDuration] = useState(workout.duration.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !date || !duration) {
      alert("Please fill all fields");
      return;
    }

    try {
      const updatedData: WorkoutUpdateData = {
        name,
        date,
        duration: parseFloat(duration),
      };
      onSave(updatedData);
    } catch (err) {
      alert("Invalid data");
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="none" bg="white" borderColor="gray.300">
      <form onSubmit={handleSubmit}>
        <VStack gap={4} align="stretch">
          <Box>
            <Text mb={1} fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase">Workout Name</Text>
            <Input value={name} onChange={(e) => setName(e.target.value)} borderRadius="none" />
          </Box>
          <HStack width="full" gap={4}>
            <Box flex={1}>
              <Text mb={1} fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase">Date</Text>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} borderRadius="none" />
            </Box>
            <Box flex={1}>
              <Text mb={1} fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase">Duration (min)</Text>
              <Input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} borderRadius="none" />
            </Box>
          </HStack>

          <HStack width="full" justify="flex-end" pt={2}>
            <Button size="sm" onClick={onCancel} variant="ghost" colorPalette="gray" borderRadius="none">CANCEL</Button>
            <Button type="submit" size="sm" variant="surface" colorPalette="black" borderRadius="none">SAVE</Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};