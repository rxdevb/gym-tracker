from models import Workout, GymTracker
from datetime import  datetime


if __name__ == '__main__':
    tracker = GymTracker()
    print("Welcome to your Gym Tracker")
    while True:
        option = input(f"Select an option: \n 1. Add workout \n 2. Show workouts \n 3. Exit \n")
        if option == "1":
            workout_name = input("Enter your workout name: ")
            workout_date = input("Enter your workout date (YYYY-MM-DD): ")
            workout_duration = input("Enter your workout duration (in minutes): ")
            try:
                datetime.strptime(workout_date, '%Y-%m-%d')
                duration_float = float(workout_duration)
                new_workout = Workout(workout_date, workout_name, duration_float)
                tracker.add_workout(new_workout)
                print(f"Workout '{workout_name}' has been successfully added.")
            except ValueError:
                print("Error: Please enter a valid date and make sure duartion is a valid number.")
        elif option == "2":
            tracker.show_workouts()
        elif option == "3":
            print("Exiting Gym Tracker. Goodbye!")
            break
        else:
            print("Invalid option. Please select 1, 2 or 3.")
