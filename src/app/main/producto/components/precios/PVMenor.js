import { CVText } from '@/common/CovendeTemplate';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import CVTooltip from '@/common/CovendeTemplate/CVTooltip';
import { Box, Flex } from '@chakra-ui/react';
import { toBase64 } from '@CVTemplate/core/CVCardProduct/CVCardProductMethod';
import { CVMoneyFormat } from '@CVTemplate/core/CVMethods';
import React, { useEffect, useState } from 'react';
import { FaExclamation } from 'react-icons/fa';
import { v4 } from 'uuid';
import PVActions from './PVActions';

function PVMenor({
  variations = [],
  product_attributes = [],
  stockmax,
  setstockmax,
  price,
  price_unit,
  setprice,
  wholesale = [],
  quantity,
  setquantity,
  details,
  setdetails,
  setcustomdetail,
  openTooltip = false,
  setopenTooltip,
  setVariation,
  setCurrentProduct,
  currentProduct
}) {
  const [selectedAttr, setSelectedAttr] = useState(() => new Map());
  const [beforeAttr, setBeforeAtrr] = useState(() => new Map());

  const isActiveAttrOpt = (attrOpt_id) =>
    Array.from(beforeAttr.values()).includes(attrOpt_id);

  const selectAttribute = ({ attrOpt, attrIndex }) => {
    for (const attr of product_attributes) {
      if (attr.id_attribute == attrOpt?.product_attribute_id) {
        let currentAttr = beforeAttr.get(attr.id_attribute);

        if (currentAttr && currentAttr == attrOpt.product_attribute_detail_id)
          return;

        if (
          attr.attribute_details.some(
            (opts) =>
              opts.product_attribute_detail_id ==
              attrOpt.product_attribute_detail_id
          )
        ) {
          setBeforeAtrr(
            beforeAttr.set(
              attr.id_attribute,
              attrOpt.product_attribute_detail_id
            )
          );
          setSelectedAttr(
            (prev) =>
              new Map([
                ...prev,
                [
                  attr.id_attribute,
                  {
                    hexa: attrOpt.color || '',
                    id: attr.id_attribute,
                    name: attr.name,
                    value: attrOpt.name,
                    value_id: attrOpt.product_attribute_detail_id,
                    position: attrIndex
                  }
                ]
              ])
          );
          break;
        }
      }
    }
  };

  const validprice = (quant, variation_price) => {
    if (wholesale.length > 0) {
      let range = wholesale.filter(
        (item) => quant >= item.minimum_order && quant <= item.maximum_order
      );

      if (range.length > 0) {
        setprice(range[0].price);
      } else {
        if (price && price >= 1)
          setprice(variation_price || price_unit || price);
      }
    }
  };

  useEffect(() => {
    if (selectedAttr.size > 0) {
      let attrs = Array.from(selectedAttr.values()).sort(function (a, b) {
        return a.position - b.position;
      });

      setcustomdetail(
        Object.fromEntries(
          attrs.map((attr) => [
            attr.name,
            attr.hexa != ''
              ? { color: attr.value, type: attr.hexa }
              : attr.value
          ])
        )
      );

      let data = { attributes: attrs };
      if (variations.length > 0) {
        for (const variation of variations) {
          let resp = variation.ref_attr
            .split('#')
            .every((attr) => Array.from(beforeAttr.values()).includes(attr));

          if (resp) {
            data.variation_id = variation.item_id;
            if (quantity > variation.stock) setquantity(variation.stock);

            if (wholesale.length > 0) {
              validprice(
                quantity > variation.stock ? variation.stock : quantity,
                variation.price
              );
            } else setprice(variation.price);

            setstockmax(variation.stock);
            break;
          }
        }
      }

      setCurrentProduct(data);
    }
  }, [selectedAttr]);

  return (
    <Box
      height='100%'
      display='flex'
      justifyContent='space-between'
      flexWrap='wrap'
      alignItems='center'>
      <CVTooltip
        icon={<FaExclamation style={{ fontSize: '3rem' }} />}
        colorIcon='white'
        title='Por favor, asegúrate de elegir entre las opciones disponibles (color, talla, cantidad...) antes de continuar.'
        titleColor='red'
        bgIcon='red'
        height='88px'
        widthIcon='75px'
        isOpen={openTooltip}>
        <Box minHeight='3rem'>
          {product_attributes.map((attr, attrIndex) => (
            <Flex
              width='100%'
              key={v4()}
              alignItems='center'
              marginTop='0.5rem'
              minHeight='3rem'>
              <CVText>{attr.name}</CVText>
              <Flex flexWrap='wrap' width='100%' minHeight='3.5rem'>
                {attr.attribute_details.map((attr_det) => {
                  let attrcolor = null;
                  if (attr_det.color) {
                    attrcolor = attr_det.color;
                    if (attrcolor == 'null') {
                      attrcolor = null;
                    }
                  }

                  let size =
                    (attrcolor ? '' : attr_det.name).length > 1
                      ? (attrcolor ? '' : attr_det.name).length * 10 + 'px'
                      : '2rem';
                  return (
                    <Box
                      rounded='0.5rem'
                      key={v4()}
                      title={attr_det.description}
                      padding='1px'
                      margin='0.5rem'
                      border={
                        !isActiveAttrOpt(attr_det.product_attribute_detail_id)
                          ? '2px solid ' + COLORS['lightGray']
                          : '2px solid ' + COLORS['primary']
                      }>
                      <Flex
                        minWidth='2rem'
                        minHeight='2rem'
                        rounded='0.5rem'
                        width={size}
                        // position='absolute'
                        zIndex='0'
                        alignItems='center'
                        justifyContent='center'
                        onClick={(value) => {
                          selectAttribute({
                            attrOpt: attr_det,
                            attrIndex: attrIndex + 1
                          });
                        }}
                        backgroundColor={attrcolor || 'transparent'}>
                        {attrcolor ? '' : attr_det.name}
                      </Flex>
                    </Box>
                  );
                })}
              </Flex>
            </Flex>
          ))}
        </Box>
        <PVActions
          quantity={quantity}
          stockmax={stockmax}
          validprice={validprice}
          setquantity={(value) => {
            if (
              product_attributes.length > 0 &&
              product_attributes.length !== currentProduct.attributes.length
            ) {
              setopenTooltip(!openTooltip);
              return false;
            }
            setquantity(value);
          }}
          setopenTooltip={setopenTooltip}
        />
      </CVTooltip>
    </Box>
  );
}

export default PVMenor;
