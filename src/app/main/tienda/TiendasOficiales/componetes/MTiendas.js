import React, { useEffect, useState } from 'react';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { ALL_COMPANYS } from '@/app/api/graphql/webpublic/stores/StoresService';
import { v4 } from 'uuid';
import { Flex, Skeleton } from '@chakra-ui/react';
import { Button } from '@material-ui/core';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import MTienda from './MTienda';
import { CVLine } from '@/common/CovendeTemplate';
import { chevbronLeft, chevbronRight } from '@/app/assets/icons';

const style = {
  width: '32px',
  minWidth: '32px',
  height: '32px',
  minHeight: '32px',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: '16px'
};
function MTiendas() {
  const [loading, setloading] = useState(true);
  const [tiendas, settiendas] = useState([]);
  const [paginacion, sepaginacion] = useState({});

  const initdata = async (page = 1, limit = 5) => {
    setloading(true);
    const { companys } = await AxiosGQL(ALL_COMPANYS({ page, limit }));
    sepaginacion({ ...companys, docs: [] });
    settiendas(companys?.docs || []);
    setloading(false);
  };
  useEffect(() => {
    initdata();
  }, []);
  return (
    <>
      <CVLine
        titles={[
          'Las mejores tiendas',
          <Flex justifyContent='end'>
            <Button
              disabled={!(paginacion?.hasPrevPage || false)}
              style={style}
              onClick={() => {
                initdata(paginacion?.prevPage || 1);
              }}>
              {chevbronLeft}
            </Button>
            <SizeBox width='0.4rem' />
            <Button
              disabled={!(paginacion?.hasNextPage || false)}
              style={style}
              onClick={() => {
                initdata(paginacion?.nextPage || 1);
              }}>
              {chevbronRight}
            </Button>
          </Flex>
        ]}
      />

      <Flex overflow='auto'>
        {loading ? (
          <Skeleton height='250px' />
        ) : (
          tiendas.map((item) => <MTienda key={v4()} item={item} />)
        )}
      </Flex>
    </>
  );
}

export default MTiendas;
