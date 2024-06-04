// Infraestructure
import { InfraGQL } from '@/app/infrastructure';

// Data
import { platformDefs } from './typeDefs';

const api = {
  platforms: async () => {
    const res = await InfraGQL.query(platformDefs.query.PLATFORMS);
    return res.data.platforms;
  },
  platformsByLimit: async (variables) => {
    const res = await InfraGQL.query(platformDefs.query.PLATFORMS, variables);
    return res.data.platforms;
  },
  platformByID: async (variables) => {
    const res = await InfraGQL.query(
      platformDefs.query.PLATFORM_BY_ID,
      variables
    );
    return res.data.platformByID;
  },
  platformsByName: async (variables) => {
    const res = await InfraGQL.query(
      platformDefs.query.PLATFORMS_BY_NAME,
      variables
    );
    return res.data.platformsByName;
  },
  addPlatform: async (variables) => {
    const res = await InfraGQL.mutation(
      platformDefs.mutation.ADD_PLATFORM,
      variables
    );
    return res.addPlatform;
  },
  editPlatform: async (variables) => {
    const res = await InfraGQL.mutation(
      platformDefs.mutation.EDIT_PLATFORM,
      variables
    );
    return res.editPlatform;
  },
  deletePlatform: async (variables) => {
    const res = await InfraGQL.mutation(
      platformDefs.mutation.DELETE_PLATFORM,
      variables
    );
    return res.deletePlatform;
  }
};

export default api;
