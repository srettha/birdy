// Update with your config settings.

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'birdy',
      user: 'birdy',
      password: 'birdy',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations',
    },
    seeds: {
      tableName: 'knex_seeds',
      directory: './db/seeds',
    },
  },
}
