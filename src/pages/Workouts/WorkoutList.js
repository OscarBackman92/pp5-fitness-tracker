// WorkoutList.js
import React, { useCallback, useEffect } from 'react';
import { Table, Alert, Button, Spinner } from 'react-bootstrap';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Link } from 'react-router-dom';
import { useWorkouts } from '../../context/WorkoutContext';

const ROW_HEIGHT = 60;
const LOADING_THRESHOLD = 3;

const WorkoutList = () => {
  const { 
    workouts, 
    loading, 
    error, 
    hasMore, 
    loadMore 
  } = useWorkouts();

  const isItemLoaded = useCallback(index => 
    !hasMore || index < workouts.length, 
    [hasMore, workouts.length]
  );

  const loadMoreItems = useCallback(() => {
    if (!loading && hasMore) {
      return loadMore();
    }
    return Promise.resolve();
  }, [loading, hasMore, loadMore]);

  const Row = useCallback(({ index, style }) => {
    if (!isItemLoaded(index)) {
      return (
        <div style={style} className="d-flex align-items-center justify-content-center">
          <Spinner animation="border" size="sm" />
        </div>
      );
    }

    const workout = workouts[index];
    if (!workout) return null;

    return (
      <div style={style} className="workout-row d-flex align-items-center border-bottom p-2">
        <div className="col">
          {new Date(workout.date_logged).toLocaleDateString()}
        </div>
        <div className="col">
          {workout.workout_type}
        </div>
        <div className="col">
          {workout.duration} min
        </div>
        <div className="col">
          {workout.calories} cal
        </div>
        <div className="col-auto">
          <Link 
            to={`/workouts/${workout.id}`}
            className="btn btn-sm btn-outline-primary me-2"
          >
            View
          </Link>
        </div>
      </div>
    );
  }, [isItemLoaded, workouts]);

  if (error) {
    return (
      <Alert variant="danger">
        {error}
      </Alert>
    );
  }

  return (
    <div className="workout-list-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Your Workouts</h2>
        <Link to="/workouts/new" className="btn btn-primary">
          Log New Workout
        </Link>
      </div>

      {workouts.length === 0 && !loading ? (
        <Alert variant="info">
          No workouts logged yet. Start by logging your first workout!
        </Alert>
      ) : (
        <div style={{ height: 'calc(100vh - 200px)', width: '100%' }}>
          <AutoSizer>
            {({ height, width }) => (
              <InfiniteLoader
                isItemLoaded={isItemLoaded}
                itemCount={hasMore ? workouts.length + LOADING_THRESHOLD : workouts.length}
                loadMoreItems={loadMoreItems}
                threshold={LOADING_THRESHOLD}
              >
                {({ onItemsRendered, ref }) => (
                  <List
                    height={height}
                    itemCount={workouts.length + (hasMore ? 1 : 0)}
                    itemSize={ROW_HEIGHT}
                    width={width}
                    onItemsRendered={onItemsRendered}
                    ref={ref}
                  >
                    {Row}
                  </List>
                )}
              </InfiniteLoader>
            )}
          </AutoSizer>
        </div>
      )}
    </div>
  );
};

export default React.memo(WorkoutList);