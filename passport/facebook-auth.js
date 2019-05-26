const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const Alumno = require('../models/Alumno');
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
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