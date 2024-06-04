// Infraestructure
import { InfraGQL } from '@/app/infrastructure';

// Data
import { permissionDefs } from './typeDefs';

const api = {
  fetch: async (variables) => {
    const res = await InfraGQL.query(
      permissionDefs.query.PERMISSIONS,
      variables
    );
    return res.data.permissions;
  },
  fetchByID: async (variables) => {
    const res = await InfraGQL.query(
      permissionDefs.query.PERMISSION_BY_ID,
      variables
    );
    return res.data.permissionByID;
  },
  fetchByName: async (variables) => {
    const res = await InfraGQL.query(
      permissionDefs.query.PERMISSIONS_BY_NAME,
      variables
    );
    return res.data.permissionsByName;
  },
  addItem: async (variables) => {
    const res = await InfraGQL.mutation(
      permissionDefs.mutation.ADD_PERMISSION,
      variables
    );
    return res.addPermission;
  },
  editItem: async (variables) => {
    const res = await InfraGQL.mutation(
      permissionDefs.mutation.EDIT_PERMISSION,
      variables
    );
    return res.editPermission;
  },
  deleteItem: async (variables) => {
    const res = await InfraGQL.mutation(
      permissionDefs.mutation.DELETE_PERMISSION,
      variables
    );
    return res.deletePermission;
  }
};

export default api;
