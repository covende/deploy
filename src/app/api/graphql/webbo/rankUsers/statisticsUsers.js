export const TOP_USERS = ({
  range,
  idCategoryFilter,
  idSubCategoryFilter,
  type_sales,
  rank
}) => {
  const [desde, hasta, isPermit] = range;
  return `{
    topSellers(
      limit: 5,
      filtro: {
        date_range: {
          desde: "${isPermit ? desde.toISOString() : ''}"
          hasta: "${isPermit ? hasta.toISOString() : ''}"
        }
        category: "${idCategoryFilter}"
        saleType: "${type_sales}"
        sort: "${rank}"
      }
    ) {
      name
      reputation
      ordersRate
      salesRate
      total
    }
  }`;
};

export const TOP_USERS_CSV = ({
  range,
  idCategoryFilter,
  type_sales,
  rank
}) => {
  const [desde, hasta, isPermit] = range;
  return `
{topSellersCSV(
  filtro: {
    date_range: {
      desde: "${isPermit ? desde.toISOString() : ''}"
      hasta: "${isPermit ? hasta.toISOString() : ''}"
    }
    category: "${idCategoryFilter}"
    saleType: "${type_sales}"
    sort: "${rank}"
  }
)}`;
};

export const SALES_GRAPH_BACK = (date) => {
  return `{
    salesGraphBack(date_range: {
      desde: "${date[2] == true ? date[0].toISOString() : ''}"
      hasta: "${date[2] == true ? date[1].toISOString() : ''}"
    }) {
      commissions
      sales
      points {
        date
        sales
        commissions
      }
    }
  }`;
};

export const AMOUNTS_SATISTIC_BACKCSV = (date) => {
  return `{
    amountsStatisticBackCSV(date_range: {
      desde: "${date[2] == true ? date[0].toISOString() : ''}"
      hasta: "${date[2] == true ? date[1].toISOString() : ''}"
    })
  }`;
};

export const SELLERS_QUANTITY = () => `{
  sellersQuantity
}`;

export const BUYER_QUANTITY = () => `{
  buyersQuantity
}`;

export const USERS_GRAPH_BACK = (range) => {
  console.log({ range });
  return `{
    usersGraphBack(
      date_range: {
        desde: "${range[2] == true ? range[0].toISOString() : ''}"
        hasta: "${range[2] == true ? range[1].toISOString() : ''}"
      }
    ){
      usersTotal
      points {
        date
        sellers
        buyers
      }
    }
  }`;
};

export const TOP_PRODUCTS = ({ daterange }) => `{
  topProducts(
   
      date_range: {
        desde: "${daterange[2] ? daterange[0].toISOString() : ''}"
        hasta: "${daterange[2] ? daterange[1].toISOString() : ''}"
      }    

  ) {
     name
    score
    seller
    ordersQuantity
    totalSales
    totalCommission
  }
}`;

export const TOP_PRODUCTS_CSV = ({ daterange }) => {
  const [desde, hasta, isPermit] = daterange;
  return `{
    topProductsCSV(
      date_range: {
        desde: "${isPermit ? desde.toISOString() : ''}"
        hasta: "${isPermit ? hasta.toISOString() : ''}"
      }
  )
  }`;
};
