const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema');

const app = express();
const PORT = 4000;

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}));

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})