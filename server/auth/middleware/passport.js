const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../../database/models/User');

module.exports = function (passportInstance = passport) {
  passportInstance.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/api/auth/google/callback',
        // Force account selection every time
        prompt: 'select_account',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails && profile.emails[0] && profile.emails[0].value;
          
          // Validate student email domain for new users
          if (!email || !email.endsWith('@student.fatima.edu.ph')) {
            return done(new Error('Only Fatima student Google accounts (@student.fatima.edu.ph) are allowed for authentication'), null);
          }
          
          let user = await User.findOne({ googleId: profile.id });

          if (!user) {
            // Check if a user with same email exists
            user = await User.findOne({ email });
            if (user) {
              user.googleId = profile.id;
              await user.save();
            } else {
              // New user defaults to student role for Fatima student emails
              user = await User.create({
                email,
                role: 'student',
                googleId: profile.id,
              });
            }
          }
          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  // Serialize / deserialize not needed for JWT flow, but kept for completeness
  passportInstance.serializeUser((user, done) => {
    done(null, user.id);
  });

  passportInstance.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};
