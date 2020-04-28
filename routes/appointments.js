const express = require('express');
const router = express.Router();
const moment = require('moment');



//Appointment model
const Appointment = require('../models/Appointment');

//Doctors page
router.get('/docs', (req, res) => res.render('docs'));

//Appointments page
router.get('/appts', (req, res) => res.render('appts'));

//schedules page
router.get('/schedule', (req, res) => res.render('schedule', {doc: docs}));


//Doctors handle
router.post('/docs', (req, res) => {
    const { doctor, specialization, date1 } = req.body;

    let errors = [];
    var date = moment(date1);
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
                    errors.push({ msg: 'Slot is already added' });
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
                        .then(appointment => {
                            req.flash('success_msg', 'Doctor added!');
                            res.redirect('/appointments/appts');
                        })
                        .catch(err => console.log(err));
                }
            })
    }
});
var docs = [];
router.post('/appts', (req, res) => {
    
    const { doctor } = req.body;

    function getApp(doctor) {
        var query = Appointment.find({ doctor: doctor });
        return query;
    }

    var query = getApp(doctor);
    query.exec(function (err, appts) {
        if (err)
            return console.log(err);
        for (let i = 0; i < appts.length; i++) {
            docs[i] = Object.values(appts[i]);
            console.log(docs[i]);
        }
        res.redirect('/appointments/schedule');
    });    
//    console.log(docs[0]);

});




module.exports = router;