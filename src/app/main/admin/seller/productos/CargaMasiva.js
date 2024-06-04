import React, { useState, useRef, useEffect } from 'react';
import slugify from 'slugify';
import { useDispatch, useSelector } from 'react-redux';
import { A_CATEGORYPRODUCTS } from '@/app/main/bo/arborescencia-de-categorias/redux/Action';
import { Grid } from '@material-ui/core';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { CVDownload } from '@/common/CovendeTemplate';
import Categorias from './components/step1/S1Categorias';
import { A_PRODUCTVIEW } from './redux/ProductViewAction';
import { Box, Center, Text } from '@chakra-ui/react';
import { tienda, tiendaBo } from './redux/ProductUpdate';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { AxiosGqlClient } from '@/app/infrastructure/graphql/axios-gql-client/axios-gql-client';

import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import {
  ALL_BRANDS,
  BULK_LOAD_PRODUTCS,
  PRODUCT_ATTRIBUTES_DEFAULT
} from '@/app/api/graphql/webseller/ProductService';
import { CVButton } from '@CVTemplate/core/index';
import { useToast } from '@chakra-ui/toast';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVDownloadXlxs from '@CVTemplate/core/CVDownloadXlsx';

function CargaMasiva({ store }) {
  const { categorys, treecategorys } = useSelector(
    (state) => state.CategoryProducts
  );

  const { client } = useSelector((state) => state.Clients);
  const { categorias, product } = useSelector((state) => state.ProductView);
  const dispatch = useDispatch();
  const [okupload, setOkupload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [grandpa, setGrandpa] = useState([]);
  const [storeID, setStoreID] = useState('');
  const [excelFile, setExcelFile] = useState('');
  const [brands, setBrands] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const addToast = useToast();
  const setProducto = (data) => dispatch(A_PRODUCTVIEW({ ...data }));
  const setCategory = (data) => dispatch(A_CATEGORYPRODUCTS({ ...data }));

  let productHeaders = () => {
    let headers = [
      {
        header: 'Código_categoría(*)',
        comment: 'Código de categoría de su producto',
        width: 28,
        key: 'categoryCode'
      },
      {
        header: 'Nombre_categoría(*)',
        comment: 'Nombre de categoría de su producto',
        width: 30,
        key: 'categoryName'
      },
      {
        header: 'Fotos(*)',
        comment:
          'En este campo es donde debes pegar los enlaces de las fotos de tu producto. Si tienes varias fotos, solo sepáralas con comas.',
        width: 43
      },
      {
        header: 'Nombre(*)',
        comment: 'En este campo escribe el nombre de tu producto',
        width: 28
      },
      {
        header: 'Modelo(*)',
        comment: 'Ingrese el modelo de producto',
        width: 28
      },
      {
        header: 'Marcas',
        key: 'brand',
        comment: 'Seleccione la marca de su producto',
        width: 28,
        options: brands
      },
      {
        header: 'SKU(*)',
        comment:
          'Ingresa el SKU del producto. Debe ser un código Alfabético o numérico, sin carácter especiales o espacios, este código es creado por el vendedor',
        width: 38
      },
      {
        header: 'Procedencia(*)',
        key: 'productOrigin',
        comment: 'En este espacio, debes especificar el origen de tu producto.',
        options: ['Fabricación', 'Importación', 'Distribución', 'Re-venta'],
        width: 38
      },
      {
        header: 'Precio(*)',
        comment:
          'Indica el precio que quieres que tus clientes paguen por tu producto en covende.com',
        width: 28
      },
      {
        header: 'Stock(*)',
        comment:
          'Ingrese la cantidad de productos disponibles para la venta en covende.com',
        width: 28
      },
      {
        header: 'Descripción(*)',
        comment:
          'Aquí debes redactar una descripción que destaque las características más emocionantes y únicas de tu producto. Asegúrate de que sea clara y convincente',
        width: 43
      },
      {
        header: 'Detalles(*)',
        comment:
          'En este campo deberas ingresar más información sobre el producto, como especificaciones técnicas o detalles relevantes',
        width: 43
      },
      {
        header: 'Palabras_clave(*)',
        comment:
          'Estas palabras o frases ayudarán a los compradores a encontrar tu producto más fácilmente en las búsquedas. Agrega hasta 12 palabras relacionadas con tu producto,  solo sepáralas con comas.',
        width: 52
      },
      {
        header: 'Material(*)',
        comment:
          '¿De qué está hecho tu producto? Aquí puedes decir si es de madera, acero, plástico, etc.',
        width: 28
      },
      {
        header: 'Largo_producto(cm)*',
        comment:
          'Este campo se refiere a la longitud física del producto, ingrese solo números',
        width: 30
      },
      {
        header: 'Ancho_producto(cm)*',
        comment:
          'Aquí debes medir la distancia desde el lado más ancho del producto al lado opuesto,ingrese solo números',
        width: 32
      },
      {
        header: 'Alto_producto(cm)*',
        comment:
          'El alto del producto representa la medida desde la base hasta la parte más alta del artículo. ,ingrese solo números',
        width: 32
      },
      {
        header: 'Peso_producto(kg)*',
        comment:
          'Indica el peso del producto en unidades de medida como kilogramos o libras,ingrese solo números',
        width: 28
      },
      {
        header: 'Largo_paquete(cm)*',
        comment:
          'Similar al largo del producto, pero aquí se refiere al tamaño del paquete en el que se enviará el producto,ingrese solo números',
        width: 34
      },
      {
        header: 'Ancho_paquete(cm)*',
        comment:
          'Esta medida se refiere al ancho del paquete de envío, es decir, cuán ancho es el paquete en su parte más ancha,ingrese solo números',
        width: 34
      },
      {
        header: 'Alto_paquete(cm)*',
        comment:
          'Indica la altura del paquete de envío desde la base hasta la parte más alta,ingrese solo números',
        width: 28
      },
      {
        header: 'Peso_paquete(kg)*',
        comment:
          'El peso del paquete se refiere al peso total de todos los elementos incluidos en el envío, incluido el producto en sí, los materiales de embalaje y cualquier accesorio adicional,ingrese solo números',
        width: 48
      },
      {
        header: 'Días_preparación_paquete*',
        comment:
          'Este campo indica la cantidad de días que necesitas para empacar y preparar el paquete antes de enviarlo ,ingrese solo números',
        width: 32
      },
      {
        header: 'Garantía(días)',
        comment:
          'En este campo, debes especificar la duración de la garantía que ofreces para el producto. Esto proporciona a los compradores la tranquilidad de saber que pueden recibir asistencia o reemplazo si el producto tiene algún problema dentro de ese período de tiempo.',
        width: 52
      },
      {
        header: 'Condiciones de garantía',
        comment:
          "Por favor, especifique las condiciones bajo las cuales se aplicará la garantía de su producto. Por ejemplo, mencione situaciones como 'fallas técnicas durante el primer mes de uso'.",
        width: 45
      },
      {
        header: 'Tipo de oferta',
        key: 'offerType',
        comment:
          'Indica el tipo de oferta que se mostrara en tu producto ya sea porcentaje o monto fijo',
        width: 34,
        options: ['Fijo', 'Porcentaje']
      },
      {
        header: 'Oferta',
        comment:
          'Indica si tienes alguna oferta especial o descuento para el producto. Puedes mencionar cualquier promoción, como "descuento del 10% " o "50% de descuento" o ingresar directamente el precio de oferta como "S/245" o  "S/100". Ingrese solo número',
        width: 54
      },
      {
        header: 'Inicio de oferta',
        comment:
          'Esta fecha marca el comienzo de la oferta o promoción especial. Es importante proporcionar una fecha de inicio clara',
        width: 40
      },
      {
        header: 'Fin de oferta',
        comment:
          'Aquí debes especificar la fecha en la que la oferta especial o descuento finaliza',
        width: 40
      }
    ];

    Array.prototype.splice.apply(headers, [12, 0].concat(attributes));

    return headers;
  };

  const exportation = grandpa.map((ls) => ({
    categoryCode: ls.id,
    categoryName: ls.name
  }));

  const initdata = async () => {
    let store_id = await tiendaBo(dispatch, { product, store });
    setStoreID(store_id);
    if (brands.length == 0) {
      const da = await AxiosGQL(ALL_BRANDS);
      if (da?.brands?.brands) {
        setBrands(da?.brands?.brands.map((brand) => brand?.name));
      }
    }

    if (attributes.length == 0) {
      const { productAttributesDefault } = await AxiosGQL(
        PRODUCT_ATTRIBUTES_DEFAULT
      );

      console.log(productAttributesDefault);

      if (productAttributesDefault) {
        const options = {
          comments: {
            Color:
              'Por favor, ingrese el color que desea para su producto. Puede consultar nuestra lista de colores disponibles aquí. Asegúrese de seleccionar un color de nuestra lista. Sí ingresa más de un color recuerde separarlos por comas.',
            Talla:
              'Por favor, ingrese la talla que desea para su producto. Puede consultar nuestra lista de tallas disponibles aquí. Asegúrese de seleccionar una talla de nuestra lista. Sí ingresa más de una talla, recuerde separarlos por comas.'
          },
          headers: { Color: 'Colores', Talla: 'Tallas' }
        };

        setAttributes(
          productAttributesDefault.map((attr) => ({
            header: options.headers[attr.name] || '',
            key: slugify(attr?.name),
            comment: options.comments[attr?.name] || '',
            width: 50,
            options: attr?.attributes_details?.map((detail) => detail.name),
            multiOptions: true
          }))
        );
      }
    }
  };

  const selectFile = (e) => {
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      var Base64 = reader.result;
      setExcelFile(Base64);
    };

    reader.onerror = (error) => {
      console.log('error: ', error);
    };
  };

  const updateFile = async (file) => {
    try {
      setLoading(true);

      let { addBulkLoadProductsByCompany } = await AxiosGQL(
        BULK_LOAD_PRODUTCS(storeID, file)
      );

      if (addBulkLoadProductsByCompany.status) {
        setOkupload(true);
        CVAlertSuccess({
          addToast,
          message: addBulkLoadProductsByCompany.message
        });
      } else {
        CVAlertError({
          addToast,
          message: addBulkLoadProductsByCompany.message
        });
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log('init data');
    initdata();
  }, []);

  return (
    <>
      <Text color={COLORS.blue} fontSize='2rem' fontWeight='bold'>
        Carga Masiva de Productos <br></br>
      </Text>
      <Grid container spacing={2} alignContent='stretch' alignItems='stretch'>
        <Grid item xs={12} sm={7} md={8}>
          <Box bg='white' p={3} m={3} borderRadius='10'>
            <Categorias
              setProducto={setProducto}
              categorias={categorias}
              categorys={categorys}
              treecategorys={treecategorys}
              setCategory={setCategory}
              product_id={product.product_id}
              grandpa={grandpa}
              setGrandpa={setGrandpa}
              onlyCharge={true}
            />
          </Box>
          <Center mt={10}>
            {exportation.length > 0 && (
              <Box
                fontSize='1.5rem'
                width='20%'
                p={3}
                backgroundColor={COLORS.gray}
                borderRadius='20'>
                {/* <CVDownload fetchData={exportation} /> */}

                <CVDownloadXlxs
                  headers={productHeaders()}
                  fetchData={exportation}
                  sheetName='Productos'
                  headersColor='9BC2E6'
                />
              </Box>
            )}
            <SizeBox />
          </Center>
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <Box bg='white' p={3} m={3} borderRadius='10'>
            <Text>
              Recuerda que el archivo debe respetar los campos de la plantilla{' '}
            </Text>
            <Center m={6}>
              <Text color={COLORS.skyblue} fontSize='1.5rem' fontWeight='bold'>
                Cargar los productos desde este archivo
              </Text>
            </Center>

            <Center>
              <Box>
                {!okupload && (
                  <input
                    type='file'
                    accept='.xls,.xlsx'
                    onChange={(e) => {
                      selectFile(e);
                    }}
                  />
                )}

                <br />
              </Box>
            </Center>
            <Center my={10}>
              {!okupload ? (
                <CVButton
                  disabled={excelFile == '' || loading}
                  isLoading={loading}
                  backgroundColor='skyblue'
                  fontSize='1.5rem'
                  padding='0 7rem'
                  onClick={() => updateFile(excelFile)}>
                  Subir Archivo{' '}
                </CVButton>
              ) : (
                <Text color={COLORS.red} fontSize='1.5rem' fontWeight='bold'>
                  Productos cargados exitosamente
                </Text>
              )}
            </Center>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default CargaMasiva;
