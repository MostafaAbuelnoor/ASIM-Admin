const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    doctor: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    patients: {
      type: Object,
      default: {},
    },
    available: {
      type: String,
      default: "yes",
    },
  },
  { minimize: false }
);

const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointment;
