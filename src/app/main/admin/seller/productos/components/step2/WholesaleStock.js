import React, { Fragment, useEffect } from 'react';
import AddWholeSaleForm from './AddWholeSaleForm';
import { useToast } from '@chakra-ui/toast';
import WholeSaleTable from './WholeSaleTable';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Box,
  Center
} from '@chakra-ui/react';
import { CVAlertError } from '@CVTemplate/core/CVAlert';

/**
 * Genera , actuliza y elimina los elementos de la tabla percio por mayor
 * @param {precios[]}
 */
const WholesaleStock = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const addToast = useToast();
  let setwholeSales = props.setwholeSales;
  let wholeSales = props.wholeSales;
  const addWholeSale = (data) => {
    let WholeSale = {};

    if (!data.minimum_order || !data.maximum_order || !data.price) {
      CVAlertError({
        addToast,
        message: 'Datos invalidos '
      });
      return;
    }
    let Notnumber = false;

    for (const key in data) {
      WholeSale[key] = Number(data[key]);
      if (isNaN(WholeSale[key])) {
        let Notnumber = true;
        break;
      }
    }

    if (Notnumber) {
      CVAlertError({
        addToast,
        message: 'Los datos tienen que ser numericos '
      });
      return;
    }

    if (WholeSale.minimum_order > WholeSale.maximum_order) {
      CVAlertError({
        addToast,
        message: 'El pedido minimo no debe ser mayor que el maximo '
      });
      return;
    } else {
      let size = wholeSales.length;
      let newRowsales = {
        id: 0,
        minimum_order: WholeSale.maximum_order + 1,
        maximum_order: Number.POSITIVE_INFINITY,
        maximum_order_text: '-',
        price: 0
      };
      WholeSale.maximum_order_text = String(WholeSale.maximum_order);
      if (size > 0) {
        WholeSale.id = wholeSales[size - 1].id;
        newRowsales.id = WholeSale.id + 1;
        wholeSales.push(newRowsales);

        setwholeSales(
          wholeSales.map((item) =>
            item.id === WholeSale.id ? WholeSale : item
          )
        );
      } else {
        WholeSale.id = size + 1;
        newRowsales.id = WholeSale.id + 1;
        wholeSales.push(WholeSale, newRowsales);
        setwholeSales([...wholeSales]);
      }
    }
  };

  const deleteWholeSale = (id) => {
    setwholeSales(wholeSales.filter((WholeSale) => WholeSale.id !== id));
  };

  const updateWholeSale = (id, updatedWholeSale) => {
    if (updatedWholeSale.price == '' || updatedWholeSale.minimum_order == '') {
      CVAlertError({
        addToast,
        message: 'Este campo no pude estar vacio'
      });
    }
    if (updatedWholeSale.minimum_order >= updatedWholeSale.maximum_order) {
      CVAlertError({
        addToast,
        message: 'El pedido minimo no debe ser mayor que el maximo '
      });
    } else {
      setwholeSales(
        wholeSales.map((WholeSale) =>
          WholeSale.id === id
            ? {
                ...WholeSale,
                price:
                  updatedWholeSale.price == 0
                    ? ''
                    : Number(updatedWholeSale.price),
                minimum_order:
                  updatedWholeSale.minimum_order == 0
                    ? ''
                    : Number(updatedWholeSale.minimum_order)
              }
            : WholeSale
        )
      );
    }
  };

  const wholeSaleFlag = props.precios.wholesales;
  if (!wholeSales.id) {
    wholeSaleFlag.map((x, i) => {
      x.id = i + 1;
      if (x.maximum_order == 100000000) {
        x.maximum_order = Number.POSITIVE_INFINITY;
      }
    });
  }
  useEffect(() => {
    setwholeSales(wholeSaleFlag);
  }, []);
  return (
    <div className='container'>
      <div className='flex-row'>
        <div className='flex-large'>
          <WholeSaleTable
            wholeSales={wholeSales}
            updateWholeSale={updateWholeSale}
            deleteWholeSale={deleteWholeSale}
          />
        </div>

        <Box my={3} display='flex' flexDirection='row-reverse'>
          <Button
            borderRadius={16}
            onClick={onOpen}
            bg='white'
            color='#00ADF6'
            mr={230}>
            + Añadir
          </Button>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose} size='xl'>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader color='#004772' fontSize='2xl'>
              <Center> Personalizar el rango de ventas por mayor</Center>
              <Center>
                <svg
                  width='495'
                  height='1'
                  viewBox='0 0 295 1'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <line y1='0.5' x2='295' y2='0.5' stroke='#C4C4C4' />
                </svg>{' '}
              </Center>
            </ModalHeader>
            <ModalBody>
              <Fragment>
                <AddWholeSaleForm
                  addWholeSale={addWholeSale}
                  wholeSaleslist={wholeSales}
                  onClose={onClose}
                />
              </Fragment>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default WholesaleStock;
