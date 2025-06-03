AdOnWheels

AdOnWheels is a project that integrates a backend and a frontend to provide a seamless web application experience. This README file contains a step-by-step guide to set up and run the project, along with a brief explanation of its functionality.

Prerequisites

Before running this project, ensure you have the following installed on your system:

React.js

Node.js (v14 or higher)

npm 

MongoDB 

Project Structure

The project is divided into two main directories:

Frontend: Contains the user interface code.

Backend: Handles server-side logic, APIs, and database interactions.

Both directories are located inside the adOnWheels folder.

Steps to Run the Project

1. Clone the Repository

Download the project files and navigate to the adOnWheels folder:

git clone <repository-url>
cd adOnWheels

2. Setup Backend

Navigate to the backend folder:

cd backend

Install dependencies:

npm install

Configure the environment:

Create a .env file in the backend directory.

Add the required environment variables (e.g., database URL, port number, API keys).

Start the backend server:

node server.js

The backend should now be running on the specified port (default: http://localhost:5001).

3. Setup Frontend

Navigate to the frontend folder:

cd ../frontend

Install dependencies:

npm install

Start the frontend development server:

npm run dev

The frontend should now be running on the specified port (default: http://localhost:5173).

4. Access the Application

Open your browser and go to http://localhost:5173/ to view the application.

Functionality Overview

Frontend:

Built using modern web technologies like React.

Provides a responsive user interface for interacting with the backend services.

Includes user-friendly components for navigation, data input, and result display.

Backend:

Built using Node.js and Express.js.

Implements RESTful APIs to handle client requests.

Manages database interactions (likely using MongoDB) for storing and retrieving data.

Troubleshooting

If the backend fails to start, ensure MongoDB is running and the .env file is correctly configured.

If the frontend doesn’t load, check for dependency issues or port conflicts.

