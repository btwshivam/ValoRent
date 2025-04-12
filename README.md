# VeloRent - Car Rental System

VeloRent is a modern, full-featured car rental system built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This application provides a seamless experience for users to browse, search, and book rental cars.

![VeloRent Screenshot](https://via.placeholder.com/800x400?text=VeloRent+Screenshot)

## Features

- **Modern UI**: Clean, responsive interface built with React and Bootstrap
- **Authentication System**: User registration, email verification, and login functionality
- **Car Browsing**: Browse available cars with filtering options
- **Booking System**: Make bookings with date and time selection
- **User Dashboard**: View and manage bookings
- **User Profile**: Update personal information and profile picture
- **Admin Panel**: Manage cars, users, and bookings (for administrators)
- **Payment Integration**: Secure payment processing

## Technologies Used

### Frontend
- React.js
- Redux Toolkit for state management
- React Router for navigation
- React Bootstrap for UI components
- SASS for styling
- Axios for API requests
- Day.js for date handling
- React Spinners for loading animations

### Backend
- Node.js
- Express.js
- MongoDB for database
- JWT for authentication
- Nodemailer for sending emails
- Multer for file uploads
- Mongoose for MongoDB object modeling

## Project Structure

The project is organized into two main directories:

- **`/client`**: Contains the React frontend application
- **`/server`**: Contains the Node.js/Express backend application

### Client Structure

```
client/
├── public/              # Public assets and HTML template
├── src/                 # Source code
│   ├── api/             # API utility functions and endpoints
│   ├── assets/          # Static assets (images, icons, etc.)
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── layout/          # Layout components
│   ├── pages/           # Page components
│   │   ├── auth/        # Authentication pages
│   │   └── misc/        # Miscellaneous pages
│   ├── sass/            # SASS style files
│   ├── store/           # Redux store configuration
│   ├── App.jsx          # Main App component
│   ├── App.sass         # App-level styles
│   ├── Routes.jsx       # Application routes
│   └── index.js         # Entry point
└── package.json         # Dependencies and scripts
```

### Backend Structure

```
server/
├── config/              # Configuration files
├── controllers/         # Request handlers
├── middleware/          # Custom middleware
├── models/              # Database models
├── routes/              # API routes
├── utils/               # Utility functions
└── server.js            # Entry point
```

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/btwshivam/ValoRent.git
   cd VeloRent
   ```

2. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../client
   npm install
   ```

4. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USERNAME=your_email_username
   EMAIL_PASSWORD=your_email_password
   CLIENT_URL=http://localhost:3000
   ```

5. Create a `.env` file in the client directory:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd server
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd ../client
   npm start
   ```

3. Access the application at `http://localhost:3000`

## UI Improvements

The application features a modern and visually appealing UI with:

- Clean, consistent color palette
- Responsive design that works on mobile and desktop
- Intuitive navigation and user flows
- Animated components for better user experience
- Form validation with clear error messaging
- Loading states and spinners for asynchronous operations

## Authentication Flow

1. **Registration**: Users can register with their name and email
2. **Email Verification**: A verification link is sent to the user's email
3. **Set Password**: After verification, users can set their password
4. **Login**: Users can log in with their email and password
5. **Password Reset**: Users can request a password reset if forgotten

## Deployment

### Frontend Deployment
The React frontend can be deployed to services like Vercel, Netlify, or AWS Amplify.

```bash
cd client
npm run build
```

### Backend Deployment
The Node.js backend can be deployed to services like Heroku, AWS Elastic Beanstalk, or DigitalOcean.


## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [React Bootstrap](https://react-bootstrap.github.io/)
- [Create React App](https://create-react-app.dev/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Node.js](https://nodejs.org/)
- [Unsplash](https://unsplash.com/) for images 