const router = require('express').Router();
const passport = require('passport');

router.get('/', (req, res) => {
    res.send('Welcome to Project 2');
});

router.use('/students', require('./student'));

router.use('/teachers', require('./teacher'));

router.use('/', require('./swagger')); //Moved to the bottom to avoid route conflicts

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.session.user = undefined; // Clear the user session
        res.redirect('/');
    });
});

module.exports = router;