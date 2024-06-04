import React from 'react';

import { v4 } from 'uuid';
import { Flex, Box } from '@chakra-ui/react';

import { COLORS } from '@CVTemplate/core/CVThemes';
import { CVMoneyFormat } from '@CVTemplate/core/CVMethods';
import { formatDate } from '../SellerFacturacion';
import CVText from '@CVTemplate/core/CVText';
import { Tooltip } from '@chakra-ui/tooltip';
import { RiEyeFill, RiEyeCloseLine } from 'react-icons/ri';

const TD = ({
  text,
  color = 'black',
  backgroundColor = 'white',
  onClick = () => {},
  justifyContent = 'start',
  borderBottom = '1px solid ' + COLORS[color] + 50,
  fontSize = '11'
}) => (
  <td>
    <Flex
      onClick={onClick}
      width='100%'
      backgroundColor={backgroundColor}
      justifyContent={justifyContent}
      borderBottom={borderBottom}
      padding='1rem 0.5rem'>
      <CVText
        fontWeight={color == 'blue' ? 'bold' : 'normal'}
        {...{ fontSize, color }}
        textAlign='center'>
        {text}
      </CVText>
    </Flex>
  </td>
);

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

const paymentStatus = {
  PENDING: {
    text: 'Pendiente',
    color: 'red'
  },
  PAID: { text: 'Pagado', color: 'green' }
};

