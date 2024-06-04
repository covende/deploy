import CVText from '@CVTemplate/core/CVText';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@chakra-ui/react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import DCCalificacion from './components/DCCalificacion';
import DCCalificacionPeriodo from './components/DCCalificacionPeriodo';
import DCCalificacionTable from './components/DCCalificacionTable';

const DesempenoClientesBO = () => {
  const { client } = useSelector((state) => state.Clients);

  const initdata = () => {
    console.log({ client });
  };

  useEffect(() => {
    initdata();
  }, [client?.store]);
  return client?.store?._id ? (
    <Box>
      <CVText fontSize='1.5rem' fontWeight='bold' color='primary'>
        Desempeño en Covende
      </CVText>
      <SizeBox />
      <DCCalificacion client={client} />
      <SizeBox />
      <DCCalificacionPeriodo client={client} />
      <SizeBox />
      <DCCalificacionTable client={client} />
    </Box>
  ) : (
    <div>No Store</div>
  );
};

export default DesempenoClientesBO;
