import { gql } from '@apollo/client';

export const ACTIVITY_SUBSCRIPTION = gql`
  subscription activity{
    activity {
      allActivity {
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
  }
`;

export const VIDEO_SUBSCRIPTION = gql`
  subscription video{
    video {
      allVideo {
        url
        gameName
        gameType
        datetime
        description
        id
      }
    }
  }
`;

export const USER_SUBSCRIPTION = gql`
  subscription user{
    user {
      allUser{
        username
        nickname
        id
        email
        isCaptain
        isVerified
      }
    }
  }
`;
