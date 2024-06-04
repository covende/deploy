// Infraestructure
import { InfraGQL } from '@/app/infrastructure';

// Data
import { userDefs } from './typeDefs';

const api = {
  fetch: async (variables) => {
    const res = await InfraGQL.query(userDefs.query.USERS, variables);
    return res.data.users;
  },
  fetchByLimit: async (variables) => {
    const res = await InfraGQL.query(userDefs.query.USERS_BY_LIMIT, variables);
    return res.data.users;
  },
  fetchByID: async (variables) => {
    const res = await InfraGQL.query(userDefs.query.USER_BY_ID, variables);
    return res.data.userByID;
  },
  fetchByEmail: async (variables) => {
    const res = await InfraGQL.query(userDefs.query.USER_BY_EMAIL, variables);
    return res.data.userByEmailSeller;
  },
  userLogin: async (variables) => {
    const res = await InfraGQL.query(userDefs.query.USER_FOR_LOGIN, variables);
    return res.data.userLogin;
  },
  addItem: async (variables) => {
    const res = await InfraGQL.mutation(userDefs.mutation.ADD_USER, variables);
    return res.addUser;
  },
  editItem: async (variables) => {
    const res = await InfraGQL.mutation(userDefs.mutation.EDIT_USER, variables);
    return res.editUser;
  },
  deleteItem: async (variables) => {
    const res = await InfraGQL.mutation(
      userDefs.mutation.DELETE_USER,
      variables
    );
    return res.deleteUser;
  },
  verifyEmailUser: async (variables) => {
    const res = await InfraGQL.mutation(
      userDefs.mutation.VERIFY_EMAIL_USER,
      variables
    );
    return res.verifyEmailUser;
  }
};

export default api;
