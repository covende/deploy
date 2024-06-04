import BestRated from './types/BestRated';
import BestSellers from './types/BestSellers';
import MostVisited from './types/MostVisited';
import CategoriesHeaderPublic from './types/CategoriesHeaderPublic';
import ProductsPublic from './types/CategoryProductsOfferPublic';
import MasVendido from './types/MasVendido';
import MasVisitadoBanner from './types/MasVisitadoBanner';
import MasVisitados from './types/MasVisitados';
import MejorValorado from './types/MejorValorado';
import Publicitario from './types/Publicitario';
import Suggested from './types/Suggested';
import RecomendedByCategory from './types/RecomendedByCategory';
import Banners from './types/Banners';
import ListCategories from './types/ListCategories';
import imagesHome from './types/imagesHome';
import WMProductItemPublic from '@CVApi/core/webmodel/WMProductItemPublic';
import WMCategoryProduct from '@CVApi/core/webmodel/WMCategoryProduct';

export const HOME_SERVICE = `{
   
  getHomeData {
    offerProducts {  
        info {
          page
          total
          itemsPage
          pages
      }
    status
    message
    productsItemPublic ${WMProductItemPublic}
    }

    bestSellers {
        info {
        page
        total
        itemsPage
        pages
    }
    status
    message
    productsItemPublic ${WMProductItemPublic}
    }

    bestRated{
       info {
       page
       total
       itemsPage
      pages
    }
    status
    message
    productsItemPublic ${WMProductItemPublic}
    }

   mostVisited{
       info {
       page
       total
       itemsPage
      pages
    }
    status
    message
    productsItemPublic ${WMProductItemPublic}
   }

    images {

    MasVisitadoBanner {
     
      image
      imagelink
    }
    MasVendido {
     
      image
      imagelink
    }
    MejorValorado {
     
      image
      imagelink
    }
    MasVisitados {
     
      image
      imagelink
    }
    Publicitario {
    
      image
      imagelink
    }
    Banners {
     
      title
      description
      link
      image
    }
      
    }
    
    categories {
       _id
    name
    parent_id
    slug
  
    image
    stores {
      logo
      _id
      comercial_name
    }
    products {
      product_photo
      product_name
      product_id
    }
    logo
   
   
    banner
   
   
    
    }
    suggested {
    status
    message
    productsItemPublic ${WMProductItemPublic}
    }
   }
  }
  `;

// export const HOME_SERVICE = `{

//     ${imagesHome}
//     ${BestSellers}
//     ${ProductsPublic}
//     ${CategoriesHeaderPublic}
//     ${BestRated}
//     ${MostVisited}
//     ${RecomendedByCategory}
//     ${Suggested}
//     ${ListCategories}

//   }
//   `;

// export const HOME_SERVICE = `{
//     ${MasVisitadoBanner}
//     ${MasVendido}
//     ${MejorValorado}
//     ${MasVisitados}
//     ${BestSellers}
//     ${Publicitario}
//     ${CategoryProductsOfferPublic}
//     ${CategoriesHeaderPublic}
//     ${BestRated}
//     ${MostVisited}
//     ${RecomendedByCategory}
//     ${Suggested}
//     ${Banners}
//     ${ListCategories}
//   }
//   `;
