import React from 'react'
import Form from 'react-bootstrap/Form'
import { Container } from 'react-bootstrap'

function Upload() {
  return (
    <Container>
      <Form>
        <Form.File id="upload-video" label="Upload Video" />
      </Form>
    </Container>
  )
}

export default Upload
