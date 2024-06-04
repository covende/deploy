import AxiosGQL from '@/app/api/rest/AxiosGQL';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVCheck, CVInput, CVSelect } from '@/common/CovendeTemplate';
import CVDateRangePicker from '@/common/CovendeTemplate/CVDateRangePicker';
import { TIPOCLIENT, TIPOAMBIENTE } from '@/common/CovendeTemplate/CVThemes';
import { Flex } from '@chakra-ui/layout';
import { ALL_EJECUTIVOS } from '@CVApi/core/webbo/BClientService';
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const options = [
  { text: 'Ambos', value: 'ALL' },
  { text: 'SI', value: 'YES' },
  { text: 'NO', value: 'NO' }
];

function CustomerFiltros({
  filtros,
  setfiltros,
  fetchdata,
  initFilter,
  onOpenCategories
}) {
  const [ejecutivos, setEjecutivos] = useState([]);
  const init = async () => {
    if (ejecutivos.length == 0) {
      let { getExecutives } = await AxiosGQL(ALL_EJECUTIVOS());
      if (getExecutives) {
        setEjecutivos([{ text: 'Todos', value: 'ALL' }, ...getExecutives]);
      }
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <CVInput
          height='3rem'
          placeholder='Pedido a Buscar'
          value={filtros.search}
          onChange={(value) => setfiltros({ ...filtros, search: value })}
          iconFind={true}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={2}>
        <CVSelect
          height='3rem'
          options={TIPOCLIENT}
          title={'Tipo de Cliente: '}
          value={filtros.tipo}
          onChange={(value) => setfiltros({ ...filtros, tipo: value })}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={1} lg={2}></Grid>

      <Grid item xs={12} sm={6} md={2} lg={2}>
        <CVSelect
          height='3rem'
          options={TIPOAMBIENTE}
          title={'Ambiente: '}
          value={filtros.ambiente}
          onChange={(value) => setfiltros({ ...filtros, ambiente: value })}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <CVDateRangePicker
          title='Tiempo'
          height='3rem'
          dateend={filtros.dateend}
          datestart={filtros.datestart}
          disabledDate={null}
          onChange={(range) =>
            setfiltros({
              ...filtros,
              dateend: range[1],
              datestart: range[0]
            })
          }
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3} lg={2}>
        <CVSelect
          height='3rem'
          options={ejecutivos}
          title={'Ejecutivos: '}
          value={filtros.ejecutivo}
          onChange={(value) => setfiltros({ ...filtros, ejecutivo: value })}
        />
      </Grid>

      <Grid item xs={6} sm={6} md={2} lg={2}>
        <CVSelect
          height='3rem'
          options={options}
          title={'Verificados: '}
          value={filtros.verificados}
          onChange={(value) => setfiltros({ ...filtros, verificados: value })}
        />
      </Grid>

      <Grid item xs={6} sm={6} md={2} lg={2}>
        <CVSelect
          height='3rem'
          options={options}
          title={'Activos: '}
          value={filtros.bloqueados}
          onChange={(value) => setfiltros({ ...filtros, bloqueados: value })}
        />
        {/* <CVCheck
          titleAlign='left'
          title='Bloqueados'
          value={filtros.bloqueados}
          onChange={(value) =>
            setfiltros({
              ...filtros,
              bloqueados: value || false,
              firstTime: false
            })
          }
        /> */}
      </Grid>

      <Grid item xs={12} sm={6} md={5} lg={6}>
        <Flex justifyContent='end'>
          {/* <CVButton
            onClick={() => onOpenCategories(true)}
            height='3rem'
            backgroundColor='blue'>
            Categorias
          </CVButton>
          <SizeBox /> */}
          <CVButton
            onClick={() => fetchdata(1, 10, filtros)}
            height='3rem'
            backgroundColor='red'>
            Filtrar
          </CVButton>
          <SizeBox />
          <CVButton
            height='3rem'
            variant='outlined'
            color='green'
            onClick={() => {
              setfiltros(initFilter);
              fetchdata(1, 10);
            }}>
            Limpiar
          </CVButton>
        </Flex>
      </Grid>
    </Grid>
  );
}

export default CustomerFiltros;
