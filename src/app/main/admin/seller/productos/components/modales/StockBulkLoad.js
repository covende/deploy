import { CVButton, CVModal } from '@/common/CovendeTemplate';
import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import CVDownloadXlxs from '@CVTemplate/core/CVDownloadXlsx';
import { Box, Center, Text } from '@chakra-ui/layout';
import { COLORS } from '@CVTemplate/core/CVThemes';
import { Grid } from '@material-ui/core';
import { tienda } from '../../redux/ProductUpdate';
import { BULK_LOAD_STOCK } from '@CVApi/core/webseller/ProductService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { useToast } from '@chakra-ui/toast';

function StockBulkLoad({ isOpen, onClose, store_id }) {
  const [okupload, setOkupload] = useState(false);
  const [excelFile, setExcelFile] = useState('');
  const [loading, setLoading] = useState(false);
  const { product } = useSelector((state) => state.ProductView);
  const dispatch = useDispatch();
  const addToast = useToast();

  let stockHeaders = [
    {
      header: 'SKU',
      comment:
        'Ingresa el SKU del producto.Debe ser un código Alfabético o numérico, sin carácter especiales o espacios, este código es creado por el vendedor',
      width: 45
    },
    {
      header: 'Stock(*)',
      comment:
        'Ingrese la cantidad de productos disponibles para la venta en covende.com',
      width: 40
    },
    {
      header: 'Precio(*)',
      comment:
        'Indica el precio que quieres que tus clientes paguen por tu producto en covende.com',
      width: 28
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

      let { addBulkLoadProductsStockByCompany: resp } = await AxiosGQL(
        BULK_LOAD_STOCK(company_id, file)
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

          {!okupload && (
            <>
              <Center m={5}>
                <Text color={COLORS.yellow} fontSize='1.3rem' fontWeight='bold'>
                  Actualizar el precio o stock desde este archivo
                </Text>
              </Center>

              <Center>
                <Box>
                  <input
                    type='file'
                    accept='.xls,.xlsx'
                    onChange={(e) => {
                      selectFile(e);
                    }}
                  />
                  <br />
                </Box>
              </Center>
            </>
          )}

          <Center my={10}>
            {!okupload ? (
              <CVButton
                disabled={excelFile == '' || loading}
                isLoading={loading}
                backgroundColor='yellow'
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
                Precio o Stock actualizado exitosamente
              </Text>
            )}
          </Center>
        </Box>
      </Grid>

      <Flex ml={'1rem'}>
        <Box fontSize='1.5rem' p={3} borderRadius='20'>
          <CVDownloadXlxs
            headers={stockHeaders}
            fetchData={[]}
            color='yellow'
            headersColor='F7B844'
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

export default StockBulkLoad;
