import WMTable from './WMTable';

const WMCompanyPlan = `{
    status
	fecha_inicio
	fecha_fin
	documents
	methodPayment${WMTable}
	name
	details
	coupon_id
	amount_original
	amount_final
	payment_status
	payment_method_status
	discount_percentage
	total_discount
}`;

export default WMCompanyPlan;
