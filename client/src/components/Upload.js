import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { Container, Alert } from 'react-bootstrap'
import { gql, useMutation, useApolloClient } from '@apollo/client'

export const UPLOAD_MUTATION = gql`
  mutation uploadVideo($file: Upload!) {
    uploadVideo(file: $file) {
      filename
    }
  }
`

export function Upload() {
  const [uploadMessage, setUploadMesage] = useState('')
  const [uploadVideoMutation, { loading, error }] = useMutation(UPLOAD_MUTATION)
  const apolloClient = useApolloClient()

  function onChange({
    target: {
      validity,
      files: [file],
    },
  }) {
    if (validity.valid) {
      uploadVideoMutation({ variables: { file } }).then(({ data }) => {
        apolloClient.resetStore()
        setUploadMesage(
          `Video file "${data.uploadVideo.filename}" was successfully uploaded!`
        )
      })
    }
  }

  let message = ''
  let messageType = ''
  if (loading) {
    message = 'File is being uploaded...'
    messageType = 'info'
  } else if (error) {
    message = error.message
    messageType = 'danger'
  } else if (uploadMessage) {
    message = uploadMessage
    messageType = 'success'
  }

  return (
    <Container>
      <h2>Video upload</h2>
      <Form>
        <Form.File
          id="upload-video"
          label="Select a video to upload"
          required
          onChange={onChange}
          accept="video/mp4, video/webm, video/ogg"
          data-testid="file-upload"
        />
        <Alert variant={messageType} data-testid="message">
          {message}
        </Alert>
      </Form>
    </Container>
  )
}

export default Upload
