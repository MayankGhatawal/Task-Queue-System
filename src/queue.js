const Queue = require('bull');
const client = require('../config/redisConfig');

const taskQueue = new Queue('taskQueue', {
    redis: {
        host: '127.0.0.1',
        port: 6379,
    },
});

taskQueue.process(async (job, done) => {
    const { userId } = job.data;
    // Simulate task completion
    console.log(`${userId} - Task completed at - ${new Date().toISOString()}`);
    const log = `${userId} - Task completed at - ${new Date().toISOString()}\n`;

    // Log to file
    require('fs').appendFileSync('./logs/task_log.txt', log);

    done();
});

module.exports = taskQueue;
