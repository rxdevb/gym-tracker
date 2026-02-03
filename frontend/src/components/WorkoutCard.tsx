import React from 'react';
import {
    Box,
    Text,
    Button,
    HStack,
    VStack,
    Heading,
    Separator,
} from '@chakra-ui/react';
import type { Workout, NewExerciseData } from '../types';
import { ExerciseRow } from './ExerciseRow';

interface Props {
    workout: Workout;
    onEdit: (workout: Workout) => void;
    onDelete: (id: number) => void;
    onUpdateExercise: (exerciseId: number, data: NewExerciseData) => void;
    onDeleteExercise: (exerciseId: number) => void;
}

export const WorkoutCard: React.FC<Props> = ({
    workout,
    onEdit,
    onDelete,
    onUpdateExercise,
    onDeleteExercise
}) => {
    return (
        <Box
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="none"
            mb={4}
            width="100%"
            bg="white"
            boxShadow="sm"
            p={6}
        >
            <HStack justify="space-between" align="start" mb={4}>
                <Box>
                    <Heading size="md" color="black" textTransform="uppercase" letterSpacing="wide">{workout.name}</Heading>
                    <Text fontSize="sm" color="gray.500" mt={1}>{workout.date} • {workout.duration} min</Text>
                </Box>
                <HStack>
                    <Button size="xs" colorPalette="gray" variant="outline" onClick={() => onEdit(workout)} borderRadius="none">
                        EDIT
                    </Button>
                    <Button size="xs" colorPalette="red" variant="ghost" onClick={() => onDelete(workout.id)} borderRadius="none">
                        DELETE
                    </Button>
                </HStack>
            </HStack>

            <Separator mb={4} borderColor="gray.100" />

            <HStack justify="space-between" mb={4}>
                <Heading size="xs" textTransform="uppercase" color="gray.400" letterSpacing="wider">
                    EXERCISES
                </Heading>
            </HStack>

            {workout.exercises.length > 0 ? (
                <VStack gap={0} align="stretch" borderWidth="1px" borderColor="gray.100">
                    {workout.exercises.map((ex) => (
                        <ExerciseRow
                            key={ex.id}
                            exercise={ex}
                            onUpdate={onUpdateExercise}
                            onDelete={onDeleteExercise}
                        />
                    ))}
                </VStack>
            ) : (
                <Box p={4} bg="gray.50" textAlign="center">
                    <Text fontSize="sm" fontStyle="italic" color="gray.400">No exercises added.</Text>
                </Box>
            )}
        </Box>
    );
};
