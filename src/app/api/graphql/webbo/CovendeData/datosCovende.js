export function GET_APP_DATA() {
  return `
  query {
    getAppData {
      _id
      company_name
      social_razon
      fiscal_address
      commercial_address
      logo
      ruc
      phone
      email
      social_media {
        facebook
        instagram
        twitter
      }
      site_title
      short_description
      favicon
    }
  }
  `;
}

export function UPDATE_APP_DATA({
  company_name,
  social_razon,
  logo,
  fiscal_address,
  commercial_address,
  ruc,
  phone,
  email,
  facebook,
  instagram,
  twitter,
  site_title,
  short_description,
  favicon,
  _id
}) {
  return `
  mutation {
    updateAppData(
      _id: "${_id}"
      input: {
        company_name: "${company_name}"
        social_razon: "${social_razon}"
        fiscal_address: "${fiscal_address}"
        commercial_address: "${commercial_address}"
        logo: "${logo}"
        ruc: "${ruc}"
        phone: "${phone}"
        email: "${email}"
        social_media: {facebook: "${facebook}", instagram: "${instagram}", twitter: "${twitter}" }
        site_title: "${site_title}"
        short_description: "${short_description}"
        favicon: "${favicon}"
      }
    ) {
      _id
      company_name
      social_razon
      fiscal_address
      commercial_address
      logo
      ruc
      phone
      email
      social_media {
        facebook
        instagram
        twitter
      }
      site_title
      short_description
      favicon
    }
  }
  
  `;
}

export const GOOGLE_ANALITICS_SERVICE = () => `
{
  googleAnalyticService {
    status
    status_text
    errors
    code
    CantVisits
    CantSesions
    CantUsers
    }
}
`;

export const COMPANY_ALERT = () => `{
  companyAlerts {
    title
    message
    type
    link
  }
}`;
