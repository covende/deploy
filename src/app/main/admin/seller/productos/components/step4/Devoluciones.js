import React, { useEffect, useState } from 'react';

import { Container, Grid } from '@material-ui/core';

import { CVErrorLabel } from '@CVTemplate/core/CVInput';
import { PRODUCT_DEVOLUTION_REASONS } from '@CVApi/core/webseller/ProductService';
import { ProductSubTitle } from '../../ProductsStyle';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import CVCheckBox from '@CVTemplate/core/CVCheckBox';
import CVText from '@CVTemplate/core/CVText';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVCheck from '@CVTemplate/core/CVCheck';
import { Flex } from '@chakra-ui/react';

const Devoluciones = ({ extra, setExtra, errors }) => {
  const [halfFirst, setHalfFirst] = useState([]);
  const [acceptDevs, setAcceptDevs] = useState(false);
  const [totalDevs, setTotalDevs] = useState(0);

  const initdata = async () => {
    const { productDevolutionReasons } = await AxiosGQL(
      PRODUCT_DEVOLUTION_REASONS()
    );
    // setHalfFirst(productDevolutionReasons);

    if (productDevolutionReasons) {
      let tmp = [];
      tmp = productDevolutionReasons.filter(
        (razon) => razon._id !== '620d78856643670724599ffb'
      );
      setHalfFirst(tmp);
      setTotalDevs(tmp.length);

      if (tmp?.length == extra?.devolution_reasons_ids?.length)
        setAcceptDevs(true);
    }
  };

  useEffect(() => {
    initdata();
  }, []);

  return (
    <>
      <ProductSubTitle>4.3. Devoluciones</ProductSubTitle>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <CVText color='blue'>
              Todo comprador podrá solicitar una devolución en estos casos:
            </CVText>

            <SizeBox />
            <Flex alignItems='right' flexDirection='column' margin-left='1rem'>
              {halfFirst.map((motive) => (
                <CVText>* {motive.title}</CVText>
              ))}
            </Flex>

            {/* <CVCheckBox
              itemDirection='column'
              value={extra?.devolution_reasons_ids || []}
              onChange={(values) =>
                setExtra({ ...extra, devolution_reasons_ids: values })
              }
              options={[
                ...halfFirst.map((item) => ({
                  text: item.title,
                  value: item._id
                }))
              ]}
            /> */}

            {/* <CVText>¿Ofreces garantía por tu producto?</CVText> */}

            {/* <CVCheckBox
              itemDirection='column'
              value={acceptDevs}
              onChange={
                (values) => setAcceptDevs(!acceptDevs)
                // setExtra({ ...extra, devolution_reasons_ids: values })
              }
              options={[
                { text: 'Acepto todos los motivos de devolución', value: true }
              ]}
            /> */}

            <CVCheck
              titleAlign='left'
              value={acceptDevs}
              onChange={(value) => {
                if (value)
                  setExtra({
                    ...extra,
                    devolution_reasons_ids: halfFirst.map((h) => h._id)
                  });
                else setExtra({ ...extra, devolution_reasons_ids: [] });

                setAcceptDevs(value);
              }}
              title='Acepto todos los motivos de devolución'
            />

            {errors && !acceptDevs && (
              <CVErrorLabel
                errorClass='Mui-error'
                errorMessage='Aceptar los motivos de devolución.'
              />
            )}

            <SizeBox />

            <CVText color='blue'>
              Las políticas Covende señalan que toda Tienda debe ofrecer un
              plazo máximo de 3 días para que el comprador pueda solicitar la
              devolución. Los días serán contados desde la confirmación de
              entrega del pedido.
            </CVText>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Devoluciones;
