var router = require('express').Router();
var db = require('mongodb').MongoClient.connect('mongodb://localhost/test');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Q = require('q');

passport.use('login', new LocalStrategy({
        //use req obj in callback func
        passReqToCallback : true
    },
    function(req, username, password, done) {
    if (!username || !password) {
        return done(null, false, {
            msg: 'username or password is needed'
        });
    }
    db.then(function(db) {
        // check user exists and valid
        return db.collection('users').find({
            "username": username,
            "password": password
        }).toArray();
    }).then(function(users) {
        if (!users || users.length == 0) {
            return done(null, false, {
                msg: 'username and password not matched'
            });
        }
        var deferred = Q.defer();
        req.session.user = users[0];
        req.session.save(function(err) {
            if (err) deferred.reject(err);
            else deferred.resolve({
                username: username,
            });
        });
        return deferred.promise;
    }).then(function(info) {
        return done(null, info);
    }).catch(function(err) {
        console.log('login fail', err);
        next(err);
    })
}));


router.get('/', function(req, res, next) {
    var info = {};
    if (req.session && !!req.session.user && !!req.session.user.username) {
        info.username = req.session.user.username;
    }
    res.json(info);
});

router.post('/', function(req, res, next) {
    passport.authenticate('login', function(err, user, info) {
        console.log(err,user,info);
        if(!!info) {
            res.json(info);
        }
        else res.json(user);
    })(req, res, next);
});

router.delete('/', function(req, res, next) {
    req.session.destroy(function(err) {
        if (err) {
            next(err);
        } else res.json({});
    });
});

module.exports = router;
