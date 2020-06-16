const Dotenv = require('dotenv')

Dotenv.config()

module.exports = {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    url: process.env.APP_URL || 'http://localhost:3000',
}
