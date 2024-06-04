import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVModal from '@CVTemplate/core/CVModal';
import CVText from '@CVTemplate/core/CVText';
import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import CVImage from '@CVTemplate/core/CVImage';
import { Flex, Box } from '@chakra-ui/react';
import { CVRenderHTML } from '@CVTemplate/core/CVMethods';
import CVLink from '@CVTemplate/core/CVLink';
import CVButton from '@CVTemplate/core/CVButton';
import { add_pedido_refund } from '@CVApi/core/webreembolso/ReemServices';
const SuccessCancel = ({ isOpen, onClose, pedido }) => {
  const [producto, setproducto] = useState({
    product_image: pedido?.product?.photo || 'https://via.placeholder.com/150',
    product_name: pedido?.producto || '',
    descripcion: pedido?.product?.featured_description || '',
    price: pedido?.total || '',
    motivo_cancel: 0
  });

  const [loading, setloading] = useState(false);

  const initdata = async () => {
    setloading(true);
    const cancelation_id = localStorage.getItem('cancelation_id');
    localStorage.removeItem('cancelation_id');
    await add_pedido_refund({
      pedido_id: pedido?.pedido_id,
      provenance_custom_id: cancelation_id,
      provenance_type: 'CANCELLATION'
    });
    setloading(false);
  };

  useEffect(() => {
    initdata();
  }, []);
  return (
    <CVModal
      size='3xl'
      isOpen={isOpen}
      onClose={onClose}
      header='Cancelacion Exitosa'
      bgHeader='red'
      colorHeader='white'
      footer={
        <Box w='100%' textAlign='center' justifyContent='center'>
          <CVLink href={'/buyer/reembolso/cancelation/' + pedido?.pedido_id}>
            <CVButton
              disabled={loading}
              isLoading={loading}
              backgroundColor='red'>
              Ver Reembolso
            </CVButton>
          </CVLink>
        </Box>
      }>
      <SizeBox />
      <CVText textAlign='center' color='blue'>
        Se ha cancelado este pedido:
      </CVText>

      <SizeBox />
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Box>
            <CVImage image={producto.product_image} />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <CVText fontWeight='bold'>{producto.product_name}</CVText>
          <Flex justifyContent='space-between'></Flex>
          <CVText variant='maxtext' lines={3} overflow='auto'>
            <CVRenderHTML>{producto?.descripcion || ''}</CVRenderHTML>
          </CVText>
        </Grid>
        <Grid item xs={3}>
          <CVText color='blue' fontWeight='bold'>
            Monto Total
          </CVText>
          <CVText color='blue' fontWeight='bold'>
            S/ {producto.price}
          </CVText>
        </Grid>
      </Grid>
    </CVModal>
  );
};

export default SuccessCancel;
