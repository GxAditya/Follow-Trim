const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const instagramOAuth = {
  async getAccessToken(code) {
    const response = await axios.post('https://api.instagram.com/oauth/access_token', {
      client_id: process.env.INSTAGRAM_CLIENT_ID,
      client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: process.env.INSTAGRAM_REDIRECT_URI,
      code
    });
    return response.data;
  },

  async refreshToken(refreshToken) {
    const response = await axios.post('https://api.instagram.com/oauth/refresh_access_token', {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    });
    return response.data;
  }
};

const twitterOAuth = {
  async getAccessToken(code) {
    const response = await axios.post('https://api.twitter.com/2/oauth2/token', {
      code,
      grant_type: 'authorization_code',
      client_id: process.env.TWITTER_CLIENT_ID,
      redirect_uri: process.env.TWITTER_REDIRECT_URI,
      code_verifier: 'challenge'
    });
    return response.data;
  }
};

module.exports = { instagramOAuth, twitterOAuth };
