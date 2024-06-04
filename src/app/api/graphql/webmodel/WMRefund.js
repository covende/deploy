import WMCoupon from './WMCoupon';

const WMRefund = `{
    _id
    custom_id
    pedido_id
    request_date
    amount
    status
    estado
    coupon_id
    allow_refund_account
    coupon ${WMCoupon}
  }`;

export default WMRefund;
