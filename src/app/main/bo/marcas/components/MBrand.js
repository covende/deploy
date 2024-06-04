import noimage from '@/app/assets/img/noimage.png';

import { Box, Text, Flex } from '@chakra-ui/react';
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
  CVButton,
  CVImage,
  CVInput,
  CVInputImage
} from '@/common/CovendeTemplate';
import { IMAGESIZE } from '@/common/CovendeTemplate/CVThemes';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import { useToast } from '@chakra-ui/toast';
import CVModal from '@CVTemplate/core/CVModal';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { add_brand, update_brand } from '@CVApi/core/webBrands/WBrandService';
import { brandClean } from './CBODataTableUtils';
import CVSwitch from '@CVTemplate/core/CVSwitch';

function MBrand({ onClose, isOpen, data, setFiltro, filtro }) {
  const addToast = useToast();
  const [brand, setbrand] = useState(brandClean);

  const validate = () => {
    if (brand.name == '') {
      CVAlertError({ addToast, message: 'Nombre es obligatorio' });
      return false;
    }

    if (brand.image == '') {
      CVAlertError({ addToast, message: 'Sube una imagen' });
      return false;
    }

    return true;
  };

  const savebrand = async () => {
    if (validate()) {
      setLoading(true);

      let resp = { status: false, message: 'Error' };
      if (brand.brand_id == '') {
        resp = await add_brand({
          name: brand.name,
          image: brand.image,
          flag_active: brand.flag_active
        });
      } else {
        resp = await update_brand({
          id: brand.brand_id,
          name: brand.name,
          image: brand.image,
          flag_active: brand.flag_active
        });
      }

      if (resp.status) {
        CVAlertSuccess({ addToast, message: resp.message });
        onClose();
        setbrand({ ...brandClean });
        setFiltro({ ...filtro });
      } else {
        CVAlertError({ addToast, message: resp.message });
      }

      setLoading(false);
    }
  };

  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState(false);
  const [size, setSize] = useState({ height: 240, width: 240, attr: 'image' });

  const initdata = () => {
    let [width, height, attr] = IMAGESIZE['BRANDREQUEST'].split(',');
    setSize({ height, width, attr });
  };

  const setimage = (img) => {
    setbrand({ ...brand, image: img });
    setCrop(!crop);
  };
  useEffect(() => {
    initdata();
  }, []);

  useEffect(() => {
    if (data?.brand_id) setbrand(data);
    else setbrand({ ...brandClean });
  }, [data]);
  return (
    <CVModal
      colorHeader='white'
      isOpen={isOpen}
      onClose={onClose}
      bgHeader='primary'
      header={
        brand.brand_id == '' ? 'Creación de Marca' : 'Actualización de Marca'
      }
      footer={
        <Flex justifyContent='center' width='100%'>
          <Box>
            <CVButton isLoading={loading} onClick={savebrand}>
              {brand.brand_id !== '' ? 'Actualizar' : 'Crear'}
            </CVButton>
          </Box>
        </Flex>
      }>
      <SizeBox />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <Text align='right'>Nombre:</Text>
        </Grid>
        <Grid item xs={12} sm={7}>
          <CVInput
            placeholder='Ingrese el nombre'
            value={brand.name}
            onChange={(value) => setbrand({ ...brand, name: value })}
          />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Text align='right'>Activar: </Text>
        </Grid>
        <Grid item xs={12} sm={7}>
          <CVSwitch
            variant='option'
            yesColor='primary'
            value={brand.flag_active}
            onChange={(value) =>
              setbrand({
                ...brand,
                flag_active: value
              })
            }
          />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Text align='right'>Logo:</Text>
        </Grid>
        <Grid item xs={12} sm={7}>
          <CVButton
            onClick={() => setCrop(!crop)}
            variant='outlined'
            height='100px'
            width='100px'
            borderRadius='0.5rem'
            padding='0'>
            <div style={{ height: '75px', width: '75px' }}>
              {brand.image != '' ? (
                <CVImage image={brand.image} height='75px' width='75px' />
              ) : (
                <CVImage image={noimage} height='75px' width='75px' />
              )}
            </div>
          </CVButton>
        </Grid>
      </Grid>

      <CVInputImage
        size={size}
        isOpen={crop}
        onClose={() => setCrop(!crop)}
        callback={setimage}
        viewMode={0}
      />
      <SizeBox />
    </CVModal>
  );
}

export default MBrand;
