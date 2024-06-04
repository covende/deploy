import { ROLEBUYER } from '@/app/helpers';
import WMUserFind from '../../webmodel/WMUserFind';
export const listplanes = (_id) => `{
    plansByRole(role:"${ROLEBUYER}"){
      _id
      name
      price
      description
      specifications
      periodo
      datestart
      dateends
    }
    userFind(_id:"${_id}")${WMUserFind}
}`;

export const distritoByID = (id) => `
{
  ubigeoDistritoByID(id: "${id}") {
    district {
      _id
      code
      name
      provinceCode
      departmentCode
    }
    department {
      _id
      name
      code
    }
    province {
      _id
      code
      name
      departmentCode
    }
  }
}
`;

export const distritosByNameFull = (name) => `
{
  ubigeoDistritosByName(name: "${name}") {
    status
    message
    data {
      district {
        _id
        code
        name
        provinceCode
        departmentCode
      }
      department {
        _id
        code
        name
      }
      province {
        _id
        code
        name
        departmentCode
      }
    }
  }
}


`;

export const listdepartamento = () => `
{
	departamentos{
    _id
    code
    name
  }
}`;

export const listprovincia = (department_code) => `
{
	provincias(department_code:"${department_code}"){
    _id
    code
    name
  }
}`;

export const listdistrito = (province_code) => `
{
	distritos(province_code:"${province_code}"){
    _id
    code
    name    
  }
}`;
