import React from 'react';
import CVCardProductLarge from './CVCardProduct/CVCardProductLarge';
import CVCardProductMedium from './CVCardProduct/CVCardProductMedium';
import CVCardProductSmall from './CVCardProduct/CVCardProductSmall';

/**
 *
 * @param {Object} param0
 * @param {('small'|'medium'|'large')} param0.variant
 * @param {String} param0.product_id
 * @param {String} param0.product_photo
 * @param {String} param0.precio
 * @param {String} param0.product_name
 * @param {String} param0.precio_minimo
 * @param {String} param0.precio_maximo
 * @param {String} param0.offer
 * @param {String} param0.percentage_oferta
 * @param {String} param0.puntuacion
 * @param {String} param0.product_slug
 * @param {String} param0.pedido_minimo
 * @param {String} param0.width
 * @param {String} param0.imgWidth
 * @param {String} param0.height
 * @param {Object} param0.item
 * @returns
 */
const CVCardProduct = React.memo(MemoCVCardProduct);

function MemoCVCardProduct({
  variant = 'medium',
  product_id,
  product_photo,
  precio,
  product_name,
  precio_minimo,
  precio_maximo,
  offer,
  percentage_oferta,
  offer_type,
  offer_value,
  puntuacion,
  product_slug,
  pedido_minimo,
  item,
  width,
  imgWidth,
  height,
  delivery_free
}) {
  const variants = {
    small: (
      <CVCardProductSmall
        product_id={product_id}
        product_photo={product_photo}
        precio={precio}
        product_name={product_name}
        precio_minimo={precio_minimo}
        precio_maximo={precio_maximo}
        offer={offer}
        percentage_oferta={percentage_oferta}
        offer_type={offer_type}
        offer_value={offer_value}
        puntuacion={puntuacion}
        product_slug={product_slug}
        pedido_minimo={pedido_minimo}
        item={item}
        width={width}
        imgWidth={imgWidth}
        height={height}
        delivery_free={delivery_free}
      />
    ),
    medium: (
      <CVCardProductMedium
        product_id={product_id}
        product_photo={product_photo}
        precio={precio}
        product_name={product_name}
        precio_minimo={precio_minimo}
        precio_maximo={precio_maximo}
        offer={offer}
        percentage_oferta={percentage_oferta}
        offer_type={offer_type}
        offer_value={offer_value}
        puntuacion={puntuacion}
        product_slug={product_slug}
        pedido_minimo={pedido_minimo}
        item={item}
        width={width}
        imgWidth={imgWidth}
        height={height}
        delivery_free={delivery_free}
      />
    ),
    large: (
      <CVCardProductLarge
        product_id={product_id}
        product_photo={product_photo}
        precio={precio}
        product_name={product_name}
        precio_minimo={precio_minimo}
        precio_maximo={precio_maximo}
        offer={offer}
        percentage_oferta={percentage_oferta}
        offer_type={offer_type}
        offer_value={offer_value}
        puntuacion={puntuacion}
        product_slug={product_slug}
        pedido_minimo={pedido_minimo}
        delivery_free={delivery_free}
        item={item}
        width={width}
        imgWidth={imgWidth}
        height={height}
      />
    )
  };
  return variants[variant];
}

export default CVCardProduct;
