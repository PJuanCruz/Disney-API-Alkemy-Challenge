module.exports = {
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.NODEMAILER_USER,
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
};
