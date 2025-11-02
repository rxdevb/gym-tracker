from traceback import print_tb

from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import sessionmaker, declarative_base, foreign, relationship
from datetime import datetime


engine = create_engine("sqlite:///tracker.db")

Base = declarative_base()


class Exercise(Base):
    __tablename__ = "exercises"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    sets = Column(Integer)
    reps = Column(Integer)
    weight = Column(Float)

    workout_id = Column(Integer, ForeignKey("workouts.id"))

    def __repr__(self):
        return f"<Exercise(name='{self.name}', sets={self.sets}, weight={self.weight})>"


class Workout(Base):
    __tablename__ = "workouts"
    id = Column(Integer, primary_key=True)
    workout_date = Column(String)
    name = Column(String)
    duration = Column(Float)

    exercises = relationship(
        "Exercise", backref="workout", cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Workout(id={self.id}, name={self.name}, duration={self.duration})>"


Session = sessionmaker(bind=engine)


class GymTracker:
    def __init__(self):
        self.Session = sessionmaker(bind=engine)
        Base.metadata.create_all(engine)

    def add_workout(self, workout_data):
        session = self.Session()
        try:
            new_workout = Workout(
                workout_date=workout_data[0],
                name=workout_data[1],
                duration=workout_data[2],
            )

            session.add(new_workout)
            session.commit()

            workout_id = new_workout.id
            workout_name = new_workout.name

            session.close()

            return workout_id, workout_name

        except Exception as e:
            session.rollback()
            session.close()
            raise e

    def add_exercise(
        self, workout_id: int, name: str, sets: int, reps: int, weight: float
    ):
        session = self.Session()

        try:
            workout = session.get(Workout, workout_id)

            if workout:
                new_exercise = Exercise(name=name, sets=sets, reps=reps, weight=weight)

                workout.exercises.append(new_exercise)

                session.commit()
                return True
            return False

        except Exception as e:
            session.rollback()
            raise e
        finally:
            session.close()

    def show_workouts(self):
        session = self.Session()

        try:
            workouts = session.query(Workout).order_by(Workout.id.desc()).all()

            if not workouts:
                print("No saved workouts.")
                return 0
            else:
                print("\n Your saved workouts")
            for workout in workouts:
                print(
                    f"\n[ID: {workout.id}] Date: {workout.workout_date} | Name: {workout.name} | Duration: {workout.duration} min"
                )

                if workout.exercises:
                    print("  Exercises:")
                    for exercise in workout.exercises:
                        print(
                            f"      - {exercise.name}: {exercise.sets} sets, {exercise.reps} reps, {exercise.weight} kg"
                        )
                else:
                    print("    (No saved exercises for that workout.)")
            return len(workouts)

        except Exception as e:
            print(f"Error while showing workouts: {e}")
            return 0

        finally:
            session.close()

    def delete_workout(self, workout_id):
        session = self.Session()
        is_deleted = False

        try:
            workout_to_delete = session.get(Workout, workout_id)
            if workout_to_delete:
                session.delete(workout_to_delete)
                session.commit()
                is_deleted = True

        except Exception as e:
            session.rollback()
            print(f"Error while deleting workout: {e}")

        finally:
            session.close()
        return is_deleted

    def get_workout_by_id(self, workout_id: int):
        session = self.Session()

        try:
            workout = session.get(Workout, workout_id)
            return workout

        except Exception as e:
            print(f"Error while editing workout: {e}")
            return None

        finally:
            session.close()

    def update_workout(
        self, workout_id: int, new_name: str, new_date: str, new_duration: float
    ) -> bool:
        session = self.Session()
        is_updated = False

        try:
            workout = session.get(Workout, workout_id)

            if workout:
                workout.name = new_name
                workout.workout_date = new_date
                workout.duration = new_duration

                session.commit()
                is_updated = True

        except Exception as e:
            session.rollback()
            print(f"Error while updating workout: {e}")

        finally:
            session.close()
        return is_updated
