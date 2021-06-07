const { snakeCaseMappers, Model } = require('objection')

const BaseModel = require('./base')

class Bird extends BaseModel {
  static get tableName() {
    return 'bird'
  }

  static get columnNameMappers() {
    return snakeCaseMappers()
  }

  static relationMappings() {
    return {
      productSKUs: {
        relation: Model.HasManyRelation,
        modelClass: 'Song',
        join: {
          from: 'bird.id',
          to: 'song.bird_id',
        },
      },
    }
  }
}

module.exports = Bird
