const birdTableName = 'bird'

exports.up = function up(knex) {
  return knex.transaction(async (trx) => {
    await trx.schema.createTable(birdTableName, (table) => {
      table.increments('id').notNull().unsigned().primary()

      table.string('common_name')
      table.string('binomial_name')

      table.string('class')
      table.string('order')
      table.string('family')
      table.string('genus')
      table.string('species')

      table.string('status')
      table.string('status_remark')

      table.dateTime('created_at').notNull().defaultTo(knex.fn.now())
      table.dateTime('updated_at').notNull().defaultTo(knex.fn.now())
    })
  })
}

exports.down = function down(knex) {
  return knex.transaction(async (trx) => {
    await trx.schema.dropTable(birdTableName)
  })
}
