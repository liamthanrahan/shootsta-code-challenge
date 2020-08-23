import React from 'react'
import Card from 'react-bootstrap/Card'
import { gql, useQuery } from '@apollo/client'

const GET_VIDEOS_QUERY = gql`
  query getVideos {
    videos {
      filename
      path
    }
  }
`

function Home() {
  const { data: { videos = [] } = {} } = useQuery(GET_VIDEOS_QUERY)
  console.log('videos', videos)
  return (
    <>
      <h1>Video list front-end goes here</h1>
      {videos.map(video => (
        <Card key={video.filename}>
          <Card.Body>
            <video controls>
              <source src={video.path} />
            </video>
            <Card.Title>{video.filename}</Card.Title>
          </Card.Body>
        </Card>
      ))}
    </>
  )
}

export default Home
