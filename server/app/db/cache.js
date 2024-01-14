require("dotenv").config();
const NodeCache = require("node-cache");
const cache = new NodeCache();

function keys(pattern) {
  return cache.keys().filter((k) => k.includes(pattern.replace("*", "")));
}

const get = cache.get;
const del = cache.del;
const set = cache.set;

module.exports = { get, del, set, keys };
