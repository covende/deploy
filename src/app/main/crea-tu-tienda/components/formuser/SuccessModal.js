import { toBase64 } from '@/common/CovendeTemplate/CVCardProduct/CVCardProductMethod';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Flex,
  Button,
  Text,
  Box
} from '@chakra-ui/react';
import { userLoginByCode } from '@CVApi/core/webpublic/userData/UserValidationCode';
import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { iconHouse } from '../CreateStoreIcons';
import { useDispatch } from 'react-redux';
import ActionsAuth from '@/app/redux/Auth/actions';
import { useHistory } from 'react-router-dom';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import { A_CARD_PRODUCT } from '@CVTemplate/core/CVCardProduct/CVCardProductRedux/Actions';

function SuccessModal({ isOpen, planActive, url, code }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [auth, setAuth] = useState(false);

  const validateCode = async () => {
    try {
      setLoading(true);
      if (code) {
        let resp = await userLoginByCode(code);

        if (resp.code === 200) {
          window.localStorage.setItem('previous_link', '/seller/planes');

          dispatch(
            ActionsAuth.BuyerSeller.login({
              validateCode: true,
              response: resp,
              setIsLoading: setLoading,
              callback: (...params) => {
                dispatch(A_CARD_PRODUCT({ carrito_login: false }));
                dispatch(A_CARD_PRODUCT({ url: '' }));
              }
            })
          );
          return;
        }
      }

      setLoading(false);
      history.push('/admin');
    } catch (error) {
      setLoading(false);
      history.push('/admin');
    }
  };

  const dateExpire = (periodo) => {
    let dateExpire = new Date();
    let months = dateExpire.getMonth() + Number(periodo);
    dateExpire.setMonth(months);
    const timeZone = 'America/Lima';
    let fecha = new Date(dateExpire).toLocaleString('es-PE', { timeZone });
    let dt = fecha.split(' ');
    let [dia, mes, ano] = dt[0].split('/');

    return (
      dia.padStart(2, '0') +
      '/' +
      mes.padStart(2, '0') +
      '/' +
      ano.substring(2, 4)
    );
  };

  const onClose = () => {
    history.push('/seller/planes');
  };

  useEffect(() => {
    const isLogin = getLoggedInUser(dispatch);
    if (isLogin) setAuth(true);
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody id='modalbox'>
          <br />
          {url ? (
            <Flex justifyContent='center'>
              <Text fontSize='1rem' color='#C4C4C4' fontWeight='bold'>
                A solo un paso para vender online
              </Text>
            </Flex>
          ) : (
            <Flex justifyContent='center'>
              <Text fontSize='2rem' color='#00ADF6' fontWeight='bold'>
                ¡Felicitaciones!
              </Text>
            </Flex>
          )}
          <br />
          <Flex justifyContent='center'>{iconHouse}</Flex>

          {!url && (
            <>
              <Flex justifyContent='center'>
                <Text color='#004772'>
                  Haz adquirido el <strong>{planActive?.name || ''}</strong>
                </Text>
              </Flex>
              <br />

              <Flex justifyContent='center'>
                <Text color='#004772'>
                  Vence el &nbsp;
                  <strong>{dateExpire(planActive?.periodo)}</strong>
                </Text>
              </Flex>
              <br />
              <Flex justifyContent='center'>
                <Text color='#004772'>
                  <strong>Ya puedes empezar a vender</strong>
                </Text>
              </Flex>
              <br />

              <Flex justifyContent='center'>
                <Text>
                  {!auth && (
                    <Button
                      isLoading={loading}
                      rounded='20px'
                      variant='solid'
                      onClick={async (e) => await validateCode(e)}
                      colorScheme='twitter'>
                      Ingresa a tu cuenta
                    </Button>
                  )}
                </Text>
              </Flex>
              <br />

              <Flex justifyContent='center'>
                <Typography>
                  Revisa las caracteristicas de tu{' '}
                  <Link
                    to={
                      '/crea-tu-tienda/plan-description/' +
                      toBase64(JSON.stringify(planActive))
                    }>
                    <span style={{ color: 'var(--chakra-colors-twitter-500)' }}>
                      plan
                    </span>
                  </Link>
                </Typography>
              </Flex>
            </>
          )}
          <Box>
            {url && (
              <>
                <Text
                  color='#4D4D4D'
                  fontSize='2xl'
                  textAlign={['center', 'center']}
                  fontWeight='bold'
                  my={4}
                  mx={17}>
                  Para adquirir el Plan, descarga el cupón y sigue las
                  instrucciones.
                </Text>
                {/* <iframe src={url} width='100%' height='500vh'></iframe> */}

                <Flex
                  my={10}
                  flexDirection='column'
                  alignItems='center'
                  justifyContent='center'>
                  <Text>
                    <a href={url} target='_blank'>
                      <Button
                        rounded='20px'
                        variant='solid'
                        colorScheme='twitter'>
                        Cupón de pago
                      </Button>
                    </a>
                  </Text>
                  {!auth && (
                    <>
                      <br />
                      <Text>
                        <Button
                          isLoading={loading}
                          rounded='20px'
                          variant='solid'
                          onClick={async (e) => await validateCode(e)}
                          colorScheme='twitter'>
                          Ingresa a tu cuenta
                        </Button>
                      </Text>
                    </>
                  )}
                </Flex>
              </>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SuccessModal;
