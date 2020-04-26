const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  doctor: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    required: true
  },
  patients:{
      type: Array,
      default: {}
  },
  available:{
      type: Boolean,
      default: true
  }
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;