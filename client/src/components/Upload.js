import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { Container, Button } from 'react-bootstrap'
import { gql, useMutation, useApolloClient } from '@apollo/client'

const UPLOAD_MUTATION = gql`
  mutation uploadVideo($file: Upload!) {
    uploadVideo(file: $file) {
      id
    }
  }
`

function Upload() {
  const [videoToUpload, setVideoToUpload] = useState(null)
  const [uploadVideoMutation] = useMutation(UPLOAD_MUTATION)
  const apolloClient = useApolloClient()

  function onChange({
    target: {
      validity,
      files: [file],
    },
  }) {
    if (validity.valid)
      uploadVideoMutation({ variables: { file } }).then(() => {
        apolloClient.resetStore()
      })
  }

  const onSubmit = event => {
    event.preventDefault()
  }

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Form.File
          id="upload-video"
          label="Upload Video"
          required
          onChange={onChange}
        />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default Upload
