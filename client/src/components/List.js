import React from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

const exampleData = [
  {
    filename: 'Some file.mp4',
  },
]

function List() {
  return (
    <Container>
      Video list front-end goes here
      {exampleData.map(video => (
        <Card>
          <Card.Body>
            <Card.Title>{video.filename}</Card.Title>
          </Card.Body>
        </Card>
      ))}
    </Container>
  )
}

export default List
