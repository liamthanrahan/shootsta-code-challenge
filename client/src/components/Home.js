import React from 'react'
import Card from 'react-bootstrap/Card'

const exampleData = [
  {
    id: 1,
    filename: 'Some file.mp4',
    date: new Date(),
  },
]

function Home() {
  return (
    <>
      <h1>Video list front-end goes here</h1>
      {exampleData.map(video => (
        <Card key={video.id}>
          <Card.Body>
            <Card.Img></Card.Img>
            <Card.Title>{video.filename}</Card.Title>
            <Card.Subtitle>
              Uploaded on {video.date.toDateString()}
            </Card.Subtitle>
          </Card.Body>
        </Card>
      ))}
    </>
  )
}

export default Home
