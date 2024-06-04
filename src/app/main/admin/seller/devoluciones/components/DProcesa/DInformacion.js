import {
  devolucion_motives,
  devolution_methods
} from '@/app/api/graphql/webbuy/TableAPIService';
import { IMAGESIZE } from '@/common/CovendeTemplate/CVThemes';
import { Box, Text } from '@chakra-ui/layout';
import { useDisclosure } from '@chakra-ui/react';
import { CVEstadoDevolucion } from '@CVTemplate/core/CVEstado/CVEstadoDevolucion';
import CVInput, { CVErrorLabel } from '@CVTemplate/core/CVInput';
import CVInputImage from '@CVTemplate/core/CVInputImage';
import CVInputImageGallery from '@CVTemplate/core/CVInputImageGallery';
import { CVEstadoDevolucionStatus } from '@/common/CovendeTemplate/CVEstado/CVEstadoDevolucion';
import { CVFormatDate } from '@CVTemplate/core/CVMethods';
import CVSelect from '@CVTemplate/core/CVSelect';
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

function DInformacion({ devolucion, setdevolucion, errors, variant, method }) {
  const [methodos, setmethodos] = useState([]);
  const [motivos, setmotivos] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setsize] = useState({});

  const initdata = async () => {
    const methods = await devolution_methods();
    const motive = await devolucion_motives();
    setmethodos(methods);
    setmotivos(motive);
  };

  const setinformation = (key, value) =>
    setdevolucion({
      ...devolucion,
      informacion: {
        ...devolucion.informacion,
        [key]: value
      }
    });

  useEffect(() => {
    initdata();
    const [width, height, attr] = IMAGESIZE['PRODUCT_RETURN'].split(',');
    setsize({ width, height, attr });
  }, []);

  const optsStatus = {
    PROCESSED: 'SENDED',
    SENDED: 'RETURNED'
  };

  return (
    <Box fontSize='0.9rem'>
      <Grid container spacing={2}>
        <Grid item xs={4} sm={4} md={4}>
          <Box fontWeight='600' fontSize='12px'>
            Fecha de solicitud:
          </Box>
        </Grid>
        <Grid item xs={8} sm={8} md={8}>
          {CVFormatDate({
            date: devolucion?.informacion?.registred_date,
            time: true
          })}
        </Grid>

        {devolucion?.estado?.request_status && (
          <>
            <Grid item xs={4} sm={4} md={4}>
              <Box fontWeight='600' fontSize='12px'>
                Estado de solicitud:
              </Box>
            </Grid>
            <Grid item xs={8} sm={8} md={8}>
              {devolucion.estado.status && (
                <Text
                  color={
                    CVEstadoDevolucionStatus[devolucion.estado.request_status]
                      .color
                  }>
                  {CVEstadoDevolucionStatus[devolucion.estado.request_status]
                    .text || ''}
                </Text>
              )}
            </Grid>
          </>
        )}

        {devolucion?.estado?.status != undefined &&
          !['', 'X'].includes(devolucion?.estado?.status) && (
            <>
              <Grid item xs={4} sm={4} md={4}>
                <Box fontWeight='600' fontSize='12px'>
                  Estado de devolución:
                </Box>
              </Grid>
              <Grid item xs={8} sm={8} md={8}>
                {
                  CVEstadoDevolucion(
                    optsStatus[devolucion.estado.status] ||
                      devolucion.estado.status
                  ).text
                }
              </Grid>
            </>
          )}

        {/* {method == 'create' && (
          <>
            <Grid item xs={4} sm={4} md={4}>
              <Box fontWeight='600' fontSize='12px'>
                Estado:
              </Box>
            </Grid>
            <Grid item xs={8} sm={8} md={8}>
              {devolucion?.estado?.request_status !== ''
                ? CVEstadoDevolucion(devolucion?.estado?.request_status).text
                : '-'}
            </Grid>
          </>
        )} */}

        <Grid item xs={12} sm={12} md={12}>
          <CVSelect
            disabled={devolucion.custom_id != ''}
            error={errors && devolucion.informacion.methods == ''}
            titleOrientation='column'
            title='Método de devolución: '
            options={[
              ...methodos.map((item) => ({ value: item._id, text: item.title }))
            ]}
            onChange={(value) => setinformation('methods', value)}
            value={devolucion.informacion.methods || ''}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          {/* <CVButton backgroundColor='green'>Realizado</CVButton> */}
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <CVSelect
            disabled={devolucion.custom_id != ''}
            error={errors && devolucion.informacion.reason == ''}
            title='Razón de devolución:'
            titleOrientation='column'
            options={[
              ...motivos.map((item) => ({ value: item._id, text: item.title }))
            ]}
            onChange={(value) => setinformation('reason', value)}
            value={devolucion.informacion.reason || ''}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Text fontSize='12px' fontWeight='500'>
            Detalles:
          </Text>
          <CVInput
            disabled={devolucion.custom_id != ''}
            error={errors && devolucion.informacion.details == ''}
            onChange={(value) => setinformation('details', value)}
            value={devolucion.informacion.details || ''}
            height='100%'
            titleOrientation='column'
            multiline={true}
            title='Por favor describe detalladamente tu caso. '
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Box fontWeight='600' fontSize='12px'>
            Fotos:
          </Box>
          <Text>Sube las evidencias de tu caso.</Text>
          <CVInputImageGallery
            readOnly={variant === 'seller' || devolucion.custom_id != ''}
            // limit={
            //   variant == 'buyer' ? 6 : devolucion?.informacion?.photos?.length
            // }
            limit={
              method == 'create' ? 6 : devolucion?.informacion?.photos?.length
            }
            setgallery={(images) => setinformation('photos', [...images])}
            actions={false}
            gallery={devolucion.informacion.photos}
            onClick={() => onOpen()}
          />
          {errors && devolucion.informacion.photos.length == 0 && (
            <CVErrorLabel errorMessage='Adjunte almenos una prueba' />
          )}
        </Grid>
      </Grid>
      {isOpen && (
        <CVInputImage
          viewMode={0}
          size={size}
          isOpen={isOpen}
          onClose={onClose}
          onChange={(img) =>
            setinformation('photos', [...devolucion.informacion.photos, img])
          }
        />
      )}
    </Box>
  );
}

export default DInformacion;
