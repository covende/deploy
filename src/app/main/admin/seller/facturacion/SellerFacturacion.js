import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PendingActiveStore from '../PendingActiveStore';
import { Container, Grid } from '@material-ui/core';
import CVText from '@CVTemplate/core/CVText';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVPanel from '@CVTemplate/core/CVPanel';
import { COLORS } from '@CVTemplate/core/CVThemes';
import { Flex, Box, Tabs, TabList, Tab, TabPanel } from '@chakra-ui/react';
import {
  SELLER_INCOME,
  COMPANY_BY_ID,
  GET_SALES_CUT_BY_COMPANY,
  GET_TRANSACTIONS_BY_SELLER,
  GET_SELLER_BALANCES
} from '@CVApi/core/webpublic/userData/UserCompanyService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import CVLink from '@CVTemplate/core/CVLink';
import { VscFilePdf } from 'react-icons/vsc';
import IEDetalle from './components/IEDetalle';
import IEResumen from './components/IEResumen';
import CVButton from '@CVTemplate/core/CVButton';
import { useDisclosure } from '@chakra-ui/react/';
import MConfirmFacturacion from './MConfirmFacturacion';
import { useToast } from '@chakra-ui/toast';
import { CVMoneyFormat } from '@CVTemplate/core/CVMethods';
import FiltrosFacturacion from './components/FiltrosFacturacion';

