import React, { useState } from 'react';
import {
    Box,
    Text,
    Badge,
    HStack,
    Button,
    Input
} from '@chakra-ui/react';
import type { Exercise, NewExerciseData } from '../types';

interface Props {
    exercise: Exercise;
    onUpdate: (id: number, data: NewExerciseData) => void;
    onDelete: (id: number) => void;
}

export const ExerciseRow: React.FC<Props> = ({ exercise, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(exercise.name);
    const [sets, setSets] = useState(exercise.sets.toString());
    const [reps, setReps] = useState(exercise.reps.toString());
    const [weight, setWeight] = useState(exercise.weight.toString());

    const handleSave = () => {
        onUpdate(exercise.id, {
            name,
            sets: parseInt(sets),
            reps: parseInt(reps),
            weight: parseFloat(weight)
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setName(exercise.name);
        setSets(exercise.sets.toString());
        setReps(exercise.reps.toString());
        setWeight(exercise.weight.toString());
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <Box p={3} borderBottomWidth="1px" borderColor="gray.100" bg="gray.50">
                <HStack gap={2} mb={2}>
                    <Input value={name} onChange={(e) => setName(e.target.value)} size="xs" placeholder="Name" bg="white" borderRadius="none" />
                    <Input value={sets} onChange={(e) => setSets(e.target.value)} size="xs" type="number" placeholder="Sets" width="50px" bg="white" borderRadius="none" />
                    <Input value={reps} onChange={(e) => setReps(e.target.value)} size="xs" type="number" placeholder="Reps" width="50px" bg="white" borderRadius="none" />
                    <Input value={weight} onChange={(e) => setWeight(e.target.value)} size="xs" type="number" placeholder="Kg" width="60px" bg="white" borderRadius="none" />
                </HStack>
                <HStack justify="flex-end">
                    <Button size="xs" onClick={handleCancel} variant="ghost" colorPalette="gray" borderRadius="none">CANCEL</Button>
                    <Button size="xs" onClick={handleSave} variant="surface" colorPalette="black" borderRadius="none">SAVE</Button>
                </HStack>
            </Box>
        );
    }

    return (
        <Box fontSize="sm" p={3} borderBottomWidth="1px" borderColor="gray.100" _last={{ borderBottomWidth: 0 }}>
            <HStack justify="space-between">
                <Text fontWeight="medium" color="gray.800">{exercise.name}</Text>
                <HStack>
                    <Badge colorPalette="gray" variant="surface" borderRadius="none">
                        {exercise.sets} x {exercise.reps}
                    </Badge>
                    <Badge colorPalette="gray" variant="outline" borderRadius="none">
                        {exercise.weight} kg
                    </Badge>
                </HStack>
            </HStack>
            <HStack justify="flex-end" mt={2} opacity={0.5} _hover={{ opacity: 1 }}>
                <Button size="xs" variant="plain" colorPalette="gray" onClick={() => setIsEditing(true)} height="auto" px={1} minW="auto">EDIT</Button>
                <Text color="gray.300">|</Text>
                <Button size="xs" variant="plain" colorPalette="red" onClick={() => onDelete(exercise.id)} height="auto" px={1} minW="auto">DEL</Button>
            </HStack>
        </Box>
    );
};
