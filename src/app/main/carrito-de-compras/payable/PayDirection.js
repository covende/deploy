import React, { useEffect, useState } from 'react';
import { Text, Box, Flex, Button, useDisclosure } from '@chakra-ui/react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { plusIcon } from '../CarritoIcons';
import DirectionModal from '../components/DirectionModal';
import { Grid } from '@material-ui/core';
import { v4 } from 'uuid';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import { USER_DIRECTION_BY_USER } from '@/app/api/graphql/webpublic/userData/UserDirectionService';
import { useDispatch, useSelector } from 'react-redux';
import { A_CARD_PRODUCT } from '@/common/CovendeTemplate/CVCardProduct/CVCardProductRedux/Actions';
import CVTooltip from '@/common/CovendeTemplate/CVTooltip';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import { FaExclamation } from 'react-icons/fa';
import { CVValidLogin } from '@CVTemplate/core/CVMethods';
import { CVAlertWarning } from '@CVTemplate/core/CVAlert';
import { useToast } from '@chakra-ui/toast';
import { CVButton } from '@/common/CovendeTemplate';
import {
  SET_CUSTOMER_DEFAULT_DIRECTION,
  USER_DIRECTION_DELETE
} from '@/app/api/graphql/webpublic/userData/UserDirectionService';

