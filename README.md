# E-Commerce Full-Stack Application

A modern full-stack e-commerce application with a responsive frontend and a RESTful backend API. Users can browse products, manage their shopping cart, and complete orders securely.

## Features

- **User Authentication:** Signup, Login, and JWT-based authentication
- **Product Management:** Browse, search, and view products
- **Shopping Cart:** Add, update, remove products
- **Order Management:** Place , track , cancel and re orders
- **Admin Panel:** Manage products, orders , locations,coupons (optional)
- **Responsive Design:** Works on mobile, tablet, and desktop
- **Animations & Transitions:** Smooth UI effects for better UX

## Technologies Used

### Frontend

- React js
- Tailwind CSS / Shadcn UI
- React Router
- Tanstack Query for state management
- Redux / Context API
- Formik / React Hook Form
- Axios for API calls
- Framer Motion for animations

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication
- Bcrypt for password hashing
- CORS, dotenv for environment management

## Project Structure

Installation:

- Backend
  Navigate to the backend folder: cd backend
  npm install

  Create a .env file with the following variables:
  PORT=5200
  MONGO_URL=your_mongodb_connection_string
  STRIPE_SECRET_KEY=your_stripe_secret
  STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
  FRONTEND_URL=http://localhost:5173
  CANCEL_URL=http://localhost:5200
  JWT_ACCESS_SECRET=your_jwt_secret
  JWT_REFRESH_SECRET=your_jwt_refresh_token
  USER_EMAIL=user-email
  PASS_EMAIL=password
  NODE_ENV=development
  CLOUDINARY_CLOUD_NAME=cloudinary_name
  CLOUDINARY_API_KEY=api_key
  CLOUDINARY_API_SECRET=api_secret

  Start the server:
  npm run dev

- Frontend
  Navigate to the frontend folder:cd frontend
  npm install

  Create a .env file with API URL:
  VITE_APP_BACKEND_URL="http://localhost:5200"

  Start the server:
  npm start

Open URL to view the app.
