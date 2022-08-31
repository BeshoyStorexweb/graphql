import { gql } from 'apollo-angular';

export const LOGIN_USER = gql`
  query loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      tokenExpiration
      userId
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(userInput: { email: $email, password: $password }) {
      email
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation createEvent($title: String!, $description: String!, $price: Float!, $date: String!) {
    createEvent(eventInput: { title: $title, description: $description, price: $price, date: $date }) {
      title
    }
  }
`;
export const EVENTS = gql`
  query {
    events {
      _id
      
    }
  }
`;
