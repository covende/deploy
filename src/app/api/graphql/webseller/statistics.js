export const SELLER_STATISTIC_GROUP = (store_id, daterange) => `
{
  sellerStatisticGroup(company_id: "${store_id}", date_range: {
    desde: "${daterange.firstTime ? '' : daterange.start_date.toISOString()}"
    hasta: "${daterange.firstTime ? '' : daterange.end_date.toISOString()}"
  }) {
    salesAmount
    salesAmountAverage
    salesQuantity
    buyersQuantity
  }
}
`;

export const SELLER_STATISTIC_CARD = (store_id, daterange) => `
{
  sellerStatisticCard(company_id: "${store_id}", date_range: {
    desde: "${daterange.firstTime ? '' : daterange.start_date.toISOString()}"
    hasta: "${daterange.firstTime ? '' : daterange.end_date.toISOString()}"
  }) {
    score
    visits
    increase
    points {
      date
      value
    }
  }
}`;

export const GRAPH_SELLER_CSV = (company_id, daterange) => `{
  graphSellerCSV(company_id: "${company_id}", date_range: {
    desde: "${daterange.firstTime ? '' : daterange.start_date.toISOString()}"
    hasta: "${daterange.firstTime ? '' : daterange.end_date.toISOString()}"
  })
}`;

export const TOP_PRODUCT_SELLER = (store_id, daterange) => `{
  topProductsSeller(company_id: "${store_id}", limit: 5, date_range: {
    desde: "${daterange.firstTime ? '' : daterange.start_date.toISOString()}"
    hasta: "${daterange.firstTime ? '' : daterange.end_date.toISOString()}"
  }) {
    name
    ordersQuantity
    totalSales
    score
  }
}`;

export const GRAPH_SELLER = (store_id, daterange) => `{
  graphSeller(company_id: "${store_id}" date_range: {
    desde: "${daterange.firstTime ? '' : daterange.start_date.toISOString()}"
    hasta: "${daterange.firstTime ? '' : daterange.end_date.toISOString()}"
  }){
    total
    quantity
    points {
    date
    total
      quantity
    }
  }
}`;

// Reputación
export const COMPANY_REPUTATION_AND_DAY = (company_id) => `{
  companyReputationAndDay(company_id: "${company_id}") {
    percent
    days
    status
  }
}
`
export const COMPANY_REPUTATION_CARDS = (company_id) => `{
  companyReputationCards(company_id: "${company_id}") {
    devolutions {
      value
      total
      percent
    }
    cancellations {
      value
      total
      percent
    }
    unansweredMessages {
      value
      total
      percent
    }
    falseInformation {
      value
      total
      percent
    }
  }
}

`

export const COMPANY_REPUTATION_BY_PEDIDO_TIME = (company_id, days=180) => `{
  companyReputationByPeriodTime(
    last_days: ${days}
    company_id: "${company_id}"
  ) {
    fromDate
    toDate
    reputation
    cancellations
    devolutions
    unansweredMessages
    falseInformation
    status
  }
}

`
