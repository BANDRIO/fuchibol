const dotenv = require('dotenv');

dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectURI: process.env.GOOGLE_REDIRECT_URI,
    calendarID: process.env.GOOGLE_CALENDAR_ID,
  },
  outlook: {
    clientID: process.env.OUTLOOK_CLIENT_ID,
    clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
    redirectURI: process.env.OUTLOOK_REDIRECT_URI,
  },
  jwtSecret: process.env.JWT_SECRET,
};

module.exports = config;
