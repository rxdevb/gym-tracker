import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  Text
} from '@chakra-ui/react';
import { createWorkout } from './api';

interface Props {
  onWorkoutAdded: () => void;
}

export const AddWorkoutForm: React.FC<Props> = ({ onWorkoutAdded }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string, type: 'error' | 'success' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!name || !date || !duration) {
      setMessage({ text: "Please fill in all fields", type: 'error' });
      return;
    }

    setIsLoading(true);
    try {
      await createWorkout({
        name,
        date,
        duration: parseFloat(duration)
      });

      setMessage({ text: "Workout added", type: 'success' });
      setName('');
      setDate('');
      setDuration('');
      onWorkoutAdded();

    } catch (error) {
      setMessage({ text: error instanceof Error ? error.message : "Error", type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p={8} borderWidth="1px" borderColor="gray.200" borderRadius="none" bg="white" boxShadow="sm">
      <Heading size="md" mb={6} textTransform="uppercase" letterSpacing="wide">Add New Workout</Heading>
      {message && (
        <Box mb={6} p={2} bg={message.type === 'error' ? 'red.50' : 'gray.100'}>
          <Text color={message.type === 'error' ? 'red.800' : 'gray.800'} fontSize="sm">{message.text}</Text>
        </Box>
      )}
      <form onSubmit={handleSubmit}>
        <VStack gap={5} align="stretch">
          <Box>
            <Text mb={2} fontSize="xs" fontWeight="bold" textTransform="uppercase" color="gray.500">Workout Name</Text>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Upper Body" variant="outline" borderRadius="none" />
          </Box>
          <Box>
            <Text mb={2} fontSize="xs" fontWeight="bold" textTransform="uppercase" color="gray.500">Date</Text>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} borderRadius="none" />
          </Box>
          <Box>
            <Text mb={2} fontSize="xs" fontWeight="bold" textTransform="uppercase" color="gray.500">Duration (min)</Text>
            <Input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} borderRadius="none" />
          </Box>

          <Button
            type="submit"
            colorPalette="gray"
            variant="surface"
            width="full"
            loading={isLoading}
            loadingText="Adding..."
            borderRadius="none"
            fontWeight="normal"
          >
            ADD WORKOUT
          </Button>
        </VStack>
      </form>
    </Box>
  );
};