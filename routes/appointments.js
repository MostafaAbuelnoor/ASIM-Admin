const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//Appointment model
const Appointment = require('../models/Appointment');

router.get('/dashboard', (req, res) => res.render('dashboard'));



