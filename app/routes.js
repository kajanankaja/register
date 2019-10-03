// app/routes.js
const mongoose = require('mongoose');
var host       = require('./models/host');
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });
    app.get('/host', isLoggedIn, function(req, res) {
        res.render('host.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
    app.get('/success', function(req, res) {
        res.render('success.ejs'); // load the index.ejs file
    });
    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
     app.post('/signup', passport.authenticate('local-signup', {
         successRedirect : '/profile', // redirect to the secure profile section
         failureRedirect : '/signup', // redirect back to the signup page if there is an error
         failureFlash : true // allow flash messages
     }));

    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
    app.get('/host', isLoggedIn, function(req, res) {
        res.render('host.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    app.post('/host', function(req, res) {


      var newhost = new host();
      newhost.firstName = req.body.firstName;
      newhost.lastName = req.body.lastName;
      newhost.nic = req.body.nic;
      newhost.address = req.body.address;
      newhost.phonenumber = req.body.phonenumber;

      newhost.save(function(err,newhost){
          if(err){
            res.redirect('/host');
              console.log(err);
          }else{
            res.redirect('/success');
              console.log("Document Save Done");
 }
	});
  });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}
