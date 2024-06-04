import WMProductItemPublic from '../../../webmodel/WMProductItemPublic';

const ProductsPublic = `
productsPublic(
  page: 1
  itemsPage: 10
  filtro: { promotions: { offers: true } }
){
  productsItemPublic${WMProductItemPublic}
}
`;
//  `CategoryProductsOfferPublic:categoryProductsOfferPublic(cant_category: 10) {
//     category_id
//     name
//     image
//     slider
//     banner
//     products ${WMProductItemPublic}
//   }`;

export default ProductsPublic;
