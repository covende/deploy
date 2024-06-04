import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  useToast
} from '@chakra-ui/react';
import CVDataTable from '@CVTemplate/core/CVDataTable';
import { COLORS } from '@CVTemplate/core/CVThemes';
import { Grid } from '@/../node_modules/@material-ui/core/index';
import CVButton from '@CVTemplate/core/CVButton';
import { FileArchivo } from './FIleArchivo';
import { IEEHeaders, IEERow } from './IEEUtils';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import {
  ORDERS_SHIPPED_TODAY,
  SEND_FILE_EXCESS_BY_SEND
} from '@CVApi/core/faq/ClienteAsist/HelpService';
import { formatpaginate } from '@/common/utils/methods';
import { toBase64 } from '@CVTemplate/core/CVInputFileLink';
import { CVAlertSuccess } from '@CVTemplate/core/CVAlert';
// import { toBase64 } from '@CVTemplate/core/CVCardProduct/CVCardProductMethod';

const IEETable = () => {
  const [loading, setloading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [file, setFile] = useState(null);
  const [list, setList] = useState([]);
  const addToast = useToast();

  const fetchData = async () => {
    setloading(true);
    const { ordersShippedToday } = await AxiosGQL(ORDERS_SHIPPED_TODAY());
    if (ordersShippedToday) {
      setList(ordersShippedToday.data);
      setPagination(formatpaginate(ordersShippedToday.info));
    }
    setloading(false);
  };

  const sendFile = async () => {
    if (file) {
      const fileSend = await toBase64(file[0]);
      const { sendFileExcessBySend } = await AxiosGQL(
        SEND_FILE_EXCESS_BY_SEND(fileSend)
      );
      if (sendFileExcessBySend) {
        fetchData();
        CVAlertSuccess({ addToast, message: 'Información subida.' });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      <Heading as='h1' color={COLORS.blue} fontSize='26px' fontWeight={600}>
        Pedidos en camino de hoy
      </Heading>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <CVDataTable
            headers={IEEHeaders}
            data={IEERow(list)}
            pagination={pagination}
            // fetchdata={(page) => setPage(page)}
            loading={loading}
          />
        </Grid>
        <Grid item xs={4}>
          <Flex
            direction='column'
            bg='#ECECEC'
            p='14px auto'
            rounded='20px'
            align='center'>
            <Text fontSize='24px' color='#004772' fontWeight='600'>
              Carga de archivo{' '}
            </Text>
            <Flex my='29px'>
              <FormControl display='flex' justifyContent='center'>
                <FormLabel
                  bg='#C4C4C4'
                  p='5px 7px'
                  color='white'
                  alignItems='center'
                  borderRadius='14px'
                  htmlFor='selectImage'
                  display='flex'>
                  <FileArchivo />
                  <Text fontWeight='bold'> Elegir Archivo</Text>
                </FormLabel>
                <Input
                  onChange={(e) =>
                    setFile(
                      e.dataTransfer ? e.dataTransfer.files : e.target.files
                    )
                  }
                  display='none'
                  type='file'
                  id='selectImage'
                />
              </FormControl>
              {file && (
                <>
                  <Text
                    w='115px'
                    fontSize='12px'
                    color='#6F7273'
                    whiteSpace='nowrap'
                    overflow='hidden'
                    textOverflow='ellipsis'>
                    {file[0].name}
                  </Text>
                  <Text fontSize='12px' color='#6F7273'>
                    {
                      file[0].name.split('.')[
                        file[0].name.split('.').length - 1
                      ]
                    }
                  </Text>
                </>
              )}
            </Flex>
            <CVButton
              onClick={() => sendFile()}
              fontSize='14px'
              fontWeight='bold'>
              Subir
            </CVButton>
            <Box my='25px'>
              <a
                href='https://covendefiles.s3.amazonaws.com/files/productos.xlsx'
                download='productos'
                style={{
                  color: COLORS['green'],
                  borderBottom: '1px solid #17BF93'
                }}>
                Descargar plantilla
              </a>
            </Box>
          </Flex>
        </Grid>
      </Grid>
    </Box>
  );
};

export default IEETable;
