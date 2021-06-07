const { Bird } = require('../../db/models')
const { redis } = require('../../redis')

const FIVE_MINUTES_TTL = 60 * 5

async function getCachedBirds() {
  const rawCachedBirds = await redis.get('birds')
  if (!rawCachedBirds) {
    return undefined
  }

  return JSON.parse(rawCachedBirds)
}

function getBirds() {
  return Bird.query()
}

async function getAndCacheBirds() {
  const birds = await getBirds()
  if (birds.length) {
    await redis.setex('birds', FIVE_MINUTES_TTL, JSON.stringify(birds))
  }

  return birds
}

async function getAllBirds() {
  const cachedBirds = await getCachedBirds()
  if (cachedBirds) {
    return cachedBirds
  }

  return getAndCacheBirds()
}

module.exports = {
  getAllBirds,
}
