import React, { useMemo, useRef } from 'react';
import { useHistory } from 'react-router';
import { MediumProduct } from './CVCardCustomStyle';
import { hoverevent, isPrice, whosale } from './CVCardProductMethod';
import CVCardProductComponentImage from './CVCardProductComponents/CVCardProductComponentImage';
import CVCardProductComponentInformation from './CVCardProductComponents/CVCardProductComponentInformation';

function CVCardProductMedium({
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
  delivery_free,
  item,
  width = '230px'
}) {
  const history = useHistory();
  const goto = () => history.push(`/producto/${product_slug}`);

  let buttons = useRef();

  let type_of_sale = useMemo(
    () =>
      item?.type_of_sale ||
      isPrice({
        precio_minimo,
        precio_maximo
      }) ||
      '',
    [item]
  );
  return (
    <MediumProduct
      width={width}
      onMouseEnter={() => hoverevent(buttons, true)}
      onMouseLeave={() => hoverevent(buttons, false)}>
      <CVCardProductComponentImage
        buttons={buttons}
        type_of_sale={type_of_sale}
        item={item}
        product_photo={product_photo}
        goto={goto}
        precio={precio}
        width={width}
        product_id={product_id}
        product_slug={product_slug}
      />
      <CVCardProductComponentInformation
        isWhosale={whosale(type_of_sale)}
        product_name={product_name}
        puntuacion={puntuacion}
        precio_minimo={precio_minimo}
        precio_maximo={precio_maximo}
        precio={precio}
        pedido_minimo={pedido_minimo}
        item={item}
        goto={goto}
        offer={offer}
        offer_type={offer_type}
        offer_value={offer_value}
        delivery_free={delivery_free}
        percentage_oferta={percentage_oferta}
      />
    </MediumProduct>
  );
}

export default CVCardProductMedium;
