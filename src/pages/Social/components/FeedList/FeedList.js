import React from 'react';
import { Button } from 'react-bootstrap';
import FeedItem from '../FeedItem/FeedItem';
import styles from './FeedList.module.css';

const FeedList = ({ items }) => {
    return (
        <div className={styles.feedList}>
            {items.map(item => (
                <FeedItem key={item.id} item={item} />
            ))}
            <Button variant="outline-primary" className={styles.loadMore}>
                Load More
            </Button>
        </div>
    );
};

export default FeedList;