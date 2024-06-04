import { CVButton, CVModal } from '@/common/CovendeTemplate';
import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { tienda } from '../../../productos/redux/ProductUpdate';
import { useDispatch, useSelector } from 'react-redux';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import CVDownloadXlxs from '@CVTemplate/core/CVDownloadXlsx';
import { Box, Center, Text } from '@chakra-ui/layout';
import { COLORS } from '@CVTemplate/core/CVThemes';
import { Grid } from '@material-ui/core';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { BULK_LOAD_OFFERS } from '@CVApi/core/webseller/ProductService';
import { useToast } from '@chakra-ui/toast';

function OfferBulkLoad({ isOpen, onClose, store_id }) {
  const [okupload, setOkupload] = useState(false);
  const [excelFile, setExcelFile] = useState('');
  const [loading, setLoading] = useState(false);
  const { product } = useSelector((state) => state.ProductView);
  const dispatch = useDispatch();
  const addToast = useToast();

  let offerHeaders = [
    {
      header: 'SKU',
      comment:
        'Ingresa el SKU del producto.Debe ser un código Alfabético o numérico, sin carácter especiales o espacios, este código es creado por el vendedor',
      width: 43
    },
    {
      header: 'Oferta',
      comment:
        'Indica si tienes alguna oferta especial o descuento para el producto. Puedes mencionar cualquier promoción, como "descuento del 10%" o "S/10 de descuento". Ingrese solo número',
      width: 50
    },
    {
      header: 'Tipo de oferta',
      key: 'offerType',
      comment:
        'Indica el tipo de oferta que se mostrara en tu producto ya sea porcentaje o monto fijo',
      width: 43,
      options: ['Fijo', 'Porcentaje']
    },
    {
      header: 'Inicio de oferta',
      comment:
        'Esta fecha marca el comienzo de la oferta o promoción especial. Es importante proporcionar una fecha de inicio clara',
      width: 43
    },
    {
      header: 'Fin de oferta',
      comment:
        'Aquí debes especificar la fecha en la que la oferta especial o descuento finaliza',
      width: 43
    }
  ];

  const selectFile = (e) => {
    try {
      const file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        var Base64 = reader.result;
        setExcelFile(Base64);
      };

      reader.onerror = (error) => {
        console.log('error: ', error);
      };
    } catch (error) {
      setExcelFile('');
    }
  };

  const updateFile = async (file) => {
    try {
      setLoading(true);
      let company_id = store_id || (await tienda(dispatch, product));

      let { addBulkLoadProductsOfferByCompany: resp } = await AxiosGQL(
        BULK_LOAD_OFFERS(company_id, file)
      );

      if (resp?.status) {
        setOkupload(true);
        CVAlertSuccess({
          addToast,
          message: resp.message
        });
      } else {
        CVAlertError({
          addToast,
          message: resp.message
        });
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CVModal isOpen={isOpen} onClose={onClose}>
      <Grid item xs={12}>
        <Box bg='white' p={3} m={3} borderRadius='10'>
          <Text>
            Recuerda que el archivo debe respetar los campos de la plantilla{' '}
          </Text>
          <Center m={5}>
            <Text color={COLORS.green} fontSize='1.3rem' fontWeight='bold'>
              Actualizar las ofertas desde este archivo
            </Text>
          </Center>

          <Center>
            <Box>
              {!okupload && (
                <input
                  type='file'
                  accept='.xls,.xlsx'
                  onChange={(e) => {
                    selectFile(e);
                  }}
                />
              )}

              <br />
            </Box>
          </Center>
          <Center my={10}>
            {!okupload ? (
              <CVButton
                disabled={excelFile == '' || loading}
                isLoading={loading}
                backgroundColor='green'
                fontSize='1.5rem'
                padding='0 7rem'
                onClick={() => updateFile(excelFile)}>
                Subir Archivo{' '}
              </CVButton>
            ) : (
              <Text
                color={COLORS.red}
                fontSize='1.5rem'
                fontWeight='bold'
                textAlign='center'>
                Ofertas actualizadas exitosamente
              </Text>
            )}
          </Center>
        </Box>
      </Grid>

      <Flex ml={'1rem'}>
        <Box fontSize='1.5rem' p={3} borderRadius='20'>
          <CVDownloadXlxs
            headers={offerHeaders}
            fetchData={[]}
            color='green'
            sheetName='Plantilla'
            headersColor='17BF93'
            fontWeight='Bold'
            text='plantilla'
            justifyContent='center'
          />
        </Box>
      </Flex>
    </CVModal>
  );
}

export default OfferBulkLoad;
