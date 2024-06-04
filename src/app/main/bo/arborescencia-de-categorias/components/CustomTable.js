import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import arrayToTree from 'array-to-tree';
import {
  categoryProductsList,
  deleteCategoryProduct
} from '@/app/api/graphql/categories/services/categoryservice';
import { A_CATEGORYPRODUCTS } from '../redux/Action';
import { Box, HStack, Stack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';

import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { Portal } from '@chakra-ui/portal';
import { Skeleton } from '@chakra-ui/skeleton';
import { Chip, Grid } from '@material-ui/core';
import { TreeItem, TreeView } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVImage } from '@/common/CovendeTemplate';
import { Eye, PencilAltIcon, plus, Trash } from '@/app/assets/icons';
import { FaEllipsisV } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

export const initstate = {
  _id: '',
  name: '',
  parent_id: '',
  slug: '',
  description: '',
  image: '',
  percent: 0,
  mimimun: 1,
  datestart: new Date(),
  dateends: new Date(),
  slider: '',
  banner: '',
  allow_return: false
};

export const Botones = ({ item, categories, addCategorie, add = true }) => (
  <HStack>
    <Menu variant='button'>
      <MenuButton width='40px'>
        <FaEllipsisV />
      </MenuButton>
      <MenuList>
        {categories.map(
          (categorie, ndx) =>
            categorie.permision && (
              <MenuItem key={categorie.title} onClick={categorie.onClick}>
                {categorie.icon} &nbsp; &nbsp; {categorie.title}
              </MenuItem>
            )
        )}
        {/* <MenuItem onClick={() => viewsubcategoria(item)}>
          {Eye} &nbsp; &nbsp; Ver Subcategoría
        </MenuItem>
        <MenuItem onClick={() => editsubcategoria(item)}>
          {PencilAltIcon} &nbsp; &nbsp; Editar Categoría
        </MenuItem>
        <MenuItem onClick={() => trashsubcategoria(item)}>
          {Trash} &nbsp; &nbsp; Eliminar Categoría
        </MenuItem> */}
      </MenuList>
    </Menu>
    {add == true ? <Button onClick={addCategorie}>{plus}</Button> : ''}
  </HStack>
);

function CustomTable({ onOpen, permisions }) {
  const { categorys, treecategorys } = useSelector(
    (state) => state.CategoryProducts
  );
  const [allcats, setAllcats] = useState([]);
  const [selected, setSelected] = useState('');
  const [subcategorys, setSubcategorys] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const maketree = (data) => {
    const tree = arrayToTree(data, {
      parentProperty: 'parent_id',
      customID: '_id'
    });
    dispatch(A_CATEGORYPRODUCTS({ treecategorys: [...tree] }));
  };

  const editsubcategoria = (item) => {
    dispatch(A_CATEGORYPRODUCTS({ _id: item._id }));
    onOpen();
  };
  const viewsubcategoria = (item) => {
    setSelected(item._id);
    setSubcategorys(item.children ?? []);
  };
  const trashsubcategoria = async (item) => {
    await deleteCategoryProduct(item);
    let ff = [...categorys];
    ff = [...ff.filter((da) => da._id != item._id)];
    dispatch(
      A_CATEGORYPRODUCTS({
        categorys: ff
      })
    );
    maketree(ff);
  };
  const addsubcategoria = (item) => {
    dispatch(A_CATEGORYPRODUCTS({ parent_id: item._id, _id: '' }));
    setSelected(item._id);
    onOpen();
  };

  const initdata = async () => {
    const data = await categoryProductsList(true);
    dispatch(A_CATEGORYPRODUCTS({ categorys: [...data] }));
    maketree([...data]);
    setLoading(false);
  };

  useEffect(() => {
    initdata();
  }, []);

  useEffect(() => {
    setAllcats(treecategorys);
  }, [treecategorys, categorys]);

  const renderTree = (nodes) => {
    const categoríesArborecencia = [
      {
        icon: Eye,
        title: 'Ver Subcategoría',
        permision: permisions.ver,
        onClick: () => viewsubcategoria(nodes)
      },
      {
        icon: PencilAltIcon,
        title: 'Editar Categoría',
        permision: permisions.editar,
        onClick: () => editsubcategoria(nodes)
      },
      {
        icon: Trash,
        title: 'Eliminar Categoría',
        permision: permisions.eliminar,
        onClick: () => trashsubcategoria(nodes)
      }
    ];

    // console.log({allcats})
    return (
      <TreeItem
        key={nodes._id}
        nodeId={nodes._id}
        label={
          <Box
            marginBottom='0.5rem'
            display='flex'
            backgroundColor={!nodes.status ? '#f5005720' : '#FFFFFF'}
            justifyContent='space-between'
            alignItems='center'>
            <Box display='flex' alignItems='center'>
              <Botones
                permisions={permisions}
                item={nodes}
                add={permisions.crear}
                categories={categoríesArborecencia}
                addCategorie={() => addsubcategoria(nodes)}
              />
              <CVImage image={nodes.image} width='40px' height='40px' />{' '}
              {nodes.name}{' '}
            </Box>
            {!nodes.status ? (
              <Chip
                label='eliminado'
                color='secondary'
                style={{ height: '1.5rem' }}
              />
            ) : (
              ''
            )}
          </Box>
        }>
        {Array.isArray(nodes?.children || null)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
    );
  };

  return loading ? (
    <Stack>
      <Skeleton height='20px' />
      <Skeleton height='20px' />
      <Skeleton height='20px' />
    </Stack>
  ) : (
    <Box>
      {permisions.crear && (
        <Flex justifyContent='space-between'>
          <CVButton onClick={() => onOpen()}>Agregar Categoria</CVButton>

          <Link to='/bo/arborescencia-de-categorias/tiendas'>
            <CVButton backgroundColor='blue'>Tiendas</CVButton>
          </Link>
        </Flex>
      )}
      <SizeBox />
      <Box bg='white' borderRadius='10px' padding='10px'>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpanded={['root']}
          defaultExpandIcon={<ChevronRightIcon />}>
          {allcats.map((item) => renderTree(item))}
        </TreeView>
      </Box>
    </Box>
  );
}

export default CustomTable;
