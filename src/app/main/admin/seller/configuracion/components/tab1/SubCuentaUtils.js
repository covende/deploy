import { Trash } from '@/app/assets/icons';
import { svgEdit } from '@/app/assets/images/SVG';
import CVSwitch from '@/common/CovendeTemplate/CVSwitch';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { estadoColor, estadoTexto } from '@/common/utils';
import { Flex, HStack, Stack } from '@chakra-ui/react';
import { Box, TableCell, Typography } from '@material-ui/core';
import React from 'react';

export const headCells = [
  { data: 'numero', label: 'Nro', first: true, align: 'center' },
  {
    data: 'nombre',
    label: 'Nombre',
    align: 'center'
  },
  {
    data: 'role',
    label: 'Rol',
    align: 'center'
  },
  {
    data: 'email',
    label: 'Correo electrónico',
    align: 'center'
  },
  { data: 'password', label: 'Contraseña', align: 'center' },

  { data: 'active', label: 'Activo', align: 'center' },
  { data: 'acciones', label: 'Acciones', align: 'center' }
];

export const rows = ({ users = [], actions }) => {
  let data = users.map((it, index) => {
    // const celdas = ({
    //   children,
    //   align = 'left',
    //   celda = false,
    //   last = false
    // }) => (
    //   <TableCell style={{ paddingBottom: '0px', paddingTop: '0px' }}>
    //     <Box
    //       style={{
    //         backgroundColor: 'rgba(84, 193, 255, 0.1)',
    //         marginTop: '5px',
    //         marginBottom: '5px',
    //         height: '100%',
    //         height: '60px',
    //         borderTopLeftRadius: celda ? '10px' : '',
    //         borderBottomLeftRadius: celda ? '10px' : '',
    //         borderTopRightRadius: last ? '10px' : '',
    //         borderBottomRightRadius: last ? '10px' : '',
    //         display: 'flex',
    //         justifyContent: align,
    //         alignItems: 'center'
    //       }}>
    //   {children}
    //     </Box>
    //   </TableCell>
    // );

    const acciones = (item) => (
      <Flex>
        {/* <Box>
          <a
            style={{ textAlign: 'center' }}
            href='#!'
            onClick={() => actions.edit(item)}>
            {svgEdit}
          </a>
        </Box>
        <SizeBox /> */}
        <Box>
          <a
            style={{ textAlign: 'center' }}
            href='#'
            onClick={() => actions.delete(item.user_id)}>
            {Trash}
          </a>
        </Box>
      </Flex>
    );
    return {
      numero: index + 1,
      nombre: (
        <HStack>
          <Typography>{it.first_name ?? ''}</Typography>
          <Typography>{it.last_name ?? ''}</Typography>
        </HStack>
      ),
      role: it.role.roleName,
      email: it.email,
      password: it.password,
      active: (
        <CVSwitch
          variant='capsule'
          yesColor='primary'
          value={it.active}
          onChange={(value) =>
            actions.active({ ...it, role: it?.role?.roleID || '' }, value)
          }
        />
      ),
      acciones: acciones(it),
      borderColor: it.active ? 'primary' : 'gray'
    };
  });
  return data;
};

export const lista = [
  {
    user_id: 'ew345sert',
    first_name: 'Jhon',
    last_name: 'Doe',
    role: 'Gestor de Productos',
    email: 'juanito@ac.com',
    password: '12312323',
    active: true
  },
  {
    user_id: 'sdrrfgh678678f',
    first_name: 'Jhon',
    last_name: 'Doe',
    role: 'Gestor de Productos',
    email: 'juanito@ac.com',
    password: '12312323',
    active: true
  },
  {
    user_id: 'ew345ssdfdfhert',
    first_name: 'Jhon',
    last_name: 'Doe',
    role: 'Gestor de Productos',
    email: 'juanito@ac.com',
    password: '12312323',
    active: true
  },
  {
    user_id: 'ew345sfghf678ghert',
    first_name: 'Jhon',
    last_name: 'Doe',
    role: 'Gestor de Productos',
    email: 'juanito@ac.com',
    password: '12312323',
    active: false
  }
];
