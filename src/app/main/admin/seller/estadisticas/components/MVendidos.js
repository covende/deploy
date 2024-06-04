import { CVDataTable } from '@/common/CovendeTemplate';
import React from 'react';
import { headers, mocks, rows } from './MVendidosUtils';

function MVendidos({ topListProduct }) {
  return <CVDataTable headers={headers} data={rows(topListProduct)} />;
}

export default MVendidos;
