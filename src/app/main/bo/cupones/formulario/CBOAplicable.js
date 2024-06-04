import {
  companies_by_name,
  products_by_name
} from '@/app/api/graphql/webcoupon/WCouponService';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVSelectMultiple, CVText } from '@/common/CovendeTemplate';
import CVRadio from '@/common/CovendeTemplate/CVRadio';
import { Box, Flex } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';

function CBOAplicable({
  aplicable,
  setaplicable,
  allcategories,
  allproducts,
  allstores,
  setallproducts,
  setallstores
}) {
  const categories = aplicable.onlycategorys.map((item) => item.value);
  const stores = aplicable.onlystores.map((item) => item.value);
  const [storefind, setstorefind] = useState('');
  const [productfind, setproductfind] = useState('');

  const filterstores = async (value) => {
    const stores = await companies_by_name({
      name: value,
      categories,
      limit: 10
    });
    setallstores(
      stores.map((item) => ({
        text:
          item.comercial_name && item.comercial_name != '-'
            ? item.comercial_name
            : item.social_razon,
        value: item._id
      }))
    );
  };

  const filterproducts = async (value) => {
    const products = await products_by_name({
      name: value,
      categories,
      limit: 10,
      stores
    });
    setallproducts(
      products.map((item) => ({
        text: item.product_name,
        value: item.product_id
      }))
    );
  };

  useEffect(() => {
    filterstores(storefind);
  }, [storefind, aplicable.onlycategorys]);

  useEffect(() => {
    filterproducts(productfind);
  }, [productfind, aplicable.onlycategorys]);

  return (
    <Box width='100%'>
      <CVText color='blue' fontSize='1.5rem' fontWeight='bold'>
        2. Aplicables a:
      </CVText>
      <SizeBox />
      <CVText color='gray'>
        El usuario podrá usar tu cupón de descuento en:
      </CVText>
      <SizeBox />
      <CVRadio
        itemDirection='column'
        onChange={(value) => setaplicable({ ...aplicable, aplicate: value })}
        value={aplicable.aplicate}
        options={[
          { text: 'Planes de Suscripcion', value: 'subscription_plans' },
          { text: 'Todos los Productos', value: 'products_all' },
          { text: 'Seleccionados', value: 'selected' }
        ]}
      />
      <SizeBox />
      {aplicable.aplicate == 'selected' ? (
        <Box width='100%'>
          <Flex alignItems='center' width='100%'>
            <CVText color='blue'>Categorías específicas</CVText>
            <SizeBox />
            <CVSelectMultiple
              width='100%'
              height='3rem'
              multiple={true}
              value={aplicable.onlycategorys}
              onChange={(value) =>
                setaplicable({ ...aplicable, onlycategorys: value })
              }
              options={allcategories.map((item) => ({
                text: item.name,
                value: item._id
              }))}
            />
          </Flex>
          <SizeBox />
          <Flex alignItems='center' width='100%'>
            <CVText color='blue'>Tiendas específicas</CVText>
            <SizeBox />
            <CVSelectMultiple
              width='100%'
              height='3rem'
              multiple={true}
              value={aplicable.onlystores}
              onInputChange={(value) => setstorefind(value)}
              options={[
                ...(aplicable.onlystores || []),
                ...allstores.filter((item) => !stores.includes(item.value))
              ]}
              onChange={(value) =>
                setaplicable({ ...aplicable, onlystores: value })
              }
            />
          </Flex>
          <SizeBox />
          <Flex alignItems='center' width='100%'>
            <CVText color='blue'>Productos específicos</CVText>
            <SizeBox />
            <CVSelectMultiple
              width='100%'
              height='3rem'
              multiple={true}
              value={aplicable.allproducts}
              onInputChange={(value) => setproductfind(value)}
              options={[
                ...(aplicable.allproducts || []),
                ...allproducts.filter(
                  (item) => !categories.includes(item.value)
                )
              ]}
              onChange={(value) =>
                setaplicable({ ...aplicable, allproducts: value })
              }
            />
          </Flex>
        </Box>
      ) : (
        ''
      )}
    </Box>
  );
}

export default CBOAplicable;
