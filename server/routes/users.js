var express = require('express');
var router = express.Router();
var User = require('../models/users_model');


/* GET users listing. */
router.get('/', function(req, res, next) {

  User.find({}, function(err, data){
    if (err) res.json(err)
    res.json(data)
  })

});

/* POST registering new user */
router.post('/register', function(req, res, next) {

  // create a new user
  var newUser = User({
    username: req.body.username,
    password: req.body.password
  });

  // save the user
  newUser.save(function(err, data) {
    if (err) {
      res.json(err)
    }else{
      res.json(data)
    }

  });

});

/* POST user login */
router.post('/login', function(req, res, next) {
  User.findOne({ username: req.body.username }, function(err, data){
    if (err) {
       res.json(err)
    } else {
      if (data) {
        // data found
        if(data.password == req.body.password ){
          res.json(data)
        }else{
          // data not match
          res.json("check username and password again")
        }
      }else{
        // username not found
        res.json("username not found")
      }
    }
  })

});


module.exports = router;
