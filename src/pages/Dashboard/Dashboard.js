import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Plus, List, Clock, Flame } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWorkouts } from '../../context/WorkoutContext';
import WorkoutStats from '../../components/workoutstats/WorkoutStats';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { workouts, loading } = useWorkouts();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <section className={styles.welcomeSection}>
        <h1 className={styles.welcomeTitle}>
          <Activity size={32} />
          Welcome back, {user?.username}!
        </h1>
        <p className={styles.welcomeSubtitle}>
          Track your progress and crush your fitness goals.
        </p>
        <div className={styles.actionsContainer}>
          <button 
            className={styles.primaryButton}
            onClick={() => navigate('/workouts/new')}
          >
            <Plus size={20} />
            Log New Workout
          </button>
          <button 
            className={styles.secondaryButton}
            onClick={() => navigate('/workouts')}
          >
            <List size={20} />
            View All Workouts
          </button>
        </div>
      </section>

      <WorkoutStats workouts={workouts} />

      <h2>Recent Workouts</h2>
      <div className={styles.workoutsList}>
        {workouts.slice(0, 6).map(workout => (
          <div key={workout.id} className={styles.workoutCard}>
            <div className={styles.workoutHeader}>
              <span className={styles.workoutType}>
                {workout.workout_type}
              </span>
              <span className={styles.workoutDate}>
                {new Date(workout.date_logged).toLocaleDateString()}
              </span>
            </div>
            <div className={styles.workoutStats}>
              <div className={styles.statItem}>
                <Clock size={16} />
                {workout.duration} min
              </div>
              <div className={styles.statItem}>
                <Flame size={16} />
                {workout.calories} cal
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;