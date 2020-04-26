const express = require('express');
const router = express.Router();
const moment = require ('moment');

//Appointment model
const Appointment = require('../models/Appointment');

//Doctors page
router.get('/docs', (req, res) => res.render('docs'));

//Appointments page
router.get('/appts', (req, res) => res.render('appts'));

//Doctors handle
router.post('/docs', (req, res) => {
    const { doctor, specialization, date1 } = req.body;

    let errors = [];
    var date =moment(date1);
    var date = date.format("DD-MM-YYYY HH:mm"); //Thank you god for moment.js

    //check required fields
    if (!doctor || !specialization || !date) {
        errors.push({ msg: 'Please fill in all the fields!' });
    }

    if (errors.length > 0) {
        res.render('docs', {
            errors,
            doctor,
            specialization,
            date
        });
    }
    else {
        //all fields filled
        Appointment.findOne({ doctor: doctor, date: date })
            .then(appointment => {
                if (appointment) {
                    errors.push({ msg: 'Date is already added' });
                    res.render('docs', {
                        errors,
                        doctor,
                        specialization,
                        date
                    });
                } else {
                    const newApp = new Appointment({
                        doctor,
                        specialization,
                        date
                    });

                    newApp.save()
                        .then(appointment=>{
                            req.flash('success_msg', 'Doctor added!');
                            res.redirect('/appointments/appts');
                        })
                        .catch(err => console.log(err));
                }
            })
    }
});






module.exports = router;