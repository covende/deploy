import CVPanel from '@CVTemplate/core/CVPanel';
import CVText from '@CVTemplate/core/CVText';
import React, { useEffect, useState } from 'react';

import { Box, Flex } from '@chakra-ui/react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { useParams } from 'react-router-dom';
import { CVFormatCutCode, CVFormatDate } from '@CVTemplate/core/CVMethods';
import IEDTTable from './IEDSTransaccion/IEDTTable';
import { AxiosGqlClient } from '@/app/infrastructure/graphql/axios-gql-client/axios-gql-client';

const IEDSTransaccion = () => {
  const { cut_code, company_id } = useParams();
  const [storeName, setStoreName] = useState(null);

  let initData = async () => {
    if (!!company_id) {
      let { data } = await AxiosGqlClient.query(
        `query company($id: String!){
          company(_id:$id){_id
            comercial_name}}`,
        { id: company_id }
      );

      data?.company?.comercial_name &&
        setStoreName(data.company.comercial_name);
    }
  };

  useEffect(() => {
    initData();
  }, [company_id]);

  return (
    <CVPanel height='auto' variant='box'>
      <Flex justifyContent='space-between'>
        <CVText fontWeight='bold' color='blue' fontSize='1.5rem'>
          Corte quincenal por transacciones
          {storeName ? ': ' : ''}
          {storeName && (
            <span style={{ padding: '5px', color: '#F7B844' }}>
              {storeName}
            </span>
          )}
        </CVText>
        <CVText fontWeight='bold' color='green' fontSize='1.5rem'>
          {cut_code} |{CVFormatCutCode(cut_code)}
        </CVText>
      </Flex>
      <SizeBox />
      <IEDTTable
        store_id={company_id}
        cut_code={cut_code}
        isViewStoreName={storeName ? false : true}
      />
    </CVPanel>
  );
};

export default IEDSTransaccion;
