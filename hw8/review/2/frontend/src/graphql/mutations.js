import { gql } from '@apollo/client';

export const PUSH_NEW_MESSAGE = gql`
  mutation pushNewMessage($data: data){
    pushNewMessage(data: $data)
  }`;
