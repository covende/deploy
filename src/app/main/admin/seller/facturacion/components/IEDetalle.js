import React, { useState, useEffect } from 'react';

import { v4 } from 'uuid';
import {
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Box,
  Alert,
  AlertTitle,
  AlertIcon
} from '@chakra-ui/react';
import { Tooltip } from '@chakra-ui/tooltip';

import { COLORS } from '@CVTemplate/core/CVThemes';
import CVPanel from '@CVTemplate/core/CVPanel';
import CVText from '@CVTemplate/core/CVText';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVDateFormat } from '../../estadisticas/components/MVendidosUtils';
import { CVMoneyFormat } from '@CVTemplate/core/CVMethods';
import CVPagination from '@CVTemplate/core/CVPagination';
import { RiEyeCloseLine, RiEyeFill } from 'react-icons/ri';

const TH = ({ text, children, color = 'black' }) => (
  <th>
    <Flex
      width='100%'
      justifyContent='center'
      borderBottom={'1px solid ' + COLORS[color] + 50}
      padding='1rem 0'>
      <CVText color={color} textAlign='center'>
        {children ? children : text}
      </CVText>
    </Flex>
  </th>
);

const IEDetalle = ({
  transactions,
  setTransactions,
  info,
  setPage,
  currentMove
}) => {
  const [discounts, setdiscounts] = useState([]);
  const [index, setIndex] = useState(0);
  const [ownShippingExist, setOwnShippingExist] = useState(false);

  useEffect(() => {
    if (transactions && transactions.length > 0) {
      const discount_exist = transactions
        .filter(({ discount_detail }) => discount_detail != null)
        .map(({ discount_detail, order, discounts }) => ({
          ...discount_detail,
          id_order: order,
          discounts
        }));

      const own_shipping_exist = transactions.filter(
        (tran) => tran.own_shipping != 0
      ).length;

      if (own_shipping_exist) setOwnShippingExist(true);
      else setOwnShippingExist(false);

      if (discount_exist.length > 0) {
        setdiscounts(discount_exist);
      } else {
        index && setIndex(0);
        setdiscounts([]);
      }
    }
  }, [transactions]);

  return (
    <CVPanel variant='box' height='auto'>
      {/* <SizeBox /> */}

      <Flex w='100%' justifyContent='right'>
        <Alert status='warning' rounded='lg' maxW='fit-content'>
          <AlertIcon />
          <AlertTitle>
            Seleccionar el código de corte de venta en el resumen de
            movimientos.
          </AlertTitle>
        </Alert>
      </Flex>
      <SizeBox />
      <Tabs index={index} variant='unstyled' onChange={setIndex}>
        <TabList display='flex' alignItems='center'>
          <Tab>
            <CVText
              borderBottom={`${index == 0 ? 1 : 0}px solid ${COLORS['green']}`}
              fontWeight={index == 0 ? 'bold' : 'normal'}
              color='green'>
              Detalle de Pedidos
            </CVText>
          </Tab>
          <SizeBox />
          <CVText color='green'>
            Código de Corte:&nbsp;
            <span style={{ fontWeight: 'bold' }}>
              {currentMove?.code || '-'}
            </span>
          </CVText>

          {/* {discounts && discounts.length > 0 && <CVText color='blue'>|</CVText>}
          {discounts && discounts.length > 0 && (
            <Tab>
              <CVText
                borderBottom={`${index == 1 ? 1 : 0}px solid ${
                  COLORS['green']
                }`}
                fontWeight={index == 1 ? 'bold' : 'normal'}
                color='green'>
                Detalle de descuentos
              </CVText>
            </Tab>
          )} */}
        </TabList>
        <TabPanels>
          <TabPanel>
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <TH color='blue' text='N°' />
                  <TH color='blue' text='Fecha' />
                  <TH color='blue' text='Pedido' />
                  <TH color='blue' text='Precio(S/)' />
                  {ownShippingExist && (
                    <TH color='blue' text='Envío propio(S/)' />
                  )}
                  <TH color='blue' text='Comisión(S/)' />
                  <TH color='blue' text='IGV Comisión(S/)' />
                  <TH color='blue' text='Exceso de Env(S/)' />
                  <TH color='blue' text='Descuentos(S/)' />
                  <TH color='blue' text='A Depositar(S/)' />
                  {discounts.length > 0 && <TH color='blue' text='Detalle' />}
                </tr>
              </thead>
              <tbody>
                {transactions &&
                  transactions.map((transaction, idx) => {
                    return (
                      <>
                        <tr key={v4()}>
                          <TH text={idx + 1} />
                          <TH
                            text={CVDateFormat(new Date(transaction.date), '-')}
                          />

                          <TH text={transaction.order} />
                          <TH
                            text={CVMoneyFormat({
                              amount: transaction?.price || '0',
                              currency: ''
                            })}
                          />
                          {ownShippingExist && (
                            <TH
                              text={CVMoneyFormat({
                                amount: transaction.own_shipping || '0',
                                currency: ''
                              })}
                            />
                          )}

                          <TH
                            text={CVMoneyFormat({
                              amount:
                                (transaction?.commission || 0) +
                                (transaction?.comission_own_shipping || 0),
                              currency: ''
                            })}
                          />
                          <TH
                            text={CVMoneyFormat({
                              amount:
                                ((transaction?.commission || 0) +
                                  (transaction?.comission_own_shipping || 0)) *
                                0.18,
                              currency: ''
                            })}
                          />
                          <TH
                            text={CVMoneyFormat({
                              amount: transaction?.excess_send || '0',
                              currency: ''
                            })}
                          />
                          <TH
                            text={CVMoneyFormat({
                              amount: transaction?.discounts || '0',
                              currency: ''
                            })}
                          />
                          <TH
                            text={CVMoneyFormat({
                              amount:
                                (transaction?.deposit || 0) +
                                (transaction?.own_shipping || 0) -
                                (transaction?.comission_own_shipping || 0) -
                                ((transaction?.commission || 0) +
                                  (transaction?.comission_own_shipping || 0)) *
                                  0.18,
                              currency: ''
                            })}
                          />

                          {transaction?.discounts != 0 ? (
                            <TH
                              children={
                                <Box
                                  color={
                                    COLORS[
                                      transaction.selected ? 'primary' : 'gray'
                                    ]
                                  }
                                  fontSize='1.5rem'
                                  className='actions'
                                  onClick={() => {
                                    setTransactions(
                                      transactions.map((trans) => ({
                                        ...trans,
                                        selected:
                                          trans.order == transaction.order
                                            ? !transaction.selected
                                            : trans.selected
                                      }))
                                    );
                                  }}>
                                  <Tooltip label='Ver Detalle De Descuento'>
                                    <span>
                                      {transaction.selected ? (
                                        <RiEyeCloseLine />
                                      ) : (
                                        <RiEyeFill />
                                      )}
                                    </span>
                                  </Tooltip>
                                </Box>
                              }
                            />
                          ) : (
                            discounts.length > 0 && (
                              <TH text={<CVText color='black'>-</CVText>} />
                            )
                          )}

                          {/* {transaction?.discounts != 0 ? (
                            <TH
                              children={
                                <Box
                                  color={
                                    COLORS[
                                      transaction.selected ? 'primary' : 'gray'
                                    ]
                                  }
                                  fontSize='1.5rem'
                                  className='actions'
                                  onClick={() => {
                                    setTransactions(
                                      transactions.map((trans) => ({
                                        ...trans,
                                        selected:
                                          trans.order == transaction.order
                                            ? !transaction.selected
                                            : trans.selected
                                      }))
                                    );
                                  }}>
                                  <Tooltip label='Ver Detalle De Descuento'>
                                    <span>
                                      {transaction.selected ? (
                                        <RiEyeCloseLine />
                                      ) : (
                                        <RiEyeFill />
                                      )}
                                    </span>
                                  </Tooltip>
                                </Box>
                              }
                            />
                          ) : (
                            <TH text={<CVText color='white'>-</CVText>} />
                          )} */}
                        </tr>
                        {transaction?.discounts != 0 && transaction.selected && (
                          <tr>
                            <td colSpan={9}>
                              <Box bg='#edf2f7' p={4}>
                                <CVText
                                  // borderBottom={`1px solid ${COLORS['green']}`}
                                  fontWeight={'bold'}
                                  color='green'>
                                  Detalle de descuento
                                </CVText>
                                {/* <table style={{ width: '100%' }}> */}

                                <table
                                  variant='simple'
                                  style={{ width: '100%' }}>
                                  <thead>
                                    <tr>
                                      <TH color='blue'>Descripción</TH>
                                      <TH color='blue'>Monto (S/)</TH>
                                      <TH color='blue'>Envío inverso(S/)</TH>
                                      <TH color='blue'>Otros (S/)</TH>
                                      <TH color='blue'>Total (S/)</TH>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {' '}
                                    <tr key={v4()}>
                                      {/* <TH text={idx + 1} /> */}
                                      {/* <TH text={transaction.id_order} /> */}
                                      <TH
                                        text={
                                          transaction?.discount_detail
                                            ?.description
                                        }
                                      />
                                      <TH
                                        text={
                                          transaction?.discount_detail?.amount
                                        }
                                      />
                                      <TH
                                        text={
                                          transaction?.discount_detail
                                            ?.extra_send
                                        }
                                      />
                                      <TH
                                        text={
                                          transaction?.discount_detail?.others
                                        }
                                      />
                                      <TH text={transaction?.discounts} />
                                    </tr>
                                  </tbody>
                                </table>
                              </Box>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
              </tbody>
            </table>
          </TabPanel>

          {/* <TabPanel>
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <TH color='blue'>
                    <br />
                    N° <br />
                  </TH>
                  <TH color='blue'>
                    <br />
                    Pedido <br />
                  </TH>
                  <TH color='blue'>
                    <br />
                    Descripción <br />
                  </TH>
                  <TH color='blue'>
                    Monto <br />
                    (S/)
                  </TH>
                  <TH color='blue'>
                    Envío inverso <br /> (S/)
                  </TH>
                  <TH color='blue'>
                    Otros <br />
                    (S/)
                  </TH>
                  <TH color='blue'>
                    Total <br />
                    (S/)
                  </TH>
                </tr>
              </thead>
              <tbody>
                {discounts.map((item, idx) => (
                  <tr key={v4()}>
                    <TH text={idx + 1} />
                    <TH text={item.id_order} />
                    <TH text={item.description} />
                    <TH text={item.amount} />
                    <TH text={item.extra_send} />
                    <TH text={item.others} />
                    <TH text={item.discounts} />
                  </tr>
                ))}
              </tbody>
            </table>
          </TabPanel> */}
        </TabPanels>
      </Tabs>

      <CVPagination
        page={info?.page}
        setPage={setPage}
        pageNumber={info?.pages}
      />

      {/*       
      <SizeBox />
      <SizeBox />
      <SizeBox />
      <CVText color='green'>Detalle de Descuento</CVText>
      <SizeBox /> */}
    </CVPanel>
  );
};

export default IEDetalle;
