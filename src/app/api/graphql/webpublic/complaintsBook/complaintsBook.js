import { gql } from 'graphql-request';

export const ADD_CLAIM = ({ aclaim }) => {
  return gql`
  mutation{
    addComplaintsBook(complaintsBook: {
      isReclamation:${aclaim.isReclamation}
      isComplaint:${aclaim.isComplaint}
      first_name:"${aclaim.names}"
      last_name:"${aclaim.last_names}"
      mail:"${aclaim.email}"
      phone:"${aclaim.phone}"
      type_document:"DNI"
      document_number:"${aclaim.dni}"
       direction:"${aclaim.address}"
      departament_id:"${aclaim.departamento_id}"
      province_id:"${aclaim.provincia_id}"
      district_id:"${aclaim.distrito_id}"
      details:"${aclaim.detail}"
      expected_solution:"${aclaim.solution}"
    }){
      status
      message
      complaintsBook{
         _id
        isReclamation
      }
    }
  }
  
  
  `;
};
