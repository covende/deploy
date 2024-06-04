import React, { useEffect, useState } from 'react';

// UI components

import { Input } from '@chakra-ui/react';
import { Grid } from '@material-ui/core';

// Components
import ModalTable from './ModalTable';
import { Box, Divider, Flex, Center, Text } from '@chakra-ui/react';
import { CVInput, CVLine, CVText, CVButton } from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVSwitch from '@CVTemplate/core/CVSwitch';
import { ContainerAttr } from '@CVPages/core/admin/seller/productos/ProductsStyle';
import CVSelectMultiple from '@CVTemplate/core/CVSelectMultiple';

function ModalForm({
  inputColumns,
  permissions,
  menus,
  setPutpermisos,
  putpermisos,
  setMenus,
  asinament,
  setAsinament,
  onSubmit,
  menusPermissions,
  roles
}) {
  const [availableRoles, setAvailableRoles] = useState([]);
  useEffect(() => {
    if (asinament.platformID == 'PBS') {
      setAvailableRoles(
        roles
          .filter((role) =>
            asinament?.roleID != ''
              ? role.roleID !== asinament.roleID && !role.onlySubAccount
              : !role.onlySubAccount
          )
          .map((item) => ({
            text: item.roleName,
            value: item.roleID
          }))
      );
    }
  }, []);

  return (
    <>
      <Box mt={5}>
        <CVLine
          backgroundColor='white'
          height='0.2px'
          color='#ABABAB'
          titles={[
            '',
            <CVText fontSize='1.3rem' color='black'>
              <Flex width='70px' justifyContent='center'>
                Datos
              </Flex>
            </CVText>,
            ''
          ]}
        />
      </Box>
      <SizeBox />
      <SizeBox />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Text align='right'>Rol:</Text>
        </Grid>
        <Grid item xs={12} sm={9}>
          <CVInput
            value={asinament.roleName || ''}
            onChange={(value) =>
              setAsinament({ ...asinament, roleName: value })
            }
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <Text align='right'>Identificador:</Text>
        </Grid>
        <Grid item xs={12} sm={9}>
          <CVInput
            value={asinament.key || ''}
            onChange={(value) => setAsinament({ ...asinament, key: value })}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <Text align='right'>Descripción:</Text>
        </Grid>
        <Grid item xs={12} sm={9}>
          <CVInput
            height='100%'
            style={{ minHeight: '50px' }}
            multiline={true}
            value={asinament.description || ''}
            onChange={(value) =>
              setAsinament({ ...asinament, description: value })
            }
          />
        </Grid>

        {asinament?.platformID == 'PBS' ? (
          <>
            <Grid item xs={12} sm={5}>
              <Text align='right'>¿Disponible solo para subcuentas?</Text>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Box maxW='max-content'>
                <CVSwitch
                  variant='capsule'
                  yesColor={asinament?.onlySubAccount ? 'primary' : 'gray'}
                  value={asinament.onlySubAccount || false}
                  onChange={(value) =>
                    setAsinament({ ...asinament, onlySubAccount: value })
                  }
                />
              </Box>
            </Grid>

            {asinament?.onlySubAccount && (
              <>
                <Grid item xs={12} sm={3}>
                  <Text align='right'>Asignar a roles: </Text>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <Box className='hola'>
                    <CVSelectMultiple
                      width='100%'
                      height='3rem'
                      multiple={true}
                      value={asinament?.availableRoles || []}
                      onChange={(value) => {
                        setAsinament({
                          ...asinament,
                          availableRoles: value
                        });
                      }}
                      options={availableRoles}
                    />
                  </Box>
                </Grid>
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </Grid>
      <SizeBox />

      <ModalTable
        {...{ menusPermissions }}
        inputColumns={inputColumns}
        permissions={permissions}
        menus={menus}
        setPutpermisos={setPutpermisos}
        putpermisos={putpermisos}
        setMenus={setMenus}
        asinament={asinament}
        setAsinament={setAsinament}
      />
      <Center my={5}>
        <CVButton color='white' onClick={onSubmit}>
          Agregar
        </CVButton>
      </Center>
    </>
  );
}

export default ModalForm;
