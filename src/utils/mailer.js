const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const accountTransport = require('../config/nodemailer');

const { OAuth2 } = google.auth;

const mailRover = async (cb) => {
  const oauth2Client = new OAuth2(
    accountTransport.auth.clientId,
    accountTransport.auth.clientSecret,
    'https://developers.google.com/oauthplayground',
  );
  oauth2Client.setCredentials({
    refresh_token: accountTransport.auth.refreshToken,
    tls: {
      rejectUnauthorized: false,
    },
  });
  oauth2Client.getAccessToken((error, token) => {
    if (error) console.log(error);
    accountTransport.auth.accessToken = token;
    cb(nodemailer.createTransport(accountTransport));
  });
};

module.exports = mailRover;
