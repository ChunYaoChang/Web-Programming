import { gql } from '@apollo/client';

const STATSCOUNT_QUERY = gql`
    query statsCount(
        $severity: Int
        $locationKeywords: [String!]!
    ) {
        statsCount(
            severity: $severity
            locationKeyWords: $locationKeywords
        ) {
            data {
                output
            }
        }
    }`
;

const UPLOAD_MUTATION = gql`
  mutation insertPeople($data: [createPeopleInput!]!) {
    insertPeople(data: $data)
  }
`;
// type Query {
//   statsCount(severity: Int, locationKeywords: [String!]!): [Int!]!
// }

// type Mutation {
//   insertPeople(data: [insertPeopleInput]): Boolean
// }

// input insertPeopleInput {
//   ssn: String!
//   name: String!
//   location: locationInput!
//   severity: Int!
// }

// input locationInput {
//   name: String!
//   description: String!
// }

// type Person {
//   ssn: String!
//   name: String!
//   location: Location!
//   severity: Int!
// }

// type Location {
//   name: String!
//   description: String!
// }

export {STATSCOUNT_QUERY, UPLOAD_MUTATION}