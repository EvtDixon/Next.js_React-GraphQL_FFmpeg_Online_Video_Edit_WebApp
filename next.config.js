const config = require('./config');

module.exports = () => ({
   env: {
      appUrl: config.url,
   },
});
