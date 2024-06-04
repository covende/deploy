import { fromBase64 } from '@/common/CovendeTemplate/CVCardProduct/CVCardProductMethod';

import React, { useEffect, useState } from 'react';
import SellerPlanes from '../admin/seller/planes/index';

function PlanDescription(props) {
  const [planActive, setplanActive] = useState();
  useEffect(() => {
    setplanActive(JSON.parse(fromBase64(props.match.params.data)));
  }, []);
  return (
    <>
      <SellerPlanes planActive={planActive} />
    </>
  );
}

export default PlanDescription;