function PayDirection({
  infoenvio,
  setinfoenvio,
  openTooltip,
  setopenTooltip,
  getDelivery,
  shoppingCartStatus,
  resetShoppingCart,
  errorDelivery = false
}) {
  const { onClose, isOpen, onOpen } = useDisclosure();
  const dispatch = useDispatch();
  const [direciones, setdirecciones] = useState([]);
  const [edit, setedit] = useState(false);
  const { carrito_login } = useSelector((state) => state.CardProduct);
  const addToast = useToast();
  const [userDataDirections, setUserDataDirections] = useState([]);
  const [userDirection, setUserDirection] = useState({
    _id: null,
    dni: null,
    predeterminado: false,
    user_id: null,
    customer_id: null,
    nombre: null,
    apellidos: null,
    direccion: null,
    referencia: null,
    departamento_id: null,
    provincia_id: null,
    distrito_id: null,
    zip: null,
    telefono: null,
    ubigeo_district: null
  });

  const initdata = async (init) => {
    const isLogin = CVValidLogin(dispatch);
    if (!isLogin) return false;

    const us = getLoggedInUser();
    const { userDirectionByUser } = await AxiosGQL(
      USER_DIRECTION_BY_USER(us.user_id)
    );

    let direccionesTMP = userDirectionByUser
      ? userDirectionByUser.sort(
          (start, secondary) => start.position - secondary.position
        )
      : [];

    setdirecciones(direccionesTMP);

    if (init) {
      let direcionDefault = direccionesTMP[0] || undefined;

      if (direcionDefault) {
        getDelivery(direcionDefault._id);
        setinfoenvio(direcionDefault);
        setopenTooltip(false);
        setDefault(direcionDefault.customer_id, direcionDefault._id);
      }
    }
  };

  const removeItem = async (id) => {
    // setDirections([...directions.filter((it, idx) => idx != index)]);
    const { userDirectionDelete } = await AxiosGQL(USER_DIRECTION_DELETE(id));
    if (userDirectionDelete) {
      if (userDirectionDelete?.predeterminado) {
        setinfoenvio({ _id: '', direccion: '' });
        await resetShoppingCart();
      }
      await initdata();
      CVAlertSuccess({ addToast, message: 'Eliminado Correctamente' });
    } else {
      CVAlertError({ addToast, message: 'Error' });
    }
  };

  const setDefault = async (cusotmer_id, direction_id) => {
    const { setCustomerDefaultDirection } = await AxiosGQL(
      SET_CUSTOMER_DEFAULT_DIRECTION(cusotmer_id, direction_id)
    );
    if (setCustomerDefaultDirection) {
      await initdata();
      CVAlertSuccess({
        addToast,
        message: '¡Listo! Has establecido tu dirección de envío'
      });
    } else {
      CVAlertError({ addToast, message: 'Error' });
    }
  };

  const setUpdateDirection = async (userDirection) => {
    onOpen();
    const newUserDirection = {
      _id: userDirection._id,
      predeterminado: userDirection?.predeterminado || false,
      user_id: userDirection.user_id,
      customer_id: userDirection.customer_id,
      nombre: userDirection.nombre,
      apellidos: userDirection.apellidos,
      direccion: userDirection.direccion,
      referencia: userDirection.referencia,
      departamento_id: userDirection.departamento._id,
      provincia_id: userDirection.provincia._id,
      distrito_id: userDirection.distrito._id,
      zip: userDirection.zip,
      dni: userDirection?.dni || '',
      ubigeo_district: userDirection.ubigeo_district || '',
      telefono: userDirection.telefono
    };
    setUserDirection(newUserDirection);
  };

  const DirectionCard = ({ item, selected, setopenTooltip, index }) => (
    <Grid key={v4()} item xs={12} sm={6} md={4}>
      <Box
        margin='1rem'
        padding='1rem'
        border={'1px solid ' + (item.predeterminado ? '#004574' : '#ECECEC')}
        rounded='1rem'
        {...(shoppingCartStatus == 'VALIDATED_COUPON'
          ? { pointerEvents: 'none' }
          : {})}
        // onClick={() => {
        //   if (item?._id != infoenvio?._id) {
        //     setinfoenvio(item);
        //     getDelivery(item._id);
        //     setopenTooltip(false);
        //   } else setopenTooltip(errorDelivery);
        //   }}
      >
        <Text>{index}</Text>
        <Text>{item.direccion}</Text>
        <Text>{item.referencia}</Text>
        <Text>
          {item.departamento?.name}, {item.provincia?.name},{' '}
          {item.distrito?.name}, {item.zip}
        </Text>
        <Button
          mt={3}
          mb={3}
          mr={3}
          colorScheme='blue.700'
          variant='link'
          fontSize='1rem'
          onClick={() => {
            setUpdateDirection(item);
            //setIsNewDirection(false);;
            //onOpen();
            setedit(true);
          }}>
          Editar
        </Button>
        <Button
          mt={3}
          colorScheme='#822727'
          color='red'
          fontSize='1rem'
          variant='link'
          onClick={() => {
            removeItem(item._id);
          }}>
          Eliminar
        </Button>

        <Box>
          <CVButton
            fontWeight='bold'
            variant='contained'
            color='white'
            backgroundColor='green'
            onClick={() => {
              if (item?._id != infoenvio?._id) {
                setinfoenvio(item);
                getDelivery(item._id);
                setopenTooltip(false);
                setDefault(item.customer_id, item._id);
              } else setopenTooltip(errorDelivery);
            }}>
            Seleccionar dirección
          </CVButton>
        </Box>
      </Box>
    </Grid>
  );

  function areDireccionsEqual(oldDireccion, newDireccion) {
    const keys1 = Object.keys(oldDireccion);
    const keys2 = Object.keys(newDireccion);

    if (keys1.length !== keys2.length) return false;

    for (let key of keys1) {
      if (!newDireccion.hasOwnProperty(key)) return false;

      if (oldDireccion[key] !== newDireccion[key]) return false;
    }

    return true;
  }

  const sorteDireciones = direciones.sort((a, b) => {
    if (a.predeterminado === true) return -1;
    return 0;
  });

  useEffect(() => {
    // initdata();

    console.log('init efecct data');
    setTimeout(async () => {
      console.log('init data');
      await initdata(true);
    }, 250);
  }, [carrito_login]);

  return (
    <Box
      bg='white'
      borderRadius='1rem'
      {...(shoppingCartStatus == 'VALIDATED_COUPON'
        ? {
            cursor: 'not-allowed',
            backgroundColor: '#f0f0f0',
            color: '#888888',
            border: '1px solid #ccc'
          }
        : {})}
      onClick={() => {
        if (shoppingCartStatus == 'VALIDATED_COUPON') {
          CVAlertWarning({
            addToast,
            message: 'Debes quitar el cupón si quieres actualizar tu dirección',
            duration: 3000
          });
        }
      }}>
      <Box pguyadding='1rem'>
        <Text color='#004574' fontWeight='bold' fontSize='1.25rem'>
          Información de envío
        </Text>
      </Box>
      <CVTooltip
        icon={<FaExclamation style={{ fontSize: '3rem' }} />}
        colorIcon='white'
        onMouseEnter={false}
        onMouseLeave={false}
        title={
          errorDelivery
            ? 'Dirección no disponible. Seleccionar otras opciones o agregar una nueva.'
            : 'Debes seleccionar una dirección existente o agregar una nueva.'
        }
        titleColor='red'
        bgIcon='red'
        height='48px'
        widthIcon='75px'
        isOpen={openTooltip}
        onClose={(value) => setopenTooltip(value)}>
        <Grid container spacing={1}>
          {direciones.map((item, index) => (
            <DirectionCard
              key={v4()}
              index={index + 1}
              item={item}
              selected={item._id == (infoenvio?._id || '')}
              setopenTooltip={setopenTooltip}
            />
          ))}
        </Grid>
      </CVTooltip>

      {shoppingCartStatus != 'VALIDATED_COUPON' && (
        <Flex justifyContent='end' padding='0.5rem'>
          <Button
            onClick={() => {
              onOpen();
              setedit(false);
            }}
            leftIcon={plusIcon}
            colorScheme='blue.700'
            variant='link'
            fontSize='1rem'>
            Añadir direción
          </Button>
        </Flex>
      )}
      {isOpen && (
        <DirectionModal
          isOpen={isOpen}
          onClose={onClose}
          onCloseEdit={({ direction_id }) => {
            if (userDirection?.predeterminado) {
              setopenTooltip(false);
              getDelivery(direction_id);
            }
          }}
          edit={edit}
          direccion={infoenvio}
          userDirection={userDirection}
          setUserDirection={setUserDirection}
          init={initdata}
          add={(newDirection) => {
            if (newDirection) {
              setinfoenvio(newDirection);
              let directionsTMP = direciones.map((dir) => ({
                ...dir,
                predeterminado: false
              }));
              directionsTMP.unshift(newDirection);
              setdirecciones(directionsTMP);
              setopenTooltip(false);
              getDelivery(newDirection._id);
            }
          }}
        />
      )}
    </Box>
  );
}

export default PayDirection;
