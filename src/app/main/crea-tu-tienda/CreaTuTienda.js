import React, { useState, useEffect } from 'react';
import { Container } from '@chakra-ui/react';
import TabsUI from './components/TabsUI';

import { ContentPage } from './CreaTuTienda.styles';
import { labelIndex } from './components/utils';
import { CVCarrusel, CVImage } from '@/common/CovendeTemplate';
import { DOCUMENT_TYPE_LIST } from '@/app/api/graphql/webpublic/createstore/CreateStoreService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { useParams } from 'react-router';
import { v4 } from 'uuid';

const CreateStore = ({ bannersCreaTienda, fetchBannerCreaTienda }) => {
  const { tabs } = useParams();
  const [tabIndex, settabIndex] = useState(0);

  const [docs, setDocs] = useState([]);

  const initdata = async () => {
    let result = await AxiosGQL(DOCUMENT_TYPE_LIST);
    setDocs(result.DocumentTypeList);
  };

  useEffect(() => {
    fetchBannerCreaTienda();
    initdata();
    settabIndex(labelIndex[tabs]);
  }, [tabs]);

  return (
    <ContentPage>
      <Container maxW='container.xl'>
        {bannersCreaTienda.loading ? null : bannersCreaTienda.error ? null : (
          <CVCarrusel
            delay={8000}
            pagination={false}
            datalist={bannersCreaTienda.data.map((item, index) => (
              <CVImage
                key={v4()}
                image={item.image}
                width='100%'
                height='auto'
              />
            ))}
          />
        )}
      </Container>
      <Container maxW='container.lg'>
        <TabsUI docs={docs} tabIndex={tabIndex || 0} />
      </Container>
    </ContentPage>
  );
};

export default CreateStore;
