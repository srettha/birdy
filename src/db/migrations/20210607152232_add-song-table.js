const songTableName = 'song'

exports.up = function up(knex) {
  return knex.transaction(async (trx) => {
    await trx.schema.createTable(songTableName, (table) => {
      table.increments('id').notNull().unsigned().primary()

      table.string('name')

      table.string('description')
      table.integer('bird_id').unsigned().references('id').inTable('bird')

      table.dateTime('created_at').notNull().defaultTo(knex.fn.now())
      table.dateTime('updated_at').notNull().defaultTo(knex.fn.now())
    })
  })
}

exports.down = function down(knex) {
  return knex.transaction(async (trx) => {
    await trx.schema.dropTable(songTableName)
  })
}
