# MERN Task Distributor App

## Overview

The MERN Task Distributor App is a full-stack application built with MongoDB, Express.js, React.js (using Vite), and Node.js. It enables an admin to log in, manage agents, upload contact lists in CSV/Excel formats, and distribute tasks evenly among agents. The app demonstrates secure authentication, file handling, and data persistence with a user-friendly interface. This project was developed for an internship assessment.

## Live Demo

The application is deployed and accessible at:  
[https://task-distributor-admin.onrender.com](https://task-distributor-admin.onrender.com)

## Features

- **Admin User Login**: Secure authentication using email, password, and JWT.
- **Agent Management**: Add and manage agents with details (Name, Email, Mobile Number with country code, Password).
- **CSV/Excel Upload**: Upload `.csv`, `.xlsx`, or `.xls` files with `FirstName`, `Phone`, and `Notes` columns.
- **Task Distribution**: Evenly distribute contacts among 5 agents, with sequential handling of remainders.
- **Data Persistence**: Store users, agents, and distributed tasks in MongoDB.
- **Frontend UI**: Responsive React.js interface for login, agent management, file upload, and task viewing.
- **Validation & Error Handling**: Robust input validation and clear error messages.

## Technology Stack

- **Frontend**: React.js (Vite)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT)
- **File Handling**: Multer, csv-parser (or similar for Excel files)
- **Environment**: dotenv

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm (v8 or higher) or yarn
- Git

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/sathya-teja/Task-Distributor.git
   cd Task-Distributor
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**:
   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

1. **Backend Environment**:
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret_key>
   ```
   - Replace `<your_mongodb_connection_string>` with your MongoDB URI (e.g., `mongodb://localhost:27017/task-distributor`).
   - Set `<your_jwt_secret_key>` to a secure string.

2. **Frontend Environment** (optional):
   Create a `.env` file in the `frontend` directory if API URL configuration is needed:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

### Running the Application

1. **Start the Backend Server**:
   ```bash
   cd backend
   npm start
   ```
   The backend API will be available at `http://localhost:5000`.

2. **Start the Frontend Development Server (Vite)**:
   ```bash
   cd ../frontend
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173` (default Vite port).

### Usage

1. **Access the App**:
   - Open `http://localhost:5173` in a browser or visit the live demo at [https://task-distributor-admin.onrender.com](https://task-distributor-admin.onrender.com).
   - Register or log in with admin credentials (e.g., Email: `admin@example.com`, Password: `admin123`).
   - Update credentials in MongoDB for production use.

2. **Add Agents**:
   - Navigate to the agent management section.
   - Enter agent details (Name, Email, Mobile Number with country code, Password).

3. **Upload CSV/Excel**:
   - Upload a `.csv`, `.xlsx`, or `.xls` file with columns: `FirstName`, `Phone`, `Notes`.
   - The app validates the file format and content.

4. **Task Distribution**:
   - Contacts are automatically distributed evenly among 5 agents.
   - Remainders are assigned sequentially.

5. **View Assigned Tasks**:
   - Check the dashboard to view distributed contact lists per agent.

## Notes

- Ensure MongoDB is running before starting the backend.
- Validate uploaded files for correct headers (`FirstName`, `Phone`, `Notes`).
- Refer to the [[video demonstration](https://drive.google.com/your-video-link)](https://drive.google.com/file/d/1jGSeYGcr7wkNm7_bevw0IHpIUbB0alEU/view?usp=sharing) for a full walkthrough.
- Code includes comments for clarity and maintainability.

## Troubleshooting

- **MongoDB Connection**: Verify `MONGO_URI` and ensure MongoDB is running.
- **JWT Errors**: Check `JWT_SECRET` consistency across sessions.
- **File Upload Issues**: Ensure files are in `.csv`, `.xlsx`, or `.xls` format with correct headers.
- **Vite Issues**: Confirm `VITE_API_URL` matches the backend URL and check for CORS errors.

For further assistance, refer to code comments or contact [panyamsathyateja@gmail.com].




