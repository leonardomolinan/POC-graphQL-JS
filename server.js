var express = require('express')
var graphqlHTTP = require('express-graphql')
var { buildSchema } = require('graphql')

var schema = buildSchema(`
    type Person {
        name: String
        cpf: String
        age: Int
    }

    type Query {
        persons: [Person]
    }
`)

var root = { 
    name: () => 'Cidadão',
    cpf: () => '85953529090',
    age: () => 24,

    persons: () => ([{
        name: 'Cidadão',
        cpf: '85953529090',
        age: 24
    }])
}

var app = express()
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}))
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'))