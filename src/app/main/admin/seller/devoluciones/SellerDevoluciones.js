import { CVText } from '@/common/CovendeTemplate';
import useGetPermisions from '@/common/hooks/useGetPermisions';
import CVPanel from '@CVTemplate/core/CVPanel';
import { Container } from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PendingActiveStore from '../PendingActiveStore';
import Filtros from './components/Filtros';
import TableData from './components/TableData';

import DAddEmail from './components/DModales/DAddEmail';
import DListEmail from './components/DModales/DListEmail';
import ValidationCode from './components/DModales/DValidationCode';
import DDeleteEmail from './components/DModales/DDeleteEmail';
import DOptionsDevolution from './components/DModales/DOptionsDevolution';

function SellerDevoluciones({ store_id }) {
  const { store_status } = useSelector((state) => state.ProductView);
  const permissions = useGetPermisions('Vender', 'Devoluciones');
  const DevolucionesBO = useGetPermisions('Backoffice', 'Devoluciones');
  const [add, setAdd] = useState(false);
  const [list, setList] = useState(false);
  const [viewCode, setViewCode] = useState(false);
  const [deleteEmail, setDeleteEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState([]);
  const [options, setOptions] = useState(false);

  const [filtro, setFiltro] = useState({
    search: '',
    startdate: new Date(),
    enddate: new Date(),
    estado: 'ALL'
  });

  return store_status == 'APPROVED' || store_id ? (
    <Container>
      <CVPanel variant='box' height='100%'>
        <CVText fontSize='1.5rem' fontWeight='bold'>
          Gestión de Devoluciones
        </CVText>
        <br />
        <Filtros filtro={filtro} setFiltro={setFiltro} onOpen={setOptions} />
        <br />
        <TableData
          store_id={store_id}
          filtro={filtro}
          type='seller'
          permissions={permissions ? permissions : DevolucionesBO}
        />
      </CVPanel>

      {options && (
        <DOptionsDevolution
          isOpen={options}
          onClose={() => setOptions(false)}
          store_id={store_id}
          setList={setList}
          setAdd={setAdd}
          setEmails={setEmails}
          emails={emails}
        />
      )}

      {add && (
        <DAddEmail
          isOpen={add}
          onClose={() => {
            setAdd(false);
            setOptions(true);
          }}
          store_id={store_id}
          process={(email) => {
            setAdd(false);
            setViewCode(true);
            setEmail(email);
          }}
        />
      )}

      {viewCode && (
        <ValidationCode
          store_id={store_id}
          isOpen={viewCode}
          userEmail={email}
          onClose={() => {
            setViewCode(!setViewCode);
            setAdd(true);
          }}
          process={() => {
            setViewCode(false);
            setOptions(true);
          }}
        />
      )}

      {list && (
        <DListEmail
          isOpen={list}
          store_id={store_id}
          emails={emails}
          onClose={() => {
            setOptions(true);
            setList(false);
          }}
          process={(email) => {
            setEmail(email);
            setDeleteEmail(true);
          }}
        />
      )}

      {deleteEmail && (
        <DDeleteEmail
          isOpen={deleteEmail}
          store_id={store_id}
          email={email}
          onClose={() => setDeleteEmail(false)}
          process={(email) => {
            let data = emails.filter((mail) => mail != email);
            setEmails(data);
            if (data.length == 0) {
              setDeleteEmail(false);
              setList(false);
              setOptions(true);
            } else setDeleteEmail(false);
          }}
        />
      )}
    </Container>
  ) : (
    <PendingActiveStore />
  );
}

export default SellerDevoluciones;
