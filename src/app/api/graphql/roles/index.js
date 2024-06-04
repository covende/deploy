// Infraestructure
import { InfraGQL } from '@/app/infrastructure';

// Data
import { roleDefs } from './typeDefs';

const api = {
  fetch: async (variables) => {
    const res = await InfraGQL.query(roleDefs.query.ROLES, variables);
    return res.data.roles;
  },
  fetchByLimit: async (variables) => {
    const res = await InfraGQL.query(roleDefs.query.ROLES_BY_LIMIT, variables);
    return res.data.roles;
  },
  addItem: async (variables) => {
    const res = await InfraGQL.mutation(roleDefs.mutation.ADD_ROLE, variables);
    return res.addRole;
  },
  editItem: async (variables) => {
    const res = await InfraGQL.mutation(roleDefs.mutation.EDIT_ROLE, variables);
    return res.editRole;
  },
  deleteItem: async (variables) => {
    const res = await InfraGQL.mutation(
      roleDefs.mutation.DELETE_ROLE,
      variables
    );
    return res.deleteRole;
  }
};

export default api;
