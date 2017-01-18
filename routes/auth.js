var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var User = require('./../model/userModel');
var users = require('./../data/users.js');
var router = express.Router();
var fs = require('fs');
var express = require('express');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  
    function (username, password, done) {
      var topic = User.find(function (elem) {
            return elem.username == username;
        });

      console.log(topic);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user && user._id);
});

passport.deserializeUser(function (id, done) {
    User.find({
        _id: id
    }, '-password', function(err, user){
        if(err) {
            console.error(err);
            return done(err);
        }
        done(null, user);
    });
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) return next(err); 
        
        if (!user) {
            return res.json({
               success: false,
                data: {
                    message: 'Authentication failed',
                    details: info.message
                }
            });
        }

       req.logIn(user, function(err) {
            if (err) return next(err);

           res.json({
                success: true,
                data: {
                    message: 'Authentication succeeded',
                    user: user
                }
            });
        });
    })(req, res, next);
});

router.get('/logout', function(req, res){
    req.logout();
    res.json({ success: true });
});

module.exports = router;
// Own
// router.post("/auth", function(req, res) {  
//     if (req.body.username && req.body.password) {
//         var username = req.body.username;
//         var password = req.body.password;
       
//         var user = users.find(function(u) {
//             return u.username === username && u.password === password;
//         });
//         if (user) {   
//             console.log('Authentication succeeded');
//             res.sendStatus(200);
//         } else {
//             res.sendStatus(401);
//             console.log('Authentication failed');
//         }
//     } else {
//         res.sendStatus(401);
//     }
// });

// router.post('/registration', function(req, res, next) {
//  if (req.body.username && req.body.password) {
//       var username = req.body.username;
//       var password = req.body.password;
     
//       var user = users.find(function(u) {
//           return u.username === username && u.password === password;
//       });
//       if (user) {

//         console.log("User is already exist");
//         res.send(401);
//       } else {
//         users.push(new User(req.body.username, req.body.password, 0));
//         console.log(users);
//         res.send(200);
//       }
//   } else {
//     res.sendStatus(401);
//   }   
// });


// router.get('/logout', function(req, res){
//     window.location.href = "/login.html";
// });
