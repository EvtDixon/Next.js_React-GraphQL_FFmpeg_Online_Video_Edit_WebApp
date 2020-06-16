const { buildSchema } = require('graphql')

module.exports = buildSchema(`
    type Query {
        videos: [Video]
        video(id: Int!): Video
    }

    type Video {
        fileName: String
        framesCount: Int
    }
`)
