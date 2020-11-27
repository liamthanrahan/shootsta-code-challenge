import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import '@testing-library/jest-dom/extend-expect'
import { UPLOAD_MUTATION, Upload } from './Upload'

const MockFile = new File(['(⌐□_□)'], 'test_file.mp4', {
  type: 'video/mp4',
})

const mocks = [
  {
    request: {
      query: UPLOAD_MUTATION,
      variables: { file: MockFile },
    },
    result: {
      data: {
        videos: [
          {
            filename: 'test_file.mp4',
            path: 'http://server/videos/test_file.mp4',
          },
        ],
      },
    },
  },
]

describe('Upload functionality', () => {
  it('should render without error', () => {
    render(
      <MockedProvider mocks={[]}>
        <Upload />
      </MockedProvider>
    )

    const uploadMessage = screen.getByTestId('message')
    expect(uploadMessage).toHaveTextContent('')
  })

  // TODO get file spoofing to actually work. Documented test cases do not seem to be working...
  it('should call upload mutation when file input selected', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Upload />
      </MockedProvider>
    )
    const fileUpload = screen.getByTestId('file-upload')

    // fireEvent.change(fileUpload, {
    //   target: {
    //     value: [MockFile],
    //   },
    // })
    Object.defineProperty(fileUpload, 'files', { value: [MockFile] })
    fireEvent.change(fileUpload)

    await new Promise(resolve => setTimeout(resolve, 0)) // wait for response

    const uploadMessage = screen.getByTestId('message')
    expect(uploadMessage).toHaveTextContent('test_file.mp4')
  })
})
