const { Queue, Worker } = require('bullmq')

const { sing } = require('./bird-sings')

const birdQueue = new Queue('bird-sings', { defaultJobOptions: { removeOnComplete: true, removeOnFail: 5 } })
const birdWorker = new Worker('bird-sings', sing)

module.exports = {
  birdQueue,
  birdWorker,
}
