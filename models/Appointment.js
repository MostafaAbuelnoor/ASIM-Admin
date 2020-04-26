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
  date: {
    type: String,
    required: true
  },
  patients: [
    {
      ID: {
        type: String
      },
      bookingdate: {
        type: String
      }
    }
  ],
  available: {
    type: String,
    default: "yes"
  }
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;