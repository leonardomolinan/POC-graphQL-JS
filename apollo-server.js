const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

const typeDefs = gql`
    type Person {
        name: String,
        cpf: String,
        age: Int
    }

    type City {
        name: String,
        state: String,
        cep: Int
    }

    type Query {
        persons: [Person],
        cities: [City]
    }
`

const resolvers = {
    Query: {
        persons: () => ([
            {
                name: 'Cidadão',
                cpf: '85953529090',
                age: 24
            }
        ]),

        cities: () => ([
            {
                name: 'Uberlândia',
                state: 'MG',
                cep: 38408090
            }
        ])
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

const app = express()
server.applyMiddleware({ app })

app.listen({ port: 4000 }, () => console.log('Now browse to http://localhost:4000' + server.graphqlPath))