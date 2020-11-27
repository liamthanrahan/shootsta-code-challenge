/* eslint-disable jsx-a11y/media-has-caption */
import React, { useContext, useMemo } from 'react'
import { gql, useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import { ThemeContext } from '../ThemeContext'
import '../../styles/index.scss'

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
`

const getListOfVideos = (videos, theme) => {
  if (videos.length > 0) {
    return videos.map(video => (
      <div className="video-row" key={video.filename}>
        <div className="video-source">
          <video controls>
            <source src={video.path} />
          </video>
        </div>
        <div className="video-info">
          <div
            style={{ background: theme.background, color: theme.foreground }}
          >
            Name:
            {video.filename}
          </div>
          <div>
            <a href={video.path}>Link</a>
          </div>
        </div>
      </div>
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
      <VideoList className="video-list" data-testid="videos">
        {getListOfVideos(videos, theme)}
      </VideoList>
    </>
  )
}

export default Home
