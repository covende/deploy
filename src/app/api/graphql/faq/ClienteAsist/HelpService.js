import { InfraGQL } from '@/app/infrastructure/graphql/index';
import { gql } from 'graphql-request';
import WMInfo from '../../webmodel/WMInfo';

export const SEARCH_FILTER = (pag, item, type, searh) => {
  return gql`
    query {
      findFrequentsQuestions(page: ${pag} itemsPage: ${item} type: "${type}" search: "${searh}") {
        ${WMInfo}
        faqs {
          _id
          category
          position
          quantity
          status
          icon
          faqsQuestions {
            faq_question
            status
            answer
            cotegory_faq
          }
        }
      }
    }
  `;
};

export const FAQ_QUESTIONS_BY_ID = (cod) => {
  return gql`
    query {
      faqQuestionsByFaqId(faq_id:"${cod}") {
      id
      faq_question
      answer
      icon
      cotegory_faq{
                  id
                  category
                  }
      status      
      }
    }
  `;
};

export const DELETE_QUESTIONS = (idsToDelete) => {
  return gql`
    mutation {
      deleteFaqQuestions(
        _ids: [
          ${
            idsToDelete.length > 1
              ? idsToDelete.map(
                  (idToDelete) => `
            "${idToDelete}"
          `
                )
              : `"${idsToDelete}"`
          }
        ]
      )
    }
  `;
};

export const EDIT_RESPONSE_QUESTIONS = (newFaq) => {
  return gql`
  mutation {
    editFaqQuestions(
      faq_questions: [
        ${newFaq.map(
          (data) => `
          {
            _id: "${data.id}"
            answer: "${data.answer}"
            faq_question: "${data.faq_question}"
          }
        `
        )}
      ]
    )
  }
  `;
};

const EDIT_RESPONSE_QUESTION = gql`
  mutation editFaqQuestions($faq_questions: [IFaqQuestion]) {
    editFaqQuestions(faq_questions: $faq_questions)
  }
`;

export const editResponseQuestion = async (variables) => {
  const res = await InfraGQL.mutation(EDIT_RESPONSE_QUESTION, variables);
  return res.editFaqQuestions;
};

export const ORDERS_INCOME = (type, filtro, page) => {
  const until = filtro.firstTime == false ? filtro.daterange[0] : '';
  const beginning = filtro.firstTime == false ? filtro.daterange[1] : '';
  return gql`
    {
      ordersIncome(
        order_process:${type}
        page: ${page}
        itemsPage: 10
        date_range: {
          desde: "${until}"
          hasta: "${beginning}"
        }
        search: "${filtro.search}"
        ) {
        info {
          page
          total
          itemsPage
          pages
        }
        status
        message
        ordersIncome {
          pedido_id
          payment_date
          last_status
          status_date
          seller
          amount
          devolution
          refund
          cancellation
          refund_date
          process
        }
      }
    }
  `;
};

export const ORDERS_INCOME_EXCEL = (type, filtro) => {
  const until = filtro.firstTime == false ? filtro.daterange[0] : '';
  const beginning = filtro.firstTime == false ? filtro.daterange[1] : '';
  return gql`
 { ordersIncomeCSV(date_range: {
        desde: "${until}"
        hasta: "${beginning}"
      }, search: "${filtro.search}", order_process: ${type})}
  `;
};

export const COMPANIES_WEEK_EXCEL = (store_id, payment_status, partner) => {
  return gql`{
      companiesWeeklyCutCSV(cut_code: "${store_id}" payment_status: "${
    payment_status || ''
  }", partner: "${partner || ''}")
  }`;
};

export const TOTAL_SUBSCRIPTIONS = () => {
  return `{
    totalSubscriptions
  }`;
};

export const COMPANIES_CUT_SALE_PAYMENT_STATUS_TOTALES = (cut_code) => {
  return gql`
  {
    companyCutStatusCounter(cut_code: "${cut_code}") {
      pending
      paid
      total
    }
  }
  `;
};

export const CHANGE_COMPANIES_CUT_PAYMENT_STATUS = ({
  cut_code,
  payment_status,
  change_payment_status,
  company_ids = [],
  no_companies = []
}) => {
  return gql`
    mutation {
      changeCompanyCutPaymentStatus(
        code: "${cut_code || ''}"
        payment_status: "${payment_status || ''}"
        change_payment_status: "${change_payment_status || ''}"
        company_ids:  ${JSON.stringify(company_ids)}
        no_companies: ${JSON.stringify(no_companies)}
      ) {
        status
        message
      }
    }
  `;
};

export const COMPANIES_WEEK_CUT = ({
  store_id,
  paymentStatus,
  page,
  partner
}) => {
  return gql`
    {
      companiesWeeklyCut(cut_code: "${store_id}", page: ${
    page || 1
  }, payment_status: "${paymentStatus || ''}", partner: "${partner || ''}") {
        info {
          page
          total
          itemsPage
          pages
        }
        status
        message
        companiesWeeklyCut {
          seller
          company_id
          ruc
          excess_send
          bank_name
          account_number
          gross_income
          comission_cv
          discount_total
          deposit
          weekly_cut_id
          orders_quantity
          payment_status
          igv_comission_cv
          partner
          own_shipping
        }
      }
    }
  `;
};

// Proveedores y partners

export const PROVIDERS_PARTNERS = (filtro, page) => {
  return `{
    providersPartners(
      itemsPage: 10
      page: ${page}
      search: "${filtro.search}"
      date_range: {
      desde: "${filtro.firstTime ? '' : filtro.daterange[0]}",
      hasta: "${filtro.firstTime ? '' : filtro.daterange[1]}"
    }){
      info {
        page
        total
        itemsPage
        pages
      }
      status
      message
      providersPartners {
        order
        date_trx
        date_process
        shipments
        collection
        commission
        partner
        other_income
        gain_total
        shipping_fund
      }
    }
  }`;
};

export const PROVIDERS_PARTNERS_CSV = (filtro) => `{
  providersPartnersCSV(
    search: "${filtro.search}"
    date_range: {
    desde: "${filtro.firstTime ? '' : filtro.daterange[0]}",
    hasta: "${filtro.firstTime ? '' : filtro.daterange[1]}"
  })
}`;

export const ORDERS_SHIPPED_TODAY = (page = 1, itemsPage = 10) => `{
  ordersShippedToday(
    page: ${page}
    itemsPage: ${itemsPage}
  ) {
    info {
      page
      total
      itemsPage
      pages
    }
    status
    message
    data {
      order
      remito
      recorded_weight
      real_weight
      diff_weight
      product
    }
  }
}`;

export const SEND_FILE_EXCESS_BY_SEND = (file) => `
mutation {
  sendFileExcessBySend(
    file: "${file}"
  )
}`;

export const SHIPPING_WEIGHT_COMPARISON_HISTORY = (
  page = 1,
  itemsPage = 10,
  filtro
) => `{
  shippingWeightComparisonHistory(
    page:${page}
    itemsPage: ${itemsPage}
    search: "${filtro.search}"
    date_range: {
      desde: "${filtro.range[2] ? filtro.range[0] : ''}",
      hasta: "${filtro.range[2] ? filtro.range[1] : ''}"
    }
  ) {
    info{
      pages
      itemsPage
      total
      page
    }
    status
    message
    data {
      date_comparison
      order
      remito
      recorded_weight
      real_weight
      diff_weight
      product
      recorded_send
      real_send
      excess_send
    }
  }
}`;
