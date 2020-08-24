/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { gql, useQuery } from '@apollo/client'
import styled from '@emotion/styled'

export const GET_VIDEOS_QUERY = gql`
  query getVideos {
    videos {
      filename
      path
    }
  }
`

const VideoList = styled.div`
  display: flex;
  flex-direction: column;
`

export function Home() {
  const { data: { videos = [] } = {} } = useQuery(GET_VIDEOS_QUERY)

  let videoContent = 'No video files were found.'
  if (videos.length > 0) {
    videoContent = videos.map(video => (
      <Row key={video.filename}>
        <Col>
          <video controls>
            <source src={video.path} />
          </video>
        </Col>
        <Col>
          <div>
            Name:
            {video.filename}
          </div>
          <div>
            <a href={video.path}>Link</a>
          </div>
        </Col>
      </Row>
    ))
  }

  return (
    <>
      <h2>Video list</h2>
      <VideoList data-testid="videos">{videoContent}</VideoList>
    </>
  )
}

export default Home
