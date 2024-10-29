import React, { useState } from 'react';
import FeedList from './components/FeedList/FeedList';
import styles from './SocialFeed.module.css';

const SocialFeed = () => {
    const [feedItems] = useState([
        {
            id: 1,
            user: {
                name: 'Sarah Johnson',
                avatar: '/api/placeholder/40/40',
            },
            workout: {
                type: 'Running',
                duration: '45 min',
                calories: 450,
            },
            timeAgo: '2h ago',
            likes: 12,
            comments: 3,
        },
        {
            id: 2,
            user: {
                name: 'Mike Chen',
                avatar: '/api/placeholder/40/40',
            },
            workout: {
                type: 'Strength Training',
                duration: '60 min',
                calories: 320,
            },
            timeAgo: '4h ago',
            likes: 8,
            comments: 2,
        }
    ]);

    return (
        <div className={styles.socialFeed}>
            <FeedList items={feedItems} />
        </div>
    );
};

export default SocialFeed;