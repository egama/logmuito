const redis = require('redis');
const configApp = require('../../_config/config');
const redisClient = redis.createClient();

class RedisHelper {
    /**
     * Method for get cache by key
     * @param {string} _key Param to receive a key for find obj
     * @returns {object} Return obj saved
     */
    getCache(_key) {
        return new Promise((_resolve, _reject) => {
            redisClient.get(_key, (err, rep) => {
                if (err)
                    _reject(err);
                else
                    _resolve(rep);
            });
        });
    }

    /**
     * Method to set data in cache
     * @param {string} _key  Key for identification data
     * @param {object} _value Value to set in row.
     */
    setCache(_key, _value) {
        return new Promise((_resolve, _reject) => {
            redisClient.set(_key, _value, 'EX', configApp.redisAccess.timeExpire, (err) => {
                if (err)
                    _reject(err);
                else
                    _resolve(_value);
            });
        });
    }
}

module.exports = RedisHelper;