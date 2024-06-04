import React, { useEffect, useState } from 'react';

import {
  Box,
  Switch,
  Grid,
  Divider,
  Heading,
  Text,
  Button,
  Flex,
  Input,
  Select
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import { CVImage } from '@/common/CovendeTemplate';

import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import { EDIT_USER_ADMINISTRATIVE } from '@CVApi/core/users/userServices';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import CVSelect from '@CVTemplate/core/CVSelect';
import Api from '@/app/api/graphql/roles';

function FichaDatosBo({ location }) {
  const selectUser = location.state.user;
  const [fildUser, setFildUser] = useState(selectUser);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const addToast = useToast();

  const users = async () => {
    const data = await Api.fetch({ platformID: 'PBO' });
    if (data != []) setRoles(data);
  };

  useEffect(() => {
    users();
  }, []);

  const save = (dataUpdate) => {
    setLoading(true);
    AxiosGQL(EDIT_USER_ADMINISTRATIVE(dataUpdate))
      .then(({ editUserAdministrative }) => {
        if (editUserAdministrative.status) {
          CVAlertSuccess({
            addToast,
            message: `Usuario ${selectUser.first_name} actualizado correctamente.`
          });
        } else {
          CVAlertError({ addToast, message: 'Ocurriedon errores.' });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <Grid templateColumns='repeat(2, max-content)' gap='16px'>
      <Grid
        templateRows='repeat(2, max-content)'
        justifyItems='center'
        gap='16px'>
        <CVImage
          variant='avatar'
          width='208px'
          height='208px'
          name='Segun Adebayo'
          image={fildUser.image}
        />
        <Box
          p='24px 32px'
          width='300px'
          height='auto'
          borderRadius='16px'
          bg='#FFFFFF'
          color='#4F4F4F'>
          <Heading color='#004772' size='sm' fontWeight='bold'>
            ID
          </Heading>
          <Text fontSize='md' marginBottom='8px'>
            {fildUser.custom_id}
          </Text>

          <Heading color='#004772' size='sm' fontWeight='bold'>
            Nombre
          </Heading>
          <Text fontSize='md'>{fildUser.first_name}</Text>
          <Box
            width='84px'
            height='15px'
            position='relative'
            left='calc(50% - 42px)'
            top='24px'
            background='#15aef6'
            borderRadius='10px 10px 0px 0px'
          />
        </Box>
      </Grid>
      <Box
        p='24px 32px'
        width='837px'
        height='500px'
        borderRadius='16px'
        bg='#FFFFFF'
        color='#4F4F4F'>
        <Heading marginBottom='16px' color='#00ADF6'>
          Ficha de usuario
        </Heading>
        <Heading color='#4D4D4D' size='md' fontWeight='bold' marginTop='8px'>
          Datos personales
        </Heading>
        <Divider margin='8px 0px' />
        <Grid templateColumns='repeat(2, max-content)' gap='16px'>
          <Heading color='#4D4D4D' width='190px' size='sm' fontWeight='bold'>
            Nombres:
          </Heading>
          <Input
            color='#4D4D4D'
            fontSize='md'
            w='100%'
            value={fildUser.first_name ? fildUser.first_name : '-'}
            onChange={(e) =>
              setFildUser({ ...fildUser, first_name: e.target.value || '' })
            }
          />
        </Grid>
        <Divider margin='8px 0px' />
        <Grid templateColumns='repeat(2, max-content)' gap='16px'>
          <Heading color='#4D4D4D' width='190px' size='sm' fontWeight='bold'>
            Apellidos:
          </Heading>
          <Input
            color='#4D4D4D'
            fontSize='md'
            w='100%'
            value={fildUser.last_name ? fildUser.last_name : '-'}
            onChange={(e) =>
              setFildUser({ ...fildUser, last_name: e.target.value || '' })
            }
          />
        </Grid>
        <Divider margin='8px 0px' />
        <Grid templateColumns='repeat(2, max-content)' gap='16px'>
          <Heading color='#4D4D4D' width='190px' size='sm' fontWeight='bold'>
            Rol:
          </Heading>
          <CVSelect
            value={fildUser.role.role_id || ''}
            onChange={(e) =>
              setFildUser({ ...fildUser, role: { role_id: e || '' } })
            }
            options={(roles || []).map((item) => ({
              text: item.roleName || '',
              value: item.roleID || ''
            }))}
          />
        </Grid>
        <Divider margin='8px 0px' />
        <Grid templateColumns='repeat(2, max-content)' gap='16px'>
          <Heading color='#4D4D4D' width='190px' size='sm' fontWeight='bold'>
            Estado:
          </Heading>
          <Text color='#4D4D4D' fontSize='md'>
            {fildUser.flag_active ? 'Habilitado' : 'Deshabilitado'} &nbsp;
            <Switch
              colorScheme='green'
              onChange={() =>
                setFildUser({ ...fildUser, flag_active: !fildUser.flag_active })
              }
              size='md'
              isChecked={fildUser.flag_active}
            />
          </Text>
        </Grid>
        <Divider margin='8px 0px 32px 0px' />

        <Heading color='#4D4D4D' size='md' fontWeight='bold'>
          Datos de acceso al panel
        </Heading>
        <Divider margin='8px 0px' />
        <Grid templateColumns='repeat(2, max-content)' gap='16px'>
          <Heading color='#4D4D4D' width='190px' size='sm' fontWeight='bold'>
            Usuario de acceso:
          </Heading>
          <Input
            color='#4D4D4D'
            fontSize='md'
            w='100%'
            value={fildUser.email ? fildUser.email : '-'}
            onChange={(e) =>
              setFildUser({ ...fildUser, email: e.target.value })
            }
          />
        </Grid>
        <Divider margin='8px 0px' />
        <Grid templateColumns='repeat(2, max-content)' gap='16px'>
          <Heading color='#4D4D4D' width='190px' size='sm' fontWeight='bold'>
            Contraseña:
          </Heading>
          <Input
            color='#4D4D4D'
            type='password'
            fontSize='md'
            w='100%'
            value={fildUser.password ? fildUser.password : ''}
            onChange={(e) =>
              setFildUser({ ...fildUser, password: e.target.value })
            }
          />
        </Grid>
        <Divider margin='8px 0px' />
        <Grid templateColumns='repeat(2, max-content)' gap='16px'>
          <Heading color='#4D4D4D' width='190px' size='sm' fontWeight='bold'>
            Repetir Contraseña:
          </Heading>
          <Input
            color='#4D4D4D'
            fontSize='md'
            type='password'
            w='100%'
            value={fildUser.confirmPassword ? fildUser.confirmPassword : ''}
            onChange={(e) =>
              setFildUser({
                ...fildUser,
                confirmPassword: e.target.value || ''
              })
            }
          />
        </Grid>
        <Flex justify='end' mt='3rem' mr='3rem'>
          <Button
            bgColor='#00ADF6'
            color='white'
            borderRadius='14px'
            p='.5rem 3.4rem'
            disabled={loading}
            onClick={() => save(fildUser)}>
            Guardar
          </Button>
        </Flex>
      </Box>
    </Grid>
  );
}

export default FichaDatosBo;
