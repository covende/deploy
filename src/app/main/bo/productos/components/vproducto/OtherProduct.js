import AxiosGQL from '@/app/api/rest/AxiosGQL';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVGridText from '@/common/CovendeTemplate/CVGridText';
import { comprobante_producto } from '@/common/utils/index';
import { Box, Text } from '@chakra-ui/react';
import { PRODUCT_DEVOLUTION_REASONS } from '@CVApi/core/webseller/ProductService';
import React, { useEffect, useState } from 'react';

function OtherProduct({ producto }) {
  const [reason, setReason] = useState([]);
  useEffect(() => {
    AxiosGQL(PRODUCT_DEVOLUTION_REASONS())
      .then(({ productDevolutionReasons }) => productDevolutionReasons)
      .then((productDevolutionReasons) => {
        let reas =
          productDevolutionReasons &&
          productDevolutionReasons.map((reasonItem) => {
            if (producto.devolution_reasons_ids.includes(reasonItem._id)) {
              return reasonItem.title;
            }
          });
        setReason(reas);
      })
      .catch((err) => console.log({ err }));
  }, [producto]);

  return (
    <Box>
      <br />
      <Text fontWeight='bold' color='#174872'>
        Otros
      </Text>
      <SizeBox />
      <CVGridText
        options={[
          {
            title: 'Tipo de comprobante:',
            content: comprobante_producto(producto?.type_voucher) || ''
          },
          { title: 'IGV:', content: (producto.igv || '') + ' %' },
          { title: 'Garantía:', content: `${producto.warranty ? 'si' : 'no'}` },
          { title: 'Periodo:', content: producto?.warranty_period || '' },
          {
            title: 'Detalles de la garantía:',
            content: producto?.warranty_detail || ''
          },
          {
            title: 'Razon de devolución:',
            content: (
              <ul>
                {reason.map(
                  (reas) => reas != undefined && <li key={reas}>{reas}</li>
                )}
              </ul>
            )
          }
        ]}
      />
    </Box>
  );
}

export default OtherProduct;
