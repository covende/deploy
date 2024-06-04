import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { COMPANY_BY_ID } from '@/app/api/graphql/webpublic/userData/UserCompanyService';
import React, { useState, useEffect } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

import { Grid, Typography } from '@material-ui/core';
import { iconsLock } from '../../ConfigurationIcons';
import { v4 } from 'uuid';
import { CVInput, CVText } from '@/common/CovendeTemplate';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { typeofsale_producto } from '@/common/utils';

function MiEmpresa({ storeID }) {
  const [socialred, setSocialred] = useState('');
  const [redes, setRedes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState({
    comercial_name: '',
    social_razon: '',
    ruc: '',
    activity: '',
    direction: '',
    country: '',
    state: '',
    province: '',
    district: '',
    zip_code: '',
    web_page: '',
    owner: '',
    manager: '',
    actividad: '',
    sociedad: '',
    status: ''
  });

  const initdata = async () => {
    const result = await AxiosGQL(COMPANY_BY_ID(storeID));
    setCompany({ ...result.company });
  };

  useEffect(() => {
    initdata();
  }, []);

  return (
    <Box>
      <Text fontSize='1.5rem' fontWeight='bold' textColor='#00ADF6'>
        Datos de la empresa
      </Text>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <CVInput
            title='Nombre Comercial'
            titleOrientation='column'
            titleColor={COLORS['blue']}
            buttonColor='white'
            value={company?.comercial_name || ''}
            disabled={true}
            onChange={(value) =>
              setCompany({ ...company, comercial_name: value })
            }
            icon={iconsLock}
            iconFind={true}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <CVInput
            title='Tipo de venta'
            value={typeofsale_producto(company.type_of_sale || '')}
            disabled={true}
            icon={iconsLock}
            iconFind={true}
            titleOrientation='column'
            titleColor={COLORS['blue']}
            buttonColor='white'
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <CVInput
            title='Razón Social'
            value={company?.social_razon || ''}
            disabled={true}
            onChange={(value) =>
              setCompany({ ...company, social_razon: value })
            }
            icon={iconsLock}
            iconFind={true}
            titleOrientation='column'
            titleColor={COLORS['blue']}
            buttonColor='white'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <CVInput
            error={company.ruc == '' || !/^[1-2][0][0-9]{9}$/.test(company.ruc)}
            title='RUC'
            value={company?.ruc || ''}
            disabled={true}
            onChange={(value) => setCompany({ ...company, ruc: value })}
            icon={iconsLock}
            iconFind={true}
            titleOrientation='column'
            titleColor={COLORS['blue']}
            buttonColor='white'
          />
          {company.ruc == '' || !/^[1-2][0][0-9]{9}$/.test(company.ruc) ? (
            <CVText
              color='red'
              className='errores'
              fontWeight='bold'
              fontSize='0.85rem'>
              RUC inválido ( 11 caracteres numéricos )
            </CVText>
          ) : (
            ''
          )}
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <CVInput
            title='Tipo de sociedad'
            value={company?.sociedad || ''}
            disabled={true}
            onChange={(value) => setCompany({ ...company, sociedad: value })}
            icon={iconsLock}
            iconFind={true}
            titleOrientation='column'
            titleColor={COLORS['blue']}
            buttonColor='white'
          />
        </Grid>
        {/* 
        <Grid item xs={12} sm={12} md={6}>
          <CVInput
            title='Actividad Principal'
            value={company?.actividad || ''}
            disabled={true}
            onChange={(value) => setCompany({ ...company, actividad: value })}
            icon={iconsLock}
            iconFind={true}
            titleOrientation='column'
            titleColor={COLORS['blue']}
            buttonColor='white'
          />
        </Grid>
        */}
        <Grid item xs={12} sm={12} md={6}>
          <CVInput
            title='Dirección Fiscal'
            value={company?.direction || ''}
            disabled={true}
            onChange={(value) => setCompany({ ...company, direction: value })}
            icon={iconsLock}
            iconFind={true}
            titleOrientation='column'
            titleColor={COLORS['blue']}
            buttonColor='white'
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <CVInput
            title='País'
            value={company?.country || ''}
            disabled={true}
            onChange={(value) => setCompany({ ...company, country: value })}
            icon={iconsLock}
            iconFind={true}
            titleOrientation='column'
            titleColor={COLORS['blue']}
            buttonColor='white'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <CVInput
            title='Región'
            value={company?.departamento?.name || ''}
            disabled={true}
            onChange={(value) => setCompany({ ...company, state: value })}
            icon={iconsLock}
            iconFind={true}
            titleOrientation='column'
            titleColor={COLORS['blue']}
            buttonColor='white'
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <CVInput
            title='Provincia'
            value={company?.provincia?.name || ''}
            disabled={true}
            onChange={(value) => setCompany({ ...company, province: value })}
            icon={iconsLock}
            iconFind={true}
            titleOrientation='column'
            titleColor={COLORS['blue']}
            buttonColor='white'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <CVInput
            title='Distrito'
            value={company?.distrito?.name || ''}
            disabled={true}
            onChange={(value) => setCompany({ ...company, district: value })}
            icon={iconsLock}
            iconFind={true}
            titleOrientation='column'
            titleColor={COLORS['blue']}
            buttonColor='white'
          />
        </Grid>

        {/* <Grid item xs={12} sm={12} md={6}>
          <CVInput
            title='Código postal'
            value={company?.zip_code || ''}
            disabled={true}
            onChange={(value) => setCompany({ ...company, zip_code: value })}
            icon={iconsLock}
            iconFind={true}
            titleOrientation='column'
            titleColor={COLORS['blue']}
            buttonColor='white'
          />
        </Grid> */}

        <Grid item xs={12} sm={12} md={12}>
          <Typography></Typography>
          {redes.map((it) => (
            <Text key={v4()} color='#00ADF6'>
              <a href={it}>{it}</a>
            </Text>
          ))}

          {/* <CVInput
            placeholder='Enlace a Blog'
            title='Redes sociales de la empresa'
            value={socialred || ''}
            onChange={(value) => setSocialred(value)}
            icon={'Agregar'}
            iconFind={true}
            titleOrientation='column'
            titleColor={COLORS['blue']}
            buttonClick={() => {
              setRedes([...redes, socialred]);
              setSocialred('');
            }}
            buttonColor='red'
          /> */}
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Box textAlign={['center']}>
            <Typography
              variant='caption'
              style={{ fontSize: '18px', color: '#00ADF6' }}>
              Si quieres modificar algún dato restringido, envíanos un email a
              info@covende.com
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={12}></Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Flex justifyContent='center'>
            {/* <Button isLoading={loading}>Guardar</Button> */}
          </Flex>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MiEmpresa;
