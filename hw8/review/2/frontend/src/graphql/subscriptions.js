import { gql } from '@apollo/client';

export const MESSAGES_SUBSCRIPTION = gql`
  subscription message($userList: [String!]!) {
    message(userList: $userList) {
      mutation
      data {
        name
        body
      }
    }
  }`