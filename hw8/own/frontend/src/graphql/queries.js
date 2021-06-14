import { gql } from '@apollo/client';

export const CHATBOX_QUERY = gql`
  query chatBox(
    $query: String!
  ) {
    chatBox(
      query: $query
    ) {
      id
      name
      messages {
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
