import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($data: CreateUserDTO!) {
    createUser(data: $data) {
      id
      email
      first_name
      last_name
    }
  }
`;
