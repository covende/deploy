import { pedido_details } from '@/app/api/graphql/webadmin/PedidoService';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVImage, CVPanel, CVText } from '@/common/CovendeTemplate';
import { Skeleton, useDisclosure } from '@chakra-ui/react';
import { Container, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import iconTitleDetails from '@/app/assets/img/iconTitleDetails.png';
import DProducto from './components/details/DProducto';
import DDetalles from './components/details/DDetalles';
import DVendedor from './components/details/DVendedor';
import DEstado from './components/details/DEstado';
import DCompra from './components/details/DCompra';
import BPDFeedBack from './components/modales/BPDFeedBack';
import CVButton from '@CVTemplate/core/CVButton';
import { Flex, Box, useToast } from '@chakra-ui/react';
import { COLORS } from '@CVTemplate/core/CVThemes';
import CVLink from '@CVTemplate/core/CVLink';
import { add_pedido_refund } from '@CVApi/core/webreembolso/ReemServices';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';
function BuyerPedidosDetalles() {
  const { id } = useParams();
  const [orden, setorden] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [applyto, setapplyto] = useState('');
  const [reload, setreload] = useState(false);
  const addToast = useToast();
  const [loading, setloading] = useState(false);

  const initdata = async () => {
    const pedido = await pedido_details(id);
    setorden(pedido);
  };

  const getcupon = async () => {
    setloading(true);
    const res = await add_pedido_refund({
      pedido_id: orden?.pedido_id,
      provenance_custom_id: orden?.canceled_id,
      provenance_type: 'CANCELLATION'
    });
    if (res)
      CVAlertSuccess({
        addToast,
        message: 'Se ha generado el cupon, puede ir con el mismo boton'
      });
    else {
      CVAlertError({ addToast, message: 'Ocurrieron Errores' });
    }
    setloading(false);
    initdata();
  };

  useEffect(() => {
    initdata();
  }, []);

  return (
    <Box>
      {orden != null ? (
        <Container>
          <CVText fontSize='2rem' color='red' fontWeight='bold'>
            Detalles del Pedido
          </CVText>
          <SizeBox />
          <CVPanel
            backgroundColor='red'
            itemJustify='space-between'
            padding='2rem'>
            <Box>
              <CVText color='white' fontSize='2rem' fontWeight='bold'>
                ID Pedido
              </CVText>
              <CVText color='white' fontSize='2rem' fontWeight='bold'>
                {orden.custom_id}
              </CVText>
            </Box>
            <Box
              style={{
                position: 'relative',
                width: '350px'
              }}>
              <Box style={{ position: 'absolute', top: '-50px' }}>
                <CVImage
                  image={iconTitleDetails}
                  height='140px'
                  width='160px'
                />
              </Box>
            </Box>
          </CVPanel>

          <Grid container spacing={1}>
            {orden?.status == 'CANCELLED' ? (
              <Grid item sx={12} sm={12} md={12}>
                <SizeBox />
                <Flex alignItems='center'>
                  <Box
                    backgroundColor={COLORS['white']}
                    borderRadius='0.5rem 0 0 0.5rem'
                    height='100%'
                    padding='0.5rem'>
                    <CVText>Cancelaste el Pedido</CVText>
                  </Box>
                  {orden?.refund_id && (
                    <CVLink href={'/buyer/reembolso/cancelation/' + id}>
                      <CVButton
                        backgroundColor='blue'
                        borderRadius='0 0.5rem 0.5rem 0'>
                        Ver Reembolso
                      </CVButton>
                    </CVLink>
                  )}
                  {orden?.refund_id == null && (
                    <CVButton
                      disabled={loading}
                      isLoading={loading}
                      onClick={() => getcupon()}
                      backgroundColor='blue'
                      borderRadius='0 0.5rem 0.5rem 0'>
                      Solicitar Reembolso
                    </CVButton>
                  )}
                </Flex>
              </Grid>
            ) : (
              ''
            )}
            <Grid item sx={12} sm={12} md={6}>
              <DDetalles pedido={orden} />
              <DVendedor
                pedido={orden}
                onOpen={onOpen}
                setapplyto={setapplyto}
                reload={reload}
              />
              <DProducto
                onOpen={onOpen}
                pedido={orden}
                product={orden.product}
                setapplyto={setapplyto}
                reload={reload}
              />
            </Grid>
            <Grid item sx={12} sm={12} md={6}>
              <DEstado pedido={orden} />
            </Grid>
            <Grid item sx={12} sm={12} md={12}>
              <DCompra pedido={orden} product={orden.product} />
            </Grid>
          </Grid>
          <BPDFeedBack
            isOpen={isOpen}
            onClose={onClose}
            setorden={setorden}
            pedido={orden}
            producto={orden.product}
            to={applyto}
            reload={reload}
            setreload={setreload}
          />
        </Container>
      ) : (
        <Skeleton height='100%' />
      )}
    </Box>
  );
}

export default BuyerPedidosDetalles;