export const formatDate = (number) => {
  if (number) {
    let numbercito = number.substring(2, 10);
    let day = numbercito.substring(0, 2);
    let month = numbercito.substring(2, 4);
    let year = numbercito.substring(4, 10);
    return year + '-' + month + '-' + day;
  }
  return '-/-/-';
};
const SellerFacturacion = () => {
  const { store_status, product } = useSelector((state) => state.ProductView);
  const [sellerIncome, setSellerIncome] = useState([]);
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentMove, setCurrentMove] = useState({ _id: '' });
  const [transactions, setTransactions] = useState([]);
  const [infoTrans, setInfoTrans] = useState({
    page: 1,
    total: 0,
    itemsPage: 10,
    pages: 1
  });
  const [sellerBalances, setSellerBalances] = useState({
    balanceBySettle: 0,
    availableBalance: 0
  });
  const [showIncome, setShowIncome] = useState(false);

  // const { isOpen, onClose, onOpen } = useDisclosure();
  // const dispatch = useDispatch();
  const addToast = useToast();
  const [confirm, setConfirm] = useState(false);

  const [store, setstore] = useState({});

  const [filtro, setFiltro] = useState({
    search: '',
    startDate: new Date(),
    endDate: new Date()
  });

  const handleFilterChange = (newFilters) => {
    setFiltro((prevFilters) => ({
      ...prevFilters,
      ...newFilters
    }));
  };

  const setTransactionsInit = async (page = 1) => {
    try {
      console.log('Applying filter:', filtro); // Agregado para verificar el filtro
      const { getTransactionsBySeller: data } = await AxiosGQL(
        GET_TRANSACTIONS_BY_SELLER({
          store_id: currentMove.store_id,
          code: currentMove?.code,
          itemsPage: infoTrans?.itemsPage,
          page: page || infoTrans.page,
          search: filtro.search,
          desde: filtro.startDate,
          hasta: filtro.endDate
        })
      );

      console.log('Received data:', data); // Agregado para verificar los datos recibidos

      data?.info && setInfoTrans(data.info);
      data.info?.total && setTransactions(data.transactions);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const initdata = async () => {
    const { company } = await AxiosGQL(COMPANY_BY_ID(product?.store_id));
    setstore(company);

    const { getSellerBalances } = await AxiosGQL(
      GET_SELLER_BALANCES(product?.store_id)
    );

    getSellerBalances?.status &&
      setSellerBalances(getSellerBalances.sellerBalances);

    const { getSalesCutByCompany: data } = await AxiosGQL(
      GET_SALES_CUT_BY_COMPANY(product?.store_id)
    );

    data?.info?.total > 0 && setShowIncome(true);

    if (data.status) {
      data?.info && setInfo(data.info);

      if (data?.info?.total) {
        data.salesCut[0] = { ...data.salesCut[0], selected: true };

        setSellerIncome(data.salesCut);
        setCurrentMove(data.salesCut[0]);
      }
    }
  };

  const changePage = async (page) => {
    page != infoTrans.page && (await setTransactionsInit(page));
  };

  useEffect(() => {
    if (product?.store_id !== '') console.log('total filters', filtro);
    initdata();
  }, [product?.store_id, filtro]);

  useEffect(() => {
    if (currentMove?._id !== '') {
      setInfoTrans({ page: 1, itemsPage: 1 });
      setTransactionsInit();
    }
  }, [currentMove?._id, filtro]);

  return store_status != 'APPROVED' ? (
    <PendingActiveStore />
  ) : (
    <Container>
      <CVText fontSize='1.5rem' color='blue' fontWeight='bold'>
        Ingresos
      </CVText>
      <SizeBox />
      {showIncome ? (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={7} md={8}>
            <Flex my={3} alignItems='center'>
              <Box
                borderColor={COLORS['skyblue']}
                backgroundColor='white'
                borderWidth='3px'
                borderRadius='12px'
                height='104px'
                width='400px'
                py={30}>
                <CVText textAlign='center' color='blue' fontSize='24px'>
                  Saldo a Liquidar
                </CVText>

                <CVText
                  textAlign='center'
                  color='blue'
                  fontSize='80px'
                  fontWeight='bold'>
                  {CVMoneyFormat({
                    amount: sellerBalances.balanceBySettle || 0
                  })}
                </CVText>
              </Box>
              <Box
                bg={COLORS['skyblue']}
                height='104px'
                width='400px'
                textAlign='center'
                borderRadius='12px'
                py={30}>
                <CVText textAlign='center' color='white'>
                  Saldo Disponible
                </CVText>
                <CVText
                  textAlign='center'
                  color='white'
                  fontSize='80px'
                  fontWeight='bold'>
                  {CVMoneyFormat({
                    amount: sellerBalances.availableBalance || 0
                  })}
                </CVText>
              </Box>
            </Flex>
            {(!currentMove?.confirmedAt || currentMove?.invoice_url) && (
              <CVPanel
                style={{
                  borderLeft: '10px solid ' + COLORS['green']
                }}
                variant='box'
                height='auto'>
                <Flex justifyContent='space-between' alignItems='center'>
                  {/* {currentMove && (
      <CVText color='blue' fontWeight='bold'>
        {currentMove?.code} | {formatDate(currentMove?.code)}
      </CVText>
    )} */}
                  <SizeBox />

                  {!currentMove?.confirmedAt && (
                    <CVButton
                      backgroundColor='red'
                      onClick={() => setConfirm(true)}
                      isLoading={loading}
                      padding='1px 30px'>
                      NO CONFIRMAR
                    </CVButton>
                  )}

                  {currentMove?.invoice_url && (
                    <CVLink href={currentMove.invoice_url} target='_blank'>
                      <Flex flexDirection='column' alignItems='center'>
                        <VscFilePdf style={{ fontSize: '2rem' }} />
                        <CVText>Factura</CVText>
                      </Flex>
                    </CVLink>
                  )}
                </Flex>
              </CVPanel>
            )}

            <SizeBox />

            <FiltrosFacturacion
              filtro={filtro}
              setFiltro={handleFilterChange}
            />
            <SizeBox />
            <IEDetalle
              transactions={transactions}
              setTransactions={setTransactions}
              info={infoTrans}
              currentMove={currentMove}
              setPage={changePage}
            />
          </Grid>
          <Grid item xs={12} sm={5} md={4}>
            <IEResumen
              currentMove={currentMove}
              setCurrentMove={setCurrentMove}
              movements={sellerIncome}
              setMovements={setSellerIncome}
            />
          </Grid>
        </Grid>
      ) : (
        <CVText fontSize='20' color='gray'>
          No hay datos suficientes para mostrar los ingresos.
        </CVText>
      )}

      {confirm && (
        <MConfirmFacturacion
          isOpen={confirm}
          onClose={() => setConfirm(!confirm)}
          setCurrentMove={setCurrentMove}
          currentMove={currentMove}
          sellerIncome={sellerIncome}
          setSellerIncome={setSellerIncome}
        />
      )}
    </Container>
  );
};

export default SellerFacturacion;
