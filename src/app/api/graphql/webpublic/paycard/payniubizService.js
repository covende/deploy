export const GET_NIUBIZ_SESSIONID = (monto, antifraud) => `{
    getNiuBizSessionID(
      monto:${monto}
      antifraud:{
        correo:"${antifraud.correo}"
        dni:"${antifraud.dni}"
        purchaseNumber:"${antifraud.purchaseNumber}"
        productId:"${antifraud.productId}"
      }
    ){
      status
      message
      data{
        tokenID
        sessionID
        merchandID
      }
    }
  }`;

export const SEND_TRANSACTION = ({ token, data }) => `mutation{
  sendTransaction(token:"${token}",data:"${data}")
}`;
