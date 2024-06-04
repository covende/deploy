import SizeBox from '@/common/components/CustomComponent/SizeBox';
import {
  CVButton,
  CVSelect,
  CVSelectMultiple,
  CVText
} from '@/common/CovendeTemplate';
import { Flex } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import MAddCategory from '../modals/MAddCategory';

function TBOAcciones({
  tableselected,
  tmodal,
  settmodal,
  categorys,
  setcategorys,
  cat,
  setpreviusData,
  lista
}) {
  const history = useHistory();
  const [cmodal, setcmodal] = useState(false);
  const limit = eval((cat?.limit || '0') + '');
  return (
    <>
      <Flex justifyContent='space-between'>
        <CVText fontWeight='bold' color='blue' fontSize='2rem'>
          Listas de Datos
        </CVText>
        <Flex>
          <CVButton backgroundColor='blue' onClick={() => setcmodal(!cmodal)}>
            + Categoría
          </CVButton>
          <SizeBox />
          <CVButton
            disabled={limit == 0 ? tableselected == '' : limit == lista}
            backgroundColor='blue'
            onClick={() => {
              setpreviusData(null);
              settmodal(!tmodal);
            }}>
            + Data a Tablas
          </CVButton>
        </Flex>
      </Flex>
      <SizeBox />

      <CVSelectMultiple
        value={{
          value: cat?._id || tableselected,
          text: cat?.title || 'Todos'
        }}
        options={[
          { text: 'Todos', value: '' },
          ...categorys.map((item) => ({
            text: item.title,
            value: item._id
          }))
        ]}
        onChange={(select) => history.push('/bo/tablas/' + select.value)}
      />

      <MAddCategory
        isOpen={cmodal}
        onClose={() => setcmodal(!cmodal)}
        categorys={categorys}
        setcategorys={setcategorys}
      />
    </>
  );
}

export default TBOAcciones;
