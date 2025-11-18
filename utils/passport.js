const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userschema');
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value
      });
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

// passport.serializeUser((user, done) => done(null, user.id));   // serializeUser(user, done): called when you want Passport to save user identification into the session. You decide what to store; typically user.id. done(null, id) stores the id in session.
// passport.deserializeUser((id, done) => User.findById(id, done));// deserializeUser(id, done): called on every request that has a session. Passport retrieves the stored id from session and calls this function to fetch the full user from DB. Result is attached to req.user.