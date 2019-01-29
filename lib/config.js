exports.redisPort = process.env.REDIS_PORT || 6379;
exports.redisIP = process.env.REDIS_IP || '127.0.0.1';
exports.redisDB = process.env.REDIS_DB || 0;
exports.disableRedis = process.env.DISABLE_REDIS === 'true' ? true : false;
exports.expires = process.env.REDIS_EXPIRES === 'true' ? true : false;

exports.config = params => {
  if (params.redisPort) exports.redisPort = params.redisPort;
  if (params.redisDB) exports.redisDB = params.redisDB;
  if (params.redisIP) exports.redisIP = params.redisIP;
  if (params.disableRedis) exports.disableRedis = params.disableRedis;
  if (params.expires) exports.expires = params.expires;
};
