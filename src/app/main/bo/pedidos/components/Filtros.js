import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import {
  CVButton,
  CVDateRangePicker,
  CVInput,
  CVSelect
} from '@/common/CovendeTemplate';
import { TIPOCOMPRA } from '@/common/CovendeTemplate/CVThemes';
import { CVEstadoPedidoStatus } from '@/common/CovendeTemplate/CVEstado/CVEstadoPedido';

function Filtros({ filtro, setFiltro, fetchdata, initFilter }) {
  const [clear, setClear] = useState(false);

  const setDateRange = (range) => {
    const [startDate, endDate] = range;
    setFiltro({
      ...filtro,
      startdate: startDate,
      enddate: endDate
    });
  };

  useEffect(() => {
    if (clear) fetchdata();
  }, [clear]);

  const DTSTATUS = Object.keys(CVEstadoPedidoStatus).map((k, v) => ({
    text: CVEstadoPedidoStatus[k].text,
    value: CVEstadoPedidoStatus[k].value
  }));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <CVInput
          height='3rem'
          placeholder='Pedido a Buscar'
          value={filtro.search}
          onChange={(value) => setFiltro({ ...filtro, search: value })}
          iconFind={true}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <CVSelect
          height='3rem'
          options={TIPOCOMPRA}
          title={'Pedido: '}
          value={filtro.buytype}
          onChange={(value) => setFiltro({ ...filtro, buytype: value })}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <CVSelect
          height='3rem'
          options={DTSTATUS}
          title={'Estado: '}
          value={filtro.estado}
          onChange={(value) => setFiltro({ ...filtro, estado: value })}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <CVDateRangePicker
          title={'Tiempo: '}
          dateend={filtro.enddate}
          datestart={filtro.startdate}
          onChange={setDateRange}
          disabledDate={null}
          height='3rem'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <Flex justifyContent='space-around'>
          <CVButton
            onClick={() => {
              if (JSON.stringify(filtro) !== JSON.stringify(initFilter)) {
                fetchdata(1, 10, filtro);
              }
            }}
            height='3rem'
            backgroundColor='red'>
            Filtrar
          </CVButton>
          <CVButton
            height='3rem'
            variant='outlined'
            color='green'
            onClick={() => {
              setClear(false);
              setFiltro({
                search: '',
                startdate: new Date(),
                enddate: new Date(),
                estado: '',
                buytype: ''
              });
              setTimeout(() => {
                setClear(true);
              }, 300);
            }}>
            Limpiar
          </CVButton>
        </Flex>
      </Grid>
    </Grid>
  );
}

export default Filtros;
