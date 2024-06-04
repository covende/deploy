import WMProductItemPublic from '../../../webmodel/WMProductItemPublic';

const MostVisited = `MostVisited: productsPublic(itemsPage: 60, sort: "most_visited") {
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

export default MostVisited;
