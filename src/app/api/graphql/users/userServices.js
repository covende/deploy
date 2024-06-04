export const ADD_USER_ADMINISTRATIVE = ({
  name,
  lastName,
  image,
  email,
  password,
  confirmPassword,
  roleId
}) => {
  return `
  mutation {
    addUserAdministrative(
      name: "${name}"
      lastName:"${lastName}"
      image: "${image}"
      email: "${email}"
      password: "${password}"
      confirmPassword: "${confirmPassword}"
      roleId: "${roleId}"
      flagActive:true
    ) {
      message
      status
    }
  }
  `;
};

export const EDIT_USER_ADMINISTRATIVE = ({
  first_name,
  last_name,
  email,
  role,
  flag_active,
  user_id,
  image = '',
  password = '',
  confirmPassword = ''
}) => {
  return `
  mutation {
    editUserAdministrative(
      userId: "${user_id}"
      name: "${first_name}"
      lastName: "${last_name}"
      image: "${image}"
      roleId: "${role.role_id}",
      flagActive: ${flag_active},
      email: "${email}",
      password: "${password}",
      confirmPassword: "${confirmPassword}",
    ){
      message
      status
    }
  }
  `;
};
