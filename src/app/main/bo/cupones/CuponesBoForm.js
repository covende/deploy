import { categoryProductsList } from '@/app/api/graphql/categories/services/categoryservice';
import {
  add_coupon,
  coupon_by_id,
  edit_coupon
} from '@/app/api/graphql/webcoupon/WCouponService';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVPanel, CVText } from '@/common/CovendeTemplate';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import { Box, Flex } from '@chakra-ui/layout';
import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useToast } from '@chakra-ui/toast';
import CBOAdicionales from './formulario/CBOAdicionales';
import CBOAplicable from './formulario/CBOAplicable';
import CBODatosCupon from './formulario/CBODatosCupon';

function CuponesBoForm() {
  const { id } = useParams();
  const [loading, setloading] = useState(false);
  const addToast = useToast();
  const [message, setmessage] = useState('Cancelar');

  const [allcategories, setallcategories] = useState([]);
  const [allstores, setallstores] = useState([]);
  const [allproducts, setallproducts] = useState([]);

  const [datos, setdatos] = useState({
    nombre: '',
    description: '',
    tipo: 'FIXED',
    valor: '',
    daterange: [new Date(), new Date()],
    maxuse: '',
    maxuse_foruser: ''
  });

  /*
  subscription_plans
  products_all
  selected
  */

  const [aplicable, setaplicable] = useState({
    aplicate: 'products_all',
    onlycategorys: [],
    onlystores: [],
    onlyproducts: []
  });

  const [adicionals, setadicionals] = useState({
    minimiun: '1',
    inOffers: false
  });

  const savecoupon = async () => {
    let errors = false;
    if (datos.nombre.length < 8) {
      CVAlertError({
        addToast,
        message: 'Nombre de Cupón es obligatorio, minimo 8 caracteres'
      });
      errors = true;
    }
    if (adicionals.minimiun.length == 0 || eval(adicionals.minimiun) < 1) {
      CVAlertError({ addToast, message: 'Monto Mínimo debe ser mayor a 1' });
      errors = true;
    }
    if (datos.maxuse.length == 0 || eval(datos.maxuse) < 1) {
      CVAlertError({ addToast, message: 'Todal de Usos debe ser mayor a 1' });
      errors = true;
    }
    if (datos.valor.length == 0 || eval(datos.valor) < 1) {
      CVAlertError({ addToast, message: 'Valor debe ser mayor a 1' });
      errors = true;
    }
    if (datos.maxuse_foruser.length == 0 || eval(datos.maxuse_foruser) < 1) {
      CVAlertError({
        addToast,
        message: 'Usos por Usuario debe ser mayor a 1'
      });
      errors = true;
    }
    if (errors) {
      return false;
    }

    let data = {
      coupon_id: id,
      name: datos.nombre,
      discount_type: datos.tipo,
      discount: datos.valor,
      start_date: datos.daterange[0].toISOString(),
      expiration_date: datos.daterange[1].toISOString(),
      maximum_uses: datos.maxuse,
      users_uses: datos.maxuse_foruser,
      aplicable: aplicable.aplicate,
      categories_ids: aplicable.onlycategorys.map((item) => item.value),
      stores_ids: aplicable.onlystores,
      products_ids: aplicable.onlyproducts,
      apply_in_offers: adicionals.inOffers,
      minimum_amount: adicionals.minimiun
    };
    setloading(true);
    let result = { status: false, message: '' };
    if (id != 'create') {
      result = await edit_coupon(data);
    } else {
      result = await add_coupon(data);
    }
    setloading(false);
    if (result.status) {
      CVAlertSuccess({
        addToast,
        message:
          id != 'create' ? 'Actualizado Correctamente' : 'Creado Correctamente'
      });
      setmessage('Volver');
    } else {
      CVAlertError({ addToast, message: result.message });
    }
  };

  const initdata = async (cats) => {
    const res = await coupon_by_id(id);
    setdatos({
      ...datos,
      nombre: res.name,
      description: '',
      tipo: res.discount_type,
      valor: res.discount,
      daterange: [new Date(res.start_date), new Date(res.expiration_date)],
      maxuse: res.maximum_uses,
      maxuse_foruser: res.users_uses
    });

    let categories = allcategories.length > 0 ? allcategories : cats;

    categories = categories.filter((item) =>
      res.categories_ids.includes(item._id)
    );

    categories = categories.map((item) => ({
      value: item._id,
      text: item.name
    }));

    let stores = (res.stores_ids || []).map((item) => ({
      value: item,
      text: item
    }));

    let products = (res.products_ids || []).map((item) => ({
      value: item,
      text: item
    }));

    setaplicable({
      ...aplicable,
      aplicate: res.aplicable,
      onlycategorys: categories,
      onlystores: stores,
      onlyproducts: products
    });
    setadicionals({
      ...adicionals,
      minimiun: res.minimum_amount,
      inOffers: res.apply_in_offers
    });
  };
  const loadcombos = async () => {
    const cats = await categoryProductsList(true);
    setallcategories(cats);
    if (id != 'create') {
      initdata(cats);
    }
  };

  useEffect(() => {
    loadcombos();
  }, [id]);

  return (
    <Container>
      <CVText color='blue' fontSize='1.5rem' fontWeight='bold'>
        Cupones
      </CVText>
      <SizeBox />
      <CVPanel itemDirection='column' padding='2rem'>
        <CBODatosCupon datos={datos} setdatos={setdatos} />
        <SizeBox />
        <CBOAplicable
          aplicable={aplicable}
          setaplicable={setaplicable}
          allcategories={allcategories}
          allstores={allstores}
          allproducts={allproducts}
          setallstores={setallstores}
          setallproducts={setallproducts}
        />
        <SizeBox />
        <CBOAdicionales adicionals={adicionals} setadicionals={setadicionals} />
        <SizeBox />
        <Flex justifyContent='center' width='100%'>
          <Box>
            <CVButton
              disabled={loading}
              backgroundColor='red'
              onClick={() => history.back()}>
              {message}
            </CVButton>
          </Box>
          <SizeBox />
          <Box>
            <CVButton
              onClick={() => savecoupon()}
              isLoading={loading}
              disabled={loading}>
              {id == 'create' ? 'Guardar' : 'Actualizar'}
            </CVButton>
          </Box>
        </Flex>
        <SizeBox />
      </CVPanel>
    </Container>
  );
}

export default CuponesBoForm;
