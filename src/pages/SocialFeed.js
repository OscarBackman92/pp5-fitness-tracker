import React, { useState, useEffect } from 'react';
import { socialService } from '../services/social';

const SocialFeed = () => {
    const [feed, setFeed] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchFeed();
    }, [page]);

    const fetchFeed = async () => {
        try {
            const response = await socialService.getFeed(page);
            if (page === 1) {
                setFeed(response.data.results);
            } else {
                setFeed(prev => [...prev, ...response.data.results]);
            }
            setHasMore(!!response.data.next);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching feed:', error);
            setLoading(false);
        }
    };

    const loadMore = () => {
        if (hasMore) {
            setPage(prev => prev + 1);
        }
    };

    if (loading && page === 1) return <div>Loading...</div>;

    return (
        <div className="social-feed">
            {feed.map((item) => (
                <div key={item.id} className="feed-item">
                    <div className="user-info">
                        <img src={item.user.profile_picture} alt={item.user.username} />
                        <span>{item.user.username}</span>
                    </div>
                    <div className="workout-info">
                        <h3>{item.workout_type}</h3>
                        <p>Duration: {item.duration} minutes</p>
                        <p>Calories: {item.calories}</p>
                    </div>
                    <div className="social-interactions">
                        <button 
                            onClick={() => socialService.likeWorkout(item.id)}
                            className={item.is_liked ? 'liked' : ''}
                        >
                            {item.likes_count} Likes
                        </button>
                        {/* Add comment section */}
                    </div>
                </div>
            ))}
            {hasMore && (
                <button onClick={loadMore} className="load-more">
                    Load More
                </button>
            )}
        </div>
    );
};

export default SocialFeed;