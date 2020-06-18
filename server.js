const next = require('next');
const express = require('express');
const config = require('./config');
const graphqlHTTP = require('express-graphql');
const schema = require('./server/graphql/schema');
const rootValue = require('./server/graphql/root');

const app = next({ dev: config.env !== 'production' });

const handle = app.getRequestHandler();

app.prepare().then(() => {
   const server = express();
   server.use(
      '/graphql',
      graphqlHTTP({
         schema,
         rootValue,
         graphiql: true,
      })
   );
   server.use(express.static('server/frames/frames'));
   server.all('*', (req, res) => {
      return handle(req, res);
   });

   server.listen(config.port, (err) => {
      if (err) throw err;
   });
});
