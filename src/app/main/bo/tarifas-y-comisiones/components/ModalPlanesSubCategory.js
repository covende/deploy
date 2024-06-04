import React from 'react';

import { Label } from '@/common/components';
import {
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Grid,
  GridItem,
  Center,
  Spinner
} from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { A_PLANCATEGORY } from '../redux/Actions';
import { A_GLOBALES } from '@/app/redux/Global/Actions';
import { useToast } from '@chakra-ui/toast';
import {
  addCategoryProduct,
  editCategoryProduct
} from '@/app/api/graphql/categories/services/categoryservice';
import arrayToTree from 'array-to-tree';
import { A_CATEGORYPRODUCTS } from '../../arborescencia-de-categorias/redux/Action';
import CVDateRangePicker from '@/common/CovendeTemplate/CVDateRangePicker';
import { CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';

// Components
function ModalPlanesSubCategory({ isOpen, onClose }) {
  const { loading } = useSelector((state) => state.Globales);
  const { roleSelected } = useSelector((state) => state.Planes);
  const { plancategorys, plansubcategory } = useSelector(
    (state) => state.PlanCategory
  );
  const { categorys, treecategorys } = useSelector(
    (state) => state.CategoryProducts
  );
  const addToast = useToast();

  const dispatch = useDispatch();

  const onChange = (dates) => {
    const [start, end] = dates;
    let subcat = { ...plansubcategory, datestart: start, dateends: end };
    dispatch(A_PLANCATEGORY({ plansubcategory: subcat }));
  };

  const setsubcategory = (e) => {
    let subcat = { ...plansubcategory, [e.target.name]: e.target.value };
    dispatch(A_PLANCATEGORY({ plansubcategory: subcat }));
  };
  /*
  const savesubcategorys = async () => {
    //let subcat = await PlansubcategoryAdd({
    let subcat = await addCategoryProduct({
      ...plansubcategory,
      role: roleSelected
    });
    let cats = [...plancategorys];
    cats = cats.map((cat) => {
      if (cat._id == subcat.idcategory) {
        let subcats = cat.children;
        subcats.push(subcat);
        cat.children = subcats;
      }
      return cat;
    });
    CVAlertSuccess({ addToast, message: 'Agregado Correctamente' });
    dispatch(
      A_PLANCATEGORY({ plancategorys: cats, plansubcategory: initialsubcats })
    );
  };

  const updatesubcategorys = async () => {
    //let subcat = await PlansubcategoryEdit({
    let subcat = await editCategoryProduct({
      ...plansubcategory,
      role: roleSelected
    });
    let cats = [...plancategorys];
    cats = cats.map((cat) => {
      if (cat._id == subcat.idcategory) {
        let subcats = cat.children;
        subcats = subcats.map((scat) => {
          if (scat._id == subcat._id) {
            scat = { ...subcat };
          }
          return scat;
        });
        cat.children = subcats;
      }
      return cat;
    });
    CVAlertSuccess({ addToast, message: 'Actualizado Correctamente' });
    dispatch(
      A_PLANCATEGORY({ plancategorys: cats, plansubcategory: initialsubcats })
    );
  };
*/
  const maketree = (data) => {
    const tree = arrayToTree(data, {
      parentProperty: 'parent_id',
      customID: '_id'
    });
    console.log({ data, tree });
    dispatch(
      A_CATEGORYPRODUCTS({ treecategorys: [...tree], categorys: [...data] })
    );
  };

  const onSubmit = async () => {
    dispatch(A_GLOBALES({ loading: true }));
    /*    if (plansubcategory._id != '') {
      await updatesubcategorys();
    } else {
      await savesubcategorys();
    }
*/
    let cats = [...categorys];
    let data;
    if (plansubcategory._id != '') {
      data = await editCategoryProduct({
        ...plansubcategory,
        percent: eval(plansubcategory.percent),
        mimimun: eval(plansubcategory.mimimun)
      });
      cats = cats.map((da) => {
        if (da._id == plansubcategory._id) {
          da = { ...plansubcategory };
        }
        return da;
      });
      console.log({ categorys });
    } else {
      data = await addCategoryProduct({
        ...plansubcategory,
        percent: eval(plansubcategory.percent),
        mimimun: eval(plansubcategory.mimimun)
      });
      cats.push(data);
    }

    CVAlertSuccess({
      addToast,
      message:
        plansubcategory._id != ''
          ? 'Actualizado Correctamente'
          : 'Agregado Correctamente'
    });

    maketree(cats);
    dispatch(A_GLOBALES({ loading: false }));
    onClose();
  };

  return (
    <Modal onClose={onClose} size='xl' isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader style={{ backgroundColor: '#00ADF6', color: '#FFFFFF' }}>
          <Center>
            {plansubcategory._id != ''
              ? ' Categoria'
              : 'Agregar Comision Categoria'}
          </Center>
        </ModalHeader>
        <ModalCloseButton style={{ color: '#FFFFFF' }} />
        <ModalBody>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}>
            <br />
            <Grid templateColumns='repeat(3, 1fr)' gap={3}>
              <GridItem w='100%' textAlign='end' alignSelf='center'>
                <Label>Nombre:</Label>
              </GridItem>
              <GridItem w='100%' colSpan={2}>
                <Input
                  type='text'
                  name='name'
                  value={plansubcategory.name}
                  onChange={(e) => setsubcategory(e)}
                  placeholder='Ingrese nombre del plan'
                  required={true}
                />
              </GridItem>
              <GridItem width='100%' textAlign='end' alignSelf='center'>
                <Label>Descripción:</Label>
              </GridItem>
              <GridItem width='100%' colSpan={2}>
                <Input
                  type='text'
                  name='description'
                  value={plansubcategory.description}
                  onChange={(e) => setsubcategory(e)}
                  placeholder='Ingrese una descripción'
                  required={true}
                />
              </GridItem>
              {/*
              <GridItem width='100%' textAlign='end' alignSelf='center'>
                <Label>Categoria:</Label>
              </GridItem>
              <GridItem width='100%' colSpan={2}>
                <Select
                  width='100%'
                  name='idcategory'
                  value={plansubcategory.idcategory}
                  onChange={(e) => setsubcategory(e)}
                  placeholder='Anual'
                  required={true}>
                  <option>Selccione categoria</option>
                  {plancategorys.map((da) => (
                    <option key={uuidv4()} value={da._id}>
                      {da.name}
                    </option>
                  ))}
                </Select>
              </GridItem>
              */}
              <GridItem width='100%' textAlign='end' alignSelf='center'>
                <Label>Comisión Fija:</Label>
              </GridItem>
              <GridItem width='100%' colSpan={2}>
                <Input
                  type='text'
                  name='mimimun'
                  value={plansubcategory.mimimun}
                  onChange={(e) => setsubcategory(e)}
                  placeholder='Ingrese valor S/'
                  required={true}
                />
              </GridItem>
              <GridItem width='100%' textAlign='end' alignSelf='center'>
                <Label>Comisión Variable:</Label>
              </GridItem>
              <GridItem width='100%' colSpan={2}>
                <Input
                  type='text'
                  name='percent'
                  value={plansubcategory.percent}
                  onChange={(e) => setsubcategory(e)}
                  placeholder='Ingrese %'
                  required={true}
                />
              </GridItem>
              <GridItem width='100%' textAlign='end' alignSelf='center'>
                <Label>Vigencia:</Label>
              </GridItem>
              <GridItem width='100%' colSpan={2}>
                <CVDateRangePicker
                  onChange={onChange}
                  datestart={plansubcategory.datestart}
                  dateend={plansubcategory.dateends}
                />
              </GridItem>
            </Grid>
            <br />
            <Center>
              <Button
                variant='bo-primary'
                type='submit'
                margin='auto'
                width='176px'
                height='27px'
                bg='#00adf6'
                disabled={loading}>
                {loading ? (
                  <Spinner />
                ) : plansubcategory._id != '' ? (
                  'Actualizar'
                ) : (
                  'Agregar'
                )}
              </Button>
            </Center>
            <br />
          </form>
        </ModalBody>
        {/*<ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>*/}
      </ModalContent>
    </Modal>
  );
}

export default ModalPlanesSubCategory;
