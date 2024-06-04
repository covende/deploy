import React from 'react';
import { AddUsers } from './assets/icons';

import { CVModal, CVText, CVButton } from '@/common/CovendeTemplate';
import { useDisclosure } from '@chakra-ui/react';
import ModalForm from './ModalForm';
function ModalCreate({
  inputColumns,
  permissions,
  menus,
  setPutpermisos,
  putpermisos,
  titleModal,
  state,
  onSubmit,
  setMenus,
  asinament,
  setAsinament,
  onClose,
  onOpen,
  RolesPermisions
}) {
  const { isOpen } = useDisclosure();
  const data = () => {
    let menusPermissions = menus.map((menu) => {
      let foundMenu = asinament.menusPermissions.find(
        (item) => (item.menuID = menu.menuID)
      );
      return {
        ...foundMenu,
        ...menu,
        permissions: menu.permissions || []
      };
    });

    setAsinament({
      ...asinament,
      roleName: '',
      description: '',
      roleID: '',
      menusPermissions
    });
    onOpen();
  };

  return (
    <>
      {RolesPermisions.crear && (
        <CVButton color='white' onClick={() => data()}>
          <AddUsers />
          &nbsp;&nbsp; Crear
        </CVButton>
      )}
      <CVModal
        title={titleModal}
        isOpen={isOpen}
        onClose={onClose}
        size='3xl'
        bgHeader='skyblue'
        header={
          <CVText
            fontWeight='bold'
            color='white'
            fontSize='1.2rem'
            textAlign='center'>
            Crear Rol
          </CVText>
        }>
        <ModalForm
          asinament={asinament}
          setAsinament={setAsinament}
          state={state}
          onSubmit={onSubmit}
          permissions={permissions}
          menus={menus}
          setMenus={setMenus}
          putpermisos={putpermisos}
          setPutpermisos={setPutpermisos}></ModalForm>
      </CVModal>
    </>
  );
}

export default ModalCreate;
