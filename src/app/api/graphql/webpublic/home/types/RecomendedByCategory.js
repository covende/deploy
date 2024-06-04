import WMProductItemPublic from '../../../webmodel/WMProductItemPublic';

const RecomendedByCategory = `RecomendedByCategory:   productsPublic(itemsPage: 20, category_ids: ${
  localStorage.getItem('category')
    ? `["${localStorage.getItem('category')}"]`
    : `[]`
}) {
    info {
      page
      total
      itemsPage
      pages
    }
    status
    message
    productsItemPublic ${WMProductItemPublic}
  }`;

export default RecomendedByCategory;
