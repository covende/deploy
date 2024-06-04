import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVPanel, CVText } from '@/common/CovendeTemplate';
import { Container } from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PendingActiveStore from '../PendingActiveStore';
import TableData from './components/TableData';

function SellerCotizaciones({ store_id }) {
  const { store_status } = useSelector((state) => state.ProductView);

  const [filtro, setFiltro] = useState({
    search: '',
    startdate: new Date(),
    enddate: new Date(),
    estado: ''
  });
  return store_status == 'APPROVED' || store_id ? (
    <Container>
      <CVText fontSize='1.5rem' fontWeight='bold' color='blue'>
        Solicitudes de Cotizaciones
      </CVText>
      <SizeBox />
      <CVPanel variant='box'>
        <TableData store_id={store_id} />
      </CVPanel>
    </Container>
  ) : (
    <PendingActiveStore />
  );
}

export default SellerCotizaciones;
