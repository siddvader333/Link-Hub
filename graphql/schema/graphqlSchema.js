const { buildSchema } = require("graphql");

module.exports = buildSchema(`

type Link {
    _id: ID!
    linkTitle: String!
    linkUrl: String!
    linkId: String!
    collectionId: String!
}

input LinkInput {
    linkTitle: String!
    linkUrl: String!
    collectionId: String!
}

type Collection {
    _id: ID!
    collectionTitle: String!
    collectionId: String!
    userId: String!
}

input CollectionInput {
    collectionTitle: String!
}

type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    userId: String!
}

input UserInput{
    name: String!
    email: String!
    password: String! 
    confirmPassword: String!
}

type AuthData {
    userId: String!
    token: String!
    tokenExpiration: Int!
}

input RefreshToken{
    refreshToken: String!
    refreshExpiryDate: String!
}

type RootQuery {
    getLinksByCollectionId(collectionId: String!): [Link!]!
    getCollectionsByUserId(userId: String!) : [Collection!]!
    loginUser(email: String!, password: String!): AuthData!
    refreshAccessToken(refreshAccessTokenInput: RefreshToken): AuthData!
}

type RootMutation {
    createCollection(collectionInput: CollectionInput): Collection
    createLink(linkInput: LinkInput) : Link
    createUser(userInput: UserInput) : User
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
