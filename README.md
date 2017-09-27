# redis-cache-dataloader
A wrapper for dataloader that uses redis as a cache layer in place of the default memory cache. This is able to be swapped with dataloader without changing any code.

Quick Links:
* [Install](#install)
* [Config](#config)
* [Create RedisDataLoader](#create)


## <a name="install"></a> Install
```bash
npm install redis-cache-dataloader --save
```

## <a name="config"></a> config
setup RedisDataLoader config.
You will need to pass in the redis port and ip address.
You can also disable redis usage. this will use dataloader normally with caching enabled.

```javascript
// 1. using env vars
process.env.REDIS_PORT = 6379; // default: 6379;
process.env.REDIS_IP = '127.0.0.1'; // default: '127.0.0.1';
process.env.DISABLE_REDIS = false; // default: false

// 2. using config function
const RedisDataLoader = require('redis-cache-dataloader');
RedisDataLoader.config({
  redisPort: process.env.REDIS_PORT, // default: 6379;
  redisIP: process.env.REDIS_IP, // default: '127.0.0.1';
  disableRedis: process.env.DISABLE_REDIS // default: false
});
```

## <a name="create"></a> Create RedisDataLoader
Create a new RedisDataLoader instance. This has the same interface as DataLoader so you can use it exactly the same way.
[DataLoader link](https://github.com/facebook/dataloader)
[Loading Data Eaxamples](https://github.com/facebook/dataloader/tree/master/examples)
```javascript
const RedisDataLoader = require('redis-cache-dataloader');

// id you want to not use redis when developing locally you can disable the redis cache, which will then turn on in memory caching
// RedisDataLoader.config({ disableRedis: true });

var loader = new RedisDataLoader('itemPrefix', keys => {
  // connect to data source. Check out Loading Data Examples link above
  return new Promise((resolve, reject) => {
    resolve(keys.map(key => {
      return { id: key };
    }));
  });
});


// prime cache
loader.prime(1)

// load
loader.load(1);

// clear
loader.clear(1);
```
