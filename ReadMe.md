# User Management System

User Management System is a web application built with React.js and Node.js that allows users to register, login, and view user information. It provides features for user authentication, displaying user data in a table format, and pagination.

## Features

- User registration: Users can create an account by providing a username, email, password, and date of birth.
- User login: Registered users can log in to their accounts using their username and password.
- Secure authentication: Passwords are securely hashed before being stored in the database.
- User information display: Registered users can view their username, email, date of birth, and other details in a table format.
- Pagination: The application implements pagination to display a limited number of users per page.
- Responsive design: The application is responsive and works well on various screen sizes, including desktops, tablets, and mobile devices.

## Technologies Used

1. Frontend:

- React.js
- React Router
- React Bootstrap
- Axios
- React Paginate
- React Toastify

2. Backend:

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- JSON Web Tokens (JWT)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/vikrams788/mernApp.git
2. Navigate to the project directory:
   ```sh
   cd mernApp-main
3. Install frontend dependencies:
   ```sh
   cd frontend
   npm install
4. Install backend dependencies:
   ```sh
   cd ..
   cd backend
   npm install
5. Start frontend server
   ```sh
   cd ..
   cd frontend
   npm start
6. Start backend server
   ```sh
   cd ..
   cd backend
   node index.js

# Usage

1. Register an account:

- Click on the "Register" link and fill out the registration form.
- Provide a username, email, password, and date of birth.
- Click the "Register" button to create your account.

2. Login to your account:

- After registering, click on the "Login" link and enter your username and password.
- Click the "Login" button to access your account.

3. View user information:

- Once logged in, you will be redirected to the home page where you can view your user information.
- User information is displayed in a table format, showing the username, email, date of birth, and other details.

4. Pagination:

- If there are multiple users, the application paginates the user data to display a limited number of users per page.
- Use the pagination controls at the bottom of the table to navigate between pages.

5. Logout:

- Click on the "Logout" button to securely log out of your account.