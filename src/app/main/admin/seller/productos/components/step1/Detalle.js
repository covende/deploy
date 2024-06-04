import themeCovende from '@/themeCovende';
import { Flex, Text } from '@chakra-ui/layout';
import { Box, Container, Grid } from '@material-ui/core';
import React from 'react';
import { ProductSubTitle } from '../../ProductsStyle';
import { useDisclosure } from '@chakra-ui/hooks';
import AddImage from '../modales/AddImage';
import { Tooltip } from '@chakra-ui/react/';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { onlyMoney } from '@/common/CovendeTemplate/CVValidation';
import CVInput, { CVErrorLabel } from '@CVTemplate/core/CVInput';
import CVInputChip from '@CVTemplate/core/CVInputChip';
import CVInputImageGallery from '@CVTemplate/core/CVInputImageGallery';
import CVText from '@CVTemplate/core/CVText';
import CVTextArea from '@CVTemplate/core/CVTextArea';

function Detalle({ description, setProducto, errors }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const setDescription = (data) => setProducto({ description: data });

  return (
    <Box>
      <ProductSubTitle>1.3. Detalle del producto</ProductSubTitle>
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12}>
            <CVText color='blue' fontWeight='600' fontSize='16px'>
              Descripción destacada
              <span style={{ color: themeCovende.colors.rojo }}>*</span>
            </CVText>
            <CVText color='boldGray'>
              {/* Esto será lo primero que verán los compradores. Ingresa la
              información más relevante y atrayente. */}
              Esto será lo primero que verán tus clientes. Destaca lo esencial,
              explicando cómo y en qué tu producto los beneficiará. Sé claro
              sobre su propósito y uso, desglosa beneficios clave y detalla lo
              que incluye. Simplifica para facilitar la comprensión y no olvides
              agregar palabras clave relevantes. ¡Añade esa chispa especial a
              tus descripciones y destaca tus productos!.
            </CVText>
            <Box mt={1}>
              <CVInput
                height='100%'
                maxLength='300'
                multiline={true}
                error={errors && description.destacada == ''}
                value={description.destacada}
                onChange={(value) =>
                  setDescription({
                    ...description,
                    destacada: value
                  })
                }
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <CVText color='blue' fontWeight='600' fontSize='16px'>
              Descripción detallada del producto{' '}
              <span style={{ color: themeCovende.colors.rojo }}>*</span>
            </CVText>
            <CVText color='boldGray'>
              {/* Ingresa todas las características y beneficios de tu producto. */}
              Ingresa todas las características e información técnica sobre tu
              producto
            </CVText>
            <Box mt={1}>
              {/* <CVInput
                height='100%'
                multiline={true}
                error={errors && description.detallada == ''}
                value={description.detallada}
                onChange={(value) =>
                  setDescription({
                    ...description,
                    detallada: value
                  })
                }
              /> */}

              <CVTextArea
                content={description.detallada}
                setContent={(value) =>
                  setDescription({
                    ...description,
                    detallada: value
                  })
                }
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Flex direction='column'>
              <CVText color='blue' fontWeight='600' fontSize='16px'>
                Palabras clave{' '}
                <span style={{ color: themeCovende.colors.rojo }}>*</span>
              </CVText>
              <CVText color='boldGray'>
                {/* Ingresa las palabras clave con las que el comprador usualmente
                busca el producto que vendes. Separa las palabras clave con la
                tecla enter. maximo 12 */}
                Elige palabras estratégicas que destaquen las esencia única y
                beneficios de tus productos. Frases o sinónimos que potencian tu
                visibilidad en las búsquedas. Piensa en términos que abarquen la
                variedad de tus productos. Por ejemplo, si vendes bikinis,
                considera opciones como "ropa de verano" o "outfits de playa".
                Separa las palabras clave con la tecla enter. máximo 12
              </CVText>
              <Flex flexWrap='wrap' alignItems='end'>
                <CVInputChip
                  value={description.keywords}
                  onChange={(value) =>
                    setDescription({
                      ...description,
                      keywords: [...value]
                    })
                  }
                />
                <SizeBox />
                <CVText color='boldGray'>
                  {description.keywords.length}/12
                </CVText>
              </Flex>
              {errors && description.keywords.length == 0 && (
                <CVErrorLabel errorMessage='Las Palabras clave son importantes' />
              )}
            </Flex>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {/* 
              <Text>Contenido del producto</Text>
              <Typography variant='caption'>
                Detalla si el producto viene con objetos adiciones como: cables,
                bolsas, cargadores, etc.
              </Typography>

              <CVInput
                error={description.contenido.length == 0}
                value={description.contenido}
                onChange={(value) =>
                  setDescription({
                    ...description,
                    contenido: value
                  })
                }
              />
              <SizeBox />
                */}
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Flex flexDirection='column'>
              <CVText color='blue' fontWeight='600' fontSize='16px'>
                Añadir Fotografia
                <span style={{ color: themeCovende.colors.rojo }}>*</span>{' '}
              </CVText>
              <CVText color='boldGray'>
                Te recomendamos subir una foto frontal, de vista trasera,
                lateral derecho, lateral izquierdo y una o dos fotos en las que
                se vean los detalles resaltantes de tu producto.
              </CVText>
              <SizeBox />
              <Box
                // onClick={() => onOpen()}
                style={{
                  padding: '1rem',
                  borderRadius: '1rem',
                  border: '1px solid #ECECEC'
                }}>
                <CVInputImageGallery
                  gallery={description.fotografias}
                  onClick={() => onOpen()}
                  imageHeight='100px'
                  imageWidth='100px'
                  limit={6}
                  justifyContent='start'
                />
              </Box>
              <SizeBox />
              {errors && description.fotografias.length == 0 && (
                <CVErrorLabel errorMessage='Agregue al menos una imagen' />
              )}
            </Flex>
          </Grid>

          <Grid item container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <CVText color='blue' fontWeight='600' fontSize='16px'>
                Material Principal
              </CVText>
              <CVText color='boldGray'>
                Ejemplo: algodón, sintético, aluminio, etc.
              </CVText>
              <CVInput
                error={errors && description.material == '0'}
                value={description.material}
                onChange={(value) =>
                  setDescription({
                    ...description,
                    material: value
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <CVText color='blue' fontWeight='600' fontSize='16px'>
                Peso Producto
                <span style={{ color: themeCovende.colors.rojo }}>*</span>
              </CVText>
              <CVText color='boldGray'>Peso de Producto</CVText>
              <CVInput
                errorMessage='El peso es obligatorio'
                error={errors && description.peso.length == 0}
                iconFind={true}
                icon={<Text color='#000000'>Kg</Text>}
                placeholder='15'
                buttonColor='white'
                value={description.peso}
                onChange={(value) =>
                  setDescription({ ...description, peso: onlyMoney(value) })
                }
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <CVText color='blue' fontWeight='600' fontSize='16px'>
              Dimensiones del producto
            </CVText>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} md={4}>
                <Tooltip label='Largo (cm)'>
                  <span>
                    <CVInput
                      errorMessage=''
                      // error={errors &&
                      //   (Number(description.dimensiones.ancho) + Number(description.dimensiones.alto) + Number(description.dimensiones.largo) >= 200)}
                      iconFind={true}
                      icon={<Text color='#000000'>cm</Text>}
                      placeholder='Largo'
                      buttonColor='white'
                      value={description.dimensiones.largo}
                      onChange={(value) =>
                        setDescription({
                          ...description,
                          dimensiones: {
                            ...description.dimensiones,
                            largo: onlyMoney(value)
                          }
                        })
                      }
                    />
                  </span>
                </Tooltip>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <Tooltip label='Ancho (cm)'>
                  <span>
                    <CVInput
                      errorMessage=''
                      // error={errors &&
                      //   (Number(description.dimensiones.ancho) + Number(description.dimensiones.alto) + Number(description.dimensiones.largo) >= 140)}
                      iconFind={true}
                      icon={<Text color='#000000'>cm</Text>}
                      placeholder='Ancho'
                      buttonColor='white'
                      value={description.dimensiones.ancho}
                      onChange={(value) =>
                        setDescription({
                          ...description,
                          dimensiones: {
                            ...description.dimensiones,
                            ancho: onlyMoney(value)
                          }
                        })
                      }
                    />
                  </span>
                </Tooltip>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <Tooltip label='Alto (cm)'>
                  <span>
                    <CVInput
                      errorMessage=''
                      // error={errors &&
                      //   (Number(description.dimensiones.ancho) + Number(description.dimensiones.alto) + Number(description.dimensiones.largo) >= 140)}
                      iconFind={true}
                      icon={<Text color='#000000'>cm</Text>}
                      placeholder='Alto'
                      buttonColor='white'
                      value={description.dimensiones.alto}
                      onChange={(value) =>
                        setDescription({
                          ...description,
                          dimensiones: {
                            ...description.dimensiones,
                            alto: onlyMoney(value)
                          }
                        })
                      }
                    />
                  </span>
                </Tooltip>
              </Grid>
              {/* {errors &&
                (Number(description.dimensiones.ancho) + Number(description.dimensiones.alto) + Number(description.dimensiones.largo) >= 140) &&
                  <Box pl='8px'> <CVText fontWeight='bold' color='red'>La suma de las dimensiones deben ser menor a 140 cm.</CVText> </Box>} */}
            </Grid>
          </Grid>
        </Grid>
        <AddImage isOpen={isOpen} onClose={onClose} />
      </Container>
    </Box>
  );
}

export default Detalle;
