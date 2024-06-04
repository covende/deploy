import AxiosGQL from '@/app/api/rest/AxiosGQL';
import * as User from '@/app/helpers/authUtils';
import { COMPANY_BY_ID } from '@/app/api/graphql/webpublic/userData/UserCompanyService';
import { Text } from '@chakra-ui/react';
import { Grid, Typography } from '@material-ui/core';
import { iconsLock } from '../../ConfigurationIcons';
import { Box } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { CVInput } from '@/common/CovendeTemplate';
import CVSwitch from '@/common/CovendeTemplate/CVSwitch';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { COMPANY_MANAGER_BY_OWNER } from '@/app/api/graphql/webpublic/userData/UserCompanyService';

function MiManager({ storeID }) {
  const [manger, setManger] = useState({
    owner: '',
    company: '',
    name: '',
    last_name: '',
    tipodoc: '',
    dni: '',
    file_dni: '',
    email: '',
    phone: '',
    contact: false
  });

  const initdata = async () => {
    let us = User.getLoggedInUser();
    const idmanager = await AxiosGQL(COMPANY_BY_ID(storeID));
    let idowner = idmanager.company.owner;

    const resultowner = await AxiosGQL(COMPANY_MANAGER_BY_OWNER(idowner));

    // console.log('manger');
    // console.log(resultowner);

    setManger({ ...resultowner.CompanyManagerByOwner });
  };

  useEffect(() => {
    initdata();
  }, []);
  return (
    <Box>
      <Text fontSize='1.5rem' fontWeight='bold' textColor='#00ADF6'>
        Datos del representante legal
      </Text>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <CVInput
            title='Nombres'
            titleOrientation='column'
            titleColor={COLORS['blue']}
            disabled={true}
            icon={iconsLock}
            buttonColor='white'
            iconFind={true}
            value={manger.name}
            onChange={(value) => setManger({ ...manger, name: value })}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <CVInput
            title='Apellidos'
            titleOrientation='column'
            titleColor={COLORS['blue']}
            disabled={true}
            icon={iconsLock}
            buttonColor='white'
            iconFind={true}
            value={manger.last_name}
            onChange={(value) => setManger({ ...manger, last_name: value })}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <CVInput
            title='Número de Celular'
            titleOrientation='column'
            titleColor={COLORS['blue']}
            disabled={true}
            icon={iconsLock}
            buttonColor='white'
            iconFind={true}
            value={manger.phone}
            onChange={(value) => setManger({ ...manger, phone: value })}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <CVInput
            title='DNI'
            titleOrientation='column'
            titleColor={COLORS['blue']}
            disabled={true}
            icon={iconsLock}
            buttonColor='white'
            iconFind={true}
            value={manger.dni}
            onChange={(value) => setManger({ ...manger, dni: value })}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <CVInput
            title='Correo electrónico'
            titleOrientation='column'
            titleColor={COLORS['blue']}
            disabled={true}
            icon={iconsLock}
            buttonColor='white'
            iconFind={true}
            value={manger.email}
            onChange={(value) => setManger({ ...manger, email: value })}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Typography>Persona de contacto</Typography>
          <CVSwitch
            variant='option'
            yesColor='gray'
            noColor='gray'
            value={manger.contact}
            // onChange={(value) => setManger({ ...manger, contact: value })}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default MiManager;
