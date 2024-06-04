import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVText } from '@/common/CovendeTemplate';
import CVRadio from '@/common/CovendeTemplate/CVRadio';
import { TIPOMARCA } from '@/common/CovendeTemplate/CVThemes';
import themeCovende from '@/themeCovende';
import { useDisclosure } from '@chakra-ui/react';
import CVSelectMultiple from '@CVTemplate/core/CVSelectMultiple';
import { Grid, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { A_PRODUCTVIEW } from '../../redux/ProductViewAction';
import BrandReq from '../modales/BrandReq';

function Marcas({ information, setInformation, dispatch, brands, brand }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const optiones = (v) => {
    if (v == 'GENERIC') {
      dispatch(A_PRODUCTVIEW({ brand: null }));
    }
    setInformation({
      ...information,
      typeMarca: v
    });
  };

  const opciones = {
    GENERIC: <></>,
    REGISTERED: (
      <CVSelectMultiple
        options={brands}
        value={brand}
        itemText='name'
        itemValue='brand_id'
        onChange={(values) => {
          setInformation({
            ...information,
            typeMarca: values.type_brand
          });
          dispatch(A_PRODUCTVIEW({ brand: values }));
        }}
      />
    ),
    OWN: <CVButton onClick={() => onOpen()}>Crear marca</CVButton>
  };

  return (
    <Grid item xs={12} sm={12} md={12}>
      <SizeBox />
      <CVText color='blue' fontWeight='600' fontSize='16px'>
        Marca <span style={{ color: themeCovende.colors.rojo }}>*</span>
      </CVText>
      <CVText color='boldGray'>
        Selecciona el tipo de marca e ingresa el nombre. Si no encuentras la
        marca de tu producto, haz clic en el botón “Crear Marca” y llena la
        solicitud.
      </CVText>

      <CVRadio
        itemDirection='column'
        options={TIPOMARCA}
        value={information.typeMarca}
        onChange={(value) => optiones(value)}
      />
      <SizeBox />
      {opciones[information.typeMarca]}
      <BrandReq onClose={onClose} isOpen={isOpen} />
      <SizeBox />
      <SizeBox />
    </Grid>
  );
}

export default Marcas;
