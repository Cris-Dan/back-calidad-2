const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const Alumno = require('../models/Alumno');
passport.use(new FacebookStrategy({
    clientID: '392577364672451',
    clientSecret: '45dabf86f2b2d1ab7c0c88292b322f92',
    callbackURL: "http://localhost:3000/api/facebook/callback"
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(accessToken, refreshToken, profile);
            Alumno.findOrCreate({ facebookId: profile.id });
        } catch (error) {
            done(error,false,null);
        }
    }
));