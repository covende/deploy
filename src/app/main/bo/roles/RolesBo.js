import React, { useEffect, useState } from 'react';

// Common

import { Button, HStack, Flex, Spacer } from '@chakra-ui/react';

// Utils
import Utils from './components/utils';
import { CVDataTable, CVModal, CVText } from '@/common/CovendeTemplate';
import { useToast } from '@chakra-ui/toast';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import { useDisclosure } from '@chakra-ui/react';

import ModalForm from './components/ModalForm';

import {
  PERMISION_STATUS,
  MENU_BY_PLATAFORM,
  ADD_ROLE,
  EDIT_ROLE
} from '@/app/api/graphql/roles/typeDefs/query';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import ModalCreate from './components/ModalCreate';
import ModalDelete from '@/app/main/bo/faq/components/ModalDelete';
import useGetPermisions from '@/common/hooks/useGetPermisions';
// Form hooks

// Estado inicial del formulario
// const initialState = {
//   role_id: '',
//   name: null,
//   description: null,
//   permissions: [],
//   permisos: []
// };

const initialState = {
  roleID: '',
  platformID: '',
  onlySubAccount: false,
  roleName: '',
  description: '',
  key: '',
  menusPermissions: [],
  availableRoles: []
};

function Roles({
  platforms,
  permissions,
  roles,
  fetchPlatform,
  fetchRoles,
  addRoles: addItem,
  editRoles: editItem
}) {
  const addToast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [permisos, setPermisos] = useState([]);
  const [menusHeader, SetmenusHeader] = useState([]);
  const [menus, setMenus] = useState([]);
  const [open, setOpen] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  const [itemToDelete, setItemToDelete] = useState('');
  const [asinament, setAsinament] = useState({
    roleID: '',
    platformID: '',
    onlySubAccount: false,
    roleName: '',
    description: '',
    key: '',
    menusPermissions: [],
    availableRoles: []
  });

  const [putpermisos, setPutpermisos] = useState([]);
  const [platformSelected, setPlatformSelected] = useState(
    platforms.data ? platforms.data[0].platformID : null
  );
  const RolesPermisions = useGetPermisions('Backoffice', 'Roles');

  const clearDataPermissionsSend = (asinament) => {
    const newRol = {
      ...asinament,
      availableRoles: asinament.availableRoles.map((rol) => rol.value),
      menusPermissions: asinament.menusPermissions
        .filter((menu) => menu.permissions.length > 0)
        .map((menu) => ({
          menuID: menu.menuID,
          permissions: menu.permissions
        }))
    };
    return newRol;
  };

  const showList = async (cod) => {
    const { menusHeaderByPlatform } = await AxiosGQL(MENU_BY_PLATAFORM(cod));
    setMenus(menusHeaderByPlatform);
    setAsinament({
      ...asinament,
      menusPermissions: [],
      platformID: cod
    });
    const { permissions } = await AxiosGQL(PERMISION_STATUS());
    setPermisos(permissions);
  };

  const [titleModal, setTitleModal] = useState('Crear Rol');

  const editRole = (item) => {
    let menusPermissions = menus.map((menu) => {
      let foundMenu = item.menusPermissions.find(
        (it) => it.menuID === menu.menuID
      );
      return {
        ...menu,
        permissions: foundMenu?.permissions || []
      };
    });

    let availableRoles = [];

    if (item.availableRoles.length > 0) {
      item.availableRoles.forEach((role) => {
        let foundRole = roles.data.find((rol) => rol.roleID == role);
        if (foundRole)
          availableRoles.push({
            text: foundRole.roleName,
            value: foundRole.roleID
          });
      });
    }

    setAsinament({
      ...asinament,
      onlySubAccount: item.onlySubAccount,
      availableRoles,
      roleID: item.roleID,
      platformID: item.platformID,
      roleName: item.roleName,
      description: item.description,
      key: item.key || '',
      menusPermissions
    });

    setTitleModal('Editar Rol');

    onOpen();
  };

  const deleteRole = (item) => {
    setItemToDelete(item);
    setOpen(true);
  };

  const onSubmit = async () => {
    if (asinament.roleID == '') {
      const { addRole } = await AxiosGQL(
        ADD_ROLE(clearDataPermissionsSend(asinament))
      );
      if (addRole.status) {
        CVAlertSuccess({
          addToast,
          message: 'Se ha creado exitasamente el Rol  ',
          title: 'Creación Rol.'
        });
      } else {
        CVAlertError({ addToast, title: 'Error', message: addRole.message });
      }
    } else {
      const { editRole } = await AxiosGQL(
        EDIT_ROLE(clearDataPermissionsSend(asinament))
      );
      if (editRole.status) {
        CVAlertSuccess({
          addToast,
          message: 'Rol actualizado exitosamente',
          title: 'Actualizar Rol'
        });
      } else {
        CVAlertError({ addToast, title: 'Error', message: editRole.message });
      }
    }
    fetchRoles(asinament.platformID);
    onClose();
  };

  useEffect(() => {
    fetchPlatform();
  }, [permisos]);

  useEffect(() => {
    if (onDelete === true) {
      roles.data = roles.data.filter(
        (rol) => rol.roleID !== itemToDelete.roleID
      );
      setOnDelete(false);
    }
  }, [onDelete]);

  return (
    <>
      <HStack mb='16px' spacing='24px' style={{ Background: '#004772' }}>
        {platforms.loading
          ? null
          : platforms.error
          ? null
          : platforms.data.map(
              (platf, key) =>
                platf.active && (
                  <Button
                    variant='bo-primary'
                    bg={
                      platformSelected === platf.platformID
                        ? 'covende.default.main'
                        : 'covende.info.contrastText'
                    }
                    color={
                      platformSelected === platf.platformID
                        ? 'covende.info.contrastText'
                        : 'covende.primary.main'
                    }
                    key={key}
                    onClick={() => {
                      setPlatformSelected(platf.platformID);
                      fetchRoles(platf.platformID);
                      showList(platf.platformID);
                    }}>
                    {platf.name}
                  </Button>
                )
            )}
      </HStack>

      {roles.loading ? null : roles.error ? null : (
        <>
          <Flex mb={5} ml={2}>
            <Spacer />
            <ModalCreate
              RolesPermisions={RolesPermisions}
              titleModal={titleModal}
              onSubmit={onSubmit}
              inputColumns={Utils.columnsModalData}
              permissions={permisos}
              menus={menus}
              putpermisos={putpermisos}
              setPutpermisos={setPutpermisos}
              setMenus={setMenus}
              asinament={asinament}
              onClose={onClose}
              onOpen={onOpen}
              setAsinament={setAsinament}
            />
          </Flex>

          <CVDataTable
            headers={Utils.columnsData}
            data={Utils.inputDataProcessed(
              roles.data,
              {
                edit: editRole,
                delete: deleteRole
              },
              RolesPermisions
            )}
          />
          <ModalDelete
            {...{ itemToDelete, onDelete, setOnDelete }}
            onClose={() => setOpen(false)}
            isOpen={open}
            title='Rol'
          />
        </>
      )}

      <CVModal
        title={titleModal}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setAsinament({ ...initialState, platformID: asinament.platformID });
        }}
        size='3xl'
        header={
          <CVText
            fontWeight='bold'
            color='white'
            fontSize='1.5rem'
            textAli
            gn='center'>
            Editar Rol
          </CVText>
        }
        bgHeader='skyblue'
        colorHeader='white'
        blockScrollOnMount='true'>
        <ModalForm
          titleModal={titleModal}
          onSubmit={onSubmit}
          inputColumns={Utils.columnsModalData}
          permissions={permisos}
          menus={menus}
          roles={roles.data}
          putpermisos={putpermisos}
          setPutpermisos={setPutpermisos}
          setMenus={setMenus}
          asinament={asinament}
          setAsinament={setAsinament}
        />
      </CVModal>
    </>
  );
}
export default Roles;
