import AxiosGQL from '@/app/api/rest/AxiosGQL';
import themeCovende from '@/themeCovende';
import { Button } from '@chakra-ui/button';
import { Flex, Text } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as User from '@/app/helpers/authUtils';
import {
  DELETE_PRODUCT_ATTRIBUTE,
  PRODUCT_ATTRIBUTES_DETAILS,
  DELETE_PRODUCT_ATTRIBUTE_DETAIL
} from '@/app/api/graphql/webseller/ProductService';
import { useSelector } from 'react-redux';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { v4 } from 'uuid';
import { useDisclosure } from '@chakra-ui/hooks';
import { CVButton } from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { PencilAltIcon, Trash } from '@/app/assets/icons';
import { FaArrowLeft } from 'react-icons/fa';
import ModalDelete from '@CVPages/core/bo/faq/components/ModalDelete';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import {
  TabContainer,
  TableStyle,
  AddAttr
} from '@CVPages/core/admin/seller/productos/ProductsStyle';
import AddAttributeBo from './AddAtributoBo';
import AddAttributeDetailsBo from './AddAttributeDetailsBo';

import styled from 'styled-components';


const StyledInput = styled.input`
  padding: 5px;
  width: 100%;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #004772; /* Cambia el color del borde cuando el input está enfocado */
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Añade una leve sombra cuando el input está enfocado */
  }
`;

const style = {
  title: {
    backgroundColor: '#004772',
    borderRadius: '22px',
    width: '100%',
    color: '#FFFFFF',
    marginBottom: '5px'
  }
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role='tabpanel'
      height='100%'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </Box>
  );
}

