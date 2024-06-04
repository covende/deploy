// Infraestructure
import { InfraGQL } from '@/app/infrastructure';

// Data
import { plansDefs } from './typeDefs';

const api = {
  plans: async () => {
    const res = await InfraGQL.query(plansDefs.query.PLANS);
    return res.data.plans;
  },
  plansByLimit: async (variables) => {
    const res = await InfraGQL.query(plansDefs.query.PLANS_BY_LIMIT, variables);
    return res.data.plansByLimit;
  },
  planByID: async (variables) => {
    const res = await InfraGQL.query(plansDefs.query.PLAN_BY_ID, variables);
    return res.data.planByID;
  },
  plansByName: async (variables) => {
    const res = await InfraGQL.query(plansDefs.query.PLANS_BY_NAME, variables);
    return res.data.plansByName;
  },
  plansByRole: async (variables) => {
    const res = await InfraGQL.query(plansDefs.query.PLANS_BY_ROLE, variables);
    return res.data.plansByRole;
  },
  addPlan: async (variables) => {
    const res = await InfraGQL.mutation(plansDefs.mutation.ADD_PLAN, variables);
    return res.addPlan;
  },
  editPlan: async (variables) => {
    const res = await InfraGQL.mutation(
      plansDefs.mutation.EDIT_PLAN,
      variables
    );
    return res.editPlan;
  },
  deletePlan: async (variables) => {
    const res = await InfraGQL.mutation(
      plansDefs.mutation.DELETE_PLAN,
      variables
    );
    return res.deletePlan;
  }
};

export default api;
