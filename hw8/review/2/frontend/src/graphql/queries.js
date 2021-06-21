import { gql } from '@apollo/client';

export const CHAT_QUERY = gql`
  query chat(
    $name: String!
    $to: String!
  ){
    chat(name: $name, to: $to){
      name
      body
    }
  }
`;