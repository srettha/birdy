const { snakeCaseMappers } = require('objection')

const BaseModel = require('./base')

class Bird extends BaseModel {
  static get tableName() {
    return 'bird'
  }

  static get columnNameMappers() {
    return snakeCaseMappers()
  }
}

module.exports = Bird
