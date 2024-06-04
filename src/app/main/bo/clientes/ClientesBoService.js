export const DELETE_USER_BY_ID = (user_id) => `
mutation {
    deleteUser(user_id: "${user_id}") 
    {
        status
        message
  }
}
`;
