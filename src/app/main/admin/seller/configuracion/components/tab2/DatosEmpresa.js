import { Box, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import MiEmpresa from './MiEmpresa';
import MisDirecciones from './MisDirecciones';
import ModalDireccion from './ModalDireccion';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { GET_COMPANY_DIRECTIONS_BY_ID } from '@/app/api/graphql/webpublic/userData/UserCompanyService';
///import { dir } from 'console';

function DatosEmpresa({ storeID, permisions }) {
  const [isNewDirection, setIsNewDirection] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [totalDirections, setTotalDirections] = useState([]);
  const [sellerDirection, setSellerDirection] = useState({
    id: '',
    store_id: storeID,
    province: '',
    type_local: '',
    supervisor: '',
    phone: '',
    street_fiscal: '',
    country: '',
    state: '',
    district: '',
    predetermined: '',
    reference: '',
    zipcode: ''
  });

  const initData = async () => {
    const { companyDirectionsByID } = await AxiosGQL(
      GET_COMPANY_DIRECTIONS_BY_ID(storeID)
    );
    setTotalDirections(companyDirectionsByID);
  };

  useEffect(() => {
    initData();
  }, []);
  return (
    <Box>
      <MiEmpresa storeID={storeID} />

      <MisDirecciones
        storeID={storeID}
        totalDirections={totalDirections}
        onOpen={onOpen}
        initData={initData}
        setSellerDirection={setSellerDirection}
        sellerDirection={sellerDirection}
        isNewDirection={isNewDirection}
        setIsNewDirection={setIsNewDirection}
        permisions={permisions}
      />

      <ModalDireccion
        storeID={storeID}
        isOpen={isOpen}
        onClose={onClose}
        initData={initData}
        setSellerDirection={setSellerDirection}
        sellerDirection={sellerDirection}
        isNewDirection={isNewDirection}
        setIsNewDirection={setIsNewDirection}
      />
    </Box>
  );
}

export default DatosEmpresa;
