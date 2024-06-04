// Infraestructure
import { InfraGQL } from '@/app/infrastructure';

// Data
import { customerDefs } from './typeDefs';

export default {
  fetch: async () => {
    const res = await InfraGQL.query(customerDefs.query.CUSTOMERS);
    return res.data.customers;
  },
  fetchByID: async (variables) => {
    const res = await InfraGQL.query(
      customerDefs.query.CUSTOMER_BY_ID,
      variables
    );
    return res.data.customerByID;
  },
  fetchByDNI: async (variables) => {
    const res = await InfraGQL.query(
      customerDefs.query.CUSTOMER_BY_DNI,
      variables
    );
    return res.data.customerByDNI;
  },
  addItem: async (variables) => {
    const res = await InfraGQL.mutation(
      customerDefs.mutation.ADD_CUSTOMER,
      variables
    );
    return res.addCustomer;
  },
  editItem: async (variables) => {
    const res = await InfraGQL.mutation(
      customerDefs.mutation.EDIT_CUSTOMER,
      variables
    );
    return res.editCustomer;
  },
  deleteItem: async (variables) => {
    const res = await InfraGQL.mutation(
      customerDefs.mutation.DELETE_CUSTOMER,
      variables
    );
    return res.deleteCustomer;
  }
};
