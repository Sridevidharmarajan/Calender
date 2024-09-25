React Calendar App with MongoDB Integration
This project is a React-based Calendar Application that allows users to manage events and to-dos. The app supports drag-and-drop functionality for events, a monthly calendar view, and the ability to search for events. Additionally, it includes light and dark mode themes. The backend is built using Node.js with Express and connected to MongoDB for persistent data storage.

Features
        Monthly Calendar View: View events and to-dos for each day of the month.
        Event Management: Add, search, and drag-and-drop events.
        To-do List Integration: Add and manage daily to-do lists.
        Dark/Light Mode: Automatically switch between dark and light themes based on user preference.
        Data Persistence: All events and to-dos are stored in a MongoDB database for persistence.

Technologies Used
    Frontend:
        React (with hooks for state management and effects)
        React DnD for drag-and-drop functionality
        CSS for styling (including theme management)
    Backend:
        Node.js with Express for API routes
        MongoDB with Mongoose for data storage and modeling
        CORS for cross-origin requests
        Body-parser for handling JSON request bodies
        Getting Started
Prerequisites
        Node.js and npm installed
        MongoDB installed and running locally or use a cloud-based MongoDB service like MongoDB Atlas

Installation
     Clone the repository:

          git clone https://github.com/your-username/react-calendar-app.git
          cd react-calendar-app

Install dependencies for both frontend and backend:

     Backend:

       cd backend
       npm install

    Frontend:

      cd frontend
      npm install

      MONGODB_URI=mongodb://localhost:27017/calendar

Running the App
     Start the Backend (Node.js server):

       cd backend
       npm start
       Start the Frontend (React app):

      cd frontend
      npm start
      Visit http://localhost:3000 in your browser to use the application.

Folder Structure
     frontend/: Contains the React frontend code (calendar, events, to-dos, styles).
     backend/: Contains the Express backend, API routes, and MongoDB connection.
API Endpoints
      GET /api/events: Fetch all events.
      POST /api/events: Add a new event.
      GET /api/todos: Fetch all to-dos.
      POST /api/todos: Add or update a to-do list for a specific date.
      DELETE /api/todos/


