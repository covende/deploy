import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { Flex } from '@chakra-ui/react';
import { Box } from '@material-ui/core';
import DataCompany from './formuser/DataCompany';
import DataManager from './formuser/DataManager';
import DataAccount from './formuser/DataAccount';
import { useToast } from '@chakra-ui/toast';
import StoreExist from './modales/StoreExist';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVLine } from '@/common/CovendeTemplate';
import { Link } from 'react-router-dom';
import {
  InitialAccount,
  InitialManager,
  InitialStore,
  _initdatastore,
  _SubmitFormStore
} from './utils';
import StoreRegistered from './modales/StoreRegistered';
import CVUseStateCallback from '@/common/CovendeTemplate/CVHooks/CVUseStateCallback';
import { CVErrorTags } from '@/common/CovendeTemplate/CVValidation';
import { CVAlertError } from '@/common/CovendeTemplate/CVAlert';
import { toBase64 } from '@/common/CovendeTemplate/CVCardProduct/CVCardProductMethod';
import { FIND_USER_CHYO } from '@CVApi/core/coupons/cupons';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { confirm_shipment_devolution } from '@CVApi/core/webdevolucion/DevService';

function FormStore({ docs, user_id }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegistered, setisRegistered] = useState(false);
  const onClose = () => setIsOpen(false);
  const [sociedades, setsociedades] = useState([]);

  const [isloading, setIsloading] = useState(false);
  const [departamentos, setDepartamentos] = useState([]);
  const [bancos, setBancos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const addToast = useToast();
  const [userFind, setUserFind] = useState(null);

  const [account, setAccount] = useState(InitialAccount);
  const [store, setStore] = useState(InitialStore);
  const [tipodoc, setTipodoc] = useState(0);
  const [manager, setManager] = useState(InitialManager);
  const [userCajahyo, SetuserCajahyo] = useState();

  const [termino, setTermino] = useState({
    condiciones: false,
    veridico: false,
    autorizacion: false
  });

  const [errors, seterrors] = CVUseStateCallback(false);

  const routerHistory = useHistory();
  const goto_pay = () => {
    routerHistory.push(
      `/crea-tu-tienda/create-plan/${toBase64(user_id)}/${toBase64(
        localStorage.getItem('store_id')
      )}`
    );
  };

  const initdata = async () =>
    await _initdatastore({
      user_id,
      setUserFind,
      setManager,
      manager,
      setDepartamentos,
      setsociedades,
      setTipos,
      setBancos,
      routerHistory
    });

  const senddata = async () => {
    if (CVErrorTags()) {
      CVAlertError({
        addToast,
        message: 'llene todos los datos'
      });
      return false;
    }

    const { findUserCHYO } = await AxiosGQL(FIND_USER_CHYO(store.ruc));
    // SetuserCajahyo(findUserCHYO);
    findUserCHYO.StatusUser == true
      ? (store.provenance = 'CajaHyo')
      : (store.provenance = 'Covende');
    // return findUserCHYO;
    await _SubmitFormStore({
      addToast,
      setIsOpen: setisRegistered,
      setIsloading,
      account,
      store,
      manager,
      userFind,
      user_id,
      termino
    });
  };

  const onSubmit = async () => {
    localStorage.setItem('store', JSON.stringify(store));
    localStorage.setItem('account', JSON.stringify(account));
    !errors ? seterrors(true, senddata) : senddata();
  };

  useEffect(() => {
    initdata();
  }, [user_id]);

  return (
    <Box>
      <DataCompany
        user_id={user_id}
        tipos={tipos}
        departamentos={departamentos}
        setIsOpen={setIsOpen}
        setisRegistered={setisRegistered}
        store={store}
        setStore={setStore}
        sociedades={sociedades}
        errors={errors}
      />
      <SizeBox height='2rem' />
      <CVLine
        lineHeight='1px'
        color='blue'
        backgroundColor='white'
        titles={[
          '',
          ' Datos del representante legal o titular de la empresa',
          ''
        ]}
      />
      <SizeBox height='2rem' />
      <DataManager
        manager={manager}
        setManager={setManager}
        docs={docs}
        tipodoc={tipodoc}
        setTipodoc={setTipodoc}
        errors={errors}
      />
      <SizeBox height='2rem' />

      <CVLine
        backgroundColor='white'
        lineHeight='1px'
        color='blue'
        titles={['', 'Datos Bancarios', '']}
      />
      <SizeBox height='2rem' />

      <DataAccount
        bancos={bancos}
        account={account}
        setAccount={setAccount}
        termino={termino}
        setTermino={setTermino}
        errors={errors}
      />
      <SizeBox />

      <Flex justifyContent='center'>
        <Link to='/'>
          <CVButton
            variant='outlined'
            isLoading={isloading}
            disabled={isloading}>
            <SizeBox width='3rem' />
            Cancelar
            <SizeBox width='3rem' />
          </CVButton>
        </Link>
        <SizeBox />
        <CVButton
          isLoading={isloading}
          onClick={() => onSubmit()}
          disabled={isloading || !(termino.condiciones && termino.veridico)}>
          <SizeBox width='3rem' />
          CONTINUAR
          <SizeBox width='3rem' />
        </CVButton>
      </Flex>
      {isOpen && <StoreExist isOpen={isOpen} onClose={onClose} />}
      {isRegistered && (
        <StoreRegistered
          isOpen={isRegistered}
          onClose={() => {
            onClose();
            goto_pay();
          }}
        />
      )}
    </Box>
  );
}

export default FormStore;
