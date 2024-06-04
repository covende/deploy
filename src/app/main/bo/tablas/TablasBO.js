import {
  table_category_list,
  table_list,
  table_list_by_category
} from '@/app/api/graphql/webbo/BTablasService';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVDataTable } from '@/common/CovendeTemplate';
import { Box } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import TBOAcciones from './components/TBOAcciones';
import MAddTabla from './modals/MAddTabla';
import { columns, rows } from './TablasUtils';

function TablasBo() {
  const { data } = useParams();
  const [loading, setloading] = useState(false);
  const [pagination, setpagination] = useState({});
  const [tableselected, settableselected] = useState('');
  const [categorys, setcategorys] = useState([]);
  const [cat, setcat] = useState(null);
  const [lista, setlista] = useState([]);
  const [previusData, setpreviusData] = useState(null);
  const [idtabla, setidtabla] = useState('');

  const [tmodal, settmodal] = useState(false);
  const initdata = async (_id) => {
    let lts = categorys;
    if (categorys.length == 0) {
      lts = await table_category_list();
      setcategorys(lts);
    }
    let cts = lts.filter((item) => item._id == _id);
    if (cts.length > 0) setcat(cts[0]);
  };
  const fetchdata = async (page = 1, limit = 10, search = data || '') => {
    setloading(true);
    let result = [];

    if (search != '') {
      result = await table_list_by_category({
        page,
        limit,
        idcategory: search,
        status: true
      });
    } else {
      result = await table_list({ limit, page, status: true });
    }
    setlista(result.docs);
    setpagination({ ...result, docs: [] });
    setloading(false);
  };

  const edittabla = async (item) => {
    setpreviusData(item);
    setidtabla(item._id);
    settmodal(true);
  };

  const deletetabla = async (item) => {
    setidtabla(item._id);
  };

  useEffect(() => {
    settableselected(data || '');
    fetchdata(1, 10, data);
    initdata(data);
  }, [data]);
  return (
    <Box backgroundColor='white' rounded='1rem' padding='1rem'>
      <TBOAcciones
        tableselected={tableselected}
        tmodal={tmodal}
        settmodal={settmodal}
        categorys={categorys}
        setcategorys={setcategorys}
        cat={cat}
        setpreviusData={setpreviusData}
        lista={lista.length}
      />
      <SizeBox />
      <CVDataTable
        headers={columns}
        data={rows({ lista, methods: { edittabla, deletetabla } })}
        // data={rows({ lista })}
        loading={loading}
        pagination={pagination}
        fetchdata={fetchdata}
      />

      <MAddTabla
        cat={cat}
        fetchdata={fetchdata}
        lista={lista}
        setlista={setlista}
        isOpen={tmodal}
        onClose={() => settmodal(!tmodal)}
        idtablecategory={tableselected}
        idtabla={idtabla}
        setidtabla={setidtabla}
        previusData={previusData}
      />
    </Box>
  );
}

export default TablasBo;
