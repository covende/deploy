import React, { useState, useEffect } from 'react';
import AtributeStockTable from './AtributeStockTable';
import {
  Flex,
  Text,
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Center,
  background,
  border
} from '@chakra-ui/react';

import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { CVFormatLongDate } from '@CVPages/core/bo/dashboard/components/ActividadesUsuarios';

const useStyles = makeStyles((theme) => ({
  chip: {
    background: 'white',
    width: '100px',
    border: '1px solid #000'
  }
}));

const CHIP_MAX_WIDTH = 500;
const CHIP_ICON_WIDTH = 10;

const EllipsisText = (props) => {
  const { children } = props;

  return (
    <div
      style={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: CHIP_MAX_WIDTH - CHIP_ICON_WIDTH
      }}>
      {children}
    </div>
  );
};

/**
 * Genera la tabla por la combinación de los elementos de los atributos
 * @param {atributos[], precios[])} props
 */
const AtributeStock = (props) => {
  const classes = useStyles();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [chipData, setChipData] = useState(props.atributos);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter(
        (chip) =>
          chip.product_attribute_id !== chipToDelete.product_attribute_id
      )
    );
  };

  let data = props.data;

  const deleteAtribute = (id) => {
    props.setdata(data.filter((data) => data.item_id !== id));
  };

  const updateAtribute = (id, field, value) => {
    props.setdata(
      data.map((Atribute) => {
        if (Atribute.item_id === id) {
          Atribute = { ...Atribute, [field]: value };
        }

        return Atribute;
      })
    );
  };

  function cartesiano() {
    var r = [],
      arg = arguments,
      max = arg.length - 1;
    let helper = (arr, i) => {
      for (var j = 0, l = arg[i].length; j < l; j++) {
        var a = arr.slice(0);
        a.push(arg[i][j]);
        if (i == max) {
          r.push(a);
        } else helper(a, i + 1);
      }
    };
    helper([], 0);
    return r;
  }

  const extracHeader = () => {
    if (props?.data?.length > 0) {
      return props.data[0].attributes.map((atr) => atr.name);
    }

    return chipData.map((x) => x.name);
  };

  const addAtribute = () => {
    if (chipData.length == 0) return;

    const custom_atrr = chipData.map((atr) =>
      atr.attributes_details.map((dt) => ({
        id: atr.product_attribute_id,
        name: atr.name,
        value_id: dt.product_attribute_detail_id,
        value: dt.name,
        hexa: dt.color || ''
      }))
    );

    let variations = cartesiano(...custom_atrr);

    variations = variations.map((attributes, index) => ({
      item_id: props.custom_id + '-' + String(index + 1).padStart(2, '0'),
      sku: '',
      stock: 0,
      price: props.precios.price_unit,
      attributes: attributes
    }));

    props.setdata([...variations]);
    setChipData(props.atributos);
    onClose();
  };

  useEffect(() => {
    setChipData(props.atributos);
    props.setdata(props.precios.sale_with_custom_attributes);
  }, [props.atributos]);

  return (
    <Box>
      <Button
        bg='white'
        color='#004772'
        my={4}
        borderRadius={16}
        onClick={onOpen}>
        Atributos &nbsp;
        <svg
          width='18'
          height='11'
          viewBox='0 0 18 11'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path d='M2 2L9 9L16 2' stroke='#B1B1B1' />
        </svg>
      </Button>
      <Button ml={5} borderRadius={16} color='white'>
        Editar Atributos
      </Button>

      <AtributeStockTable
        headerAtribute={extracHeader()}
        deleteAtribute={deleteAtribute}
        atribute={data}
        updateAtribute={updateAtribute}
      />

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setChipData(props.atributos);
          onClose();
        }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Center>
              <Text color='#004772' fontSize='1xl' fontWeight='bold'>
                Personalizar por atributos
              </Text>
            </Center>
          </ModalHeader>

          <ModalBody>
            <Box>
              <Text textAlign={'center'}>
                Selecciona los atributos y luego genera la tabla para
                personalizar el stock por cada atributo.
              </Text>
              {chipData.map((data, i) => {
                return (
                  <Center px={20} mt={15} key={data.product_attribute_id}>
                    <Chip
                      label={
                        <EllipsisText>
                          &nbsp;&nbsp;&nbsp;{data.name}&nbsp;&nbsp;&nbsp;
                        </EllipsisText>
                      }
                      onDelete={
                        data.label === 'React' ? undefined : handleDelete(data)
                      }
                      className={classes.chip}
                    />
                  </Center>
                );
              })}
            </Box>
          </ModalBody>

          <Center mb={10}>
            <Flex alignItems='center' my={10} mb={2}>
              <Button
                bg='#00ADF6'
                color='white'
                borderRadius={16}
                mx={1}
                onClick={addAtribute}>
                Generar Tabla
              </Button>

              <Button
                bg='#E95558'
                color='white'
                borderRadius={16}
                mx={1}
                onClick={() => {
                  setChipData(props.atributos);
                  onClose();
                }}>
                Cancelar
              </Button>
            </Flex>
          </Center>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default AtributeStock;
