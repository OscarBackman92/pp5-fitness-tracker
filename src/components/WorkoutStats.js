import React, { useMemo } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, Flame, Clock, TrendingUp } from 'lucide-react';

const WorkoutStats = ({ workouts }) => {
    const stats = useMemo(() => {
        if (!workouts?.length) return null;

        // Weekly stats
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const workoutsThisWeek = workouts.filter(w => new Date(w.date_logged) >= oneWeekAgo);

        // Monthly stats
        const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const workoutsThisMonth = workouts.filter(w => new Date(w.date_logged) >= oneMonthAgo);

        // Workout type distribution
        const typeDistribution = workouts.reduce((acc, workout) => {
            acc[workout.workout_type] = (acc[workout.workout_type] || 0) + 1;
            return acc;
        }, {});

        // Daily stats for the last 7 days
        const dailyStats = [...Array(7)].map((_, index) => {
            const date = new Date(now.getTime() - (6 - index) * 24 * 60 * 60 * 1000);
            const dayWorkouts = workouts.filter(w => 
                new Date(w.date_logged).toDateString() === date.toDateString()
            );

            return {
                date: date.toLocaleDateString('en-US', { weekday: 'short' }),
                workouts: dayWorkouts.length,
                calories: dayWorkouts.reduce((sum, w) => sum + w.calories, 0),
                duration: dayWorkouts.reduce((sum, w) => sum + w.duration, 0)
            };
        });

        return {
            totalWorkouts: workouts.length,
            weeklyWorkouts: workoutsThisWeek.length,
            monthlyWorkouts: workoutsThisMonth.length,
            averageCalories: Math.round(workouts.reduce((sum, w) => sum + w.calories, 0) / workouts.length),
            totalDuration: workouts.reduce((sum, w) => sum + w.duration, 0),
            typeDistribution: Object.entries(typeDistribution).map(([name, value]) => ({ name, value })),
            dailyStats
        };
    }, [workouts]);

    if (!stats) return null;

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    return (
        <div className="workout-stats">
            {/* Summary Cards */}
            <Row className="mb-4">
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <h6 className="text-muted mb-1">Total Workouts</h6>
                            <div className="d-flex align-items-center">
                                <Activity size={24} className="me-2" />
                                <h3 className="mb-0">{stats.totalWorkouts}</h3>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <h6 className="text-muted mb-1">This Week</h6>
                            <div className="d-flex align-items-center">
                                <TrendingUp size={24} className="me-2" />
                                <h3 className="mb-0">{stats.weeklyWorkouts}</h3>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <h6 className="text-muted mb-1">Avg Calories</h6>
                            <div className="d-flex align-items-center">
                                <Flame size={24} className="me-2" />
                                <h3 className="mb-0">{stats.averageCalories}</h3>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <h6 className="text-muted mb-1">Total Duration (min)</h6>
                            <div className="d-flex align-items-center">
                                <Clock size={24} className="me-2" />
                                <h3 className="mb-0">{stats.totalDuration}</h3>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Charts */}
            <Row className="mb-4">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <h5>Weekly Activity</h5>
                            <div style={{ height: '300px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={stats.dailyStats}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="workouts" fill="#8884d8" name="Workouts" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <h5>Workout Types</h5>
                            <div style={{ height: '300px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={stats.typeDistribution}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ name, percent }) => 
                                                `${name} ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {stats.typeDistribution.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Trends */}
            <Row>
                <Col md={12}>
                    <Card>
                        <Card.Body>
                            <h5>Calories Burned Trend</h5>
                            <div style={{ height: '300px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={stats.dailyStats}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line 
                                            type="monotone" 
                                            dataKey="calories" 
                                            stroke="#8884d8" 
                                            name="Calories"
                                            strokeWidth={2}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default WorkoutStats;