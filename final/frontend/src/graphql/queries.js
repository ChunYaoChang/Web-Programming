import { gql } from '@apollo/client';

export const ALL_ACTIVITY_QUERY = gql`
  query allActivity{
    allActivity{
      title
      createdUser {
        id
      }
      startDatetime
      endDatetime
      description
      participants {
        username
        nickname
        id
      }
    }
  }
`;

export const ALL_USER_QUERY = gql`
  query allUser{
    allUser{
      username
      nickname
      id
      email
      isCaptain
      isVerified
    }
  }
`;

export const ALL_VIDEO_QUERY = gql`
  query allVideo{
    allVideo{
      url
      gameName
      gameType
      datetime
      description
      id
    }
  }
`
