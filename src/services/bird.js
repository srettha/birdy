const { Bird } = require('../db/models')
const { redis } = require('../redis')

const BIRD_TTL = 60 * 2 // 2 minutes
const BIRDS_TTL = 60 * 5 // 5 minutes

function getBirdByIdFromDB(birdId) {
  return Bird.query().where('id', birdId).first()
}

function getBirdsFromDB() {
  return Bird.query()
}

async function getCachedBirdByBirdId(birdId) {
  const bird = await redis.get(`birds:${birdId}`)
  if (!bird) {
    return undefined
  }

  return JSON.parse(bird)
}

async function getCachedBirds() {
  const rawCachedBirds = await redis.get('birds')
  if (!rawCachedBirds) {
    return undefined
  }

  return JSON.parse(rawCachedBirds)
}

async function getAndCacheBirds() {
  const birds = await getBirdsFromDB()
  if (birds.length) {
    await redis.setex('birds', BIRDS_TTL, JSON.stringify(birds))
  }

  return birds
}

async function getAndCacheBirdByBirdId(birdId) {
  const bird = await getBirdByIdFromDB(birdId)
  if (bird) {
    await redis.set(`birds:${birdId}`, BIRD_TTL, JSON.stringify(bird))
  }

  return bird
}

async function getAllBirds() {
  const cachedBirds = await getCachedBirds()
  if (cachedBirds) {
    return cachedBirds
  }

  return getAndCacheBirds()
}

async function getBirdByBirdId(birdId) {
  const bird = await getCachedBirdByBirdId(birdId)
  if (bird) {
    return bird
  }

  return getAndCacheBirdByBirdId(birdId)
}

module.exports = {
  getAllBirds,
  getBirdByBirdId,
}
