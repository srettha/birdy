const { ApolloServer, gql } = require('apollo-server-express')

const { getBirds } = require('./service')

const typeDefs = gql`
  type Query {
    birds: [Bird]
  }

  type Bird {
    id: ID
    commonName: String
    binomialName: String
    class: String
    order: String
    family: String
    genus: String
    species: String
    status: String
    statusRemark: String
    createdAt: String
    updatedAt: String
  }
`

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    birds: () => getBirds(),
  },
}

module.exports = new ApolloServer({ typeDefs, resolvers, playground: true })
