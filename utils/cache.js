const cache = new Map();

function getCache(key) {
  return cache.get(key);
}

function setCache(key, value, ttl = 300000) { // 5 mins TTL
  cache.set(key, value);
  setTimeout(() => cache.delete(key), ttl);
}

module.exports = { getCache, setCache };
