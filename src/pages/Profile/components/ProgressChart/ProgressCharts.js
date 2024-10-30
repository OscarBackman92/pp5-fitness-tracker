import React, { useState } from 'react';
import { Card, Form, Row, Col, Alert } from 'react-bootstrap';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Calendar } from 'lucide-react';
import { useProfile } from '../../../../context/ProfileContext';
import { useWorkout } from '../../../../context/WorkoutContext';

const CHART_TYPES = {
    WEIGHT: 'weight',
    MEASUREMENTS: 'measurements',
    WORKOUT_FREQUENCY: 'workout_frequency'
};

const TIME_RANGES = {
    WEEK: '7',
    MONTH: '30',
    THREE_MONTHS: '90',
    YEAR: '365'
};

const MEASUREMENT_COLORS = {
    weight: '#8884d8',
    chest: '#82ca9d',
    waist: '#ffc658',
    hips: '#ff8042',
    arms: '#a4de6c',
    thighs: '#d0ed57',
    calories: '#83a6ed'
};

const ProgressCharts = () => {
    const { measurements = [] } = useProfile();
    const { workouts = [] } = useWorkout();
    const [selectedChart, setSelectedChart] = useState(CHART_TYPES.WEIGHT);
    const [timeRange, setTimeRange] = useState(TIME_RANGES.MONTH);

    const filterDataByTimeRange = (data) => {
        if (!Array.isArray(data) || !data.length) return [];
        
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - parseInt(timeRange));
        return data.filter(item => new Date(item.date) >= cutoffDate);
    };

    const processWeightData = () => {
        return measurements
            .filter(m => m?.type === 'weight')
            .map(m => ({
                date: new Date(m.date).toLocaleDateString(),
                value: parseFloat(m.value)
            }))
            .sort((a, b) => new Date(a.date) - new Date(b.date));
    };

    const processMeasurementsData = () => {
        const measurementsByDate = measurements
            .filter(m => m?.type !== 'weight')
            .reduce((acc, m) => {
                if (!m?.date) return acc;
                const date = new Date(m.date).toLocaleDateString();
                if (!acc[date]) {
                    acc[date] = { date };
                }
                acc[date][m.type] = parseFloat(m.value);
                return acc;
            }, {});

        return Object.values(measurementsByDate)
            .sort((a, b) => new Date(a.date) - new Date(b.date));
    };

    const processWorkoutFrequencyData = () => {
        return Object.values(
            workouts.reduce((acc, workout) => {
                if (!workout?.date_logged) return acc;
                const date = new Date(workout.date_logged).toLocaleDateString();
                if (!acc[date]) {
                    acc[date] = { date, count: 0 };
                }
                acc[date].count++;
                return acc;
            }, {})
        ).sort((a, b) => new Date(a.date) - new Date(b.date));
    };

    const getChartData = () => {
        switch (selectedChart) {
            case CHART_TYPES.WEIGHT:
                return filterDataByTimeRange(processWeightData());
            case CHART_TYPES.MEASUREMENTS:
                return filterDataByTimeRange(processMeasurementsData());
            case CHART_TYPES.WORKOUT_FREQUENCY:
                return filterDataByTimeRange(processWorkoutFrequencyData());
            default:
                return [];
        }
    };

    const renderWeightChart = (data) => (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip />
                <Legend />
                <Area
                    type="monotone"
                    dataKey="value"
                    name="Weight (kg)"
                    stroke={MEASUREMENT_COLORS.weight}
                    fill={MEASUREMENT_COLORS.weight}
                    fillOpacity={0.3}
                />
            </AreaChart>
        </ResponsiveContainer>
    );

    const renderMeasurementsChart = (data) => (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                {Object.keys(MEASUREMENT_COLORS)
                    .filter(key => key !== 'weight' && key !== 'calories')
                    .map(measurementType => (
                        <Line
                            key={measurementType}
                            type="monotone"
                            dataKey={measurementType}
                            name={`${measurementType} (cm)`}
                            stroke={MEASUREMENT_COLORS[measurementType]}
                            strokeWidth={2}
                            dot={{ r: 4 }}
                        />
                    ))}
            </LineChart>
        </ResponsiveContainer>
    );

    const renderWorkoutFrequencyChart = (data) => (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                    type="monotone"
                    dataKey="count"
                    name="Workouts"
                    stroke={MEASUREMENT_COLORS.calories}
                    fill={MEASUREMENT_COLORS.calories}
                    fillOpacity={0.3}
                />
            </AreaChart>
        </ResponsiveContainer>
    );

    const renderChart = () => {
        const data = getChartData();

        if (!data.length) {
            return (
                <Alert variant="info" className="m-3">
                    No data available for the selected time range.
                </Alert>
            );
        }

        switch (selectedChart) {
            case CHART_TYPES.WEIGHT:
                return renderWeightChart(data);
            case CHART_TYPES.MEASUREMENTS:
                return renderMeasurementsChart(data);
            case CHART_TYPES.WORKOUT_FREQUENCY:
                return renderWorkoutFrequencyChart(data);
            default:
                return null;
        }
    };

    return (
        <Card>
            <Card.Body>
                <Card.Title className="d-flex align-items-center mb-4">
                    <TrendingUp size={24} className="me-2" />
                    Progress Charts
                </Card.Title>

                <Row className="mb-4">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Chart Type</Form.Label>
                            <Form.Select
                                value={selectedChart}
                                onChange={(e) => setSelectedChart(e.target.value)}
                            >
                                <option value={CHART_TYPES.WEIGHT}>Weight Progress</option>
                                <option value={CHART_TYPES.MEASUREMENTS}>Body Measurements</option>
                                <option value={CHART_TYPES.WORKOUT_FREQUENCY}>Workout Frequency</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Time Range</Form.Label>
                            <Form.Select
                                value={timeRange}
                                onChange={(e) => setTimeRange(e.target.value)}
                            >
                                <option value={TIME_RANGES.WEEK}>Last Week</option>
                                <option value={TIME_RANGES.MONTH}>Last Month</option>
                                <option value={TIME_RANGES.THREE_MONTHS}>Last 3 Months</option>
                                <option value={TIME_RANGES.YEAR}>Last Year</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <div className="chart-container">
                    {renderChart()}
                </div>

                <div className="text-muted text-center mt-3">
                    <Calendar size={16} className="me-1" />
                    Data shown for the selected time period
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProgressCharts;