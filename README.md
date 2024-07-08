# Survey_Project

Survey_Project is a web application built with React, Node.js, and MySQL that allows users to create, manage, and participate in surveys. It provides a user-friendly interface for creating and customizing surveys, as well as analyzing survey results.

## Features

- **User Authentication**: Users can register, log in, and manage their accounts.
- **Survey Creation**: Authenticated users (managers and reviewers) can create new surveys with customizable questions and answer options.
- **Survey Management**: Managers and reviewers can view, update, and delete existing surveys.
- **Survey Participation**: Users can participate in active surveys by answering the questions.
- **Survey Results**: Managers and reviewers can view the results of completed surveys, including detailed analytics and visualizations.

## Technologies Used

- **Frontend**: React, React Router, Vite, PrimeReact UI library
- **Backend**: Node.js, Express.js
- **Database**: MySQL

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MySQL Server

### Installation

1. Clone the repository:



```sh
git clone https://github.com/your-username/Survey_Project.git
```

2. Navigate to the project directory:



```sh
cd Survey_Project
```

3. Install the dependencies for the frontend and backend:



```sh
cd client npm install cd ../server npm install
```

4. Set up the MySQL database and update the configuration file (`server/config/config.json`) with your database credentials.

5. Run the database migrations to create the necessary tables:



```sh
cd server npx sequelize-cli db:migrate
```

### Running the Application

1. Start the backend server:



```sh
npm start
```

2. In a separate terminal, start the frontend development server:



```sh
cd client 
npm run dev
```

3. Open your web browser and visit `http://localhost:5173` to access the Survey_Project application.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## Acknowledgments

We would like to express our gratitude to the following open-source projects and libraries that were instrumental in building Survey_Project:

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [PrimeReact](https://www.primefaces.org/primereact/)

## Contributors

- [Tamar226](https://github.com/Tamar226)
- [Hadas354](https://github.com/hadas354)