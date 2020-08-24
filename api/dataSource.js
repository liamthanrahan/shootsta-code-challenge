const { createWriteStream, readdirSync, unlink } = require('fs')

const VIDEO_DIR = './videos'
const compatibleVideoFormatsRegex = new RegExp(/\.(mp4|webm|ogg)$/)

const data = {
  videos() {
    const videos = readdirSync(VIDEO_DIR)

    const trimmedVideos = videos.filter(file =>
      file.match(compatibleVideoFormatsRegex)
    )

    return trimmedVideos.map(videoFile => ({
      filename: videoFile,
      path: `http://localhost:4000/videos/${videoFile}`,
    }))
  },
  async uploadVideo({ file }) {
    const { createReadStream, filename } = await file
    const stream = createReadStream()
    const fileLocation = `${VIDEO_DIR}/${filename}`

    return await new Promise((resolve, reject) => {
      if (!filename.match(compatibleVideoFormatsRegex)) {
        reject(
          new Error('Error: The uploaded file was not a valid video type.')
        )
      } else {
        const writeStream = createWriteStream(fileLocation)
        writeStream.on('finish', () =>
          resolve({ filename, path: fileLocation })
        )

        writeStream.on('error', error => {
          unlink(fileLocation, () => {
            reject(error)
          })
        })

        stream.pipe(writeStream)
      }
    })
  },
}

module.exports = data
