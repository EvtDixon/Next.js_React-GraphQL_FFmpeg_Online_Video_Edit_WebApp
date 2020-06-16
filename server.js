const next = require('next')
const express = require('express')
const config = require('./config')
const graphqlHTTP = require('express-graphql')
const schema = require('./server/graphql/schema')
const rootValue = require('./server/graphql/root')

const app = next({ dev: config.env !== 'production' })

const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express()

    /**
     *
     * Register the graphql http
     * server
     */
    server.use(
        '/graphql',
        graphqlHTTP({
            schema,
            rootValue,
            graphiql: true,
        })
    )

    /**
     *
     * This registers the frames folder as a location
     * for loading assets. That way express
     * can load preview images when
     * then browser requests.
     */
    server.use(express.static('server/frames/frames'))

    /**
     *
     * Handle all other requests with next.js
     */
    server.all('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(config.port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${config.port}`)
    })
})
