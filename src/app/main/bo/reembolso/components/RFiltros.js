import React, { Fragment, useState } from 'react';
import { Grid } from '@material-ui/core';
import CVInput from '@CVTemplate/core/CVInput';
import CVDateRangePicker from '@CVTemplate/core/CVDateRangePicker';
import CVRow from '@CVTemplate/core/CVRow';
import CVCheck from '@CVTemplate/core/CVCheck';
import RConfirm from './RConfirm';

const RFiltros = ({ filtro, setfiltro, reff }) => {
  const [selected, setselected] = useState([]);
  const [isConfirm, setisConfirm] = useState(false);

  const todeposited = () => {
    reff.current.click();
    const selecteds = JSON.parse(localStorage.getItem('selecteds'));
    setselected(selecteds);
    localStorage.removeItem('selecteds');
    setisConfirm(!isConfirm);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <CVRow alignItems='center' onClick={() => todeposited()}>
            <CVCheck title='Marcar como depositado' titleAlign='left' />
          </CVRow>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CVDateRangePicker
            title='Tiempo'
            dateend={filtro.daterange[1]}
            datestart={filtro.daterange[0]}
            onChange={(value) => setfiltro({ ...filtro, daterange: value })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CVInput
            placeholder='Busca lo que deseas'
            value={filtro.search}
            onChange={(value) => setfiltro({ ...filtro, search: value })}
            iconFind={true}
          />
        </Grid>
      </Grid>
      {isConfirm && (
        <RConfirm
          selected={selected}
          isOpen={isConfirm}
          onClose={() => setisConfirm(!isConfirm)}
        />
      )}
    </>
  );
};

export default RFiltros;
