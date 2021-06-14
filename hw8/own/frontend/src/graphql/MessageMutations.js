import { gql } from '@apollo/client';

export const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage(
    $sender: String!
    $receiver: String!
    $message: String!
  ) {
    createMessage(
      data: {
        sender: $sender
        receiver: $receiver
        message: $message
      }
    ) {
      id
    }
  }
`;