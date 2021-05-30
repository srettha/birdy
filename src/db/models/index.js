/* eslint-disable import/no-dynamic-require, global-require */
const glob = require('glob')
const Knex = require('knex')
const { capitalize } = require('lodash')
const { Model } = require('objection')

const knexConfigFile = require('../../knexfile')[process.env.NODE_ENV || 'development']

const knex = Knex(knexConfigFile)

Model.knex(knex)

const modelPaths = glob.sync(`${__dirname}/**.js`, { ignore: [`${__dirname}/base.js`, `${__dirname}/index.js`] })

module.exports = modelPaths.reduce((models, modelPath) => {
  const modelNameWithExtension = modelPath.split(`${__dirname}/`).filter(Boolean)
  const modelName = capitalize(modelNameWithExtension[0].split('.js').filter(Boolean))

  return {
    ...models,
    [modelName]: require(modelPath),
  }
}, {})
