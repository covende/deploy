import React, { useState } from 'react';

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
  Flex,
  Center,
  Spinner
} from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { A_PLANCATEGORY } from '../redux/Actions';
import { A_GLOBALES } from '@/app/redux/Global/Actions';
import { initialcats } from '../redux/initials';
import {
  PlanCategoryAdd,
  PlanCategoryEdit
} from '@/app/api/graphql/plans/services/planescategoryservice';
import { useToast } from '@chakra-ui/toast';
import { CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';

// Components
function ModalPlanesCategory({ isOpen, onClose }) {
  const { loading } = useSelector((state) => state.Globales);
  const { roleSelected } = useSelector((state) => state.Planes);
  const { plancategory, plancategorys } = useSelector(
    (state) => state.PlanCategory
  );
  const addToast = useToast();

  const dispatch = useDispatch();

  const setplancategory = (e) => {
    let cat = {
      ...plancategory,
      [e.target.name]:
        e.target.type == 'checkbox' ? e.target.checked : e.target.value
    };
    dispatch(A_PLANCATEGORY({ plancategory: cat }));
  };

  const saveplancategory = async () => {
    let cat = await PlanCategoryAdd({
      ...plancategory,
      role: roleSelected
    });
    let cats = [...plancategorys, cat];
    CVAlertSuccess({ addToast, message: 'Agregado Correctamente' });
    dispatch(
      A_PLANCATEGORY({ plancategorys: cats, plancategory: initialcats })
    );
  };

  const updateCats = async () => {
    let cat = await PlanCategoryEdit({
      ...plancategory,
      role: roleSelected
    });
    let cats = [...plancategorys];
    cats = cats.map((da) => {
      if (da._id == cat._id) {
        da = { ...cat };
      }
      return da;
    });
    CVAlertSuccess({ addToast, message: 'Actualizado Correctamente' });
    dispatch(
      A_PLANCATEGORY({ plancategorys: cats, plancategory: initialcats })
    );
  };

  const onSubmit = async () => {
    dispatch(A_GLOBALES({ loading: true }));
    if (plancategory._id != '') {
      await updateCats();
    } else {
      await saveplancategory();
    }
    dispatch(A_GLOBALES({ loading: false }));
    onClose();
  };

  return (
    <Modal onClose={onClose} size='xl' isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader style={{ backgroundColor: '#00ADF6', color: '#FFFFFF' }}>
          <Center>Agregar Categoria</Center>
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
                  value={plancategory.name}
                  onChange={(e) => setplancategory(e)}
                  placeholder='Ingrese nombre del categoria'
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
                  value={plancategory.description}
                  onChange={(e) => setplancategory(e)}
                  placeholder='Ingrese una descripción'
                  required={true}
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
                {loading ? <Spinner /> : 'Agregar'}
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

export default ModalPlanesCategory;
