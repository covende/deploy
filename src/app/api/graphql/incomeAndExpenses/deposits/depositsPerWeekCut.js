export const DEPOSITS_PER_WEEK_CUT = (search, page) => {
  return `
  {
    weeklyCuts(search: "${search}", page: ${page || 1}) {
      info {
        page
        total
        itemsPage
        pages
      }
      status
      message
      weeklyCuts {
        code
        excess_send
        date
        gross_income
        shipments
        deposit
        comission_cv
        other_comissions
        dcto_devolution_cancellation
        refund
        balance
      }
    }
  }
  `;
};

export const DEPOSITS_PER_WEEK_EXCEL = (search) => {
  return `
  {
    weeklyCutsCSV(search: "${search}")
  }
  `;
};

// Transacciones
export const TRANSACTIONS_WEEKLY_CUT = (
  custom_id,
  itemsPage,
  currentPage = 1,
  company_id
) => {
  return `{
    transactionsWeeklyCut(cut_code: "${custom_id}", company_id: "${
    company_id || ''
  }" itemsPage: ${itemsPage}, page:${currentPage}) {
      info {
        page
        total
        itemsPage
        pages
      }
      status
      message
      transactionsWeeklyCut {
        order
        seller
        amount
        excess_send
        send
        price_product
        comissions_CV
        deposit
        discount
        send_reverse
        other_discount
        total_discount
        refund
      }
    }
    
  }`;
};

export const TRANSACTIONS_WEEKLY_EXCEL = (custom_id, company_id) => {
  return `{
    transactionsWeeklyCutCSV(cut_code: "${custom_id}" company_id: "${
    company_id || ''
  }")
  }`;
};
