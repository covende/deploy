import WMCompany from './WMCompany';
import WMCompanyPlan from './WMCompanyPlan';

const WMCustomer = `{
    id
    company${WMCompany}
    customer_id
    flagActive
    flagValidated
    first_name
    last_name
    dni
    company_plan${WMCompanyPlan}
    company_name
    phone{
        type
        number
    }
    fax
    role{
        role_id
        name
    }
    user_id
    email
    deleted
    deleted_at
    tipodoc{
        _id
        tipodoc
        descripcion_larga
        descripcion_corta
        caracteres
        status
    }
    custom_id
    createdAt
    updatedAt
    asesor {
        user_id
        first_name
        last_name
    }
    lastConnectionDate
}`;

export default WMCustomer;
