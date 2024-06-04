import WMDUbigeoDepartamento from './webmodeldirection/WMDUbigeoDepartamento';
import WMDUbigeoDistrito from './webmodeldirection/WMDUbigeoDistrito';
import WMDUbigeoProvincia from './webmodeldirection/WMDUbigeoProvincia';
import WMSPedido from './webmodelstatus/WMSPedido';
import CIPPagoEfectivo from './WMCIPPagoEfectivo';
import WMCompany from './WMCompany';
import WMCoupon from './WMCoupon';
import WMCustomer from './WMCustomer';
import WMProductQ from './WMProductQ';
import WMTable from './WMTable';

const WMPedido = ({
  cip = false,
  coupon = false,
  statuses = false,
  store = false,
  seller = false,
  buyer = false,
  product = false,
  receiver_department = false,
  receiver_province = false,
  receiver_district = false,
  courier = false,
  method_payment = false,
  coin = false,
  permit_devolution = false,
  permit_cancelled = false
}) => `{
    pedido_id
	custom_id
	company_id
	${store ? `company:store${WMCompany}` : ``}
	buyer_id
	${buyer ? `buyer${WMCustomer}` : ``}
	${seller ? `seller${WMCustomer}` : ``}
	seller_id
	product_id
	attributes
	${product ? `product${WMProductQ}` : ``}
	product_item_id
	producto
	variantes
	sku
	cantidad
	unit_price
	final_unit_price
	unidad
	buy_type
	status
	estado
	${statuses ? `statuses${WMSPedido}` : ``}
	payment_status
	payment_method_status
	coin_type_code
	${
    coin
      ? `coin_type{
        _id
        coin_type_code
        name
        abrev
        symbol
        image
        active
    }`
      : ``
  }
	id_cupon
	${coupon ? `coupon${WMCoupon}` : ``}
	billing_type
	ruc_buyer
	tracking{
        emision
        remito
        status
    }
	country
	receiver_country
	receiver_first_name
	receiver_last_name
	receiver_direction
	receiver_reference
	receiver_department_id
	${
    receiver_department
      ? `departamento:receiver_department${WMDUbigeoDepartamento}`
      : ``
  }
	receiver_province_id
	${receiver_province ? `provincia:receiver_province${WMDUbigeoProvincia}` : ``}
	receiver_district_id
	${receiver_district ? `distrito:receiver_district${WMDUbigeoDistrito}` : ``}
	receiver_zip
	receiver_phone
	receiver_dni
	receiver_ubigeo_district
	seller_name
	seller_direction
	seller_contact
	seller_phone
	seller_ruc
	seller_ubigeo_district
	guide_number
	delivery_time{
        value
        type
    }
	precio_envio
	medio_pago
	${method_payment ? `methodPayment${WMTable}` : ``}
	subtotal
	igv_percentage
	buyer_social_razon
	igv
	porcentaje_oferta
	descuento_total
	porcentaje_descuento
	total
	comission_total
	fecha_compra
	fecha_recoleccion
	fecha_entrega
	fecha_confirmacion
	confirm_reception
	courier_id
	courier_code
	${courier ? `courier${WMTable}` : ``}
	comissions{
        title
        description
        percentage
        comission_type
        value
        amount
        total
    }
	comment
	${cip ? `CIP${CIPPagoEfectivo}` : ``}
	${permit_devolution ? `permit_devolution` : ``}
	${permit_cancelled ? `permit_cancelled` : ``}
	refund_id
	canceled_id
	updatedAt
	receipt_url
	weekly_cut_id
}`;

export default WMPedido;
