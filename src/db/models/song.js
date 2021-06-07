const { snakeCaseMappers } = require('objection')

const BaseModel = require('./base')

class Song extends BaseModel {
  static get tableName() {
    return 'song'
  }

  static get columnNameMappers() {
    return snakeCaseMappers()
  }
}

module.exports = Song
