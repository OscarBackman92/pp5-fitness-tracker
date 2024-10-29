import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import styles from './FeedItem.module.css';

const FeedItem = ({ item }) => {
    return (
        <Card className={styles.feedItem}>
            <Card.Body>
                {/* User Info */}
                <div className={styles.userInfo}>
                    <img 
                        src={item.user.avatar} 
                        alt={item.user.name} 
                        className={styles.avatar}
                    />
                    <div>
                        <h6 className={styles.userName}>{item.user.name}</h6>
                        <small className={styles.timeAgo}>{item.timeAgo}</small>
                    </div>
                </div>

                {/* Workout Info */}
                <div className={styles.workoutInfo}>
                    <div className={styles.workoutType}>
                        {item.workout.type}
                    </div>
                    <div className={styles.workoutStats}>
                        <span>{item.workout.duration}</span>
                        <span>•</span>
                        <span>{item.workout.calories} cal</span>
                    </div>
                </div>

                {/* Actions */}
                <div className={styles.actions}>
                    <Button variant="link" className={styles.actionButton}>
                        <Heart size={18} />
                        <span>{item.likes}</span>
                    </Button>
                    <Button variant="link" className={styles.actionButton}>
                        <MessageCircle size={18} />
                        <span>{item.comments}</span>
                    </Button>
                    <Button variant="link" className={styles.actionButton}>
                        <Share2 size={18} />
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default FeedItem;