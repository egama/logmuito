const redis = require('redis');
const configApp = require('../../_config/config');
const redisClient = redis.createClient();

class Redis {
    getCache = (key) => {
        return new Promise((resolve, reject) => {
            redisClient.get(key, (err, rep) => {
                if (err)
                    reject(err);
                else
                    resolve(rep);
            });
        });
    }

    setCache = (key, value) => {
        return new Promise((resolve, reject) => {
            redisClient.set(key, value, 'EX', configApp.redisAccess.timeExpire, (err) => {
                if (err)
                    reject(err);
                else
                    resolve(value);
            });
        });
    }
}