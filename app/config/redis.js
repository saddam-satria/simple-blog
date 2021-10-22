const redis = require('redis');

const PORT_REDIS = process.env.PORT_REDIS || 6379;
const client = redis.createClient(PORT_REDIS);

module.exports = { client };
