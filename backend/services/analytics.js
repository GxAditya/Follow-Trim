const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const calculateEngagementScore = async (userId, followedUserId, platform) => {
  // Implement platform-specific engagement calculation
  const score = platform === 'instagram' 
    ? await calculateInstagramEngagement(userId, followedUserId)
    : await calculateTwitterEngagement(userId, followedUserId);

  await prisma.following.update({
    where: {
      userId_followedUserId: {
        userId,
        followedUserId
      }
    },
    data: {
      engagementScore: score
    }
  });

  return score;
};

const trackFollowingTrends = async (userId, platform) => {
  const today = new Date();
  const followCount = await prisma.following.count({
    where: { userId, platform }
  });

  await prisma.analytics.create({
    data: {
      userId,
      platform,
      followCount,
      date: today
    }
  });
};

module.exports = {
  calculateEngagementScore,
  trackFollowingTrends
};
