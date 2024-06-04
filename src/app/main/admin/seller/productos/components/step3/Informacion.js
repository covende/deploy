import React, { useState } from 'react';
import { Fragment } from 'react';
import { Flex } from '@chakra-ui/layout';
import { Tooltip, Box } from '@chakra-ui/react/';
import { Container, Grid } from '@material-ui/core';
import { CVInput, CVText, CVImage } from '@/common/CovendeTemplate';
import { onlyMoney, onlyNumber } from '@/common/CovendeTemplate/CVValidation';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { ProductSubTitle } from '../../ProductsStyle';
import themeCovende from '@/themeCovende';
import { useHistory } from 'react-router-dom';
import dmP from '@/app/assets/img/dmP.svg';

function Informacion({ despacha, setDespacha, errors }) {
  const history = useHistory();
  const [wight, setWight] = useState({
    num: despacha?.peso_paquete || '',
    unit: ''
  });

  return (
    <Fragment>
      <ProductSubTitle>3.2. Información del paquete</ProductSubTitle>
      <Container>
        <Box>
          <CVText color='boldGray'>
            Todo producto debe ser empaquetado respetando lo estipulado en
            nuestro Manual de embalaje.&nbsp;
            {/* <span
              style={{ color: COLORS['primary'] }}
              onClick={() =>
                window.location.assign(
                  'https://covendefiles.s3.amazonaws.com/Manual+de+empaque+y+embalaje.pdf'
                )
              }>
              Manual de embalaje
            </span> */}
            <a
              style={{ color: COLORS['primary'] }}
              href='https://covendefiles.s3.amazonaws.com/documents/manual-de-empaque-y-embalaje.pdf'
              // href='https://covendefiles.s3.amazonaws.com/Manual+de+empaque+y+embalaje.pdf'
              target='_blank'>
              Manual de embalaje
            </a>
            &nbsp;
            <br></br>
            Verifica meticulosamente el peso y las dimensiones del &nbsp;
            <span style={{ fontWeight: 'bold' }}>
              <i>paquete</i>
            </span>
            &nbsp; pues son datos que deben ser ingresados con exactitud.
            <span style={{ fontWeight: 'bold' }}>
              {' '}
              &nbsp; La entrega de información falsa o incorrecta será
              penalizada.
            </span>
          </CVText>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={3}>
            <CVText color='blue' fontWeight='400' fontSize='15'>
              Dimensiones del Paquete
              <span style={{ color: themeCovende.colors.rojo }}>*</span>
            </CVText>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12}>
                <Flex alignItems='center' maxWidth='150px'>
                  <Tooltip label='Alto mínimo 1 cm.'>
                    <span>
                      <CVInput
                        errorClass='Mui-error'
                        // disabled={!despacha.status}
                        // error={
                        //   (errors &&
                        //     Number(despacha.dimensiones.alto) +
                        //       Number(despacha.dimensiones.ancho) +
                        //       Number(despacha.dimensiones.largo) >=
                        //       160) ||
                        //   Number(despacha.dimensiones.alto) <= 9
                        // }
                        error={
                          errors && Number(despacha?.dimensiones?.alto) < 1
                        }
                        errorMessage='Alto mínimo 1 cm.'
                        placeholder='Alto'
                        value={despacha.dimensiones.alto}
                        onChange={(value) =>
                          setDespacha({
                            ...despacha,
                            dimensiones: {
                              ...despacha.dimensiones,
                              alto: onlyMoney(value)
                            }
                          })
                        }
                      />
                    </span>
                  </Tooltip>
                  <SizeBox />
                  <CVText color='gray' fontSize='14px' fontWeight='300'>
                    cm{' '}
                  </CVText>
                  <SizeBox />
                  {/* <CVText color='gray' fontSize='2rem'>
                    X
                  </CVText> */}
                </Flex>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Flex alignItems='center' maxWidth='150px'>
                  <Tooltip label='Ancho mínimo 1 cm.'>
                    <span>
                      <CVInput
                        errorClass='Mui-error'
                        // error={
                        //   (errors &&
                        //     Number(despacha.dimensiones.alto) +
                        //       Number(despacha.dimensiones.ancho) +
                        //       Number(despacha.dimensiones.largo) >=
                        //       160) ||
                        //   Number(despacha.dimensiones.ancho) <= 9
                        // }
                        // error={Number(despacha.dimensiones.ancho) < 1}

                        error={
                          errors && Number(despacha?.dimensiones?.ancho) < 1
                        }
                        errorMessage='Ancho mínimo 1 cm.'
                        placeholder='Ancho'
                        // disabled={!despacha.status}
                        value={despacha.dimensiones.ancho}
                        onChange={(value) =>
                          setDespacha({
                            ...despacha,
                            dimensiones: {
                              ...despacha.dimensiones,
                              ancho: onlyMoney(value)
                            }
                          })
                        }
                      />
                    </span>
                  </Tooltip>
                  <SizeBox />
                  <CVText color='gray' fontSize='14px' fontWeight='300'>
                    cm{' '}
                  </CVText>
                  <SizeBox />
                  {/* <CVText color='gray' fontSize='2rem'>
                    X
                  </CVText> */}
                </Flex>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Flex alignItems='center' maxWidth='150px'>
                  <Tooltip label='Largo mínimo 1 cm.'>
                    <span>
                      <CVInput
                        errorClass='Mui-error'
                        // error={
                        //   (errors &&
                        //     Number(despacha.dimensiones.alto) +
                        //       Number(despacha.dimensiones.ancho) +
                        //       Number(despacha.dimensiones.largo) >=
                        //       160) ||
                        //   Number(despacha.dimensiones.largo) <= 13
                        // }
                        error={
                          errors && Number(despacha?.dimensiones?.largo) < 1
                        }
                        errorMessage='Largo mínimo 1 cm.'
                        placeholder='largo'
                        // disabled={!despacha.status}
                        value={despacha?.dimensiones?.largo || ''}
                        onChange={(value) =>
                          setDespacha({
                            ...despacha,
                            dimensiones: {
                              ...despacha.dimensiones,
                              largo: onlyNumber(value)
                            }
                          })
                        }
                      />
                    </span>
                  </Tooltip>{' '}
                  <SizeBox />
                  <CVText color='gray' fontSize='14px' fontWeight='300'>
                    cm
                  </CVText>
                </Flex>
              </Grid>

              {/* {errors &&
                Number(despacha.dimensiones.alto) +
                  Number(despacha.dimensiones.ancho) +
                  Number(despacha.dimensiones.largo) >=
                  1560 && (
                  <Box pl='8px'>
                    {' '}
                    <CVText fontWeight='bold' color='red'>
                      La suma de las dimensiones deben ser menor a 160 cm.
                    </CVText>{' '}
                  </Box>
                )} */}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <CVText color='blue' fontWeight='400' fontSize='15'>
              Peso del paquete
              <span style={{ color: themeCovende.colors.rojo }}>*</span>
            </CVText>
            <Flex alignItems='center' maxWidth='200px'>
              <Tooltip label='Peso mínimo es 0.1 kg.'>
                <span>
                  <CVInput
                    type='number'
                    errorClass='Mui-error'
                    error={errors && Number(despacha?.peso_paquete || 0) < 0.1}
                    placeholder='Peso'
                    errorMessage='Peso mínimo 0.1 kg.'
                    // errorMessage={
                    //   wight.num < 0.1
                    //     ? 'Peso mínimo 0.1 kg.'
                    //     : 'Campo requerido *'
                    // }
                    value={despacha.peso_paquete || ''}
                    onChange={(value) => {
                      // setWight({ ...wight, num: value });
                      setDespacha({ ...despacha, peso_paquete: value });
                    }}
                  />
                </span>
              </Tooltip>
              <SizeBox />
              <CVText color='mediumGray'>Kg.</CVText>

              <CVText color='blue' fontWeight='600' fontSize='16px'></CVText>
            </Flex>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <CVImage
              wight='228px'
              height='160px'
              justifycontent='center'
              image={dmP}
            />
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}

export default Informacion;
