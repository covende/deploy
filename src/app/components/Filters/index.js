import React, { useEffect, useState } from 'react';
import { Divider, Flex, Box } from '@chakra-ui/react';
import { createTheme, Slider } from '@material-ui/core';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import {
  BRANDS_BY_CATEGORY,
  BRANDS_BY_COMPANY,
  PUBLIC_BRANDS
} from '@/app/api/graphql/webseller/ProductService';
import { CVButton, CVText, CVInput } from '@/common/CovendeTemplate';
import CVRadio from '@/common/CovendeTemplate/CVRadio';
import {
  CONDICIONPROD,
  TIPOSTORE,
  COLORS
} from '@/common/CovendeTemplate/CVThemes';
import { initfiltro } from '@CVPages/core/tienda/Productos';
import CVCheck from '@CVTemplate/core/CVCheck';
import CVSelectMultiple from '@CVTemplate/core/CVSelectMultiple';
// import { initfiltro } from '@/app/main/categoria/ProductsList';

function Filters({ category, filtro, setfiltro, fetchdata, blug }) {
  const [brands, setbrands] = useState([]);
  const [filtroCurrent, setFiltroCurrent] = useState({});
  const [brandsSelect, setBrandsSelect] = useState([]);

  // const valor = '';
  const handleChange = (event, newValue) => {
    setfiltro({
      ...filtro,
      filtro: {
        ...filtro.filtro,
        price_range: {
          ...filtro.filtro.price_range,
          desde: newValue[0],
          hasta: newValue[1]
        }
      }
    });
  };
  function valuetext(value) {
    return `S/ ${value}`;
  }

  const handleInputChangeBengin = (event) => {
    setfiltro({
      ...filtro,
      filtro: {
        ...filtro.filtro,
        price_range: {
          ...filtro.filtro.price_range,
          desde: event
        }
      }
    });
  };

  const handleInputChangeEnding = (event) => {
    setfiltro({
      ...filtro,
      filtro: {
        ...filtro.filtro,
        price_range: {
          ...filtro.filtro.price_range,
          hasta: event
        }
      }
    });
  };

  const muiTheme = createTheme({
    overrides: {
      MuiSlider: {
        thumb: {
          color: COLORS.skyblue
        },
        track: {
          color: COLORS.skyblue
        },
        rail: {
          color: 'black'
        }
      }
    }
  });

  const isEqualFiltroCurrent = (newFilter) => {
    const keys1 = Object.keys(filtroCurrent);
    const keys2 = Object.keys(newFilter);

    if (keys1.length !== keys2.length) return false;

    for (let key of keys1)
      if (filtroCurrent[key] !== newFilter[key]) return false;

    return true;
  };

  const initdata = async () => {
    let validate =
      blug || category._id || filtro?.codTienda || filtro?.filtro?.search || '';

    if (!!!validate) return;

    let isEqual = isEqualFiltroCurrent({
      category_id: blug || category._id || '',
      company_id: filtro?.codTienda,
      search: filtro?.filtro?.search || ''
    });

    if (isEqual) return;

    const { publicBrands } = await AxiosGQL(
      PUBLIC_BRANDS({
        category_id: blug || category._id || '',
        company_id: filtro?.codTienda,
        search: filtro?.filtro?.search || ''
      })
    );

    setbrands(
      publicBrands
        ? publicBrands.map((brand) => ({
            text: brand.name,
            value: brand.brand_id
          }))
        : []
    );

    setBrandsSelect([]);

    if (publicBrands) {
      setFiltroCurrent({
        category_id: blug || category._id || '',
        company_id: filtro?.codTienda,
        search: filtro?.filtro?.search || ''
      });
    }
  };

  useEffect(() => {
    initdata();
  }, [category?._id, blug, filtro]);

  return (
    <Flex direction='column'>
      <Flex justifyContent='space-between'>
        <CVText fontSize='2rem' fontWeight='bold' color='blue'>
          Filtro
        </CVText>
        <CVButton
          border='1px solid transparent'
          backgroundColor='white'
          color='blue'
          boxShadow='unset'
          fontWeight='bold'
          onClick={() => {
            // setfiltro({ ...filtro });
            setBrandsSelect([]);

            setfiltro({
              ...filtro,
              filtro: {
                ...filtro.filtro,
                delivery_free: false,
                marca_id: '',
                marca_ids: [],
                type_sale: 'BOTH',
                price_range: {
                  desde: '',
                  hasta: ''
                }
              }
            });

            // filtro: { ...filtro.filtro, marca_id: value }

            // fetchdata(initfiltro);
            fetchdata({
              ...filtro,
              filtro: {
                ...filtro.filtro,
                delivery_free: false,
                marca_id: '',
                marca_ids: [],
                type_sale: 'BOTH',
                price_range: {
                  desde: '',
                  hasta: ''
                }
              }
            });
          }}>
          Limpiar filtro
        </CVButton>
      </Flex>
      <Divider />
      <CVText fontWeight='bold' color='blue'>
        Tipo de Venta
      </CVText>
      <SizeBox />
      <CVRadio
        itemDirection='column'
        options={TIPOSTORE}
        value={filtro.filtro.type_sale}
        onChange={(value) =>
          setfiltro({
            ...filtro,
            filtro: { ...filtro.filtro, type_sale: value }
          })
        }
      />
      <SizeBox />
      <CVText fontWeight='bold' color='blue'>
        Rango de Precio
      </CVText>
      <SizeBox />
      {/* <ThemeProvider theme={muiTheme}>
        <Slider
          value={[
            filtro.filtro.price_range.desde,
            filtro.filtro.price_range.hasta
          ]}
          onChange={handleChange}
          valueLabelDisplay='auto'
          aria-labelledby='range-slider'
          getAriaValueText={valuetext}
          min={0}
          max={1000}
        />
      </ThemeProvider> */}
      <Flex alignItems='center' justifyContent='end' width='100%'>
        <CVInput
          type='number'
          width='70%'
          id='Inicio'
          value={[filtro.filtro.price_range.desde]}
          onChange={(value) => {
            console.log({ value });
            handleInputChangeBengin(value);
          }}
        />

        <CVInput
          type='number'
          value={[filtro.filtro.price_range.hasta]}
          id='final'
          width='70%'
          onChange={(e) => handleInputChangeEnding(e)}
        />
      </Flex>

      <SizeBox />
      {/* <CVText fontWeight='bold' color='blue'>
        Condición
      </CVText>
      <CVRadio
        itemDirection='column'
        options={CONDICIONPROD}
        value={filtro.filtro.condicion}
        onChange={(value) =>
          setfiltro({
            ...filtro,
            filtro: { ...filtro.filtro, condicion: value }
          })
        }
      /> */}
      {/* <SizeBox /> */}
      <Flex>
        <CVCheck
          titleAlign='left'
          value={filtro?.filtro?.delivery_free}
          onChange={(value) =>
            setfiltro({
              ...filtro,
              filtro: { ...filtro.filtro, delivery_free: value }
            })
          }
          title='Envío gratis'
        />
      </Flex>
      <SizeBox />
      <CVText fontWeight='bold' color='blue'>
        Marcas
      </CVText>
      <SizeBox />
      <CVSelectMultiple
        width='100%'
        height='6rem'
        multiple={true}
        value={brandsSelect}
        options={brands}
        onChange={(value) => {
          setBrandsSelect(value);
          setfiltro({
            ...filtro,
            filtro: {
              ...filtro.filtro,
              marca_ids: value.map((v) => v.value)
            }
          });
        }}
      />

      {/* <CVRadio
        itemDirection='column'
        options={brands.map((brand) => ({
          text: brand.name,
          value: brand.brand_id
        }))}
        value={filtro.filtro.marca_id}
        onChange={(value) =>
          setfiltro({
            ...filtro,
            filtro: { ...filtro.filtro, marca_id: value }
          })
        }
      /> */}
      <SizeBox />
      <CVButton onClick={() => fetchdata(filtro)}>FILTRAR</CVButton>
    </Flex>
  );
}

export default Filters;
