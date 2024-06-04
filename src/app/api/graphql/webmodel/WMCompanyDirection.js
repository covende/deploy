import WMDDepartamento from './webmodeldirection/WMDDepartamento';
import WMDDistrito from './webmodeldirection/WMDDistrito';
import WMDProvincia from './webmodeldirection/WMDProvincia';

const WMCompanyDirection = `{
    _id
    type_local
    supervisor
    phone
    reference
    street_fiscal
    country
    state ${WMDDepartamento}
    province ${WMDProvincia}
    district ${WMDDistrito}
    zipcode
    predetermined
    fiscal
}`;

export default WMCompanyDirection;
