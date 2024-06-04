import WMDDepartamento from './webmodeldirection/WMDDepartamento';
import WMDDistrito from './webmodeldirection/WMDDistrito';
import WMDProvincia from './webmodeldirection/WMDProvincia';
import WMCompanyDirection from './WMCompanyDirection';
import WMTable from './WMTable';

// company_type${WMTable}
const WMCompany = `{
    _id
    comercial_name
    social_razon
    custom_id
    ruc
    activity
    direction
    country
    state
    province
    district
    zip_code
    web_page
    owner
    reference
    phone
    directions${WMCompanyDirection}
    users
    status
    actividad
    manager
    type_of_sale
    sociedad
    createdAt
    updatedAt
    departamento${WMDDepartamento}
    provincia${WMDProvincia}
    distrito${WMDDistrito}
    logo
    url
    stars
    company_description
    main_banner
    secondary_banner
    sliders
    category_images
    validation_date
    total_products
    delivery_own
    delivery_own_status
    percentage_commission
}`;

export default WMCompany;
