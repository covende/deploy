import React, { useState } from 'react';

import { Container } from '@material-ui/core';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CBODataTable from './components/CBODataTable';
import { Link } from 'react-router-dom';
import CVButton from '@CVTemplate/core/CVButton';

import { Flex, useDisclosure } from '@chakra-ui/react';
import MBrand from './components/MBrand';

function MarcasBo() {
  const initFilter = {
    search: '',
    startdate: new Date(),
    enddate: new Date(),
    estado: '',
    buytype: '',
    active: 'none',
    type_brand: 'none'
  };
  const [filtro, setFiltro] = useState(initFilter);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [brand, setBrand] = useState({});

    // console.log(filtro, "filtro")
  const updateBrand = (data) => {
    // console.log(data, "se muestra la data")
    setBrand(data);
   
    onOpen();
  };

  return (
    <Container style={{ backgroundColor: '#FFFFFF', padding: '1rem' }}>
      <SizeBox />
      <Flex justifyContent='end'>
        <Link to='/bo/marcas/solicitudes'>
          <CVButton backgroundColor='primary' alignItems='center'>
            SOLICITUDES
          </CVButton>
        </Link>
        <SizeBox />
        <CVButton
          backgroundColor='red'
          alignItems='center'
          onClick={() => updateBrand({ brand_id: '' })}>
          CREAR MARCA
        </CVButton>
      </Flex>

      <SizeBox />
      <CBODataTable
        filtro={filtro}
        setfiltro={setFiltro}
        updateBrand={updateBrand}
      />

      <MBrand
        isOpen={isOpen}
        onClose={onClose}
        data={brand}
        setFiltro={setFiltro}
        filtro={filtro}
      />
    </Container>
  );
}

export default MarcasBo;
