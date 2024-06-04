import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Flex
} from '@chakra-ui/react';
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { CVButton, CVImage } from '@/common/CovendeTemplate';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import { useToast } from '@chakra-ui/toast';
import CCardOption from './CCardOption';
import { fileicon } from '@CVPages/core/admin/seller/configuracion/ConfigurationIcons';
import { solicitudesMarcasPlaces } from './CBODataTableUtils';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { active_brand_request } from '@CVApi/core/webBrands/WBrandService';

function MBrandRequest({ onClose, isOpen, brand, setfiltro }) {
  const [loadingApproved, setLoadingApproved] = useState(false);
  const [loadingRejected, setLoadingRejected] = useState(false);

  const [brandRequest, setBrandRequest] = useState(brand);
  const addToast = useToast();

  const approved = async (active) => {
    active ? setLoadingApproved(true) : setLoadingRejected(true);

    let resp = await active_brand_request({
      id: brandRequest.id,
      active: active
    });

    if (resp.status) {
      setBrandRequest(resp.brandRequest);
      CVAlertSuccess({ addToast, message: resp.message });
    } else {
      CVAlertError({ addToast, message: resp.message });
    }

    active ? setLoadingApproved(false) : setLoadingRejected(false);
    onClose();
    setfiltro({ status: 'ALL' });
  };

  useEffect(() => {
    setBrandRequest(brand);
  }, [brand]);

  return (
    <Modal onClose={onClose} size='xl' isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent maxWidth='700px'>
        <ModalHeader style={{ backgroundColor: '#00ADF6' }}>
          <Text fontSize='1.2rem' fontWeight='bold' color='#FFFFFF'>
            Solicitud de Creación de Marca
          </Text>
        </ModalHeader>
        <ModalCloseButton style={{ color: '#FFFFFF' }} />
        <ModalBody maxWidth='700px'>
          {brandRequest?.status === 'PENDING' ? (
            <>
              <br />
              <Flex justifyContent='center'>
                <CVButton
                  isLoading={loadingApproved}
                  backgroundColor='primary'
                  alignItems='center'
                  onClick={() => approved(true)}>
                  Aprobar solicitud
                </CVButton>
                <SizeBox />
                <CVButton
                  isLoading={loadingRejected}
                  backgroundColor='red'
                  alignItems='center'
                  onClick={() => approved(false)}>
                  Rechazar solicitud
                </CVButton>
              </Flex>
            </>
          ) : (
            brandRequest?.status == 'REJECTED' && (
              <>
                <br />
                <Flex justifyContent='center'>
                  <CVButton
                    isLoading={loadingApproved}
                    backgroundColor='primary'
                    alignItems='center'
                    onClick={() => approved(true)}>
                    Aprobar solicitud
                  </CVButton>
                </Flex>
              </>
            )
          )}
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Text align='right'>Soy:</Text>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display='flex'>
                <Text>
                  {brandRequest?.owner_type == 'BRAND_HOLDER'
                    ? 'Titular de tienda'
                    : 'Distribuidor'}
                </Text>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Text align='right'>Nombre de la marca:</Text>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display='flex'>
                <Text>{brandRequest?.name}</Text>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Text align='right'>Descripción:</Text>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display='flex'>
                <Text>{brandRequest?.description}</Text>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Text align='right'>¿La marca está patentada en INDECOPI?</Text>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display='flex'>
                <CCardOption
                  borderColor={
                    brandRequest?.patented_brand ? '#00ADF6' : '#FF5454'
                  }
                  backgroundColor={
                    brandRequest?.patented_brand ? '#00ADF6' : '#FF5454'
                  }
                  text={brandRequest?.patented_brand ? 'SI' : 'NO'}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Text align='right'>
                Archivo de Registro de Marca o permiso de comercialización:
              </Text>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display='flex'>
                <a
                  href={brandRequest?.registration_or_permission_pdf || ' '}
                  target='_blank'>
                  {fileicon}
                </a>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Text align='right'>Logo de la marca:</Text>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div style={{ height: '75px', width: '75px' }}>
                <CVImage
                  image={brandRequest?.logo}
                  height='75px'
                  width='75px'
                />
              </div>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Text align='right'>
                ¿Donde se venden los productos de esta marca?
              </Text>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Text>{solicitudesMarcasPlaces[brandRequest?.place]}</Text>
              {brandRequest?.place == 'ONLINE' &&
                brandRequest?.place_links &&
                brandRequest?.place_links.split(',').map((value, i) => {
                  return (
                    <a href={value} key={i} target='_blank'>
                      <Text>{value}</Text>
                    </a>
                  );
                })}
            </Grid>
          </Grid>
          <br />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default MBrandRequest;
