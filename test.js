// process.env.
const RedisDataLoader = require('./index');

let rootLoader = new RedisDataLoader('menussss6', keys => {
  return new Promise((resolve, reject) => {
    if (keys.length === 1 && keys[0] === 1) {
      resolve([{ id: 1, name: 'one' }]);
    } else if (keys.length === 1 && keys[0] === 2) {
      resolve([{ id: 2, name: 'two' }]);
    } else {
      resolve([
        { id: 1, name: 'one' },
        { id: 2, name: 'two' }
      ]);
    }
  });
});

rootLoader.prime(1);
setTimeout(() => {
  Promise.all([
    rootLoader.load(1),
    rootLoader.load(2)
  ]).then(data => console.log(data));
}, 1000);
