export const FIRST_CARD_BACKOFFICE = () => `
{
  firstCardBackoffice {
    salesTotal
    buyersTotal
    approvedProducts
    messagesToReply
    performance {
      good
      regular
      bad
    }
    userStatistic {
      usersTotal
      points {
        date
        sellers
        buyers
      }
    }
    pendingSellers {
      photo
      id
      comercial_name
      ruc
      register_date
      customer_id
      user_id
    }
    productsBestSeller {
      photo
      name
      id
    }
    activityUsers {
      photo
      name
      role
      date
    }
  }
}
`;
