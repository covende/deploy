import React, { useEffect, useState } from 'react';
import { Grid, Container } from '@material-ui/core';
import { Flex, Box, useDisclosure, useToast, Text } from '@chakra-ui/react';
import {
  CVBreadcrumb,
  CVButton,
  CVCheckBox,
  CVImage,
  CVInput,
  CVInputImage,
  CVPanel,
  CVText
} from '@/common/CovendeTemplate';
import { useParams } from 'react-router';

import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { report_store_motives } from '@/app/api/graphql/webbuy/TableAPIService';
import noimage from '@/app/assets/img/noimage.png';
import { IMAGESIZE } from '@/common/CovendeTemplate/CVThemes';
import { v4 } from 'uuid';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { companyDenunce } from '@/app/api/graphql/webtopbar/MessageManager';
import { Link, useHistory } from 'react-router-dom';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import { useDispatch } from 'react-redux';
import { CVGoUp, CVValidLogin } from '@/common/CovendeTemplate/CVMethods';
import { CVErrorTags } from '@/common/CovendeTemplate/CVValidation';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import CVUseStateCallback from '@/common/CovendeTemplate/CVHooks/CVUseStateCallback';
import PStore from '../producto/components/PStore';
import { FIND_COMPANY } from '@CVApi/core/webpublic/stores/StoresService';
import { SendMesagge } from '../admin/faq/assets/svg';

