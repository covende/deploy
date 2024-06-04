import { CVButton, CVModal } from '@/common/CovendeTemplate';
import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import CVDownloadXlxs from '@CVTemplate/core/CVDownloadXlsx';
import { Box, Center, Text } from '@chakra-ui/layout';
import { COLORS } from '@CVTemplate/core/CVThemes';
import { Grid } from '@material-ui/core';
// import { tienda } from '../../redux/ProductUpdate';
import { BULK_LOAD_STOCK } from '@CVApi/core/webseller/ProductService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { useToast } from '@chakra-ui/toast';
import { tienda } from '../../productos/redux/ProductUpdate';
import { update_status_pedidos_by_file } from '@CVApi/core/webadmin/PedidoService';

function PedidosStatusMasivo({
  isOpen,
  onClose,
  store_id,
  process,
  deliveryOwnStatus
}) {
  const [okupload, setOkupload] = useState(false);
  const [excelFile, setExcelFile] = useState('');
  const [loading, setLoading] = useState(false);
  const { product } = useSelector((state) => state.ProductView);
  const dispatch = useDispatch();
  const addToast = useToast();

  const [headers, setHeaders] = useState([
    {
      header: 'ID DE PEDIDO',
      comment:
        'En este campo se ingresará el ID de la orden, el ID es el código alfanumérico que aparece en la plataforma',
      width: 30
    }
  ]);

  const initData = () => {
    if (deliveryOwnStatus == 'APPROVED') {
      setHeaders([
        ...headers,
        {
          header: 'ESTADO',
          key: 'status',
          comment:
            'En este campo deberás de seleccionar el estado según sea la acción que realices (ten en cuenta que los estados de "ENVIADO" Y "ENTREGADO" solo estarán disponibles si usted cuenta con su propio operador logístico)',
          width: 50,
          options: ['PROCESADO', 'ENVIADO', 'ENTREGADO']
        },
        {
          header: 'Fecha de Estado*',
          comment:
            'De manera opcional aquí puedes especificar la fecha real referente al estado de pedido seleccionado.',
          width: 43
        }
      ]);
    } else {
      setHeaders([
        ...headers,
        {
          header: 'ESTADO',
          key: 'status',
          comment:
            'En este campo deberás de seleccionar el estado según sea la acción que realices.',
          width: 35,
          options: ['PROCESADO']
        }
      ]);
    }
  };

  useEffect(() => {
    initData();
  }, []);

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
      let resp = await update_status_pedidos_by_file({ company_id, file });

      if (resp?.status) {
        setOkupload(true);
        CVAlertSuccess({
          addToast,
          message: resp.message
        });

        process();
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

          {!okupload && (
            <>
              <Center m={5}>
                <Text
                  color={COLORS.primary}
                  fontSize='1.3rem'
                  fontWeight='bold'>
                  Actualizar los estados de pedidos desde este archivo
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
                <CVButton
                  disabled={excelFile == '' || loading}
                  isLoading={loading}
                  backgroundColor='primary'
                  fontSize='1.5rem'
                  padding='0 7rem'
                  onClick={() => updateFile(excelFile)}>
                  Subir Archivo{' '}
                </CVButton>
              </Center>
            </>
          )}

          {okupload && (
            <>
              <Center mt={3}>
                <Text
                  color={COLORS.primary}
                  fontSize='1.2rem'
                  fontWeight='bold'
                  textAlign='center'>
                  Estados de pedidos actualizados exitosamente
                </Text>
              </Center>
              <Box my={2}>
                <Text
                  color={COLORS.primary}
                  fontSize='1.2rem'
                  fontWeight='bold'
                  textAlign='center'>
                  Ver los cambios en la plataforma puede tardar algunos minutos.
                </Text>
              </Box>
            </>
          )}
        </Box>
      </Grid>

      <Flex ml={'1rem'}>
        <Box fontSize='1.5rem' p={3} borderRadius='20'>
          <CVDownloadXlxs
            headers={headers}
            fetchData={[]}
            color='green'
            headersColor='9BC2E6'
            sheetName='Plantilla'
            fontWeight='Bold'
            text='plantilla'
            justifyContent='center'
          />
        </Box>
      </Flex>
    </CVModal>
  );
}

export default PedidosStatusMasivo;
