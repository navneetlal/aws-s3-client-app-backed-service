import redis from 'redis';

const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379,
  enable_offline_queue: false,
});

export default redisClient;