export const initialPlan = {
  _id: '',
  name: '',
  role: '',
  description: '',
  specifications: '',
  price: '',
  periodo: '',
  subaccounts: '',
  unlimited: false,
  productsPost: '',
  datestart: new Date(),
  dateends: new Date(),
  status: true
};

export const initialcats = {
  _id: '',
  name: '',
  role: '',
  description: '',
  subcategories: [],
  status: true
};

export const initialsubcats = {
  _id: '',
  name: '',
  role: '',
  description: '',
  idcategory: '',
  value: '',
  porcentage: '',
  status: true,
  datestart: new Date(),
  dateends: new Date()
};
