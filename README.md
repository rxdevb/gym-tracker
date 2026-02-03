# Gym Tracker

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=for-the-badge&logo=chakraui&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

## About The Project

Gym Tracker is a full-stack web application designed for efficient workout logging. It prioritizes speed and clarity, featuring a minimalist "Digital Brutalism" interface that eliminates distractions and focuses on raw performance metrics.

The application allows users to manage their training sessions with full CRUD capabilities, offering inline editing for rapid data entry during workouts.

### Built With

*   **Frontend**: React 19, TypeScript, Chakra UI v3, Vite
*   **Backend**: Python, Flask, SQLAlchemy ORM
*   **Database**: SQLite

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or higher)
*   Python (v3.8 or higher)

### Installation

1.  **Clone the repository**
    ```sh
    git clone https://github.com/your_username/gym-tracker.git
    cd gym-tracker
    ```

2.  **Setup Backend**
    ```sh
    cd backend
    python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    pip install flask flask-cors sqlalchemy
    python app.py
    ```

3.  **Setup Frontend**
    Open a new terminal window:
    ```sh
    cd frontend
    npm install
    npm run dev
    ```

## Features

*   **Inline Editing**: Update exercise details instantly without page reloads.
*   **Minimalist Design**: High-contrast UI optimized for visibility.
*   **Workout Management**: Create, edit, and delete workouts and exercises.
*   **RESTful API**: Robust backend architecture separating concerns between client and server.

## Architecture

The project follows a Monorepo structure:
*   `/backend` - Contains the Flask API and SQLite database models.
*   `/frontend` - Contains the React client application.
