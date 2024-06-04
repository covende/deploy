import {
  addCategoryProduct,
  editCategoryProduct
} from '@/app/api/graphql/categories/services/categoryservice';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import {
  CVButton,
  CVImage,
  CVInput,
  CVInputImage,
  CVModal,
  CVSwitch,
  CVText
} from '@/common/CovendeTemplate';
import { CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import { IMAGESIZE } from '@/common/CovendeTemplate/CVThemes';
import { Box, Flex } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { useToast } from '@chakra-ui/toast';
import { Grid } from '@material-ui/core';
import arrayToTree from 'array-to-tree';
import React, { useEffect, useState } from 'react';
import { IoReload } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { A_CATEGORYPRODUCTS } from '../redux/Action';
import { initstate } from './CustomTable';

function CustomModal({ isOpen, onClose, permisions }) {
  const addToast = useToast();
  const { parent_id, categorys, _id } = useSelector(
    (state) => state.CategoryProducts
  );
  const [category, setCategory] = useState({
    ...initstate,
    parent_id: parent_id,
    _id: _id
  });
  const [crop, setCrop] = useState(false);
  const [size, setSize] = useState({});

  const [loading, setLoading] = useState(false);
  const [param, setparam] = useState('image');

  const dispatch = useDispatch();

  const maketree = (data) => {
    const tree = arrayToTree(data, {
      parentProperty: 'parent_id',
      customID: '_id'
    });
    dispatch(A_CATEGORYPRODUCTS({ treecategorys: tree }));
  };

  const onSubmit = async () => {
    setLoading(true);
    let cats = [...categorys];
    let data;
    if (category._id != '') {
      data = await editCategoryProduct(category);
      cats = cats.map((da) => {
        if (da._id == category._id) {
          da = { ...category };
        }
        return da;
      });
    } else {
      data = await addCategoryProduct(category);
      cats.push(data);
    }
    if (data != null) {
      CVAlertSuccess({
        addToast,
        message:
          category._id != ''
            ? 'Actualizado Correctamente'
            : 'Creado Correctamente'
      });
    }
    setCategory({ ...initstate });
    setLoading(false);
    dispatch(A_CATEGORYPRODUCTS({ categorys: cats, _id: '', parent_id: '' }));
    maketree(cats);
    onClose();
  };
  /**********************************************/

  const initdata = () => {
    !_id && setCategory({ ...initstate });
    let s_image = IMAGESIZE['CATEGORYPRODUCT_ICONO'].split(',');
    let s_slider = IMAGESIZE['CATEGORYPRODUCT_SLIDER'].split(',');
    let s_banner = IMAGESIZE['CATEGORYPRODUCT_BANNER'].split(',');
    let s_logo = IMAGESIZE['CATEGORYPRODUCT_LOGO'].split(',');
    setSize({
      image: { width: s_image[0], height: s_image[1], attr: s_image[2] },
      slider: { width: s_slider[0], height: s_slider[1], attr: s_slider[2] },
      banner: { width: s_banner[0], height: s_banner[1], attr: s_banner[2] },
      logo: { width: s_logo[0], height: s_logo[1], attr: s_logo[2] }
    });

    if (_id != '') {
      let ls = [...categorys];
      ls = ls.filter((da) => da._id == _id);
      setCategory({ ...ls[0] });
    }

    if (parent_id != '' && _id == '') {
      setCategory({ ...initstate, parent_id: parent_id });
    }
  };
  const loadimage = (params) => {
    setparam(params);
    setCrop(!crop);
  };
  const setimage = (img) => {
    let cat = { ...category, [param]: img };
    setCategory(cat);
    setCrop(!crop);
  };
  useEffect(() => {
    initdata();
  }, [_id, parent_id]);

  const ImageModal = ({ param }) => (
    <Box position='relative'>
      <CVImage
        height='100px'
        width='auto'
        image={
          category[param] ||
          'https://via.placeholder.com/' +
            size[param].width +
            'x' +
            size[param].height
        }
      />
      <Box
        top='0'
        left='0'
        position='absolute'
        margin='0.25rem'
        onClick={() => loadimage(param)}>
        <CVButton>
          <IoReload />
        </CVButton>
      </Box>
    </Box>
  );

  return (
    <CVModal
      size='2xl'
      isOpen={isOpen}
      onClose={onClose}
      header={(_id != '' ? 'Editar ' : 'Agregar  ') + 'Categoria'}
      footer={
        <Flex width='100%' justifyContent='center'>
          <CVButton onClick={onClose} backgroundColor='red' width='150px'>
            Cancelar
          </CVButton>
          <SizeBox />
          <CVButton width='150px' onClick={() => onSubmit()} disabled={loading}>
            {loading ? <Spinner /> : _id != '' ? 'Editar' : 'Guardar'}
          </CVButton>
        </Flex>
      }>
      <Grid container spacing={1}>
        <Grid item xs={4} sm={4} md={4}>
          <CVText color='blue'>Nombre:</CVText>
        </Grid>
        <Grid item xs={8} sm={8} md={8}>
          <CVInput
            value={category.name}
            onChange={(value) => setCategory({ ...category, name: value })}
            placeholder='Ingrese nombre del categoria'
          />
        </Grid>

        <Grid item xs={4} sm={4} md={4}>
          <CVText color='blue'>Slug:</CVText>
        </Grid>
        <Grid item xs={8} sm={8} md={8}>
          <CVInput
            value={category.slug}
            onChange={(value) => setCategory({ ...category, slug: value })}
            placeholder='Ingrese nombre del categoria'
          />
        </Grid>

        <Grid item xs={4} sm={4} md={4}>
          <CVText color='blue'>Descripción:</CVText>
        </Grid>
        <Grid item xs={8} sm={8} md={8}>
          <CVInput
            value={category.description}
            onChange={(value) =>
              setCategory({ ...category, description: value })
            }
            placeholder='Ingrese nombre del categoria'
          />
        </Grid>

        <Grid item xs={4} sm={4} md={4}>
          <CVText color='blue'>Ícono:</CVText>
        </Grid>
        <Grid item xs={8} sm={8} md={8}>
          <ImageModal param='image' />
        </Grid>

        <Grid item xs={4} sm={4} md={4}>
          <CVText color='blue'>Image para ofertas:</CVText>
        </Grid>
        <Grid item xs={8} sm={8} md={8}>
          <ImageModal param='slider' />
        </Grid>

        <Grid item xs={4} sm={4} md={4}>
          <CVText color='blue'>Banner:</CVText>
        </Grid>
        <Grid item xs={8} sm={8} md={8}>
          <ImageModal param='banner' />
        </Grid>

        <Grid item xs={4} sm={4} md={4}>
          <CVText color='blue'>Logo:</CVText>
        </Grid>
        <Grid item xs={8} sm={8} md={8}>
          <ImageModal param='logo' />
        </Grid>

        <Grid item xs={4} sm={4} md={4}>
          <CVText color='blue'>Permite Devolución</CVText>
        </Grid>
        <Grid item xs={8} sm={8} md={8}>
          <CVSwitch
            variant='option'
            value={category.allow_return}
            onChange={(value) =>
              setCategory({ ...category, allow_return: value })
            }
          />
        </Grid>
      </Grid>

      {crop && (
        <CVInputImage
          size={size[param]}
          isOpen={crop}
          onClose={() => setCrop(!crop)}
          callback={setimage}
        />
      )}
    </CVModal>
  );
}

export default CustomModal;
