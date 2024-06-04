import React, { useEffect, useState } from 'react';
import {
  Box,
  Spacer,
  Flex,
  Stack,
  Checkbox,
  CheckboxGroup,
  Center,
  Icon
} from '@chakra-ui/react';
// import { box } from '@/../node_modules/tweetnacl/nacl';

function ModalTable({
  inputColumns,
  permissions,
  menus,
  setPutpermisos,
  putpermisos,
  setMenus,
  asinament,
  setAsinament,
  menusPermissions
}) {
  const [dato, setdato] = useState({});
  const [newData, setNewData] = useState([]);

  const [newMenu, setnewMenu] = useState({
    menuID: '',
    permissions: {}
  });
  const [newpermises, setNewpermises] = useState({});
  const arreglo = [];
  const carte = {};

  const Agrega = (menu_id, permiso_id, status) => {
    // console.log({ status });
    if (status) {
      let data = asinament.menusPermissions.map((menu) =>
        menu.menuID == menu_id
          ? { ...menu, permissions: [...menu.permissions, permiso_id] }
          : menu
      );
      setAsinament({ ...asinament, menusPermissions: data });
    } else {
      let data = asinament.menusPermissions.map((menu) =>
        menu.menuID == menu_id
          ? {
              ...menu,
              permissions: menu.permissions.filter(
                (item) => item !== permiso_id
              )
            }
          : menu
      );
      setAsinament({ ...asinament, menusPermissions: data });
    }
  };

  const fusionMenus = () => {
    let asd = menusPermissions.map((item) => {
      let asignados = asinament.menusPermissions.find(
        (evento) => evento.menuID === item.menuID
      );
      return { ...item, permissions: asignados?.permissions || [] };
    });
    setNewData(asd);
  };

  useEffect(() => {}, []);

  const CustomIcon = ({ isChecked }) => {
    const style = {
      backgroundColor: isChecked ? '#00ADF6' : '#FF5454',
      width: '22px',
      height: '21px',
      borderRadius: '5px'
    };
    const d = isChecked
      ? 'M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z'
      : 'M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z';
    return (
      <Icon w='14px' h='12px' viewBox='0 0 24 24' style={style} >
        <path transform="translate(4, 4)" d={d} stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </Icon>
    )
  }
  
  return (
    <>
      <Flex>
        <Spacer />
        {permissions.map((item, i) => {
          return (
            <Box bg='#D4D4D4' color='white' key={i} mx={0.5} p={1}>
              {item.name}
            </Box>
          );
        })}
      </Flex>
      <Box>
        {asinament.menusPermissions.map((item, i) => {
          return (
            <Flex
              border='1px'
              borderColor='gray.200'
              borderRadius='12px'
              my={1}
              key={i}>
              <Box mx={1} mr={5} width='5%'>
                {item.platformPosition}
              </Box>
              <Box mx={1} width='45%'>
                {item.menuName}
              </Box>
              <Box ml={60} width='50%'>
                <Center>
                  <CheckboxGroup
                    colorScheme='blue'
                    defaultValue={item.permissions}>
                    <Stack spacing={[10, 5]} direction={['row']}>
                      {permissions.map((it, j) => {
                        return (
                          <Box key={j}>
                            <Checkbox size='lg'
                            value={it._id}
                            onChange={(e) =>
                              Agrega(item.menuID, it._id, e.target.checked)
                            } icon={<CustomIcon />} colorScheme='' ></Checkbox>
                          </Box>
                        );
                      })}
                    </Stack>
                  </CheckboxGroup>
                </Center>
              </Box>
            </Flex>
          );
        })}
      </Box>
    </>
  );
}

export default ModalTable;
