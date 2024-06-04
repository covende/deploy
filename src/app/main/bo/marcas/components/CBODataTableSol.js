import { CVDataTable } from '@/common/CovendeTemplate';
import { Box } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import {
  solicitudesMarcasHeaders,
  solicitudesMarcasPlaces,
  solicitudesMarcasStatus
} from './CBODataTableUtils';
import { formatDate, formatpaginate } from '@/common/utils/methods';

import { HStack, Button, Flex, useDisclosure } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import CVImage from '@CVTemplate/core/CVImage';
import CVText from '@CVTemplate/core/CVText';
import CVButton from '@CVTemplate/core/CVButton';
import CVModal from '@CVTemplate/core/CVModal';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import {
  brands_request,
  delete_brand_request
} from '@CVApi/core/webBrands/WBrandService';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';

import CCardOption from './CCardOption';
import { Eye } from '@/app/assets/icons/index';
import { svgDelete } from '@/app/assets/images/SVG';
import MBrandRequest from './MBrandRequest';

function CBODataTableSol() {
  const [pagination, setpagination] = useState({});
  const [loading, setloading] = useState(false);
  const [lista, setlista] = useState([]);
  const [send, setsend] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const addToast = useToast();
  const [brandRequest, setBrandRequest] = useState({});
  const [modalType, setModalType] = useState('');
  const [filtro, setfiltro] = useState({
    status: 'none'
  });

  const fetchdata = async (page = 1, limit = 10) => {
    setloading(true);
    let filter = { page, itemsPage: limit };
    if (filtro.status !== 'none') filter.status = filtro.status;

    const resp = await brands_request(filter);

    if (resp.status) {
      setlista(resp.brandsRequest);
      setpagination(formatpaginate(resp.info));
    }

    setloading(false);
  };

  const deleteBrandRequest = async () => {
    setsend(true);
    const resp = await delete_brand_request({ id: brandRequest.id });

    if (resp.status) {
      CVAlertSuccess({ addToast, message: resp.message });
    } else {
      CVAlertError({ addToast, message: resp.message });
    }

    setsend(false);
    onClose();

    if (pagination.page > 1) {
      let totalPrev = pagination.prevPage * pagination.limit + 1;

      if (totalPrev == pagination.totalDocs) {
        await fetchdata();
      } else {
        await fetchdata(pagination.page);
      }
    } else {
      await fetchdata();
    }
  };

  useEffect(() => {
    fetchdata();
  }, [filtro]);

  return (
    <Box padding='1rem' backgroundColor='white' rounded='1rem'>
      <CVDataTable
        fetchdata={fetchdata}
        loading={loading}
        pagination={pagination}
        data={lista.map((item, i) => ({
          ...item,
          numero: i + 1,
          status: (
            <CVText color={solicitudesMarcasStatus[item.status].color}>
              {solicitudesMarcasStatus[item.status].text}
            </CVText>
          ),
          createdAt: formatDate(item.createdAt),
          logo: (
            <HStack>
              <CVImage
                image={item.logo || 'https://via.placeholder.com/700x700'}
                width='auto'
                height='50px'
              />
            </HStack>
          ),
          patented_brand: (
            <CCardOption
              borderColor={item.patented_brand ? '#00ADF6' : '#FF5454'}
              backgroundColor={item.patented_brand ? '#00ADF6' : '#FF5454'}
              text={item.patented_brand ? 'SI' : 'NO'}
            />
          ),
          place: solicitudesMarcasPlaces[item.place],
          store: item.store?.comercial_name || '',
          acciones: (
            <Flex alignItems='center'>
              <Button
                onClick={() => {
                  setBrandRequest(item);
                  setModalType('edit');
                  onOpen();
                }}>
                {Eye}
              </Button>
              <Button
                colorScheme='teal'
                variant='ghost'
                onClick={() => {
                  setBrandRequest(item);
                  setModalType('delete');
                  onOpen();
                }}>
                {svgDelete}
              </Button>
            </Flex>
          )
        }))}
        headers={solicitudesMarcasHeaders({ filtro, setfiltro })}
      />

      {modalType == 'edit' && (
        <MBrandRequest
          isOpen={isOpen}
          onClose={onClose}
          brand={brandRequest}
          setfiltro={setfiltro}
        />
      )}

      {modalType == 'delete' && (
        <CVModal
          colorHeader='white'
          isOpen={isOpen}
          onClose={onClose}
          bgHeader='red'
          header={'Solicitud de Marca'}
          footer={
            <Flex justifyContent='center' width='100%'>
              <Box>
                <CVButton
                  onClick={() => deleteBrandRequest()}
                  backgroundColor='red'
                  disabled={send}
                  isLoading={send}>
                  ACEPTAR
                </CVButton>
              </Box>
            </Flex>
          }>
          <SizeBox />
          <CVText color='red'>
            ¿Estas seguro de &nbsp;
            <span style={{ fontWeight: 'bold' }}>Eliminar</span>
            &nbsp; la solicitud de marca?
          </CVText>
          <SizeBox />
        </CVModal>
      )}
    </Box>
  );
}

export default CBODataTableSol;
