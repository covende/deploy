import { Box } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import {CVButton,CVDataTable } from '@/common/CovendeTemplate';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { LIST_TERM } from '@CVApi/core/webpublic/terms/NLTypes';
import { HeaderTerminos, rows } from './terminosData';
import {ModalTerminos} from './ModalTerminos'; 

function TerminosTable(setOpenModal,ModalTerminos) {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [lists, setLists] = useState([]);

  const initData = async (page, itemsPage = 20, search) => {
    setLoading(true);
    const {Terms} = await AxiosGQL(
      LIST_TERM ()
    );
    setLoading(false);
    setLists(Terms)
    console.log (Terms)
  };

  useEffect(() => {
    initData(1, 20);
    
  }, []);


  return (
    <Box backgroundColor='#FFFFFF' rounded='1rem' padding='1rem'>
      <CVButton  onClick={()=>ModalTerminos}> Crear </CVButton>
      <CVDataTable data={rows(lists)} headers={HeaderTerminos} loading={loading} />
      {/* {JSON.stringify(lists)} */}
     
    </Box>
  );
}

export default TerminosTable;