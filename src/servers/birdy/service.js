const { Bird } = require('../../db/models')
const { redis } = require('../../redis')

async function getCachedBirds() {
  const rawCachedBirds = await redis.get('birds')
  if (!rawCachedBirds) {
    return undefined
  }

  return JSON.parse(rawCachedBirds)
}

async function getAllBirds() {
  const cachedBirds = await getCachedBirds()
  if (cachedBirds) {
    return cachedBirds
  }

  return Bird.query()
}

module.exports = {
  getAllBirds,
}
