import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
  mutation createUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      user: {
        username: $username
        email: $email
        password: $password
      }
    ) {
      username
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login(
    $username: String!
    $password: String!
  ) {
    login(
      username: $username
      password: $password
    )
  }
`;

export const GET_USER_ID_MUTATION = gql`
  mutation getUserIdByUsername(
    $username: String!
  ) {
    getUserIdByUsername(
      username: $username
    )
  }
`;

export const GET_USER_BY_ID_MUTATION = gql`
  mutation getUserById(
    $id: ID!
  ) {
    getUserById(
      id: $id
    ) {
      id
      username
      email
      isCaptain
      nickname
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser(
    $id: ID!
    $username: String!
    $email: String!
    $nickname: String
    $isCaptain: Boolean!
    $adminCode: String
  ) {
    updateUser(
      id: $id
      user: {
        username: $username
        email: $email
        nickname: $nickname
        isCaptain: $isCaptain
      }
      adminCode: $adminCode
    ) {
      username
    }
  }
`;

export const ACCOUNT_VERIFY_MUTATION = gql`
  mutation verify(
    $key: String!
  ) {
    verify(
      verifiedUrl: $key
    )
  }
`;

export const UPDATE_ACTIVITY_MUTATION = gql`
  mutation updateActivity(
    $title: String!
    $createdUser: ID!
    $startDatetime: String!
    $endDatetime: String!
    $description: String!
    $participants: ID
    $type: String!
  ) {
    updateActivity(
      activity: {
        title: $title
        createdUser: $createdUser
        startDatetime: $startDatetime
        endDatetime: $endDatetime
        description: $description
        participants: $participants
      }
      type: $type
    ) {
      title
    }
  }
`;

export const DELETE_ACTIVITY_MUTATION = gql`
  mutation deleteActivity(
      $title: String!
      $startDatetime: String!
      $endDatetime: String!
  ) {
    deleteActivity(
      activity: {
        title: $title
        startDatetime: $startDatetime
        endDatetime: $endDatetime
      }
    )
  }
`;

export const CREATE_ACTIVITY_MUTATION = gql`
  mutation createActivity(
    $createdUser: ID!
    $title: String!
    $startDatetime: String!
    $endDatetime: String!
    $description: String
    $participants: [ID!]
  ) {
    createActivity(
      activity: {
        title: $title
        createdUser: $createdUser
        startDatetime: $startDatetime
        endDatetime: $endDatetime
        description: $description
        participants: $participants
      }
    ) {
      title
    }
  }
`;

export const CREATE_VIDEO_MUTATION = gql`
  mutation createVideo(
    $gameName: String!
    $gameType: String!
    $datetime: String!
    $url: String!
    $description: String
  ) {
    createVideo(
      video: {
        gameName: $gameName
        gameType: $gameType
        datetime: $datetime
        url: $url
        description: $description
      }
    ) {
      id
    }
  }
`;

export const DELETE_VIDEO_MUTATION = gql`
  mutation deleteVideo(
    $gameName: String!
    $gameType: String!
    $datetime: String!
    $url: String!
    $description: String
  ) {
    deleteVideo(
      video: {
        gameName: $gameName
        gameType: $gameType
        datetime: $datetime
        url: $url
        description: $description
      }
    )
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation deleteUser(
    $id: ID!
  ) {
    deleteUser(
      id: $id
    )
  }
`;
