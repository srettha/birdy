const { Song } = require('../db/models')

async function singASongByBird(bird) {
  return Song.query().insert({
    name: '__SONG_NAME__',
    description: '__SONG_DESCRIPTION__',
    bird_id: bird.id,
  })
}

module.exports = {
  singASongByBird,
}
