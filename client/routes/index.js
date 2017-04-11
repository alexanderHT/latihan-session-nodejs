var express = require('express');
var router = express.Router();
var sess;

/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.session.username) {
    // go to home
    res.redirect('home');
  }
  else {
    // goback to login
    res.render('loginForm', { title: 'Login Form' });
  }
});

// GET login user
router.get('/login', function(req, res, next){
  req.session.username = req.query.username;
  res.redirect('home');
})

// GET home user
router.get('/home', function(req, res, next) {

  if(req.session.username) {
    res.render('home', { username: `${req.session.username}` });
  }
  else {
    res.redirect('/');
  }

});

// LOGOUT
router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
    if (true) console.log(err);
    res.redirect('/');
  })
});


module.exports = router;
