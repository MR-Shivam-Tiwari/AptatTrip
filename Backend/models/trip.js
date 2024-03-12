const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  destination: { type: String, required: true },
  dates: {
    start: { type: Date, required: true },
    end: { type: Date, required: true },
  },
  activities: [{ type: String }],
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
