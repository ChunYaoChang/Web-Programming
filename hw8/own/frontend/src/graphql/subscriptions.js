import { gql } from '@apollo/client';

export const CHATBOX_SUBSCRIPTION = gql`
  subscription chatBox(
    $name: String!
  ) {
    chatBox(
      name: $name
    ) {
      mutation
      data {
        id
        sender {
          id
          name
        }
        body
      }
    }
  }
`;
