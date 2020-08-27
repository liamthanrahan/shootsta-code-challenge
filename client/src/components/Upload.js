import React, { useState, useMemo } from 'react'
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

const getUploadMessage = (loading, error, uploadMessage) => {
  if (loading) {
    return {
      type: 'info',
      text: 'File is being uploaded...',
    }
  }

  if (error) {
    return {
      type: 'danger',
      text: error.message,
    }
  }

  if (uploadMessage) {
    return {
      type: 'success',
      text: uploadMessage,
    }
  }

  return {
    type: '',
    text: '',
  }
}

export function Upload() {
  const [uploadMessage, setUploadMesage] = useState('')
  const [uploadVideoMutation, { loading, error }] = useMutation(UPLOAD_MUTATION)
  const apolloClient = useApolloClient()
  const message = useMemo(
    () => getUploadMessage(loading, error, uploadMessage),
    [loading, error, uploadMessage]
  )

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
        <Alert variant={message.type} data-testid="message">
          {message.text}
        </Alert>
      </Form>
    </Container>
  )
}

export default Upload
