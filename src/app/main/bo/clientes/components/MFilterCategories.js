import { CVButton, CVModal } from '@/common/CovendeTemplate';
import { Box, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Categorias from './../../../admin/seller/productos/components/step1/S1Categorias';
import { A_CATEGORYPRODUCTS } from '../../arborescencia-de-categorias/redux/Action';
import { A_PRODUCTVIEW } from '@CVPages/core/admin/seller/productos/redux/ProductViewAction';

function MFilterCategories({ isOpen, onClose, categories, setCategories }) {
  const dispatch = useDispatch();
  const { categorys, treecategorys } = useSelector(
    (state) => state.CategoryProducts
  );

  const { categorias, product } = useSelector((state) => state.ProductView);
  const setProducto = (data) => dispatch(A_PRODUCTVIEW({ ...data }));
  const setCategory = (data) => dispatch(A_CATEGORYPRODUCTS({ ...data }));
  const [grandpa, setGrandpa] = useState([]);

  useEffect(() => {
    if (categories?.length == 0) setGrandpa([]);
  }, [categories]);

  const process = () => {
    setCategories(grandpa.map((cat) => cat._id));
    onClose();
  };

  return (
    <CVModal
      size='5xl'
      isOpen={isOpen}
      onClose={onClose}
      bgHeader='primary'
      header='Lista de categorías'
      colorHeader='white'
      footer={
        <Flex width='100%' justifyContent='center'>
          <Box>
            <CVButton onClick={process}>FILTRAR</CVButton>
          </Box>
        </Flex>
      }>
      <Box overflowY='auto' height='600px' width='100%' flexDirection='row'>
        <Categorias
          setProducto={setProducto}
          categorias={categorias}
          categorys={categorys}
          treecategorys={treecategorys}
          setCategory={setCategory}
          product_id={product.product_id}
          grandpa={grandpa}
          setGrandpa={setGrandpa}
          multi={true}
        />
      </Box>
    </CVModal>
  );
}

export default MFilterCategories;
