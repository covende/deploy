import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import CVDataTable from '@CVTemplate/core/CVDataTable';
import { CFDemo, CFHeader, CFRows } from './CFUtils';

const CFTable = ({ filtro, setfiltro, FacturacionPermisions }) => {
  const [lista, setlista] = useState([]);
  const [pagination, setpagination] = useState({});
  const [loading, setloading] = useState(false);

  const ExpandData = ({ item, params }) => <Box>{params}</Box>;

  const initdata = async () => {
    // setloading(true);
    // setloading(false);
    setlista(CFDemo);
  };

  useEffect(() => {
    initdata();
  }, [filtro]);

  return (
    <Box>
      <CVDataTable
        headers={CFHeader}
        data={CFRows(lista)}
        pagination={pagination}
        loading={loading}
        fetchdata={initdata}
        ExpandData={ExpandData}
      />
    </Box>
  );
};

export default CFTable;
