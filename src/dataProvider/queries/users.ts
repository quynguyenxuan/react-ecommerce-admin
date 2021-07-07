import gql from 'graphql-tag';

export const GET_LIST_USERS = gql`
  {
    id
    name
    createdAt
    todos(
      where: { is_completed: { _eq: false } }
      order_by: { createdAt: ASC }
    ) {
      id
      title
    }
    total_todos_count: todos_aggregate {
      aggregate {
        count
      }
    }
    pending_todos_count: todos_aggregate(
      where: { is_completed: { _eq: false } }
    ) {
      aggregate {
        count
      }
    }
  }
`;
