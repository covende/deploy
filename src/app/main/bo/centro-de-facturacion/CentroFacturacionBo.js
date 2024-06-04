import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import CFTtitle from './components/CFTtitle';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CFCustomer from './components/customer/CFCustomer';
import CFCovende from './components/covende/CFCovende';
import CFSucriptor from './components/suscriptor/CFSuscriptor';
import { useHistory, useParams } from 'react-router-dom';
import useGetPermisions from '@/common/hooks/useGetPermisions';

function CentroFacturacionBo() {
  const { type } = useParams();
  const history = useHistory();
  const settype = (tab) => history.push('/bo/centro-de-facturacion/' + tab);
  const FacturacionPermisions = useGetPermisions(
    'Backoffice',
    'Centro de facturación'
  );


  useEffect(() => {
    if (!type) settype('CUSTOMER');
  }, [type]);

  return (
    <Container>
      <SizeBox />
      <CFTtitle type={type} settype={settype} />
      <SizeBox />
      {type == 'CUSTOMER' && (
        <CFCustomer FacturacionPermisions={FacturacionPermisions} />
      )}
      {type == 'COVENDE' && (
        <CFCovende FacturacionPermisions={FacturacionPermisions} />
      )}
      {type == 'SUSCRIPTOR' && (
        <CFSucriptor FacturacionPermisions={FacturacionPermisions} />
      )}
    </Container>
  );
}

export default CentroFacturacionBo;
