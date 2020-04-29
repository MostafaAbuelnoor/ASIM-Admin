const express = require("express");
const router = express.Router();
const moment = require("moment");

//Appointment model
const Appointment = require("../models/Appointment");

//Doctors page
router.get("/docs", (req, res) => res.render("docs"));

//Appointments page
router.get("/appts", (req, res) => res.render("appts"));

//schedules page
router.get("/schedule", (req, res) =>
  res.render("schedule", {
    doc: docs,
    dat: dates,
    spec: specializations,
    pat: patients,
    avail: available,
  })
);

//Doctors handle
router.post("/docs", (req, res) => {
  const { doctor, specialization, date1 } = req.body;

  let errors = [];
  var date = moment(date1);
  var date = date.format("DD-MM-YYYY HH:mm"); //Thank you god for moment.js

  //check required fields
  if (!doctor || !specialization || !date) {
    errors.push({ msg: "Please fill in all the fields!" });
  }

  if (errors.length > 0) {
    res.render("docs", {
      errors,
      doctor,
      specialization,
      date,
    });
  } else {
    //all fields filled
    Appointment.findOne({ doctor: doctor, date: date }).then((appointment) => {
      if (appointment) {
        errors.push({ msg: "Slot is already added" });
        res.render("docs", {
          errors,
          doctor,
          specialization,
          date,
        });
      } else {
        const newApp = new Appointment({
          doctor,
          specialization,
          date,
        });

        newApp
          .save()
          .then((appointment) => {
            req.flash("success_msg", "Doctor added!");
            res.redirect("/appointments/appts");
          })
          .catch((err) => console.log(err));
      }
    });
  }
});

var docs = [];
var dates = [];
var specializations = [];
var patients = [];
var available = [];

router.post("/appts", (req, res) => {
  let errors = [];
  const { doctor } = req.body;
  var notEmpty = false; //flag
  function getApp(doctor) {
    var query = Appointment.find({ doctor: doctor });
    return query;
  }

  var query = getApp(doctor);
  query.exec(function (err, appts) {
    if (err) return console.log(err);
    for (let i = 0; i < appts.length; i++) {
      docs[i] = appts[i].doctor;
      dates[i] = appts[i].date;
      specializations[i] = appts[i].specialization;
      available[i] = appts[i].available;
      patients[i] = appts[i].patients;

      if (Object.values(patients[i]).length > 0) {
        notEmpty = true;
      }
    }
    if (notEmpty) {
      req.flash("success_msg", "Appointments found!");
      res.redirect("/appointments/schedule");
    } else {
      errors.push({ msg: "No appointments booked for " + docs[0] });
      res.render("appts", {
        errors,
      });
    }
  });
});

module.exports = router;
