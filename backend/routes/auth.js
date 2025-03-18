const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { instagramOAuth, twitterOAuth } = require('../services/oauth');
const prisma = new PrismaClient();

router.get('/instagram/callback', async (req, res) => {
  try {
    const { code } = req.query;
    const { access_token, refresh_token, user_id } = await instagramOAuth.getAccessToken(code);
    
    let user = await prisma.user.upsert({
      where: { platform_id: { platform: 'instagram', platformId: user_id } },
      update: { 
        accessToken: access_token,
        refreshToken: refresh_token
      },
      create: {
        platform: 'instagram',
        platformId: user_id,
        accessToken: access_token,
        refreshToken: refresh_token
      }
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.redirect(`/auth/success?token=${token}`);
  } catch (error) {
    res.redirect('/auth/error');
  }
});

router.get('/twitter/callback', async (req, res) => {
  try {
    const { code } = req.query;
    const { access_token, refresh_token } = await twitterOAuth.getAccessToken(code);
    
    let user = await prisma.user.upsert({
      where: { platform_id: { platform: 'twitter', platformId: user_id } },
      update: { 
        accessToken: access_token,
        refreshToken: refresh_token
      },
      create: {
        platform: 'twitter',
        platformId: user_id,
        accessToken: access_token,
        refreshToken: refresh_token
      }
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.redirect(`/auth/success?token=${token}`);
  } catch (error) {
    res.redirect('/auth/error');
  }
});

module.exports = router;