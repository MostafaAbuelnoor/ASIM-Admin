const express = require ('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

//Welcome page
router.get('/', (req, res) => res.render('welcome')); 

//Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

//About page
router.get('/about', ensureAuthenticated, (req, res) => res.render('about', {user: req.user})); 

//Appointments page
router.get('/appts', ensureAuthenticated, (req, res) => res.render('appts', {user: req.user})); 

//Contact US page
router.get('/contact', ensureAuthenticated, (req, res) => res.render('contact', {user: req.user})); 

//Doctors page
router.get('/docs', ensureAuthenticated, (req, res) => res.render('docs', {user: req.user})); 



module.exports = router;