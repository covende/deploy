import React, { useEffect, useState } from 'react';

import { Label } from '@/common/components';
import {
  Input,
  Button,
  Checkbox,
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
  Spinner,
  Textarea
} from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { BoxContainer } from './Styleds';
import { A_PLANES } from '../redux/Actions';
import { A_GLOBALES } from '@/app/redux/Global/Actions';
import { initialPlan } from '../redux/initials';
import {
  addPlan,
  editPlan
} from '@/app/api/graphql/plans/services/planesservice';
import { useToast } from '@chakra-ui/toast';
import CVDateRangePicker from '@/common/CovendeTemplate/CVDateRangePicker';
import { CVCheck } from '@/common/CovendeTemplate';
import { CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import CVButton from '@CVTemplate/core/CVButton';
import { isOnlyNumber } from '@CVTemplate/core/CVValidation';

// Components
function ModalPlanes({ isOpen, onClose }) {
  const { loading } = useSelector((state) => state.Globales);
  const { plan, planes, roleSelected } = useSelector((state) => state.Planes);
  const [state, setstate] = useState(initialPlan);

  const dispatch = useDispatch();
  const addToast = useToast();

  const onChange = (dates) => {
    const [start, end] = dates;
    const lessMonth = new Date(end).getMonth() - new Date(start).getMonth();
    const mostMonth =
      12 - new Date(start).getMonth() + new Date(end).getMonth();
    const timeInMonth =
      new Date(start).getFullYear() === new Date(end).getFullYear()
        ? lessMonth
        : new Date(start).getFullYear() < new Date(end).getFullYear()
        ? mostMonth
        : 0;
    let pl = {
      ...state,
      datestart: start,
      dateends: end,
      periodo: timeInMonth
    };
    setstate({ ...pl });
    // dispatch(A_PLANES({ plan: pl }));
  };

  const setplan = (e) => {
    console.log({ name: e.target.name, value: e.target.value });
    let pl;
    if (e.target.name === 'periodo') {
      const hoy = state.datestart || new Date();
      const aditionalDte = new Date(
        new Date(hoy).setMonth(hoy.getMonth() + Number(e.target.value))
      );
      pl = {
        ...state,
        datestart: hoy,
        dateends: aditionalDte,
        periodo: e.target.value
      };
    } else {
      pl = {
        ...state,
        [e.target.name]:
          e.target.type == 'checkbox' ? e.target.checked : e.target.value
      };
    }
    setstate({ ...pl });
    // dispatch(A_PLANES({ plan: pl }));
  };

  const savePlanes = async () => {
    let pl = await addPlan({
      ...state,
      role: roleSelected,
      productsPost: eval(state.productsPost || 0),
      subaccounts: eval(state.subaccounts || 0)
    });
    let pls = [...planes, pl];
    CVAlertSuccess({ addToast, message: 'Agregado Correctamente' });
    dispatch(A_PLANES({ planes: pls, plan: initialPlan }));
  };

  const updatePlanes = async () => {
    let pl = await editPlan({
      ...state,
      role: roleSelected,
      productsPost: eval(state.productsPost || 0),
      subaccounts: eval(state.subaccounts || 0)
    });
    let pls = [...planes];
    pls = pls.map((da) => {
      if (da._id == pl._id) {
        da = { ...pl };
      }
      return da;
    });
    CVAlertSuccess({ addToast, message: 'Actualizado Correctamente' });
    console.log('imprimiendo pl');
    console.log(pl);
    dispatch(A_PLANES({ planes: pls, plan: initialPlan }));
  };

  const onSubmit = async () => {
    dispatch(A_GLOBALES({ loading: true }));
    if (state._id != '') {
      await updatePlanes();
    } else {
      await savePlanes();
    }
    dispatch(A_GLOBALES({ loading: false }));
    onClose();
  };

  useEffect(() => {
    setstate(plan);
  }, [plan]);

  return (
    <Modal
      onClose={() => {
        onClose();
        setstate(initialPlan);
      }}
      size='xl'
      isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader style={{ backgroundColor: '#00ADF6', color: '#FFFFFF' }}>
          <Center>Agregar Plan</Center>
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
                  value={state.name}
                  onChange={(e) => setplan(e)}
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
                  value={state.description}
                  onChange={(e) => setplan(e)}
                  placeholder='Ingrese una descripción'
                  required={true}
                />
              </GridItem>
              <GridItem width='100%' textAlign='end' alignSelf='center'>
                <Label>Periodo en Meses:</Label>
              </GridItem>
              <GridItem width='100%'>
                <Input
                  type='number'
                  required={true}
                  name='periodo'
                  value={state.periodo}
                  onChange={(e) => setplan(e)}
                  placeholder='N° Meses'
                />
              </GridItem>
              <GridItem width='100%'>
                <Flex alignItems='center'>
                  <Label>Precio:</Label>
                  <Input
                    type='text'
                    name='price'
                    value={state.price}
                    onChange={(e) => setplan(e)}
                    placeholder='Ingrese precio S/'
                    required={true}
                    marginLeft='10px'
                  />
                </Flex>
              </GridItem>
              <GridItem width='100%' textAlign='end' alignSelf='center'>
                <Label>Vigencia:</Label>
              </GridItem>
              <GridItem width='100%' colSpan={2}>
                <CVDateRangePicker
                  onChange={onChange}
                  datestart={state.datestart}
                  dateend={state.dateends}
                />
              </GridItem>
              <GridItem width='100%' textAlign='end' alignSelf='center'>
                <Label>Listado:</Label>
              </GridItem>
              <GridItem width='100%' colSpan={2}>
                <Textarea
                  name='specifications'
                  value={state.specifications}
                  onChange={(e) => setplan(e)}
                  placeholder='Ingrese Listado de caracteristicas'
                  size='sm'
                  borderRadius='7'
                />
                {/* <Input
                  type='text'
                  name='description'
                  value={state.specifications}
                  onChange={(e) => setplan(e)}
                  placeholder='Ingrese una descripción'
                  required={true}
                /> */}
              </GridItem>
              <GridItem width='100%' textAlign='end' alignSelf='center'>
                <Label>Características:</Label>
              </GridItem>
              <GridItem width='100%' colSpan={2}></GridItem>

              <GridItem width='100%'></GridItem>
              <GridItem width='100%'>
                <Flex alignItems='center'>
                  <Input
                    type='text'
                    name='subaccounts'
                    onChange={(e) => {
                      const value = e.target.value;
                      if (isOnlyNumber(value)) {
                        value == ''
                          ? setplan(e)
                          : setplan({
                              target: {
                                name: 'subaccounts',
                                value: Number(value)
                              }
                            });
                      }
                    }}
                    value={state.subaccounts || ''}
                    placeholder='Subcuentas'
                    required={true}
                    width='50px'
                    marginRight='10px'
                    textAlign='center'
                  />
                  <Label>Sub Cuentas</Label>
                </Flex>
              </GridItem>
              <GridItem width='100%'></GridItem>
              <GridItem width='100%'></GridItem>
              <GridItem width='100%'>
                {!state.unlimited && (
                  <Flex alignItems='center'>
                    <Input
                      type='text'
                      name='productsPost'
                      value={state.productsPost || ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (isOnlyNumber(value)) {
                          value == ''
                            ? setplan(e)
                            : setplan({
                                target: {
                                  name: 'productsPost',
                                  value: Number(value)
                                }
                              });
                        }
                      }}
                      placeholder='Productos a publicar'
                      errorBorderColor='red.300'
                      required={true}
                      width='50px'
                      marginRight='10px'
                      textAlign='center'
                    />
                    <Label>Productos a publicar</Label>
                  </Flex>
                )}
              </GridItem>
              <GridItem width='100%' alignSelf='center'>
                <CVCheck
                  value={state.unlimited}
                  title='Ilimitado'
                  onChange={(value) =>
                    setplan({
                      target: {
                        value: value,
                        type: 'checkbox',
                        name: 'unlimited',
                        checked: value
                      }
                    })
                  }
                />
              </GridItem>
            </Grid>
            <br />
            <Center>
              <CVButton
                type='submit'
                margin='auto'
                isLoading={loading}
                disabled={loading}>
                Agregar
              </CVButton>
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

export default ModalPlanes;
