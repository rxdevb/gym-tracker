from models import Workout, GymTracker
from datetime import datetime

if __name__ == "__main__":
    tracker = GymTracker()
    print("Welcome to your Gym Tracker")
    while True:
        option = input(
            f"Select an option: \n 1. Add workout \n 2. Show workouts \n 3. Delete workout \n 4. Edit "
            f"workout \n 5. Exit \n"
        )
        if option == "1":
            workout_name = input("Enter your workout name: ")
            workout_date = input("Enter your workout date (YYYY-MM-DD): ")
            workout_duration = input("Enter your workout duration (in minutes): ")

            try:
                datetime.strptime(workout_date, "%Y-%m-%d")
                duration_float = float(workout_duration)

                workout_data = (workout_date, workout_name, duration_float)

                workout_id, workout_name_added = tracker.add_workout(workout_data)

                print(
                    f"Workout '{workout_name_added}' has been successfully added. Now please add exercises to your workout."
                )

                while True:
                    exercise_name = input("  Exercise name: ")
                    if not exercise_name:
                        print("Adding exercise cancelled.")
                        break
                    try:
                        ex_sets = int(input("  Number of sets: "))
                        ex_reps = int(input("  Number of reps: "))
                        ex_weight = float(input("  Total weight (kg): "))

                        tracker.add_exercise(
                            workout_id=workout_id,
                            name=exercise_name,
                            sets=ex_sets,
                            reps=ex_reps,
                            weight=ex_weight,
                        )
                        print(f"  Exercise '{exercise_name}' added.")

                    except ValueError:
                        print(
                            "Error: Sets and reps must be an Integer. Weight must be a float."
                        )
                        continue

                    if (
                        input("Do you want to add another exercise? (y/n): ").lower()
                        != "y"
                    ):
                        break

            except ValueError:
                print(
                    "Error: Make sure date has YYYY-MM-DD format and duration is a float."
                )
            except Exception as e:
                print(f"Error while adding workout: {e}")

        elif option == "2":
            tracker.show_workouts()
        elif option == "3":
            tracker.show_workouts()

            try:
                workout_id_str = input("Choose a workout to delete: ")
                if not workout_id_str:
                    print("Deleting cancelled.")
                    continue
                workout_id = int(workout_id_str)
                is_deleted = tracker.delete_workout(workout_id)
                if is_deleted:
                    print(f"Workout {workout_id} successfully deleted")
                else:
                    print(f"Error: Workout {workout_id} has not been found.")

            except ValueError:
                print("Error: Please choose a valid workout ID.")

        elif option == "4":
            num_workouts = tracker.show_workouts()

            if num_workouts == 0:
                continue

            try:
                workout_id_str = input("Choose a workout ID to edit: ")
                workout_id = int(workout_id_str)
                old_workout_obj = tracker.get_workout_by_id(workout_id)
                if not old_workout_obj:
                    print(f"Error: Workout {workout_id} does not exists.")
                    continue
                print("\n Editing workout")

                new_name = input(
                    f"New name (recent: {old_workout_obj.name}). Leave blank not to change: "
                )
                new_name = new_name if new_name else old_workout_obj.name

                new_date = input(
                    f"New date (recent: {old_workout_obj.workout_date}). Leave blank not to change: "
                )
                new_date = new_date if new_date else old_workout_obj.workout_date

                new_duration_str = input(
                    f"New duration (recent: {old_workout_obj.duration}). Leave blank not to change"
                )
                if new_duration_str:
                    new_duration_str = float(new_duration_str)
                else:
                    new_duration = old_workout_obj.duration

                if new_date != old_workout_obj.workout_date:
                    datetime.strptime(new_date, "%Y-%m-%d")

                is_updated = tracker.update_workout(
                    workout_id, new_name, new_date, new_duration
                )

                if is_updated:
                    print(f"Workout {workout_id} successfully updated.")
                else:
                    print("Error: Database did not answer.")

            except ValueError:
                print("Error: Make sure....")

            except Exception as e:
                print(f"Unknown error occurred: {e}")

        elif option == "5":
            print("Exiting Gym Tracker. Goodbye!")
            break
        else:
            print("Invalid option. Please select 1, 2 or 3.")
