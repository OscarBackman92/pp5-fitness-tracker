# Fitness Tracker

Fitness Tracker is a web application that helps users log and track their workouts. Built with React and Bootstrap, it provides a user-friendly interface for managing workout data.

## Features

- User authentication (login, register, logout)
- Attractive landing page showcasing app features
- Dashboard with workout summary
- List view of all workouts
- Detailed view of individual workouts
- Add new workouts
- Edit existing workouts
- Delete workouts
- Responsive design for mobile and desktop

## Technologies Used

- React.js
- React Router for navigation
- React Bootstrap for UI components
- Axios for API requests
- CSS for custom styling
- Lucide React for icons

## Project Structure

```
src/
  components/
    Navbar.js
  pages/
    HomePage.js
    Dashboard.js
    Login.js
    Register.js
    WorkoutList.js
    WorkoutDetails.js
    LogWorkout.js
    EditWorkout.js
  services/
    api.js
    auth.js
    workouts.js
  styles/
    HomePage.css
  App.js
```

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/fitness-tracker.git
   ```

2. Navigate to the project directory:
   ```
   cd fitness-tracker
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your API URL:
   ```
   REACT_APP_API_URL=your_api_url_here
   ```

5. Start the development server:

   ```
   npm start
   ```

The application should now be running on [http://localhost:3000](http://localhost:3000).

## Usage

- Visit the homepage to learn about the app's features
- Register for a new account or log in with existing credentials
- Use the dashboard to view your workout summary
- Navigate to the workout list to see all your logged workouts
- Add new workouts, edit existing ones, or delete workouts as needed

## API Integration

The application uses a custom Axios instance (`src/services/api.js`) for making API requests. This instance handles authentication tokens and implements a token refresh mechanism.

## Authentication

User authentication is managed through the `auth.js` service, which provides functions for login, logout, registration, and token management.

## Styling

The application uses a combination of React Bootstrap components and custom CSS for styling. The `HomePage.css` file provides custom styles for the landing page.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- React Bootstrap for providing a robust UI component library

- Lucide React for the icon set
