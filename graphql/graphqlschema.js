const { gql } = require('apollo-server-express');
const bcrypt = require('bcrypt');

// Define your AddressInput type
const typeDefs = gql`
input AddressInput {
  country: String!
  city: String!
  address1: String!
  zipCode: String!
  addressType: String!
}

type User {
  id: ID!
  name: String!
  email: String!
  addresses: [Address]!
  phoneNumber: String!
}

type Address {
  country: String!
  city: String!
  address1: String!
  zipCode: String!
  addressType: String!
}

type Query {
  getUser(id: ID!): User
}

type Mutation {
  signup(
    name: String!
    email: String!
    password: String!
    addresses: [AddressInput]!
    phoneNumber: String!
  ): User
  login(email: String!, password: String!): String
}
`; 

module.exports = typeDefs;
