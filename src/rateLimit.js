const client = require('../config/redisConfig');

const rateLimit = async (userId) => {
    const now = Date.now();
    const key = `user:${userId}:timestamps`;

    const timestamps = await client.lrange(key, 0, -1);
    
    const lastSecondTasks = timestamps.filter(ts => now - ts < 1000);
    const lastMinuteTasks = timestamps.filter(ts => now - ts < 60000);

    if (lastSecondTasks.length >= 1 || lastMinuteTasks.length >= 20) {
        return false;
    }

    await client.rpush(key, now);
    await client.expire(key, 60);

    return true;
};

module.exports = rateLimit;
