const express = require('express')
const router = express.Router()
const multer = require('multer');
const User = require('../models/user')
const axios = require('axios');
const storage = multer.memoryStorage(); // Use memory storage, adjust as needed
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // Adjust the limit as needed
});

const geocode = async (address) => {
    const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=YOUR_MAPBOX_ACCESS_TOKEN`);
    const coordinates = response.data.features[0].geometry.coordinates;
    return { type: 'Point', coordinates };
};


router.post('/register', async (req, res) => {
    try {
        const { email, password, username, location } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({ message: 'email, password, and username are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ email, password, username, location });
        await newUser.save();

        console.log('User registered successfully:', newUser);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});

router.get('/nearbyUsers', async (req, res) => {
    try {
        const { longitude, latitude } = req.query;

        // Find nearby users using geospatial query
        const users = await User.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(longitude), parseFloat(latitude)],
                    },
                    $maxDistance: 1000, // max distance in meters
                },
            },
        });

        res.json(users);
    } catch (error) {
        console.error('Error fetching nearby users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// Follow
router.post('/follow', async (req, res) => {
    try {
        const { userIdToFollow, loggedInUserId } = req.body;

        // Add the userIdToFollow to the follower's followings array
        await User.findByIdAndUpdate(loggedInUserId, { $push: { followings: userIdToFollow } });

        // Add the loggedInUserId to the user being followed's followers array
        await User.findByIdAndUpdate(userIdToFollow, { $push: { followers: loggedInUserId } });

        res.status(200).json({ message: 'Followed successfully' });
    } catch (error) {
        console.error('Error following user:', error);
        res.status(500).json({ message: 'Error following user' });
    }
});

router.get('/loggedInUser', async (req, res) => {
    try {
        // Assuming you have some authentication middleware that adds user information to the request
        // Replace this with your actual authentication logic
        const loggedInUser = req.user;

        if (!loggedInUser) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        res.status(200).json({ userId: loggedInUser._id });
    } catch (error) {
        console.error('Error fetching logged-in user:', error);
        res.status(500).json({ message: 'Error fetching logged-in user' });
    }
});

router.get('/following', async (req, res) => {
    try {
        const { loggedInUserId } = req.query;

        // Fetch the logged-in user's following list
        const user = await User.findById(loggedInUserId).populate('followings', '_id username avtar');

        res.status(200).json(user.followings);
    } catch (error) {
        console.error('Error fetching following users:', error);
        res.status(500).json({ message: 'Error fetching following users' });
    }
});


// userRoutes.js
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user in the database
      const user = await User.findOne({ email, password });
  
      if (user) {
        // Assuming your user schema has an 'id' field
        const userId = user.id;
  
        res.status(200).json({ message: 'Login Successful', userId });
      } else {
        // User not found in the database
        res.status(401).json({ message: 'Invalid credentials' });
      }
  
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Error logging in' });
    }
  });
  

router.get('/users', async (req, res) => {
    try {
        // Retrieve all users from the database
        const users = await User.find();

        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
});

router.post('/update-profile', async (req, res) => {
    try {
        const { email, name, bio, phone, avtar } = req.body;

        console.log('User to be updated:', email);

        const updatedUser = await User.findOneAndUpdate(
            { email },
            { $set: { name, bio, phone, avtar } },
            { new: true }
        );

        console.log('Updated user:', updatedUser);

        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
});







module.exports = router;