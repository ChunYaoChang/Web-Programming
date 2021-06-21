import { gql } from '@apollo/client';

export const CREATE_CHATBOX_MUTATION = gql`
  mutation createChatBox(
    $name1: String!
    $name2: String!
  ) {
    createChatBox(
      name1: $name1
      name2: $name2
    ) {
      id
      name
    }
  }
`;

export const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage(
    $chatBoxName: String!
    $sender: String!
    $message: String!
  ) {
    createMessage(
      data: {
        chatBoxName: $chatBoxName
        sender: $sender
        message: $message
      }
    ) {
      id
      sender {
        id
        name
      }
      body
    }
  }
`;