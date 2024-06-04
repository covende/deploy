import WMProductItemPublic from '../../../webmodel/WMProductItemPublic';

const Suggested = `Suggested:productsRandomPublic(random_amount: 20) {
    status
    message
    productsItemPublic ${WMProductItemPublic}
}`;

export default Suggested;
