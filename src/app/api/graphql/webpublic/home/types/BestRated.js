import WMProductItemPublic from '../../../webmodel/WMProductItemPublic';

const BestRated = `BestRated: productsPublic(itemsPage: 60, sort: "best_rated") {
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

export default BestRated;
