
export const SUBSCRIPTIONS_PAGINATION = (filtro, firstTime, page) => {
  return `{
    subscriptionsPagination(
      page: ${page}
      itemsPage: 20
      search: "${filtro.search}"
      date_range: {
        desde: "${
          !filtro.change ? '' : new Date(filtro.daterange[0]).toISOString()
        }"
        hasta: "${
          !filtro.change ? '' : new Date(filtro.daterange[1]).toISOString()
        }"
      }
    ) {
      info {
        page
        total
        itemsPage
        pages
      }
      status
      message
      usersSubscription {
        id
        seller
        plan
        fecha_inicio
        fecha_fin
        method_payment
        payment_date
        amount
        partner
      }
    }
  }`;
};