import { gql } from '@apollo/client';

export const UPLOAD_MUTATION = gql`
  mutation insertPeople($data: [createPersonInput!]!) {
    insertPeople(data: $data)
  }
`;