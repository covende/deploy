export const CHANGE_PASSWORD = ({
  oldPassword,
  user_id,
  newPassword
}) => `mutation {
  changePassword(
    user_id: "${user_id}"
    oldPassword: "${oldPassword}"
    newPassword: "${newPassword}"
  ) {
    status
    message
  }
}`;

export const CHANGE_PASSWORD_PUBLIC = ({
  user_id,
  newPassword,
  token
}) => `mutation {
  changePasswordPublic(
    user_id: "${user_id}"
    newPassword: "${newPassword}"
    token: "${token}"
  ) {
    status
    message
    code
    user
  }
}`;

export const RESET_PASSWORD = (email) => `mutation {
  resetPassword(email: "${email}")
}`;
