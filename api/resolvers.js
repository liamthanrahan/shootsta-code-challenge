const { v4 } = require('uuid')
const { createWriteStream, readdirSync, unlink } = require('fs')

const VIDEO_DIR = './videos/'

const data = {
  videos() {
    const videos = readdirSync(VIDEO_DIR)
    console.log('getVideos', videos, __dirname)
    return videos.map(videoFile => ({
      filename: videoFile,
      path: `${__dirname}${'\\videos\\'}${videoFile}`,
    }))
  },
  async uploadVideo({ file }) {
    console.log('uploadVideo', file)
    const { createReadStream, filename } = await file
    const stream = createReadStream()
    // const id = v4()
    const fileLocation = `${VIDEO_DIR}/${filename}`

    await new Promise((resolve, reject) => {
      const writeStream = createWriteStream(fileLocation)
      writeStream.on('finish', resolve)

      writeStream.on('error', error => {
        unlink(fileLocation, () => {
          reject(error)
        })
      })

      stream.pipe(writeStream)
    })
  },
}

const resolvers = {
  Query: {
    hello: () => 'Hello World',
    videos: (parent, args) => data.videos(),
  },
  Mutation: {
    uploadVideo: (parent, args) => data.uploadVideo(args),
  },
}

module.exports = resolvers
