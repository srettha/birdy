exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('bird')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('bird').insert([
        {
          common_name: 'Strawberry finch',
          binomial_name: 'Amandava amandava',
          class: 'Aves',
          order: 'Passeriformes',
          family: 'Estrildidae',
          genus: 'Amandava',
          species: 'A. amandava',
        },
        {
          common_name: 'Northern bobwhite',
          binomial_name: 'Colinus virginianus',
          class: 'Aves',
          order: 'Galliformes',
          family: 'Odontophoridae',
          genus: 'Colinus',
          species: 'C. virginianus',
        },
      ])
    })
}
