# fitness_tracker_react

## Project description
### Overview

The React Fitness Tracker App is a comprehensive fitness tracking web application built with React, React Router, and Zustand for state management. It allows users to manage workouts, track goals, monitor progress, and maintain a history of exercises. The app is designed with flexibility in mind, offering both automated exercise selection and manual workout entry options.

## Features
1. Workout Management

Add Workouts: Users can add workouts through an intuitive form. Workouts can be selected from predefined exercises or manually inputted to accommodate custom routines.

Workout History: Displays all past workouts in a sorted order (most recent first) for easy tracking of progress. Users can also clear the history if desired.

Workout Details: Detailed view of each workout including exercises, muscles targeted, equipment used, and completion date.

2. Manual Input Mode

Users can manually add exercises and customize workout routines.

Manual workouts are seamlessly integrated into the workout history, ensuring no data is lost.

3. Goal Tracking

Users can set fitness goals and monitor their progress.

Visual feedback allows users to see achievements over time.

4. User Interface

Responsive Design: Optimized for different screen sizes.

Theming Support: Includes a theme toggle for light and dark modes.

Reusable Components: Components like Header, Footer, ExerciseCard, GoalTracker, WorkoutDetails, and WorkoutHistory provide modularity and maintainability.

5. Routing and Navigation

Built with React Router to handle multiple pages and navigation.

Includes protected routes for user-specific data access.

Easy access to history, goals, and workout management pages.

6. State Management

Zustand is used for global state management, handling workout history, goal tracking, and other shared states efficiently.

Actions include adding workouts, clearing history, and fetching exercises, muscles, and equipment lists.

7. Data Handling

Supports fetching dynamic data for exercises, muscles, and equipment.

Allows sorting and filtering of workout history for improved usability.

Ensures manual entries are fully integrated with automated data structures.

## Project Structure
src/
 ├─ components/
 │   ├─ Billing.jsx
 │   ├─ ExerciseCard.jsx
 │   ├─ Footer.jsx
 │   ├─ GoalTracker.jsx
 │   ├─ Header.jsx
 │   ├─ OurContact.jsx
 │   ├─ ProtectedRoute.jsx
 │   ├─ ThemeToggle.jsx
 │   ├─ WorkoutDetails.jsx
 │   └─ WorkoutHistory.jsx
 ├─ store/
 │   └─ useStore.js
 └─ App.js


components/ – Contains all UI components and pages.

store/useStore.js – Handles global state and actions using Zustand.

## Tech stack used

React – Frontend library for building dynamic UIs.

React Router – Page routing and navigation.

Zustand – Lightweight state management.

JavaScript (ES6+) – Application logic.

CSS / Tailwind (optional) – Styling and responsive design.

## How to install & run the project

Clone the repository:

git clone <repo-url>


Install dependencies:

npm install


Start the development server:

npm start


Open the app in your browser at http://localhost:3000.

## Any limitations or known issues

User authentication and profiles: Better suited for Backend

Integration with APIs for exercise suggestions and tracking: Better suited with backend

Notifications and reminders for workouts.