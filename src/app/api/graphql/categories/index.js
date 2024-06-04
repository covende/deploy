// Infraestructure
import { InfraGQL } from '@/app/infrastructure';
import { categoryProductsList } from './services/categoryservice';

// Data
import { categoryDefs } from './typeDefs';

const api = {
  fetch: async () => {
    const result = await categoryProductsList(true);

    //const res = await InfraGQL.query(categoryDefs.query.CATEGORIES);

    //return res.data.categoryProducts;
    return result;
  },
  fetchByLimit: async () => {
    const res = await InfraGQL.query(categoryDefs.query.CATEGORIES_BY_LIMIT);
    return res.data.categoryProducts;
  },
  fetchByID: async () => {
    const res = await InfraGQL.query(categoryDefs.query.CATEGORY_BY_ID);
    return res.data.categoryProductByID;
  },
  fetchByName: async () => {
    const res = await InfraGQL.query(categoryDefs.query.CATEGORIES_BY_NAME);
    return res.data.categoryProductsByName;
  },
  fetchByNivel: async () => {
    const res = await InfraGQL.query(categoryDefs.query.CATEGORIES_BY_NIVEL);
    return res.data.categoryProductByNivel;
  },
  fetchChildrensByCategoryID: async () => {
    const res = await InfraGQL.query(
      categoryDefs.query.CATEGORIES_CHILDRENS_BY_CATEGORY_ID
    );
    return res.data.categoryProductByChildrens;
  },
  fetchSubcaterogies: async () => {
    const res = await InfraGQL.query(categoryDefs.query.SUBCATEGORIES);
    return res.data.subcategoryProducts;
  },
  fetchSubcategoryByID: async () => {
    const res = await InfraGQL.query(categoryDefs.query.SUBCATEGORY_BY_ID);
    return res.data.subcategoryProductByID;
  },
  fetchSubcategoryByName: async () => {
    const res = await InfraGQL.query(categoryDefs.query.SUBCATEGORY_BY_NAME);
    return res.data.subcategoryProductsByName;
  },
  addItem: async (variables) => {
    const res = await InfraGQL.mutation(
      categoryDefs.mutation.ADD_CATEGORY,
      variables
    );
    return res.addCategoryProduct;
  },
  editItem: async (variables) => {
    const res = await InfraGQL.mutation(
      categoryDefs.mutation.EDIT_CATEGORY,
      variables
    );
    return res.editCategoryProduct;
  },
  deleteItem: async (variables) => {
    const res = await InfraGQL.mutation(
      categoryDefs.mutation.DELETE_CATEGORY,
      variables
    );
    return res.deleteCategoryProduct;
  },
  addSubCategory: async (variables) => {
    const res = await InfraGQL.mutation(
      categoryDefs.mutation.ADD_SUBCATEGORY,
      variables
    );
    return res.addSubCategoryProduct;
  },
  editSubCategory: async (variables) => {
    const res = await InfraGQL.mutation(
      categoryDefs.mutation.EDIT_SUBCATEGORY,
      variables
    );
    return res.editSubCategoryProduct;
  },
  deleteSubCategory: async (variables) => {
    const res = await InfraGQL.mutation(
      categoryDefs.mutation.EDIT_SUBCATEGORY,
      variables
    );
    return res.deleteSubCategoryProduct;
  }
};

export default api;
