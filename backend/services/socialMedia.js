const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();

const fetchFollowingList = async (userId, platform, accessToken) => {
  const cacheKey = `following:${userId}:${platform}`;
  const cached = await redis.get(cacheKey);
  
  if (cached) {
    return JSON.parse(cached);
  }

  let following = [];
  if (platform === 'instagram') {
    following = await fetchInstagramFollowing(accessToken);
  } else {
    following = await fetchTwitterFollowing(accessToken);
  }

  await redis.setex(cacheKey, 3600, JSON.stringify(following)); // Cache for 1 hour
  return following;
};

const unfollowUser = async (platform, targetUserId, accessToken) => {
  if (platform === 'instagram') {
    return axios.delete(`https://graph.instagram.com/v12.0/${targetUserId}/following`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
  } else {
    return axios.delete(`https://api.twitter.com/2/users/${targetUserId}/following`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
  }
};

module.exports = {
  fetchFollowingList,
  unfollowUser
};
