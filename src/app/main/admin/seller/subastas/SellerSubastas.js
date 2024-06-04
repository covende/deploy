import CVTracking from '@/common/CovendeTemplate/CVTracking';
import { Container } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import PendingActiveStore from '../PendingActiveStore';

function SellerSubastas(props) {
  const { store_status } = useSelector((state) => state.ProductView);

  return store_status != 'APPROVED' ? (
    <PendingActiveStore />
  ) : (
    <Container></Container>
  );
}

export default SellerSubastas;