function AtributosBo(hideButton) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initData = {
    color: '',
    creator_id: '',
    description: '',
    name: '',
    product_attribute_detail_id: '',
    product_attribute_id: '',
    type_attribute: ''
  };
  const [adetails, setAdetails] = useState(false);
  const [idattr, setIdattr] = useState('');
  const [typeattr, setTypeattr] = useState('text');
  const [detail, setdetail] = useState(initData);
  const [isDelete, setIsDelete] = useState(false);
  const [itemToDelete, setItemToDelete] = useState('');
  const [titleModal, setTitleModal] = useState('');
  const { client } = useSelector((state) => state.Clients);
  const inputRef = React.useRef();
  const [attributeFilters, setAttributeFilters] = useState({});


  let [attributes, setAttributes] = useState([]);

  const addToast = useToast();
  const [value, setValue] = React.useState(0);
  let us = User.getLoggedInUser();




  useEffect(() => {
    // Configura los filtros iniciales para cada atributo cuando la lista de atributos cambia
    const initialFilters = {};
    attributes.forEach((attribute) => {
      initialFilters[attribute.product_attribute_id] = '';
    });
    setAttributeFilters(initialFilters);
  }, [attributes]);


  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [attributeFilters]);

  
  


  const addAdetails = (id, type) => {
    setIdattr(id);
    setAdetails(!adetails);
    setTypeattr(
      type.toString().toLowerCase().includes('color') ? 'color' : 'text'
    );
  };

  const removeAttr = async (id) => {
    if (titleModal == 'Atributo') {
      const { deleteProductAttribute } = await AxiosGQL(
        DELETE_PRODUCT_ATTRIBUTE(id)
      );

      if (deleteProductAttribute?.status) {
        setAttributes(
          attributes.filter((attribute) => attribute.product_attribute_id != id)
        );
        CVAlertSuccess({ addToast, message: deleteProductAttribute.message });
        setValue(0);
      } else {
        CVAlertError({
          addToast,
          message:
            deleteProductAttribute.message ||
            'Sucedió algo, inténtelo más tarde.'
        });
      }
    } else {
      const { deleteProductAttributeDetail: resp } = await AxiosGQL(
        DELETE_PRODUCT_ATTRIBUTE_DETAIL(idattr, id)
      );
      if (resp?.status) {
        CVAlertSuccess({ addToast, message: resp.message });
        setAttributes(
          attributes.map((attribute) => ({
            ...attribute,
            attributes_details:
              attribute.product_attribute_id ==
              resp.productAttributeDetail.product_attribute_id
                ? attribute?.attributes_details.filter(
                    (det) => det.product_attribute_detail_id !== id
                  )
                : attribute?.attributes_details
          }))
        );
        setIsDelete(false);
      } else {
        CVAlertError({
          addToast,
          message: 'Sucedió algo, intentelo más tarde.'
        });
      }
    }
    setIsDelete(false);
  };

  const initdata = async () => {
    const result = await AxiosGQL(
      PRODUCT_ATTRIBUTES_DETAILS(client?.user_id || us.user_id)
    );
    if (result?.productAttributes) setAttributes(result.productAttributes);
  };

  useEffect(() => {
    if (attributes.length == 0) initdata();
  }, []);
  return (
    <Container>
      <Box>
        <Text fontSize='2em'>
          <span style={{ color: themeCovende.colors.azul, fontWeight: 'bold' }}>
            Atributos de los Productos
          </span>
        </Text>
        <Text>
          Los atributos son las características de tus productos como talla,
          color o género. Agrega un atributo nuevo o edita los atributos ya
          establecidos. Selecciona un atributo y personaliza los detalles.
        </Text>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Button style={style.title}>Atributos</Button>
            <Box
              minHeight='450px'
              width='100%'
              bgcolor='#FFFFFF'
              boxShadow='2px 2px 11px rgba(0, 0, 0, 0.19)'
              borderRadius='6px'
              display='flex'
              flexDirection='column'
              justifyContent='space-between'>
              <Box>
                {attributes.map((it, index) => (
                  <TabContainer key={v4()}>
                    <Flex
                      width='100%'
                      justifyContent='space-between'
                      className={
                        value == index ? 'MuiTab-root Mui-selected' : ''
                      }>
                      <Button
                        onClick={() => {
                          setValue(index);
                          setIdattr(it.product_attribute_id);
                        }}>
                        {it.name}
                      </Button>
                      <Button
                        onClick={() => {
                          setIsDelete(true);
                          setItemToDelete(it.product_attribute_id);
                          setTitleModal('Atributo');
                        }}>
                        {Trash}
                      </Button>
                    </Flex>
                  </TabContainer>
                ))}
              </Box>
              <AddAttr>
                <Flex justifyContent='end' margin='1rem'>
                  <CVButton onClick={() => onOpen()}>
                    + añadir atributo
                  </CVButton>
                </Flex>
              </AddAttr>
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Button style={style.title}>Detalles</Button>
            <Box
              minHeight='450px'
              width='100%'
              bgcolor='#FFFFFF'
              boxShadow='2px 2px 11px rgba(0, 0, 0, 0.19)'
              borderRadius='6px'
              display='flex'
              flexDirection='column'
              justifyContent='space-between'>
              <Box height='100%' overflow='auto'>
                <TableStyle>
                  {attributes.map((it, index) => (
                    <TabPanel key={v4()} value={value} index={index}>
                      <Text fontSize='1.5em' fontWeight='bold'>
                        Detalles de Color
                      </Text>
                      <Flex>
          

  </Flex>
  <StyledInput
          ref={inputRef}
          placeholder='Buscar...'
          value={attributeFilters[it.product_attribute_id] || ''}
          onChange={(e) =>
            setAttributeFilters({
              ...attributeFilters,
              [it.product_attribute_id]: e.target.value
            })
          }
        />
                      <Table variant='simple'>
                        <Thead>
                          <Tr>
                            <Th>
                              <Box>Nombre</Box>
                            </Th>
                            <Th>
                              <Box></Box>
                            </Th>
                            <Th>
                              <Box textAlign='center'>Acción</Box>
                            </Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {it.attributes_details
                          .filter((detail) =>
                          detail.name.toLowerCase().includes(attributeFilters[it.product_attribute_id]?.toLowerCase())
                        )
                          .map((itd, ind) => (
                            <Tr key={v4()}>
                              <Td>
                                <Box>{itd.name}</Box>
                              </Td>
                              <Td>
                                <Box>
                                  {itd.color ? (
                                    <Box
                                      height='1.2rem'
                                      width='5rem'
                                      borderRadius='0.4rem'
                                      bgcolor={itd.color}
                                      border='1px solid #EFEFEF'></Box>
                                  ) : (
                                    <Typography>{itd.description}</Typography>
                                  )}
                                </Box>
                              </Td>
                              <Td>
                                <Box>
                                  <Flex justifyContent='space-around'>
                                    <Box></Box>
                                    <Button
                                      onClick={() => {
                                        setTitleModal('Detalle');
                                        setIsDelete(true);
                                        setIdattr(itd.product_attribute_id);
                                        setItemToDelete(
                                          itd.product_attribute_detail_id
                                        );
                                      }}>
                                      {Trash}
                                    </Button>
                                    |
                                    <Button
                                      onClick={() => {
                                        setdetail(itd);
                                        setAdetails(!adetails);
                                        setIdattr(itd.product_attribute_id);
                                        setTypeattr(
                                          it.name
                                            .toString()
                                            .toLowerCase()
                                            .includes('color')
                                            ? 'color'
                                            : 'text'
                                        );
                                      }}>
                                      {PencilAltIcon}
                                    </Button>
                                    <Box></Box>
                                  </Flex>
                                </Box>
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                      <AddAttr>
                        <Flex justifyContent='end'>
                          <CVButton
                            onClick={() =>
                              addAdetails(it.product_attribute_id, it.name)
                            }>
                            + añadir
                          </CVButton>
                        </Flex>
                      </AddAttr>
                    </TabPanel>
                  ))}
                </TableStyle>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <br />
        <br />
        <Flex justifyContent='center'>
          {hideButton ? (
            ''
          ) : (
            <Link
              to={
                product.product_id != ''
                  ? '/seller/productos/update/' + product.product_id
                  : '/seller/productos/create/new'
              }>
              <CVButton>
                <FaArrowLeft /> <SizeBox /> Volver a Creación de producto
              </CVButton>
            </Link>
          )}
        </Flex>
      </Box>
      <AddAttributeBo
        isOpen={isOpen}
        onClose={onClose}
        process={(attribute) => setAttributes([...attributes, attribute])}
      />
      <AddAttributeDetailsBo
        isOpen={adetails}
        onClose={() => setAdetails(!adetails)}
        idattr={idattr}
        typeattr={typeattr}
        detail={detail}
        setdetail={setdetail}
        initData={initData}
        process={(detail, type) => {
          if (type == 'ADD') {
            setAttributes(
              attributes.map((attribute) => ({
                ...attribute,
                attributes_details:
                  attribute.product_attribute_id == detail.product_attribute_id
                    ? [...attribute?.attributes_details, detail]
                    : attribute?.attributes_details
              }))
            );
          } else if (type == 'EDIT') {
            setAttributes(
              attributes.map((attribute) => ({
                ...attribute,
                attributes_details:
                  attribute.product_attribute_id == detail.product_attribute_id
                    ? attribute?.attributes_details.map((det) =>
                        det.product_attribute_detail_id ==
                        detail.product_attribute_detail_id
                          ? detail
                          : det
                      )
                    : attribute?.attributes_details
              }))
            );
          }
          setdetail(initData);
        }}
      />
      <ModalDelete
        isOpen={isDelete}
        onClose={() => setIsDelete(!isDelete)}
        title={titleModal}
        confirm={removeAttr}
        itemToDelete={itemToDelete}
        onConfirm={true}
      />
    </Container>
  );
}

export default AtributosBo;
