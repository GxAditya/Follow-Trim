const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { validateToken } = require('../middleware/auth');
const { fetchFollowingList } = require('../services/socialMedia');
const prisma = new PrismaClient();

// Get following list with filters
router.get('/', validateToken, async (req, res) => {
  try {
    const { sort, mutuals, search } = req.query;
    const userId = req.user.id;

    let orderBy = {};
    switch(sort) {
      case 'interaction':
        orderBy = { lastInteraction: 'desc' };
        break;
      case 'date':
        orderBy = { followDate: 'desc' };
        break;
      default:
        orderBy = { username: 'asc' };
    }

    const where = {
      userId,
      ...(mutuals && { isMutual: true }),
      ...(search && { username: { contains: search } })
    };

    const following = await prisma.following.findMany({
      where,
      orderBy
    });

    res.json(following);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Batch unfollow
router.post('/unfollow', validateToken, async (req, res) => {
  const { userIds } = req.body;
  const userId = req.user.id;

  try {
    // Store unfollow action in Redis for potential undo
    const unfollowKey = `unfollow:${userId}:${Date.now()}`;
    await redis.setex(unfollowKey, 300, JSON.stringify(userIds)); // 5 minute undo window

    // Queue unfollow actions with rate limiting
    const unfollowPromises = userIds.map((followedUserId, index) => {
      return new Promise(resolve => {
        setTimeout(async () => {
          await prisma.following.delete({
            where: {
              userId_followedUserId: {
                userId,
                followedUserId
              }
            }
          });
          resolve();
        }, index * 1000); // 1 second delay between each unfollow
      });
    });

    await Promise.all(unfollowPromises);
    res.json({ success: true, unfollowKey });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
