export const GENERATE_CIP = ({
  Pais = 'PER',
  TipoMoneda = 'PEN',
  antifraude,
  amount
}) => {
  return `{
        generateCIP(
          Pais:"${Pais}"
          TipoMoneda:"${TipoMoneda}"
          Monto: "${amount}"
          antifraude:{
            transactionCode: "${antifraude.transactionCode || ''}"
            paymentConcept: "${antifraude.paymentConcept || ''}"
            additionalData: "${antifraude.additionalData || ''}"
            userEmail: "${antifraude.userEmail || ''}"
            userName: "${antifraude.userName || ''}"
            userLastName: "${antifraude.userLastName || ''}"
            userUbigeo: "${antifraude.userUbigeo || ''}"
            userCountry: "${antifraude.userCountry || ''}"
            userDocumentType: "${antifraude.userDocumentType || ''}"
            userDocumentNumber: "${antifraude.userDocumentNumber || ''}"
            userCodeCountry:  "${antifraude.userCodeCountry || ''}"
            userPhone: "${antifraude.userPhone || ''}"
          }
        ){
          status
          message
          data{
            cip
            currency
            amount
            transactionCode
            dateExpiry
            cipUrl    
          }
        }
      }`;
};
/*
Monto: "50"
antifraude:{
    transactionCode: "101"
    paymentConcept: "Demo"
    additionalData: ""
    userEmail: "manrrique.my@gmail.com"
    userName: "Manrrique"
    userLastName: "Meneses"
    userUbigeo: "010101"
    userCountry: "PERU"
    userDocumentType: "DNI"
    userDocumentNumber: "71246792"
    userCodeCountry:  "+51"
    userPhone: "910103845"
}

*/
