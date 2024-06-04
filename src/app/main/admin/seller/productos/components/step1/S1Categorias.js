import { categoryProductsList } from '@/app/api/graphql/categories/services/categoryservice';
import { Flex, Spacer } from '@chakra-ui/layout';
import { useDisclosure } from '@chakra-ui/react';
import {
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  TextField
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import arrayToTree from 'array-to-tree';
import {
  ChildrenCategory,
  ParentsCategory,
  ProductSubTitle
} from '../../ProductsStyle';
import { v4 } from 'uuid';
import { CVButton, CVInput } from '@/common/CovendeTemplate';
import RequestNewCategory from '../modales/RequestNewCategory';
import { CVListSort } from '@CVTemplate/core/CVMethods';
import CVText from '@CVTemplate/core/CVText';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { BsTrash } from 'react-icons/bs';

function S1Categorias({
  categorys,
  treecategorys,
  categorias,
  setProducto,
  setCategory,
  product_id,
  onlyCharge,
  grandpa,
  setGrandpa,
  multi = false
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [children, setChildren] = useState([]);

  const gallselected = (it) => {
    if (it.parent_id != '') {
      let ff = categorys.filter((da) => da._id == it.parent_id);
      if (ff.length > 0) {
        return [it, ...gallselected(ff[0])];
      } else {
        return [it];
      }
    }
    return [it];
  };
  const seleccionados = (it) => {
    let cc = gallselected(it);
    treecategorys.forEach((element) => {
      if (cc[cc.length - 1]._id == element._id) {
        setChildren(element.children || []);
      }
    });
    setProducto({ categorias: [...cc.reverse()] });

    let add = true;
    if (multi) {
      let existCat = [...grandpa].find((cat) => cat._id == it._id);
      if (existCat) add = false;
    }

    if (!add) return;

    setGrandpa([
      ...grandpa,
      {
        cod: grandpa.length + 1,
        id: it.custom_id,
        name: it.name,
        parent_id: it.parent_id,
        _id: it._id,
        path_full_name: [...cc].map((ct) => ct.name).join(' > ')
      }
    ]);
  };

  const isselected = (id) => {
    let isx = categorias.filter((da) => da._id == id);
    return isx.length != 0;
  };

  const initdata = async () => {
    let data = categorys || [];
    let tree = treecategorys || [];
    if (categorys.length == 0) data = await categoryProductsList(true);
    if (treecategorys.length == 0)
      tree = arrayToTree(data, {
        parentProperty: 'parent_id',
        customID: '_id'
      });

    let cc = [...categorias];
    if (cc.length > 0) {
      tree.forEach((element) => {
        if (cc[0]._id == element._id) {
          setChildren(element.children || []);
        }
      });
    }
    setCategory({ treecategorys: tree, categorys: data });
  };

  const resultcat = [...categorias].map((op) => op.name).join(' > ');

  const borrar = (id) => {
    setGrandpa(grandpa.filter((data) => data.cod !== id));
  };

  useEffect(() => {
    initdata();
  }, [categorias, product_id]);

  const ResultFind = React.memo(({ _categorys, _resultcat }) => {
    return (
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5} md={4}>
            <Autocomplete
              id='tags-standard'
              options={_categorys}
              getOptionLabel={(option) => option.name}
              getOptionSelected={(option, value) => option._id === value._id}
              onChange={(e, v) => (v != null ? seleccionados(v) : {})}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='standard'
                  placeholder='Buscar Categoria'
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={7} md={8}>
            <CVInput readOnly={true} value={_resultcat} onChange={() => {}} />
          </Grid>
        </Grid>
      </Box>
    );
  });

  const ResultMultiSelected = () => {
    return (
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={3}>
            <CVText fontSize='1.8rem' color='red' fontWeight='bold'>
              Categoría seleccionada
            </CVText>
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            {grandpa.map((it) => (
              <Flex key={v4()}>
                <Box>{it.path_full_name || ''}</Box>
                <Spacer />
                <BsTrash onClick={() => borrar(it.cod)} />
              </Flex>
            ))}
          </Grid>
        </Grid>
      </Box>
    );
  };

  const ResultFinder = () => {
    return (
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={4}>
            <CVText fontSize='1.8rem' color='red' fontWeight='bold'>
              Categoría seleccionada
            </CVText>
          </Grid>
          <Grid item xs={12} sm={8} md={8}>
            {grandpa.map((it) => (
              <Flex w='20rem'>
                <Box>{it.id}</Box>
                <Spacer />
                <Box>{it.name}</Box>
                <Spacer />
                <BsTrash onClick={() => borrar(it.cod)} />
              </Flex>
            ))}
          </Grid>
        </Grid>
      </Box>
    );
  };

  const MemoParent = React.memo(({ it }) => {
    return (
      <ListItem
        style={{ paddingTop: '0px', paddingBottom: '0px' }}
        onClick={() => seleccionados(it)}>
        <Button
          style={{
            width: '100%',
            textTransform: 'capitalize',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
          <CVText color={isselected(it._id) ? 'primary' : 'black'}>
            {it.name}
          </CVText>
        </Button>
      </ListItem>
    );
  });

  const ParentCategory = ({ _treecategorys }) => {
    const ___treecategorys = CVListSort({ lista: _treecategorys, key: 'name' });
    return (
      <ParentsCategory>
        <List>
          {___treecategorys.map((it) => (
            <MemoParent it={it} key={v4()} />
          ))}
        </List>
      </ParentsCategory>
    );
  };

  const MemoChildren = React.memo(({ ot }) => {
    return (
      <ListItem
        style={{
          paddingTop: '0px',
          paddingBottom: '0px'
        }}>
        <Button
          style={{
            width: '100%',
            textTransform: 'capitalize'
          }}
          onClick={() => seleccionados(ot)}>
          <CVText color={isselected(ot._id) ? 'primary' : 'black'}>
            {ot.name}
          </CVText>
        </Button>
      </ListItem>
    );
  });

  const ChildCategory = React.memo(({ _children }) => {
    const ___children = CVListSort({ lista: _children, key: 'name' });

    return (
      <ChildrenCategory>
        <Grid container spacing={2}>
          {___children.map((it) => (
            <Grid item xs={12} sm={6} md={4} key={v4()}>
              <CVText>
                <Button
                  style={{ width: '100%', textTransform: 'capitalize' }}
                  onClick={() => seleccionados(it)}>
                  <CVText
                    fontWeight='bold'
                    color={isselected(it._id) ? 'primary' : 'black'}>
                    {it.name}
                  </CVText>
                </Button>
              </CVText>
              <List>
                {it.children ? (
                  CVListSort({ lista: it.children, key: 'name' }).map((ot) => (
                    <MemoChildren key={v4()} ot={ot} />
                  ))
                ) : (
                  <></>
                )}
              </List>
            </Grid>
          ))}
        </Grid>
      </ChildrenCategory>
    );
  });

  return (
    <Box>
      {!onlyCharge && !multi && (
        <ProductSubTitle>1.1 Categoría de Producto</ProductSubTitle>
      )}
      <Container>
        {!onlyCharge && !multi && (
          <CVText color='boldGray'>
            Busca la categoría a la que pertenece tu producto y selecciona para
            continuar.
          </CVText>
        )}

        <SizeBox />
        {!onlyCharge && !multi && (
          <ResultFind _categorys={categorys} _resultcat={resultcat} />
        )}
        <Grid container style={{ marginBottom: '2rem', marginTop: '2rem' }}>
          <Grid item xs={12} sm={6} md={3}>
            <ParentCategory _treecategorys={treecategorys} />
          </Grid>
          <Grid item xs={12} sm={6} md={9}>
            <ChildCategory _children={children} />
          </Grid>
        </Grid>
        {onlyCharge && <ResultFinder />}
        {multi && <ResultMultiSelected />}
      </Container>
      <Flex mr={10}>
        <Spacer />
        {/* <CVButton
          onClick={() => onOpen()}
          backgroundColor={onlyCharge ? 'gray' : 'green'}>
          Solicitar nueva categoría{' '}
        </CVButton> */}
      </Flex>
      <RequestNewCategory
        onClose={onClose}
        isOpen={isOpen}
        _resultcat={resultcat}
      />
    </Box>
  );
}

export default React.memo(S1Categorias);
