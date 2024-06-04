import WMProductItemPublic from '../../../webmodel/WMProductItemPublic';

const BestSellers = `BestSellers: productsPublic(itemsPage: 60, sort: "best_sellers") {
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

export default BestSellers;
