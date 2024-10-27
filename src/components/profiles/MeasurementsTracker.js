import React, { useState } from 'react';
import { Card, Form, Button, Table, Alert } from 'react-bootstrap';
import { Ruler, Plus, Trash2 } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';

const MEASUREMENT_TYPES = [
    { value: 'weight', label: 'Weight (kg)', unit: 'kg' },
    { value: 'chest', label: 'Chest', unit: 'cm' },
    { value: 'waist', label: 'Waist', unit: 'cm' },
    { value: 'hips', label: 'Hips', unit: 'cm' },
    { value: 'biceps', label: 'Biceps', unit: 'cm' },
    { value: 'thighs', label: 'Thighs', unit: 'cm' },
    { value: 'calves', label: 'Calves', unit: 'cm' }
];

const MeasurementsTracker = () => {
    const { measurements, updateMeasurements, loading } = useProfile();
    const [newMeasurement, setNewMeasurement] = useState({
        type: 'weight',
        value: '',
        date: new Date().toISOString().split('T')[0]
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newMeasurement.value) return;

        try {
            const measurementToAdd = {
                ...newMeasurement,
                id: Date.now(),
                value: parseFloat(newMeasurement.value)
            };

            await updateMeasurements([...measurements, measurementToAdd]);
            setNewMeasurement({
                ...newMeasurement,
                value: ''
            });
        } catch (error) {
            console.error('Error adding measurement:', error);
        }
    };

    const handleDelete = async (measurementId) => {
        try {
            const updatedMeasurements = measurements.filter(m => m.id !== measurementId);
            await updateMeasurements(updatedMeasurements);
        } catch (error) {
            console.error('Error deleting measurement:', error);
        }
    };

    const getMeasurementsByDate = () => {
        const grouped = measurements.reduce((acc, measurement) => {
            const date = measurement.date;
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(measurement);
            return acc;
        }, {});

        return Object.entries(grouped)
            .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA));
    };

    return (
        <Card>
            <Card.Body>
                <Card.Title className="d-flex align-items-center mb-4">
                    <Ruler size={24} className="me-2" />
                    Body Measurements
                </Card.Title>

                <Form onSubmit={handleSubmit} className="mb-4">
                    <Form.Group className="mb-3">
                        <Form.Label>Measurement Type</Form.Label>
                        <Form.Select
                            value={newMeasurement.type}
                            onChange={(e) => setNewMeasurement({ 
                                ...newMeasurement, 
                                type: e.target.value 
                            })}
                        >
                            {MEASUREMENT_TYPES.map(type => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Value ({MEASUREMENT_TYPES.find(t => t.value === newMeasurement.type)?.unit})</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.1"
                            value={newMeasurement.value}
                            onChange={(e) => setNewMeasurement({ 
                                ...newMeasurement, 
                                value: e.target.value 
                            })}
                            placeholder="Enter measurement value"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={newMeasurement.date}
                            onChange={(e) => setNewMeasurement({ 
                                ...newMeasurement, 
                                date: e.target.value 
                            })}
                        />
                    </Form.Group>

                    <Button 
                        type="submit" 
                        variant="primary"
                        disabled={loading}
                        className="w-100"
                    >
                        <Plus size={18} className="me-1" />
                        Add Measurement
                    </Button>
                </Form>

                <div className="measurements-history">
                    {getMeasurementsByDate().map(([date, dateMeasurements]) => (
                        <div key={date} className="mb-4">
                            <h6 className="border-bottom pb-2">
                                {new Date(date).toLocaleDateString()}
                            </h6>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Measurement</th>
                                        <th>Value</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dateMeasurements.map(measurement => (
                                        <tr key={measurement.id}>
                                            <td>
                                                {MEASUREMENT_TYPES.find(t => t.value === measurement.type)?.label}
                                            </td>
                                            <td>
                                                {measurement.value} {MEASUREMENT_TYPES.find(t => t.value === measurement.type)?.unit}
                                            </td>
                                            <td>
                                                <Button
                                                    variant="link"
                                                    className="text-danger p-0"
                                                    onClick={() => handleDelete(measurement.id)}
                                                    disabled={loading}
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    ))}

                    {measurements.length === 0 && (
                        <Alert variant="info">
                            No measurements recorded yet. Start by adding your first measurement!
                        </Alert>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

export default MeasurementsTracker;