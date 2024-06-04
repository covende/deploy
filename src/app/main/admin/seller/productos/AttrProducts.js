import AxiosGQL from '@/app/api/rest/AxiosGQL';
import themeCovende from '@/themeCovende';
import { Button } from '@chakra-ui/button';
import { Flex, Text } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as User from '@/app/helpers/authUtils';
import {
  DELETE_PRODUCT_ATTRIBUTE,
  PRODUCT_ATTRIBUTES_DETAILS,
  DELETE_PRODUCT_ATTRIBUTE_DETAIL
} from '@/app/api/graphql/webseller/ProductService';
import { useDispatch, useSelector } from 'react-redux';
import { A_PRODUCTVIEW } from './redux/ProductViewAction';
import { AddAttr, TabContainer, TableStyle } from './ProductsStyle';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { v4 } from 'uuid';
import AddAttribute from './components/modales/AddAttribute';
import AddAttributeDetails from './components/modales/AddAttributeDetails';
import { useDisclosure } from '@chakra-ui/hooks';
import { CVButton } from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { PencilAltIcon, Trash } from '@/app/assets/icons';
import { FaArrowLeft } from 'react-icons/fa';
import ModalDelete from '@CVPages/core/bo/faq/components/ModalDelete';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';

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

function AttrProducts(hideButton) {
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

  const { attributes, product, allattributes } = useSelector(
    (state) => state.ProductView
  );
  const dispatch = useDispatch();
  const addToast = useToast();
  const [value, setValue] = React.useState(0);
  let us = User.getLoggedInUser();

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
      if (deleteProductAttribute.status) {
        CVAlertSuccess({ addToast, message: deleteProductAttribute.message });
        dispatch(
          A_PRODUCTVIEW({
            attributes: attributes.filter((da) => da.product_attribute_id != id)
          })
        );
        setValue(0);
      } else {
        CVAlertError({
          addToast,
          message: 'Sucedió algo, intentelo más tarde.'
        });
      }
    } else {
      const { deleteProductAttributeDetail } = await AxiosGQL(
        DELETE_PRODUCT_ATTRIBUTE_DETAIL(idattr, id)
      );
      if (deleteProductAttributeDetail?.status) {
        CVAlertSuccess({
          addToast,
          message: deleteProductAttributeDetail.message
        });
        dispatch(
          A_PRODUCTVIEW({
            attributes: attributes.map((attribute) => {
              if (attribute.product_attribute_id == idattr) {
                let attri = attribute.attributes_details.filter(
                  (item) => item.product_attribute_detail_id != id
                );
                return {
                  ...attribute,
                  attributes_details: attri
                };
              } else {
                return attribute;
              }
            })
          })
        );
        setIsDelete(false);
      } else {
        CVAlertError({
          addToast,
          message:
            deleteProductAttributeDetail.message ||
            'Sucedió algo, intentelo más tarde.'
        });
      }
    }
    setIsDelete(false);
  };

  const initdata = async () => {
    console.log('Impriendo user id por cliente');
    console.log(us);
    console.log(client?.user_id);
    const result = await AxiosGQL(
      PRODUCT_ATTRIBUTES_DETAILS(us?.company_id || us?.user_id)
    );

    console.log({ result });

    dispatch(A_PRODUCTVIEW({ attributes: result?.productAttributes || [] }));
  };

  // useEffect(() => {
  //   if (attributes.length == 0) initdata();
  // }, []);

  useEffect(() => {
    if (allattributes.length == 0) initdata();
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
                      {it.type_attribute == 'CUSTOM' && (
                        <Button
                          onClick={() => {
                            setIsDelete(true);
                            setItemToDelete(it.product_attribute_id);
                            setTitleModal('Atributo');
                          }}>
                          {Trash}
                        </Button>
                      )}
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
                              <Box textAlign='center'>
                                {it.type_attribute == 'CUSTOM' ? 'Acción' : ''}
                              </Box>
                            </Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {it.attributes_details.map((itd, ind) => (
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
                                  {itd.type_attribute == 'CUSTOM' && (
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
                                  )}
                                </Box>
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                      {it.type_attribute == 'CUSTOM' && (
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
                      )}
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
      <AddAttribute isOpen={isOpen} onClose={onClose} />
      <AddAttributeDetails
        isOpen={adetails}
        onClose={() => setAdetails(!adetails)}
        idattr={idattr}
        typeattr={typeattr}
        detail={detail}
        setdetail={setdetail}
        initData={initData}
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

export default AttrProducts;
