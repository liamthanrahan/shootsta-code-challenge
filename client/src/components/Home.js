/* eslint-disable jsx-a11y/media-has-caption */
import React, { useContext, useMemo } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { gql, useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import { ThemeContext } from './ThemeContext'

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

const getListOfVideos = (videos, theme) => {
  if (videos.length > 0) {
    return videos.map(video => (
      <Row key={video.filename}>
        <Col>
          <video controls>
            <source src={video.path} />
          </video>
        </Col>
        <Col>
          <div
            style={{ background: theme.background, color: theme.foreground }}
          >
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

  return 'No video files were found.'
}

export function Home() {
  const { data: { videos = [] } = {} } = useQuery(GET_VIDEOS_QUERY)
  const theme = useContext(ThemeContext)

  return (
    <>
      <h2>Video list</h2>
      <VideoList data-testid="videos">
        {getListOfVideos(videos, theme)}
      </VideoList>
    </>
  )
}

export default Home
