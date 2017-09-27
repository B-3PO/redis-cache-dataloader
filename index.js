const { config } = require('./lib/config');
const RedisDataLoader = require('./lib/redisDataLoader');

module.exports = RedisDataLoader;
module.exports.config = config;