function TiendaReport() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const addToast = useToast();
  const history = useHistory();
  const [tienda, settienda] = useState({});
  const [razones, setrazones] = useState([]);
  const [success, setsuccess] = useState(false);
  const [seeerrors, setseeerrors] = CVUseStateCallback(false);
  const [isOpen, setisOpen] = useState(false);
  const [size, setsize] = useState({});
  const [report, setreport] = useState({
    details: '',
    motivos: [],
    store_id: id,
    fotos: []
  });
  const us = getLoggedInUser();
  const [company, setCompany] = useState({});

  useEffect(() => {
    AxiosGQL(FIND_COMPANY(id)).then(({ company }) => setCompany(company));
  }, [id]);
  const sending = async () => {
    if (CVErrorTags()) {
      CVAlertError({
        addToast,
        message: 'Solucione o corrija los errores en rojo'
      });
      return false;
    }
    if (!CVValidLogin(dispatch)) return false;

    const { CompanyDenunceSave } = await companyDenunce({
      custom_id: company.custom_id,
      detail: report.details.replace(/["']/g, ''),
      motives_ids: report.motivos,
      photos: report.fotos,
      reported_by: us.user_id,
      company_id: id
    });

    if (CompanyDenunceSave.status === 'PENDING') {
      setsuccess(true);
      CVAlertSuccess({
        addToast,
        message: 'Su denuncia ha sido recibida'
      });
    } else {
      CVAlertError({
        addToast,
        message: 'Ocurrio algo, por favor inténtalo más tarde.'
      });
    }
  };

  const senddata = async () => {
    !seeerrors ? setseeerrors(true, sending) : sending();
  };

  const initdata = async () => {
    const result = await report_store_motives();
    setrazones(result);
    const [width, height, attr] = IMAGESIZE['STORE_REPORT'].split(',');
    setsize({ width, height, attr });
    CVValidLogin(dispatch);
  };

  useEffect(() => {
    initdata();
    CVGoUp();
  }, []);

  return (
    <>
      <CVBreadcrumb
        backgroundColor='white'
        data={[
          { text: 'inicio', uri: '/' },
          { text: 'Reportar Tienda', uri: '/' }
        ]}
      />
      <SizeBox />
      <Container>
        <Grid container spacing={2}>
          <PStore store={id} setienda={(value) => settienda(value)} />
          <Grid item xs={12} sm={7} md={9}>
            <CVPanel height='100%' variant='box'>
              <CVText fontSize='1.5rem' fontWeight='bold' color='red'>
                Reportar Tienda
              </CVText>
              <SizeBox />
              <CVText>
                Reporta malos procedimientos relacionados a un vendedor y/o a un
                producto.{' '}
              </CVText>
              <SizeBox />
              <Grid container spacing={1}>
                {/* <Grid item xs={5} sm={4} md={3}>
                  <CVText fontWeight='bold' textAlign='end'>
                    Reportar a:
                  </CVText>
                </Grid>
                <Grid item xs={7} sm={8} md={9}>
                  <CVInput
                    error={seeerrors && tienda?.store_name == ''}
                    value={tienda?.store_name || ''}
                    onChange={(value) => {}}
                  />
                </Grid> */}

                <Grid item xs={5} sm={4} md={3}>
                  <CVText fontWeight='bold' textAlign='end'>
                    Razón:
                  </CVText>
                </Grid>
                <Grid item xs={7} sm={8} md={9}>
                  <CVCheckBox
                    itemDirection='column'
                    options={razones.map((item) => ({
                      text: item.title,
                      value: item._id
                    }))}
                    onChange={(values) =>
                      setreport({ ...report, motivos: values })
                    }
                  />
                  {seeerrors && report.motivos.length == 0 && (
                    <CVText
                      color='red'
                      fontSize='0.85rem'
                      fontWeight='bold'
                      className='errores'>
                      Seleccione al menos una razón
                    </CVText>
                  )}
                </Grid>

                <Grid item xs={5} sm={4} md={3}>
                  <CVText fontWeight='bold' textAlign='end'>
                    Detalles:
                  </CVText>
                </Grid>
                <Grid item xs={7} sm={8} md={9}>
                  <CVInput
                    error={seeerrors && report.details == ''}
                    multiline={true}
                    height='100%'
                    value={report.details}
                    onChange={(value) =>
                      setreport({ ...report, details: value })
                    }
                  />
                </Grid>

                <Grid item xs={5} sm={4} md={3}>
                  <CVText fontWeight='bold' textAlign='end'>
                    Fotos:
                  </CVText>
                </Grid>
                <Grid item xs={7} sm={8} md={9}>
                  <CVText>
                    Agrega fotos o documentos que sirvan de evidencia
                  </CVText>
                  <SizeBox />
                  <Flex flexWrap='wrap'>
                    {report.fotos.map((image) => (
                      <Box key={v4()} marginRight='1rem' marginBottom='1rem'>
                        <CVImage height='100px' width='100px' image={image} />
                      </Box>
                    ))}
                    <Box onClick={() => setisOpen(true)}>
                      <CVImage height='100px' width='100px' image={noimage} />
                    </Box>
                  </Flex>
                  {seeerrors && report.fotos.length == 0 && (
                    <CVText
                      color='red'
                      fontSize='0.85rem'
                      fontWeight='bold'
                      className='errores'>
                      Adjunte al menos una prueba
                    </CVText>
                  )}
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <SizeBox />
                  {success ? (
                    <Flex w='100%' flexDirection='column' alignItems='center'>
                      <SendMesagge />
                      <Text
                        h='40px'
                        textAlign='center'
                        color='#00ADF6'
                        fontWeight={400}
                        fontSize='16px'>
                        <span style={{ fontWeight: '600' }}>
                          ¡Mensaje enviado!
                        </span>{' '}
                        <br />
                        Responderemos en breve al email asociado a tu cuenta.
                      </Text>
                    </Flex>
                  ) : (
                    <Flex justifyContent='center'>
                      <Box>
                        <CVButton onClick={() => senddata()}>Enviar</CVButton>
                      </Box>
                      <SizeBox />
                      <Box>
                        <CVButton
                          onClick={() => history.goBack()}
                          backgroundColor='red'>
                          Cancelar
                        </CVButton>
                      </Box>
                    </Flex>
                  )}
                  <SizeBox />
                </Grid>
              </Grid>
            </CVPanel>
          </Grid>
        </Grid>
        {isOpen && (
          <CVInputImage
            onChange={(image) => {
              setreport({ ...report, fotos: [...report.fotos, image] });
              setisOpen(false);
            }}
            isOpen={isOpen}
            onClose={() => setisOpen(false)}
            size={size}
            viewMode={0}
          />
        )}
      </Container>
    </>
  );
}

export default TiendaReport;
