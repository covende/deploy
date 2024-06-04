import React, { useEffect, useState } from 'react';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { Box, HStack, Stack, Flex } from '@chakra-ui/layout';
import { useDisclosure, useToast } from '@chakra-ui/react/';

import { Skeleton } from '@chakra-ui/skeleton';
import { TreeView } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton } from '@/common/CovendeTemplate';
import { DELETE_MENU, GET_MENUS } from '@CVApi/core/webbo/categoriasBo';
import { Eye, PencilAltIcon, Trash } from '@/app/assets/icons/index';
import { TreeItem } from '@/../node_modules/@material-ui/lab/index';
import { Botones } from '../arborescencia-de-categorias/components/CustomTable';
import { Chip } from '@/../node_modules/@material-ui/core/index';
import CVImage from '@CVTemplate/core/CVImage';
import AddMenuModal from './modals/AddMenuModal';
import ModalDelete from '../faq/components/ModalDelete';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import { Refresh } from '@/../node_modules/@material-ui/icons/index';
import { getIcons } from './getIcons';
import useGetPermisions from '@/common/hooks/useGetPermisions';

function MenusCategori({ type, ndx }) {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isRefresh, setIsRefresh] = useState(false);
  const [parentID, setParentID] = useState('');
  const [item, setItem] = useState({});
  const [menuID, setMenuID] = useState('');
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const addToast = useToast();

  const valueInitial = { value: '', isValid: null };
  const [menuName, setMenuName] = useState(valueInitial);
  const [aliasMenu, setAliasMenu] = useState(valueInitial);
  const [icon, setIcon] = useState(valueInitial);
  const [idPlataform, setIdPlataform] = useState(valueInitial);
  const [dashboard, setDashboard] = useState(valueInitial);
  const [positionMenu, setPositionMenu] = useState(valueInitial);
  const permisionsMenu = useGetPermisions('Backoffice', 'Menus');
  console.log({ ndx });
  const fetchMenus = async () => {
    let { menus } = await AxiosGQL(GET_MENUS(type));
    setMenus(menus);
  };
  useEffect(() => {
    fetchMenus();
  }, [isRefresh]);

  useEffect(() => {
    if (setConfirmDelete) {
      AxiosGQL(DELETE_MENU({ menuID }))
        .then(({ deleteMenu }) => {
          if (deleteMenu.status == true) {
            CVAlertSuccess({
              addToast,
              message: `Menu eliminado correctamente.`
            });
            setConfirmDelete(false);
            setMenuID('');
            setIsRefresh(!isRefresh);
          } else if (deleteMenu.status == false && deleteMenu.menu != null) {
            CVAlertError({
              addToast,
              message: `No se puede eliminar este menu.`
            });
            setConfirmDelete(false);
            setMenuID('');
          }
        })
        .catch((err) => {
          CVAlertError({
            addToast,
            message: `Sucedió algo inesperado`
          });
        });
    }
  }, [confirmDelete]);

  const renderTree = (nodes) => {
    const categoríesArborecencia = [
      {
        icon: Eye,
        permision: permisionsMenu.ver,
        title: 'Ver Subcategoría'
        // onClick: () => console.log('hello')
      },
      {
        icon: PencilAltIcon,
        title: 'Editar Menu',
        permision: permisionsMenu.editar,
        onClick: () => {
          setItem(nodes);
          onOpen();
          setMenuName({ ...menuName, value: nodes.menuName });
          setAliasMenu({ ...aliasMenu, value: nodes.menuSlug });
          setIcon({ ...icon, value: nodes.icon });
          setIdPlataform({ ...idPlataform, value: nodes.platformID });
          setDashboard({ ...dashboard, value: nodes.typeDashboard });
          setPositionMenu({ ...positionMenu, value: nodes.position });
        }
      },
      {
        icon: Trash,
        title: 'Eliminar Menu',
        permision: permisionsMenu.eliminar,
        onClick: () => {
          setOpen(true);
          setMenuID(nodes.menuID);
        }
      }
    ];
    // console.log('permisosMenus', permisionsMenu);
    return (
      <TreeItem
        key={nodes.menuID}
        nodeId={nodes.menuID}
        label={
          <Box
            marginBottom='0.5rem'
            display='flex'
            backgroundColor={'#FFFFFF'}
            justifyContent='space-between'
            alignItems='center'>
            <Box display='flex' alignItems='center'>
              <Botones
                item={nodes}
                categories={categoríesArborecencia}
                addCategorie={() => {
                  setParentID(nodes.menuID);
                  onOpen();
                }}
                add={
                  nodes.parentID != '' || !permisionsMenu.crear ? false : true
                }
              />
              <Flex w='3rem' justify='center'>
                {getIcons(nodes.icon)}{' '}
              </Flex>{' '}
              {nodes.menuName}{' '}
            </Box>
            {/* {!nodes.status ? (
              <Chip
                label='eliminado'
                color='secondary'
                style={{ height: '1.5rem' }}
              />
            ) : (
              ''
            )} */}
          </Box>
        }>
        {Array.isArray(nodes?.children || null)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
    );
  };

  const getChildren = () => {
    const children = menus.filter((menu) => menu.parentID !== '');
    const fathers = menus.filter((menu) => menu.parentID === '');

    let group = fathers.map((father) =>
      children.filter((child) => child.parentID == father.menuID)
    );
    // console.log({ group });
    group.map((el, ndx) => {
      if (el != []) {
        fathers[ndx] = { ...fathers[ndx], children: el };
      }
    });
    return fathers;
  };

  useEffect(() => {
    getChildren();
  }, [menus]);

  return loading ? (
    <Stack>
      <Skeleton height='20px' />
      <Skeleton height='20px' />
      <Skeleton height='20px' />
    </Stack>
  ) : (
    <Box>
      <CVButton onClick={onOpen}>Agregar Menu</CVButton>
      <SizeBox />
      <Box bg='white' borderRadius='10px' padding='10px'>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpanded={['root']}
          defaultExpandIcon={<ChevronRightIcon />}>
          {getChildren().map((item) => renderTree(item))}
        </TreeView>
      </Box>
      <AddMenuModal
        isOpen={isOpen}
        onClose={onClose}
        setIsRefresh={setIsRefresh}
        isRefresh={isRefresh}
        parentID={parentID}
        index={ndx}
        setParentID={setParentID}
        item={item}
        setItem={setItem}
        menuName={menuName}
        aliasMenu={aliasMenu}
        icon={icon}
        idPlataform={idPlataform}
        dashboard={dashboard}
        positionMenu={positionMenu}
        {...{
          setMenuName,
          setAliasMenu,
          setIcon,
          setIdPlataform,
          setDashboard,
          setPositionMenu,
          valueInitial
        }}
      />
      <ModalDelete
        setConfirmDelete={setConfirmDelete}
        isOpen={open}
        onClose={() => setOpen(!open)}
        title='Menu'
      />
    </Box>
  );
}

export default MenusCategori;
