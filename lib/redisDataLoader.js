const { redisPort, redisIP, disableRedis } = require('./config');
const { toString, parse } = require('./utils');
const DataLoader = require('dataloader');
const Redis = require('ioredis');
const redisClient = new Redis(redisPort, redisIP);

module.exports = function(prefix, cb) {
  if (disableRedis) return new DataLoader(cb);

  const loader = new DataLoader(keys => {
    let prefixedKeys = keys.map(getRedisKey);
    return new Promise((resolve, reject) => {
      redisClient.mget(prefixedKeys, (error, results) => {
        if (error) return reject(error);
        Promise.all(results.map((r, i) => {
          if (r === '') return null;
          if (r !== null) return parse(r);
          return getAndSet(keys[i]);
        }))
        .then(resolve);
      });
    });
  }, { cache: false });

  const getAndSetLoader = new DataLoader(keys => {
    return cb(keys).then(data => {
      let multi = redisClient.multi();
      keys.forEach((key, i) => {
        let str = toString(data[i]);
        if (str !== undefined) multi.set(getRedisKey(key), str);
      });

      return new Promise((resolve, reject) => {
        multi.exec((error, response) => {
          if (error) reject(error);
          else resolve(data);
        });
      });
    });
  }, { cache: false });


  function getRedisKey(key) {
    if (typeof key === 'object') {
      return Object.keys(key).reduce((a, k) => {
        return a += `:${key[k]}`;
      }, prefix);
    }
    return `${prefix}:${key}`;
  }

  function getAndSet(key) {
    return getAndSetLoader.load(key);
  }

  function prime(key) {
    loader.load(key);
  }

  function clear() {
    return new Promise((resolve, reject) => {
      redisClient.del(getRedisKey(key), (error, response) => error ? reject(error) : resolve(response));
    });
  }

  function clearAll() {
    return new Promise((resolve, reject) => {
      var stream = redisClient.scanStream({ match: `${prefix}:*` });
      stream.on('data', function (keys) {
        if (keys.length) {
          var pipeline = redisClient.pipeline();
          keys.forEach(function (key) {
            pipeline.del(key);
          });
          pipeline.exec();
        }
      });
      stream.on('error', reject);
      stream.on('end', resolve);
    });
  }

  return {
    load: key => loader.load(key),
    loadMany: keys => loader.loadMany(keys),
    prime: prime,
    clear: clear,
    clearAll: clearAll
  };
};