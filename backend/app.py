from flask import Flask, jsonify, request
from flask_cors import CORS
from models import GymTracker
from datetime import datetime

app = Flask(__name__)
CORS(app)
tracker = GymTracker()


@app.route("/api/workouts", methods=["GET"])
def list_workouts_api():
    workouts_data = tracker.get_all_workouts_json()

    return jsonify(workouts_data)


@app.route("/api/workouts", methods=["POST"])
def add_workout_api():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data saved."}), 400
    try:
        workout_name = data["name"]
        workout_date = data["date"]
        workout_duration = data["duration"]

        datetime.strptime(workout_date, "%Y-%m-%d")
        duration_float = float(workout_duration)

        if duration_float <= 0:
            return jsonify({"error": "Duration must be positive."}), 400

        workout_id, workout_name_added = tracker.add_workout(
            (workout_date, workout_name, duration_float)
        )

        return (
            jsonify(
                {
                    "message": "Workout added.",
                    "id": workout_id,
                    "name": workout_name_added,
                }
            ),
            201,
        )

    except ValueError:
        return jsonify({"error": "Invalid date format or duration time."}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/workouts/<int:workout_id>", methods=["DELETE"])
def delete_workout_api(workout_id):
    is_deleted = tracker.delete_workout(workout_id)

    if is_deleted:
        return "", 204
    else:
        return (
            jsonify({"error": f"Workout {workout_id} has not been found."}),
            404,
        )


@app.route("/api/workouts/<int:workout_id>", methods=["PUT"])
def update_workout_api(workout_id):
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data."}), 400

    try:
        new_date = data["date"]
        new_name = data["name"]
        new_duration = float(data["duration"])

        datetime.strptime(new_date, "%Y-%m-%d")

        is_updated = tracker.update_workout(
            workout_id, new_name, new_date, new_duration
        )

        if is_updated:
            return jsonify({"message": f"Workout {workout_id} updated."}), 200
        else:
            return jsonify({"error": f"Workout {workout_id} has not been found."}), 404

    except ValueError:
        return jsonify({"error": "Invalid date format or duration time."}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/workouts/<int:workout_id>/exercises", methods=["POST"])
def add_exercise_api(workout_id):
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data saved."}), 400

    try:
        name = data["name"]
        sets = int(data["sets"])
        reps = int(data["reps"])
        weight = float(data["weight"])

        if sets <= 0 or reps <= 0 or weight < 0:
            return jsonify({"error": "Sets, reps and weight must be positive."}), 400   

        is_added = tracker.add_exercise(
            workout_id=workout_id, name=name, sets=sets, reps=reps, weight=weight
        )

        if is_added:
            return jsonify({"message": "Exercise added."}), 201
        else:
            return jsonify({"error": "No such workout."}), 404

    except (ValueError, KeyError):
        return (
            jsonify({"error": "Invalid data. Check 'name', 'sets', 'reps', 'weight'."}),
            400,
        )
    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500


@app.route("/api/exercises/<int:exercise_id>", methods=["DELETE"])
def delete_exercise_api(exercise_id):
    is_deleted = tracker.delete_exercise(exercise_id)
    if is_deleted:
        return "", 204
    else:
        return jsonify({"error": "Exercise not found."}), 404


@app.route("/api/exercises/<int:exercise_id>", methods=["PUT"])
def update_exercise_api(exercise_id):
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data."}), 400

    try:
        is_updated = tracker.update_exercise(
            exercise_id,
            name=data["name"],
            sets=int(data["sets"]),
            reps=int(data["reps"]),
            weight=float(data["weight"])
        )

        if is_updated:
            return jsonify({"message": "Exercise updated."}), 200
        else:
            return jsonify({"error": "Exercise not found."}), 404

    except (ValueError, KeyError):
        return jsonify({"error": "Invalid data."}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
