from datetime import datetime


class Workout:
    """Class for a single workout"""

    def __init__(self, date, name, duration):
        self.date: datetime = date
        self.name: str = name
        self.duration: float = duration

    def __str__(self):
        return f"Training: {self.name} | Date: {self.date} | Duration: {self.duration} min"


class GymTracker:
    def __init__(self):
        self.training_base: list = []

    def add_workout(self, workout):
        self.training_base.append(workout)

    def show_workouts(self):
        print("\n Your workouts")
        if not self.training_base:
            print("No workouts added yet. Please add a workout.")
            return
        for idx, workout in enumerate(self.training_base, 1):
            print(f"\n {idx}. {workout}")