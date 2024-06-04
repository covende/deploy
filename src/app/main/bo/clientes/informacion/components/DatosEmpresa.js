import React, { useEffect, useState } from 'react';
import { Grid, GridItem, Box, Flex } from '@chakra-ui/react';
import DecorativeHeading from '../../components/DecorativeHeading';
import DecorativeText from '../../components/DecorativeText';
import DataText from '../../components/DataText';
import DataText2 from '../../components/DataText2';
import { Link } from 'react-router-dom';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { Tooltip } from '@chakra-ui/tooltip';
import { FiSave } from 'react-icons/fi';
import { useToast } from '@chakra-ui/toast';
import {
  COMPANY_BY_OWNER,
  COMPANY_DIRECTIONS_BY_COMPANY,
  LIST_OF_STORE_SUBACCOUNTS,
  updateStoreData
} from '@/app/api/graphql/webbo/BClientService';
import { useDispatch, useSelector } from 'react-redux';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { svgEdit } from '@/app/assets/images/SVG';
import CVInput from '@CVTemplate/core/CVInput';
import CVUseStateCallback from '@CVTemplate/core/CVHooks/CVUseStateCallback';
import {
  CVErrorTags,
  isPhone,
  onlyNumber
} from '@CVTemplate/core/CVValidation';
import { HStack } from '@chakra-ui/layout';
import { MdCancel } from 'react-icons/md';

import { BsPencilSquare } from 'react-icons/bs';
import {
  listdistrito,
  listprovincia
} from '@CVApi/core/webpublic/createstore/Planservice';
import CVSelect from '@CVTemplate/core/CVSelect';
import { tipo_sociedades } from '@CVApi/core/webbuy/TableAPIService';
import CVRadio from '@CVTemplate/core/CVRadio';
import { TIPOSTORE } from '@CVTemplate/core/CVThemes';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import { Spinner, useDisclosure } from '@chakra-ui/react';
import { A_CLIENTS } from '../../redux/actions';

import {
  Button
  // Card,
  // CardActions,
  // CardContent,
  // Grid,
  // Typography
} from '@material-ui/core';
import ModalDireccion from '@CVPages/core/admin/seller/configuracion/components/tab2/ModalDireccion';
import ModalDelete from '@CVPages/core/bo/faq/components/ModalDelete';
import {
  DELETE_COMPANY_DIRECTIONS,
  SET_DEFAULT_DIRECTION
} from '@CVApi/core/webpublic/userData/UserCompanyService';

