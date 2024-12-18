export const typeDefs = `#graphql  
    scalar Date

    type User {
        username: String!
        email: String!
        donate_history: [DonateHistory!]
    }

    type DonateHistory {
        id: ID!
        received_userid: String!,
        amount: Float!,
        transfer_date: Date!
    }

    type Query {
        user(username: String!): User
        users: [User]
        donate_history: [DonateHistory]
    }

    type Mutation {
        register(username: String!, password: String!, email: String!): User!
        login(username: String!, password: String!): String!
    }
`;
