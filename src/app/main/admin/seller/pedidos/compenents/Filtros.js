import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import CVDateRangePicker from '@/common/CovendeTemplate/CVDateRangePicker';
import { CVButton, CVInput, CVSelect } from '@/common/CovendeTemplate';
import { CVEstadoPedidoStatus } from '@/common/CovendeTemplate/CVEstado/CVEstadoPedido';
import { rolemenu } from '@/app/helpers/role';
import CVCheck from '@CVTemplate/core/CVCheck';
import SizeBox from '@/common/components/CustomComponent/SizeBox';

function Filtros({
  filtro,
  setFiltro,
  fetchdata,
  checkAll,
  setCheckAll,
  masive,
  setMasive,
  deliveryOwnStatus,
  setUpdateStatusBulk
}) {
  const [optsLote, setOptsLote] = useState([
    { value: 'default', text: 'Acciones en lote' },
    { value: 'process', text: 'Procesar' }
  ]);

  const setDateRange = (range) => {
    const [startDate, endDate] = range;
    setFiltro({
      ...filtro,
      startdate: startDate,
      enddate: endDate
    });
  };

  let roleMenu = rolemenu();

  const clear = () => {
    setFiltro({
      search: '',
      startdate: new Date(),
      enddate: new Date(),
      estado: 'ALL'
    });
    fetchdata(1, 10, {
      search: '',
      startdate: new Date(),
      enddate: new Date(),
      estado: 'ALL'
    });
    setMasive('default');
    setCheckAll(false);
  };

  const DTSTATUS = Object.keys(CVEstadoPedidoStatus).map((k, v) => ({
    text: CVEstadoPedidoStatus[k].text,
    value: CVEstadoPedidoStatus[k].value
  }));

  const initData = async () => {
    if (deliveryOwnStatus == 'APPROVED') {
      setOptsLote([
        ...optsLote,
        { value: 'send', text: 'Enviar' },
        { value: 'completed', text: 'Entregar' },
        { value: 'delete', text: 'Eliminar' }
      ]);
    } else {
      setOptsLote([...optsLote, { value: 'delete', text: 'Eliminar' }]);
    }
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <CVInput
          height='3rem'
          iconFind={true}
          value={filtro.search}
          onChange={(value) =>
            setFiltro({
              ...filtro,
              search: value
            })
          }
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <CVDateRangePicker
          title='Tiempo: '
          dateend={filtro.enddate}
          datestart={filtro.startdate}
          onChange={setDateRange}
          height='3rem'
          disabledDate={null}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <CVSelect
          height='3rem'
          title='Estado: '
          options={
            roleMenu == '/bo/'
              ? DTSTATUS
              : DTSTATUS.filter(
                  (status) => !['PENDING_PAY', 'EXPIRED'].includes(status.value)
                )
          }
          value={filtro.estado}
          onChange={(value) => setFiltro({ ...filtro, estado: value })}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={2}>
        <Flex justifyContent='space-around'>
          <CVButton
            backgroundColor='red'
            onClick={() => fetchdata(1, 10, filtro)}>
            Filtrar
          </CVButton>
          <CVButton
            variant='outlined'
            backgroundColor='green'
            onClick={() => clear()}>
            Limpiar
          </CVButton>
        </Flex>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Flex alignItems='center'>
          <CVCheck value={checkAll} onChange={(value) => setCheckAll(value)} />
          <SizeBox />
          <CVSelect
            value={masive}
            onChange={(value) => setMasive(value)}
            options={optsLote}
          />
          <SizeBox />
        </Flex>
      </Grid>

      <Grid item xs={12} sm={6} md={8}>
        <Flex justifyContent='end'>
          <CVButton
            backgroundColor='blue'
            onClick={() => setUpdateStatusBulk(true)}>
            CARGA MASIVA
          </CVButton>
        </Flex>
      </Grid>
    </Grid>
  );
}

export default Filtros;
