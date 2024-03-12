const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Trip = require('../models/trip');
const axios = require('axios');

router.use(express.json()); // Add this line to parse JSON bodies

// Middleware to check if the user is authenticated for creating a trip
const authenticateCreateTrip = async (req, res, next) => {
    try {
        const userEmail = req.body.userEmail; // Extract userEmail from request body

        if (!userEmail) {
            return res.status(401).json({ message: 'User not authenticated - No userEmail provided' });
        }

        // Check if the user is logged in
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error authenticating user for creating trip:', error);
        res.status(500).json({ message: 'Error authenticating user for creating trip', error: error.message });
    }
};

// Middleware to check if the user is authenticated for fetching user trips
const authenticateUserTrips = async (req, res, next) => {
    try {
        const userEmail = req.query.userEmail;

        if (!userEmail) {
            return res.status(401).json({ message: 'User not authenticated - No userEmail provided' });
        }

        // Check if the user is logged in
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error authenticating user for fetching user trips:', error);
        res.status(500).json({ message: 'Error authenticating user for fetching user trips', error: error.message });
    }
};




// Create a new trip
router.post('/create-trip', authenticateCreateTrip, async (req, res) => {
    try {
        const { user } = req;
        const { destination, dates, activities } = req.body;

        // Create a new trip for the user
        const trip = new Trip({ userEmail: user.email, destination, dates, activities });
        await trip.save();

        res.status(201).json({ message: 'Trip created successfully', trip });
    } catch (error) {
        console.error('Error creating trip:', error);
        res.status(500).json({ message: 'Error creating trip', error: error.message });
    }
});

// Get all trips for a user
router.get('/user-trips', authenticateUserTrips, async (req, res) => {
    try {
        const { user } = req;

        // Find all trips associated with the user's email
        const trips = await Trip.find({ userEmail: user.email });

        if (trips.length === 0) {
            return res.status(404).json({ message: 'Data not found' });
        }

        res.status(200).json({ trips });
    } catch (error) {
        console.error('Error fetching user trips:', error);
        res.status(500).json({ message: 'Error fetching user trips', error: error.message });
    }
});

// Edit a trip
router.put('/edit-trip/:tripId', async (req, res) => {
    try {
        const { tripId } = req.params;
        const { destination, dates, activities } = req.body;

        // Find the trip by ID
        const trip = await Trip.findById(tripId);

        // Check if the trip exists
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        // Update trip details
        trip.destination = destination;
        trip.dates = dates;
        trip.activities = activities;
        await trip.save();

        res.status(200).json({ message: 'Trip updated successfully', trip });
    } catch (error) {
        console.error('Error editing trip:', error);
        res.status(500).json({ message: 'Error editing trip', error: error.message });
    }
});

// Delete a trip
router.delete('/delete-trip/:tripId', async (req, res) => {
    try {
        const { tripId } = req.params;

        // Find the trip by ID
        const trip = await Trip.findById(tripId);

        // Check if the trip exists
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        // Delete the trip
        await Trip.findByIdAndDelete(tripId);

        res.status(200).json({ message: 'Trip deleted successfully' });
    } catch (error) {
        console.error('Error deleting trip:', error);
        res.status(500).json({ message: 'Error deleting trip', error: error.message });
    }
});

module.exports = router;
