exports.redisPort = process.env.REDIS_PORT || 6379;
exports.redisIP = process.env.REDIS_IP || '127.0.0.1';
exports.disableRedis = process.env.DISABLE_REDIS === 'true' ? true : false;
exports.config = params => {
  if (params.redisPort) exports.redisPort = params.redisPort;
  if (params.redisIP) exports.redisIP = params.redisIP;
  if (params.disableRedis) exports.disableRedis = params.disableRedis;
};
