import { Grid } from '@material-ui/core';
import React from 'react';
import CVDateRangePicker from '@/common/CovendeTemplate/CVDateRangePicker';
import { CVButton, CVInput, CVSelect } from '@/common/CovendeTemplate';
import { Flex } from '@chakra-ui/layout';
import { BsSearch } from 'react-icons/bs';
import { CVEstadoDevolucionStatus } from '@/common/CovendeTemplate/CVEstado/CVEstadoDevolucion';
import CVText from '@CVTemplate/core/CVText';
import { COLORS } from '@CVTemplate/core/CVThemes';

function Filtros({ filtro, setFiltro, onOpen }) {
  const setDateRange = (range) => {
    const [startDate, endDate] = range;
    setFiltro({
      ...filtro,
      startdate: startDate,
      enddate: endDate
    });
  };

  const DTSTATUS = Object.keys(CVEstadoDevolucionStatus).map((k, v) => ({
    text: CVEstadoDevolucionStatus[k].text,
    value: CVEstadoDevolucionStatus[k].value
  }));
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <form
          style={{ width: '100%' }}
          onSubmit={(e) => {
            e.preventDefault();
            setFiltro({
              ...filtro,
              search: filtro.search
            });
            document.forms[0].elements[0].blur();
          }}>
          <CVInput
            iconFind={true}
            submit
            placeholder='Busque aquí por devolución'
            widthBox='100%'
            icon={
              <CVText>
                <BsSearch color={COLORS['white']} />
              </CVText>
            }
            value={filtro.search}
            onChange={(value) =>
              setFiltro({
                ...filtro,
                search: value
              })
            }
          />
        </form>
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <CVDateRangePicker
          title='Tiempo:'
          dateend={filtro.enddate}
          datestart={filtro.startdate}
          onChange={setDateRange}
          height='3rem'
          disabledDate={false}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={2}>
        <CVSelect
          height='3rem'
          options={DTSTATUS}
          title={'Estado: '}
          value={filtro.estado}
          onChange={(value) => setFiltro({ ...filtro, estado: value })}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <Flex justifyContent='flex-end'>
          <CVButton height='3rem' onClick={() => onOpen(true)}>
            Contacto de Devoluciones
          </CVButton>
        </Flex>
      </Grid>
      <Grid item xs={12} lg={1}>
        <Flex justifyContent='flex-end'>
          <CVButton
            height='3rem'
            variant='outlined'
            color='green'
            onClick={() =>
              setFiltro({
                search: '',
                startdate: new Date(),
                enddate: new Date(),
                estado: ''
              })
            }>
            Limpiar
          </CVButton>
        </Flex>
      </Grid>
    </Grid>
  );
}

export default Filtros;
