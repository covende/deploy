import React, { useMemo, useRef } from 'react';
import { useHistory } from 'react-router';
import { LargeProduct } from './CVCardCustomStyle';
import { hoverevent, isPrice, whosale } from './CVCardProductMethod';
import CVCardProductComponentImage from './CVCardProductComponents/CVCardProductComponentImage';
import CVCardProductComponentInformation from './CVCardProductComponents/CVCardProductComponentInformation';

function CVCardProductLarge({
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
  width = '300px',
  imgWidth = '145px',
  height = '100%'
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
    <LargeProduct
      height={height}
      width={width}
      imgWidth={imgWidth}
      onMouseEnter={() => hoverevent(buttons, true)}
      onMouseLeave={() => hoverevent(buttons, false)}>
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
        percentage_oferta={percentage_oferta}
        flexDirection='column-reverse'
        justifyContent='row-reverse'
        alignItems='start'
      />
      <CVCardProductComponentImage
        buttons={buttons}
        type_of_sale={type_of_sale}
        item={item}
        product_photo={product_photo}
        goto={goto}
        precio={precio}
        width={imgWidth}
        product_id={product_id}
        product_slug={product_slug}
      />
    </LargeProduct>
  );
}

export default CVCardProductLarge;