const IEResumen = ({
  movements,
  setMovements,
  setCurrentMove,
  currentMove
}) => {
  const selected = (id, value) =>
    setMovements(
      movements.map((item) => ({
        ...item,
        selected: item._id == id ? value : false
      }))
    );

  return (
    <Box height='100%'>
      <Flex
        padding='1rem'
        borderRadius='1rem 1rem 0 0'
        justifyContent='center'
        alignItems='center'
        backgroundColor={COLORS['blue']}
        color='white'>
        RESUMEN DE MOVIMIENTOS
      </Flex>
      <Box
        padding='1rem'
        borderRadius='0 0 1rem 1rem'
        backgroundColor='white'
        height='100%'>
        <table width='100%'>
          {/* style={{ backgroundColor: '#00ADF6' }} */}
          <thead>
            <tr>
              <TH color='blue' text='Feha de corte' />
              <TH color='blue' text='Código de corte' />
              <TH color='blue' text='Monto total a la fecha de corte' />
              <TH color='blue' text='Estado de pago' />
              <TH color='blue'>
                Detalle <br />
                <br />
              </TH>
            </tr>
          </thead>
          <tbody>
            {movements &&
              movements.map((movement, idx) => (
                <React.Fragment key={v4()}>
                  <tr>
                    <TD
                      text={formatDate(movement?.code)}
                      backgroundColor={
                        currentMove._id == movement._id
                          ? COLORS['gray'] + 50
                          : 'white'
                      }
                      color={currentMove._id == movement._id ? 'blue' : 'black'}
                    />
                    <TD
                      text={movement.code}
                      backgroundColor={
                        currentMove._id == movement._id
                          ? COLORS['gray'] + 50
                          : 'white'
                      }
                      color={currentMove._id == movement._id ? 'blue' : 'black'}
                    />
                    <TD
                      text={CVMoneyFormat({ amount: movement.deposit }) || 0}
                      backgroundColor={
                        currentMove._id == movement._id
                          ? COLORS['gray'] + 50
                          : 'white'
                      }
                      color={currentMove._id == movement._id ? 'blue' : 'black'}
                      justifyContent='end'
                    />
                    <TD
                      text={paymentStatus[movement.payment_status]?.text || '-'}
                      backgroundColor={
                        currentMove._id == movement._id
                          ? COLORS['gray'] + 50
                          : 'white'
                      }
                      color={
                        currentMove._id == movement._id
                          ? paymentStatus[movement.payment_status]?.color ||
                            'black'
                          : 'black'
                      }
                      justifyContent='end'
                    />
                    <TD
                      text={
                        <Box
                          color={
                            currentMove._id == movement._id
                              ? COLORS['blue']
                              : COLORS['gray']
                          }
                          fontSize='1.5rem'
                          className='actions'>
                          <Tooltip label='Ver Detalle de corte'>
                            <span>
                              {movement?.selected ? (
                                <RiEyeCloseLine />
                              ) : (
                                <RiEyeFill />
                              )}
                            </span>
                          </Tooltip>
                        </Box>
                      }
                      onClick={() => {
                        selected(movement?._id, !movement?.selected);
                        setCurrentMove(movement);
                      }}
                      backgroundColor={
                        currentMove._id == movement._id
                          ? COLORS['gray'] + 50
                          : 'white'
                      }
                      justifyContent='center'
                    />
                  </tr>
                  {movement?.selected && (
                    <>
                      <tr>
                        <td colSpan={5}>
                          <Flex justifyContent='space-between'>
                            <TD
                              text='Ingresos'
                              borderBottom='none'
                              color='black'
                            />
                            <TD
                              text={CVMoneyFormat({
                                amount:
                                  movement.income + (movement.own_shipping || 0)
                              })}
                              justifyContent='end'
                              borderBottom='none'
                              color='black'
                            />
                          </Flex>
                        </td>
                      </tr>

                      {movement.own_shipping != 0 && (
                        <tr>
                          <td colSpan={5}>
                            <Flex justifyContent='space-between'>
                              <TD
                                text='Envío Propio'
                                borderBottom='none'
                                color='black'
                              />
                              <TD
                                text={CVMoneyFormat({
                                  amount: movement.own_shipping
                                })}
                                justifyContent='end'
                                borderBottom='none'
                                color='black'
                              />
                            </Flex>
                          </td>
                        </tr>
                      )}

                      <tr>
                        <td colSpan={5}>
                          <Flex justifyContent='space-between'>
                            <TD
                              text='Devoluciones/Cancelaciones'
                              borderBottom='none'
                              color='black'
                            />
                            <TD
                              text={CVMoneyFormat({ amount: movement.dev_can })}
                              justifyContent='end'
                              borderBottom='none'
                              color='black'
                            />
                          </Flex>
                        </td>
                      </tr>

                      <tr>
                        <td colSpan={5}>
                          <Flex justifyContent='space-between'>
                            <TD
                              text='Exceso de envío'
                              borderBottom='none'
                              color='black'
                            />
                            <TD
                              text={CVMoneyFormat({
                                amount: movement.excess_send
                              })}
                              justifyContent='end'
                              borderBottom='none'
                              color='black'
                            />
                          </Flex>
                        </td>
                      </tr>

                      <tr>
                        <td colSpan={5}>
                          <Flex justifyContent='space-between'>
                            <TD
                              text='Comisión de cancelación'
                              borderBottom='none'
                              color='black'
                            />
                            <TD
                              text={CVMoneyFormat({
                                amount: movement.commissions_cancellation
                              })}
                              justifyContent='end'
                              borderBottom='none'
                              color='black'
                            />
                          </Flex>
                        </td>
                      </tr>

                      <tr>
                        <td colSpan={5}>
                          <Flex justifyContent='space-between'>
                            <TD
                              text='Comisión COVENDE'
                              borderBottom='none'
                              color='black'
                            />
                            <TD
                              text={CVMoneyFormat({
                                amount: movement.comission_cv
                              })}
                              justifyContent='end'
                              borderBottom='none'
                              color='black'
                            />
                          </Flex>
                        </td>
                      </tr>

                      <tr>
                        <td colSpan={5}>
                          <Flex justifyContent='space-between'>
                            <TD
                              text='IGV Comisión COVENDE'
                              borderBottom='none'
                              color='black'
                            />
                            <TD
                              text={CVMoneyFormat({
                                amount: movement.igv_comission_cv
                              })}
                              justifyContent='end'
                              borderBottom='none'
                              color='black'
                            />
                          </Flex>
                        </td>
                      </tr>

                      <tr>
                        <td colSpan={5}>
                          <Flex justifyContent='space-between'>
                            <TD
                              text='Monto a depositar'
                              borderBottom='none'
                              color='black'
                            />
                            <TD
                              text={CVMoneyFormat({
                                amount: movement.deposit
                              })}
                              justifyContent='end'
                              borderBottom='none'
                              color='black'
                            />
                          </Flex>
                        </td>
                      </tr>

                      <tr>
                        <td colSpan={5}>
                          <Flex justifyContent='space-between'>
                            <TD
                              text='Saldo Anterior'
                              borderBottom='none'
                              color='black'
                            />
                            <TD
                              text={CVMoneyFormat({
                                amount: movement.previous_balance
                              })}
                              justifyContent='end'
                              borderBottom='none'
                              color='black'
                            />
                          </Flex>
                        </td>
                      </tr>

                      <tr>
                        <td colSpan={5}>
                          <Flex justifyContent='space-between'>
                            <TD
                              text='Estado de pago'
                              borderBottom='none'
                              color='black'
                            />
                            <TD
                              text={
                                paymentStatus[movement.payment_status]?.text ||
                                '-'
                              }
                              justifyContent='end'
                              borderBottom='none'
                              color={
                                paymentStatus[movement.payment_status]?.color ||
                                'black'
                              }
                            />
                          </Flex>
                        </td>
                      </tr>
                    </>
                  )}
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default IEResumen;
