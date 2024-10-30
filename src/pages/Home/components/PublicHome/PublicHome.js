import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, BarChart2, Dumbbell, Users, Zap, Trophy } from 'lucide-react';
import styles from './PublicHome.module.css';

const Home = () => {
  const features = [
    {
      icon: <BarChart2 size={24} />,
      title: 'Track Progress',
      description: 'Monitor your fitness journey with detailed analytics and insights.'
    },
    {
      icon: <Dumbbell size={24} />,
      title: 'Workout Logging',
      description: 'Log and track your workouts with ease, including duration and intensity.'
    },
    {
      icon: <Trophy size={24} />,
      title: 'Set Goals',
      description: 'Set and achieve your fitness goals with personalized tracking.'
    },
    {
      icon: <Users size={24} />,
      title: 'Community',
      description: 'Connect with other fitness enthusiasts and share your progress.'
    }
  ];

  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <Activity size={48} className={styles.heroIcon} />
          <h1 className={styles.heroTitle}>
            Transform Your
            <span className={styles.highlight}> Fitness Journey</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Track workouts, analyze progress, and achieve your fitness goals with our comprehensive platform.
          </p>
          <div className={styles.heroCta}>
            <Link to="/register" className={styles.primaryButton}>
              Get Started Free
              <Zap size={20} />
            </Link>
            <Link to="/login" className={styles.secondaryButton}>
              Login
            </Link>
          </div>
        </div>
        <div className={styles.heroImage}>
          <img src="/api/placeholder/600/400" alt="Fitness Dashboard" />
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Why Choose PEAKFORM?</h2>
        <div className={styles.featureGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className={styles.statsContent}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>10k+</span>
            <span className={styles.statLabel}>Active Users</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>50k+</span>
            <span className={styles.statLabel}>Workouts Logged</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>95%</span>
            <span className={styles.statLabel}>Satisfied Users</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Start Your Journey?</h2>
          <p className={styles.ctaText}>
            Join thousands of users achieving their fitness goals with PEAKFORM.
          </p>
          <Link to="/register" className={styles.primaryButton}>
            Start For Free
            <Zap size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;