function DatosEmpresa() {
  const { client } = useSelector((state) => state.Clients);
  const [errors, seterrors] = CVUseStateCallback(false);
  const addToast = useToast();
  const [edit, setEdit] = useState(true);
  const [editValue, setEditValue] = useState({
    phone: '',
    comercial_name: '',
    type_of_sale: '',
    social_razon: '',
    ruc: '',
    sociedad: '',
    direction: '',
    state: '',
    province: '',
    district: '',
    reference: '',
    phone: ''
  });

  const [dataEmpresa, setdataEmpresa] = useState({});
  const [dataEmpresaDirecciones, setdataEmpresaDirecciones] = useState([]);
  const [dataEmpresaUsers, setdataEmpresaUsers] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [openDeleteDirection, setOpenDeleteDirection] = useState(false);

  const [newDirection, setNewDirection] = useState();

  const [sellerDirection, setSellerDirection] = useState({
    id: '',
    store_id: '',
    province: '',
    type_local: '',
    supervisor: '',
    phone: '',
    street_fiscal: '',
    country: '',
    state: '',
    district: '',
    predetermined: '',
    reference: '',
    zipcode: ''
  });

  const [deleteparams, setDeleteparams] = useState({
    company_id: '',
    direction_id: ' '
  });

  const [departamentos, setDepartamentos] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [company_id, setCompany_id] = useState('');
  const [loading, setLoading] = useState(false);

  const [sociedades, setSociedades] = useState([]);
  const dispatch = useDispatch();
  const [init, setInit] = useState(false);

  /**
   *
   * @returns Boolean
   */
  const objetosIguales = () => {
    let valueOld = {
      phone: dataEmpresa?.phone || '',
      comercial_name: dataEmpresa?.comercial_name || '',
      social_razon: dataEmpresa?.social_razon || '',
      ruc: dataEmpresa?.ruc || '',
      sociedad: dataEmpresa?.sociedad || '',
      direction: dataEmpresa?.direction || '',
      state: dataEmpresa?.state || '',
      province: dataEmpresa?.province || '',
      district: dataEmpresa?.district || '',
      type_of_sale: dataEmpresa?.type_of_sale || '',
      reference: dataEmpresa.reference || '',
      phone: dataEmpresa.phone || ''
    };

    for (const clave in valueOld) {
      if (valueOld[clave] !== editValue[clave]) return false;
    }

    return true;
  };

  const updateCompany = async () => {
    setLoading(true);
    if (CVErrorTags()) {
      setLoading(false);
      return false;
    }

    if (objetosIguales()) {
      setLoading(false);
      setEdit(true);
      return CVAlertSuccess({
        addToast,
        message: 'Datos actualizados correctamente'
      });
    }

    const { editCompany: resp } = await updateStoreData({
      company_id,
      ...editValue
    });

    if (resp?._id) {
      setdataEmpresa({
        ...dataEmpresa,
        ...editValue
      });

      dispatch(
        A_CLIENTS({
          client: { ...client, store: { ...client.store, ...editValue } }
        })
      );

      CVAlertSuccess({
        addToast,
        message: 'Datos actualizados correctamente'
      });
    } else {
      setLoading(false);
      return CVAlertError({
        addToast,
        message: 'Ocurrieron errores, vuelva a enviarlo mas tarde'
      });
    }

    setLoading(false);
    setEdit(true);
  };

  const onSubmit = () => {
    !errors ? seterrors(true, updateCompany) : updateCompany();
  };

  const cancelEdit = async () => {
    setEdit(!edit);
    if (dataEmpresa?.state && dataEmpresa?.province && dataEmpresa?.district) {
      if (editValue.state !== dataEmpresa.state) {
        setLoading(true);
        await findprovincs({
          _id: dataEmpresa.departamento._id,
          departament_code: dataEmpresa.departamento?.code,
          province_id: dataEmpresa.provincia._id
        });
      } else if (editValue.province !== dataEmpresa.province) {
        setLoading(true);
        await finddistrict(
          dataEmpresa?.provincia?._id,
          dataEmpresa?.provincia?.code
        );
      }
    }
    setEditValue({
      phone: dataEmpresa?.phone || '',
      comercial_name: dataEmpresa?.comercial_name || '',
      social_razon: dataEmpresa?.social_razon || '',
      ruc: dataEmpresa?.ruc || '',
      sociedad: dataEmpresa?.sociedad || '',
      direction: dataEmpresa?.direction || '',
      state: dataEmpresa?.state || '',
      province: dataEmpresa?.province || '',
      district: dataEmpresa?.district || '',
      type_of_sale: dataEmpresa?.type_of_sale || '',
      departamento: dataEmpresa?.departamento,
      provincia: dataEmpresa?.provincia,
      distrito: dataEmpresa?.distrito,
      reference: dataEmpresa?.reference || '',
      phone: dataEmpresa?.phone || ''
    });

    setLoading(false);
  };

  const initDepartments = async () => {
    const data = await AxiosGQL(`{
      departamentos{
        _id
        code
        name
      }
    }`);
    setDepartamentos(data?.departamentos || []);
  };

  const initdata = async () => {
    let store_id = client?.store?._id;
    if (store_id) {
      let societies = await tipo_sociedades();
      societies && setSociedades(societies);
      setCompany_id(store_id);

      await initDepartments();

      const { companyDirectionsByID } = await AxiosGQL(
        COMPANY_DIRECTIONS_BY_COMPANY(store_id)
      );
      const { listOfStoreSubaccounts } = await AxiosGQL(
        LIST_OF_STORE_SUBACCOUNTS(store_id)
      );

      setdataEmpresa(client?.store);

      companyDirectionsByID && setdataEmpresaDirecciones(companyDirectionsByID);
      setdataEmpresaUsers(listOfStoreSubaccounts);

      if (client?.store?.departamento?.code && client?.store?.provincia?._id) {
        await findprovincs({
          _id: client.store.departamento._id,
          departament_code: client.store.departamento?.code,
          province_id: client.store.provincia._id,
          is_first_time: true
        });
      }

      setEditValue({
        phone: client?.store?.phone || '',
        comercial_name: client?.store?.comercial_name || '',
        social_razon: client?.store?.social_razon || '',
        ruc: client?.store?.ruc || '',
        sociedad: client?.store?.sociedad || '',
        direction: client?.store?.direction || '',
        state: client?.store?.state || '',
        province: client?.store?.province || '',
        district: client?.store?.district || '',
        type_of_sale: client?.store?.type_of_sale || '',
        departamento: client?.store?.departamento,
        provincia: client?.store?.provincia,
        distrito: client?.store?.distrito,
        reference: client?.store?.reference,
        phone: client?.store.phone
      });

      setInit(!init);
    }
  };

  /**
   *
   * @param {Object} args
   * @param {String} args._id - ID de departamento
   * @param {String} args.departament_code - Código de departamento
   * @param {String|undefined} args.province_id - ID de province
   * @param {Boolean} args.is_first_time - Esta iniciando
   */
  const findprovincs = async (args) => {
    let result = await AxiosGQL(
      listprovincia(String(args?.departament_code).padStart(2, '0'))
    );

    if (!result?.provincias) return;

    if (!args?.is_first_time)
      setEditValue({
        ...editValue,
        state: args?._id,
        departamento: departamentos.find((dep) => dep._id == args?._id),
        province: '',
        district: ''
      });

    setProvincias(result.provincias);

    if (args?.province_id) {
      await finddistrict(
        args?.province_id,
        getCodePlace({
          arrayPlaces: result.provincias,
          value: args?.province_id
        })
      );
    } else setDistritos([]);
  };

  const finddistrict = async (_id, province_code, isFirstTime) => {
    let result = await AxiosGQL(
      listdistrito(String(province_code).padStart(4, '0'))
    );
    if (result?.distritos) {
      if (!isFirstTime)
        setEditValue({
          ...editValue,
          province: _id,
          provincia: provincias.find((prov) => prov._id == _id),
          district: ''
        });
      setDistritos(result.distritos);
    }
  };

  const getCodePlace = ({ arrayPlaces, value }) => {
    let place = arrayPlaces.filter((da) => da._id === value);
    if (!place.length) return false;
    return place[0].code;
  };

  useEffect(() => {
    if (!init) initdata();
  }, [client.store]);

  const initDataDirections = async () => {
    const { companyDirectionsByID } = await AxiosGQL(
      COMPANY_DIRECTIONS_BY_COMPANY(company_id)
    );

    companyDirectionsByID && setdataEmpresaDirecciones(companyDirectionsByID);
  };

  const updateDirection = (sellerDirection) => {
    onOpen();
    const newSellerDirection = {
      id: sellerDirection._id,
      type_local: sellerDirection.type_local,
      supervisor: sellerDirection.supervisor,
      phone: sellerDirection.phone,
      street_fiscal: sellerDirection.street_fiscal,
      country: sellerDirection.country,
      zipcode: sellerDirection.zipcode,
      reference: sellerDirection.reference,
      state: sellerDirection.state._id,
      province: sellerDirection.province._id,
      district: sellerDirection.district._id
    };
    setSellerDirection(newSellerDirection);
  };

  const setpreterminadoDirection = async (company_id, direction_id) => {
    const { setAsDefaultDirection } = await AxiosGQL(
      SET_DEFAULT_DIRECTION(company_id, direction_id)
    );

    if (setAsDefaultDirection) {
      await initDataDirections();
      CVAlertSuccess({ addToast, message: 'Dirección predeterminada' });
    } else {
      CVAlertError({ addToast, message: 'Error al esteblecer' });
    }
  };

  const removeDirection = async (deleteparams) => {
    const { deleteCompanyDirection } = await AxiosGQL(
      DELETE_COMPANY_DIRECTIONS(
        deleteparams.company_id,
        deleteparams.direction_id
      )
    );

    if (deleteCompanyDirection) {
      await initDataDirections();
      CVAlertSuccess({ addToast, message: 'Eliminado' });
    } else {
      CVAlertError({ addToast, message: 'Error al eliminar' });
    }
  };

  const sedesEmpresa = (
    <GridItem colSpan='8'>
      <DecorativeHeading>Establecimientos Conexos</DecorativeHeading>

      <Box textAlign='right'>
        <Button
          onClick={() => {
            setSellerDirection({
              ...sellerDirection,
              store_id: company_id
            });
            setNewDirection(true);
            onOpen();
          }}
          variant='contained'
          style={{
            backgroundColor: '',
            borderRadius: '20px',
            color: '#FFFFFF',
            backgroundColor: '#004772'
          }}>
          Añadir Direccion
        </Button>
      </Box>
      <SizeBox />

      {dataEmpresaDirecciones.map((item, index) => (
        <Box
          key={index}
          bg='#F2F2F2'
          w='100%'
          h='130px'
          p='10px 16px'
          mb='12px'>
          <Grid
            templateRows='repeat(2, 1fr)'
            templateColumns='repeat(3, 1fr)'
            gap='8px'>
            <Grid
              templateRows='repeat(1, 1fr)'
              templateColumns='repeat(2, max-content)'
              gap='16px'>
              <Grid
                templateRows='repeat(3, max-content)'
                templateColumns='repeat(1, 1fr)'
                alignContent='center'
                gap='8px'>
                <DecorativeText>Tipo de establecimiento:</DecorativeText>
                <DecorativeText>Encargado:</DecorativeText>
                <DecorativeText>Dirección:</DecorativeText>
              </Grid>
              <Grid
                templateRows='repeat(3, max-content)'
                templateColumns='repeat(1, 1fr)'
                alignContent='center'
                gap='8px'>
                <DataText2>{item.type_local || '-'}</DataText2>
                <DataText2>{item.supervisor || '-'}</DataText2>
                <DataText2>{item.street_fiscal || '-'}</DataText2>
              </Grid>
            </Grid>
            <Grid
              templateRows='repeat(1, 1fr)'
              templateColumns='repeat(2, max-content)'
              gap='16px'>
              <Grid
                templateRows='repeat(3, max-content)'
                templateColumns='repeat(1, 1fr)'
                alignContent='center'
                gap='8px'>
                <DecorativeText>País:</DecorativeText>
                <DecorativeText>Región:</DecorativeText>
                <DecorativeText>Código Postal:</DecorativeText>
              </Grid>
              <Grid
                templateRows='repeat(3, max-content)'
                templateColumns='repeat(1, 1fr)'
                alignContent='center'
                gap='8px'>
                <DataText2>{item.country || '-'}</DataText2>
                <DataText2>{item?.state?.name || '-'}</DataText2>
                <DataText2>{item.zipcode || '-'}</DataText2>
              </Grid>
            </Grid>
            <Grid
              templateRows='repeat(1, 1fr)'
              templateColumns='repeat(2, max-content)'
              gap='16px'>
              <Grid
                templateRows='repeat(3, max-content)'
                templateColumns='repeat(1, 1fr)'
                alignContent='center'
                gap='8px'>
                <DecorativeText>Provincia:</DecorativeText>
                <DecorativeText>Distrito:</DecorativeText>
                <DecorativeText>Teléfono:</DecorativeText>
              </Grid>
              <Grid
                templateRows='repeat(3, max-content)'
                templateColumns='repeat(1, 1fr)'
                alignContent='center'
                gap='8px'>
                <DataText2>{item?.province?.name}</DataText2>
                <DataText2>{item?.district?.name || '-'}</DataText2>
                <DataText2>{item.phone || '-'}</DataText2>
              </Grid>
            </Grid>
            <Grid
              templateRows='repeat(1, 1fr)'
              templateColumns='repeat(1, max-content)'
              gap='16px'>
              <GridItem colSpan={1}>
                <Flex>
                  <Button
                    onClick={() => {
                      updateDirection(item);
                      setNewDirection(false);
                      onOpen();
                    }}
                    variant='contained'
                    style={{
                      backgroundColor: '',
                      borderRadius: '20px',
                      color: '#FFFFFF',
                      backgroundColor: '#004772'
                    }}>
                    Editar
                  </Button>
                  <SizeBox />
                  <Button
                    onClick={() => {
                      setDeleteparams({
                        company_id: company_id,
                        direction_id: item._id
                      });
                      setOpenDeleteDirection(true);
                    }}
                    variant='contained'
                    style={{
                      backgroundColor: '',
                      borderRadius: '20px',
                      color: '#FFFFFF',
                      backgroundColor: '#FF5454'
                    }}>
                    Eliminar
                  </Button>
                  {/* <SizeBox />
                  <Button
                    variant={
                      item.predetermined == true ? 'contained' : 'outlined'
                    }
                    style={{
                      width: '120px',
                      backgroundColor:
                        item.predetermined == true ? '#17BF93' : '#FFFFFF',
                      color: item.predetermined == true ? '#FFFFFF' : '#17BF93'
                    }}
                    onClick={() =>
                      setpreterminadoDirection(company_id, item._id)
                    }>
                    PREDETERMINADO
                  </Button> */}
                </Flex>
              </GridItem>
            </Grid>

            <Grid
              templateRows='repeat(1, 1fr)'
              templateColumns='repeat(1, max-content)'
              gap='16px'></Grid>

            <Grid
              templateRows='repeat(1, 1fr)'
              templateColumns='repeat(1, max-content)'
              gap='16px'>
              <GridItem colSpan={2}>
                <Flex justifyContent='right'>
                  <Tooltip label='Establecer tu dirección a predeterminado'>
                    <Button
                      variant={
                        item.predetermined == true ? 'contained' : 'outlined'
                      }
                      style={{
                        width: '120px',
                        backgroundColor:
                          item.predetermined == true ? '#17BF93' : '#FFFFFF',
                        color:
                          item.predetermined == true ? '#FFFFFF' : '#17BF93'
                      }}
                      onClick={() => {
                        if (!item?.predetermined)
                          setpreterminadoDirection(company_id, item._id);
                      }}>
                      PREDETERMINADO
                    </Button>
                  </Tooltip>
                </Flex>
              </GridItem>
            </Grid>
          </Grid>
        </Box>
      ))}
    </GridItem>
  );

  return (
    <Grid
      templateRows='repeat(2, max-content)'
      templateColumns='repeat(8, 1fr)'
      gap='16px'>
      <GridItem colSpan={3}>
        <Grid
          templateRows='repeat(1, 1fr)'
          templateColumns='repeat(2, max-content)'
          gap='16px'>
          <Grid
            templateRows='repeat(4, 1fr)'
            templateColumns='repeat(1, 1fr)'
            gap='8px'>
            <DecorativeText>Nombre Comercial:</DecorativeText>
            {/* <DecorativeText>Tipo de empresa:</DecorativeText> */}
            <DecorativeText>Razón Social:</DecorativeText>
            <DecorativeText>Ficha RUC:</DecorativeText>
            <DecorativeText>Tipo de venta:</DecorativeText>
          </Grid>
          <Grid
            templateRows='repeat(4, 1fr)'
            templateColumns='repeat(1, 1fr)'
            gap='8px'>
            {edit ? (
              <DataText>{dataEmpresa.comercial_name || '-'}</DataText>
            ) : (
              <CVInput
                marginTop='-0.5rem;'
                errorMessage='Campo obligatorio.'
                error={errors && editValue.comercial_name == ''}
                value={editValue.comercial_name || ''}
                onChange={(value) =>
                  setEditValue({ ...editValue, comercial_name: value })
                }
              />
            )}

            {edit ? (
              <DataText>{dataEmpresa.social_razon || '-'}</DataText>
            ) : (
              <CVInput
                marginTop='-0.5rem;'
                errorMessage='Campo obligatorio.'
                error={errors && editValue.social_razon == ''}
                value={editValue.social_razon || ''}
                onChange={(value) =>
                  setEditValue({ ...editValue, social_razon: value })
                }
              />
            )}

            {edit ? (
              <DataText>{dataEmpresa.ruc || '-'}</DataText>
            ) : (
              <CVInput
                maxLength='11'
                marginTop='-0.5rem;'
                errorMessage='RUC inválido ( 11 caracteres numéricos)'
                value={editValue.ruc || ''}
                error={
                  errors &&
                  (editValue.ruc == '' || editValue?.ruc?.length != 11)
                }
                onChange={(value) =>
                  setEditValue({ ...editValue, ruc: onlyNumber(value || '') })
                }
              />
            )}

            {edit ? (
              <DataText>
                {TIPOSTORE.find(
                  (type) => type.value == dataEmpresa?.type_of_sale
                )?.text || '-'}
              </DataText>
            ) : (
              <CVRadio
                onChange={(value) =>
                  setEditValue({ ...editValue, type_of_sale: value })
                }
                value={editValue.type_of_sale}
                options={TIPOSTORE}
              />
            )}
          </Grid>
        </Grid>
      </GridItem>
      <GridItem colSpan={3}>
        <Grid
          templateRows='repeat(1, 1fr)'
          templateColumns='repeat(2, max-content)'
          gap='16px'>
          <Grid
            templateRows='repeat(8, 1fr)'
            templateColumns='repeat(1, 1fr)'
            gap='8px'>
            <Box display='flex' alignItems='center'>
              <DecorativeText>Tipo de sociedad:</DecorativeText>
            </Box>

            <Box display='flex' alignItems='center'>
              <DecorativeText>Dirección fiscal:</DecorativeText>
            </Box>

            <Box display='flex' alignItems='center'>
              <DecorativeText>País:</DecorativeText>
            </Box>

            <Box display='flex' alignItems='center'>
              <DecorativeText>Región:</DecorativeText>
            </Box>

            <Box display='flex' alignItems='center'>
              <DecorativeText>Provincia:</DecorativeText>
            </Box>
            <Box>
              <DecorativeText>Distrito:</DecorativeText>
            </Box>

            <Box display='flex' alignItems='center'>
              <DecorativeText>Referencia:</DecorativeText>
            </Box>

            <Box display='flex' alignItems='center'>
              <DecorativeText>Telefono:</DecorativeText>
            </Box>
          </Grid>
          <Grid
            templateRows='repeat(4, 1fr)'
            templateColumns='repeat(1, 1fr)'
            gap='8px'>
            {edit ? (
              <DataText>
                {sociedades.find((type) => type.title == dataEmpresa?.sociedad)
                  ?.description || '-'}
              </DataText>
            ) : (
              <CVSelect
                errorMessage='Campo obligatorio.'
                value={editValue.sociedad || ''}
                onChange={(value) =>
                  setEditValue({ ...editValue, sociedad: value })
                }
                options={[
                  { value: '', text: '' },
                  ...sociedades.map((item) => ({
                    text: item.description,
                    value: item.title
                  }))
                ]}
                error={errors && editValue.sociedad == ''}
              />
            )}

            {edit ? (
              <DataText>{dataEmpresa.direction || '-'}</DataText>
            ) : (
              <CVInput
                errorMessage='Campo obligatorio.'
                error={errors && editValue.direction == ''}
                value={editValue.direction || ''}
                onChange={(value) =>
                  setEditValue({ ...editValue, direction: value })
                }
              />
            )}

            {edit ? (
              <DataText>{dataEmpresa.country || '-'}</DataText>
            ) : (
              <CVSelect
                disabled={true}
                value='PERÚ'
                options={[{ text: 'PERÚ', value: 'PERÚ' }]}
                errorMessage='Campo requerido*'
              />
            )}

            {edit ? (
              <DataText>{dataEmpresa?.departamento?.name || '-'}</DataText>
            ) : (
              <CVSelect
                value={editValue.state || ''}
                onChange={(value) =>
                  findprovincs({
                    _id: value,
                    departament_code: getCodePlace({
                      arrayPlaces: departamentos,
                      value
                    })
                  })
                }
                options={(departamentos || []).map((item) => ({
                  text: item.name,
                  value: item._id
                }))}
                error={errors && editValue.state === ''}
                errorMessage='Campo requerido*'
              />
            )}

            {edit ? (
              <DataText>{dataEmpresa?.provincia?.name || '-'}</DataText>
            ) : (
              <CVSelect
                value={editValue.province || ''}
                onChange={(value) =>
                  finddistrict(
                    value,
                    getCodePlace({ arrayPlaces: provincias, value })
                  )
                }
                options={(provincias || []).map((item) => ({
                  text: item.name,
                  value: item._id
                }))}
                error={errors && editValue.province === ''}
                errorMessage='Campo requerido*'
              />
            )}

            {edit ? (
              <DataText>{dataEmpresa?.distrito?.name || '-'}</DataText>
            ) : (
              <CVSelect
                value={editValue.district || ''}
                onChange={(value) =>
                  setEditValue({
                    ...editValue,
                    district: value,
                    distrito: distritos.find((dist) => dist._id == value)
                  })
                }
                options={(distritos || []).map((item) => ({
                  text: item.name,
                  value: item._id
                }))}
                error={errors && editValue.district === ''}
                errorMessage='Campo requerido*'
              />
            )}

            {edit ? (
              <DataText>{dataEmpresa.reference || '-'}</DataText>
            ) : (
              <CVInput
                errorMessage='Campo obligatorio.'
                error={errors && editValue.reference == ''}
                value={editValue.reference || ''}
                onChange={(value) =>
                  setEditValue({ ...editValue, reference: value })
                }
              />
            )}

            {edit ? (
              <DataText>{dataEmpresa.phone || '-'}</DataText>
            ) : (
              <CVInput
                maxLength='9'
                placeholder='Ejemplo: 999888777'
                value={editValue.phone || ''}
                onChange={(value) =>
                  setEditValue({ ...editValue, phone: value })
                }
                error={
                  errors &&
                  (!isPhone(editValue.phone) || editValue.phone === '')
                }
                errorMessage='Sólo caracteres numéricos. No es necesario anteponer +51'
                type='text'
              />
            )}
          </Grid>
        </Grid>
      </GridItem>
      <GridItem colSpan={2}>
        <DecorativeText>Links de Redes Sociales:</DecorativeText>
        <Link to={dataEmpresa.web_page || '#!'} color='#00ADF6' fontSize='13px'>
          {dataEmpresa.web_page || '-'}
        </Link>
      </GridItem>
      <GridItem colSpan={8}>
        {init &&
          (loading ? (
            <Flex alignItems='center' justifyContent=' end'>
              <Spinner style={{ color: '#00ADF6', fontSize: '2rem' }} />
            </Flex>
          ) : edit ? (
            <Flex alignItems='center' justifyContent=' end'>
              <Tooltip label='Editar'>
                <Link
                  style={{ marginLeft: 0 }}
                  to='#'
                  onClick={() => setEdit(!edit)}>
                  <BsPencilSquare
                    style={{ color: '#17BF93', fontSize: '2rem' }}
                  />
                </Link>
              </Tooltip>
            </Flex>
          ) : (
            <Flex alignItems='center' justifyContent=' end'>
              <Tooltip label='Guardar'>
                <Link to='#' onClick={() => onSubmit()}>
                  <FiSave style={{ color: '#004574', fontSize: '2rem' }} />
                </Link>
              </Tooltip>
              <SizeBox />
              <Tooltip label='Cancelar'>
                <Link
                  style={{ marginLeft: 0 }}
                  to='#'
                  onClick={() => cancelEdit()}>
                  <MdCancel style={{ color: '#FF5454', fontSize: '2rem' }} />
                </Link>
              </Tooltip>
            </Flex>
          ))}
      </GridItem>
      {sedesEmpresa}
      {company_id && (
        <ModalDireccion
          storeID={company_id}
          isOpen={isOpen}
          onClose={onClose}
          initData={initDataDirections}
          setSellerDirection={setSellerDirection}
          sellerDirection={sellerDirection}
          isNewDirection={newDirection}
          setIsNewDirection={setNewDirection}
        />
      )}

      {company_id && (
        <ModalDelete
          setConfirmDelete={(value) => value && removeDirection(deleteparams)}
          isOpen={openDeleteDirection}
          onClose={() => setOpenDeleteDirection(!openDeleteDirection)}
          title='Dirección'
        />
      )}
    </Grid>
  );
}

export default DatosEmpresa;
