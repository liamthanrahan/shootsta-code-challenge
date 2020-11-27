import React from 'react'
import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import '@testing-library/jest-dom/extend-expect'
import { Home } from './Home'

// const mocks = [
//   {
//     request: {
//       query: GET_VIDEOS_QUERY,
//     },
//     result: {
//       data: {
//         videos: [
//           {
//             filename: 'test_file.mp4',
//             path: 'http://server/videos/test_file.mp4',
//           },
//         ],
//       },
//     },
//   },
// ]

describe('List functionality', () => {
  it('should render without error and no videos message', () => {
    render(
      <MockedProvider mocks={[]}>
        <Home />
      </MockedProvider>
    )

    const listOfVideos = screen.getByTestId('videos')
    expect(listOfVideos).toHaveTextContent('No video files were found.')
  })

  // TODO Get this to work properly. Not sure why this is not working and the other mocks is...
  // eslint-disable-next-line jest/no-commented-out-tests
  // it('should return a list of videos', () => {
  //   render(
  //     <MockedProvider mocks={mocks} addTypename={false}>
  //       <Home />
  //     </MockedProvider>
  //   )

  //   await new Promise(resolve => setTimeout(resolve, 0)) // wait for response

  //   const listOfVideos = screen.getByTestId('videos')
  //   expect(listOfVideos).toHaveTextContent('test_file.mp4')
  // })
})
