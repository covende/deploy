import React, { useState, useEffect } from 'react';
import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { COMPANY_BY_ID } from '@/app/api/graphql/webpublic/userData/UserService';
import { Grid, Typography } from '@material-ui/core';
import { iconsLock } from '../../ConfigurationIcons';
import {
  CVButton,
  CVInput,
  CVInputFile,
  CVText
} from '@/common/CovendeTemplate';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { fileicon } from '@/app/main/admin/seller/configuracion/ConfigurationIcons';

function MiEmpresa({ storeID }) {
  const [socialred, setSocialred] = useState('');
  const [redes, setRedes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState({
    comercial_name: '',
    social_razon: '',
    company_type: '',
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
    status: '',
    file_ruc: ''
  });

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
            value={company.comercial_name}
            icon={iconsLock}
            iconFind={true}
            onChange={(value) =>
              setCompany({ ...company, comercial_name: value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <CVInput
            title='Tipo de Empresa'
            titleOrientation='column'
            titleColor={COLORS['blue']}
            buttonColor='white'
            value={company.company_type}
            icon={iconsLock}
            iconFind={true}
            onChange={(value) =>
              setCompany({ ...company, company_type: value })
            }
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <CVInput
            title='Razón Social'
            titleOrientation='column'
            titleColor={COLORS['blue']}
            buttonColor='white'
            value={company.social_razon}
            icon={iconsLock}
            iconFind={true}
            onChange={(value) =>
              setCompany({ ...company, social_razon: value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <CVInput
            error={company.ruc == '' || !/^[1-2][0][0-9]{9}$/.test(company.ruc)}
            errorMessage='RUC inválido ( 11 caracteres numéricos )'
            title='RUC'
            titleOrientation='column'
            titleColor={COLORS['blue']}
            buttonColor='white'
            value={company.ruc}
            icon={iconsLock}
            iconFind={true}
            onChange={(value) => setCompany({ ...company, ruc: value })}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Typography>Ficha RUC</Typography>
          <CVInputFile
            callback={(e) =>
              setCompany({ ...company, file_ruc: e.data || '' })
            }>
            <HStack>
              {fileicon} <span>Subir</span>
            </HStack>
          </CVInputFile>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <CVInput
            title='Tipo de Sociedad'
            titleOrientation='column'
            titleColor={COLORS['blue']}
            buttonColor='white'
            value={company.sociedad}
            icon={iconsLock}
            iconFind={true}
            onChange={(value) => setCompany({ ...company, sociedad: value })}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <CVInput
            title='Actividad Principal'
            titleOrientation='column'
            titleColor={COLORS['blue']}
            buttonColor='white'
            value={company.actividad}
            icon={iconsLock}
            iconFind={true}
            onChange={(value) => setCompany({ ...company, actividad: value })}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <CVInput
            title='Dirección Fiscal'
            titleOrientation='column'
            titleColor={COLORS['blue']}
            buttonColor='white'
            value={company.direction}
            icon={iconsLock}
            iconFind={true}
            onChange={(value) => setCompany({ ...company, direction: value })}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <CVInput
            title='País'
            titleOrientation='column'
            titleColor={COLORS['blue']}
            buttonColor='white'
            value={company.country}
            icon={iconsLock}
            iconFind={true}
            onChange={(value) => setCompany({ ...company, country: value })}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <CVInput
            title='Región'
            titleOrientation='column'
            titleColor={COLORS['blue']}
            buttonColor='white'
            value={company.state}
            icon={iconsLock}
            iconFind={true}
            onChange={(value) => setCompany({ ...company, state: value })}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <CVInput
            title='Provincia'
            titleOrientation='column'
            titleColor={COLORS['blue']}
            buttonColor='white'
            value={company.province}
            icon={iconsLock}
            iconFind={true}
            onChange={(value) => setCompany({ ...company, province: value })}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <CVInput
            title='Distrito'
            titleOrientation='column'
            titleColor={COLORS['blue']}
            buttonColor='white'
            value={company.district}
            icon={iconsLock}
            iconFind={true}
            onChange={(value) => setCompany({ ...company, district: value })}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <CVInput
            title='Tipo de Sociedad'
            titleOrientation='column'
            titleColor={COLORS['blue']}
            buttonColor='white'
            value={company.zip_code}
            icon={iconsLock}
            iconFind={true}
            onChange={(value) => setCompany({ ...company, zip_code: value })}
          />
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
            <CVButton isLoading={loading}>Guardar</CVButton>
          </Flex>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MiEmpresa;
