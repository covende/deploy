import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex } from '@chakra-ui/react';
import { CVButton, CVModal, CVText } from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVInput from '@CVTemplate/core/CVInput';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import { useToast } from '@chakra-ui/toast';
import { useHistory } from 'react-router-dom';
import CountDownTimerNormal from '@CVPages/core/crea-tu-tienda/components/modales/CountDownTimerNormal';
import {
  addEmailDevolutionByCode,
  send_validation_code_by_devolution_email
} from '@CVApi/core/webdevolucion/DevService';
import { tienda } from '../../../productos/redux/ProductUpdate';

function ValidationCode({
  isOpen,
  cancelRef,
  onClose,
  store_id,
  userEmail,
  process
}) {
  const [code, setCode] = useState('');
  const { product } = useSelector((state) => state.ProductView);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingResendCode, setIsLoadingResendCode] = useState(false);
  const [validateResendCode, setValidateResendCode] = useState(true);
  const [next, setNext] = useState(false);
  const [items, setItems] = useState(['', '', '', '', '', '']);
  const dispatch = useDispatch();
  const addToast = useToast();
  const history = useHistory();

  const [inputFocus, setInputFocus] = useState({
    previousValue: '',
    position: 0
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [timer, setTimer] = useState(40);
  const [currentEvent, setCurrentEvent] = useState('change');
  const [backspace, setBackspace] = useState(false);
  const itemsRef = useRef(new Array());

  const validateCode = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      let resp = await addEmailDevolutionByCode(code);

      if (resp.status) {
        CVAlertSuccess({ addToast, message: resp.message });
        process(true);
      } else {
        setErrorMessage(resp.message || 'Email inválido');
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const setFocusInput = (direction = 'right' || 'left', empty = false) => {
    let findFocus = {
      counter: 0,
      limit: 0,
      right: function (empty) {
        this.limit = items.length;
        this.exec('right', empty);
      },
      left: function (empty) {
        this.counter = items.length - 1;
        this.exec('left', empty);
      },
      isRight: (type) => type == 'right',
      exec: function (type, empty) {
        let indexFocus = 0;

        for (
          this.counter;
          this.isRight(type)
            ? this.counter < this.limit
            : this.counter > this.limit;
          this.isRight(type) ? this.counter++ : this.counter--
        ) {
          if (
            this.counter !== inputFocus.position &&
            (empty ? items[this.counter] == '' : items[this.counter] !== '')
          ) {
            indexFocus = this.counter;
            break;
          }
        }

        itemsRef.current[indexFocus].focus();
      }
    };

    findFocus[direction](empty);
  };

  const setPreviousFocusInput = () => {
    let itemRef = itemsRef.current[inputFocus.position - 1];
    if (itemRef) itemRef.focus();
  };

  const validando = () => {
    let code = items.join('').trim();

    if (code.length == 6) {
      setCode(code);
      setNext(true);

      if (inputFocus.previousValue != items[inputFocus.position]) {
        if (currentEvent == 'paste') itemsRef.current[5].focus();
        else itemsRef.current[inputFocus.position].focus();
      }
    } else {
      next && setNext(false);

      if (currentEvent == 'backspace') {
        if (inputFocus.position > 0 && items[inputFocus.position - 1] !== '')
          setPreviousFocusInput();
        else setFocusInput('left');
      } else if (currentEvent == 'paste') {
        if (code !== '') setFocusInput('right', true);
        else itemsRef.current[0].focus();
      } else {
        let currentValue = items[inputFocus.position];
        if (currentValue !== '' && currentValue !== inputFocus.previousValue)
          setFocusInput('right', true);
      }
    }

    setCurrentEvent('change');
  };

  useEffect(() => {
    let resp = items.some((item) => {
      if (item.trim() == '' && item.length > 0) return true;
      return isNaN(item);
    });

    if (resp)
      setItems(
        items.map((item) => {
          if (item.trim() == '') return '';
          return isNaN(item) ? '' : item;
        })
      );
    else validando();
  }, [items, backspace]);

  const HandleSetTimer = (valor) => setTimer(valor);

  const resendCode = async () => {
    setInputFocus({ previousValue: items[0], position: 0 });
    itemsRef.current[0].focus();
    setErrorMessage('');
    setItems(['-', '-', '-', '-', '-', '-']);
    setIsLoadingResendCode(true);

    let company_id = store_id || (await tienda(dispatch, product));

    let resp = await send_validation_code_by_devolution_email(
      userEmail,
      company_id
    );

    setIsLoadingResendCode(false);
    if (resp?.status) {
      setTimer(40);
      CVAlertSuccess({
        addToast,
        message: 'Código de verificación reenviado.'
      });
    } else {
      setErrorMessage(resp.message || 'Email inválido');
      setValidateResendCode(false);
    }
  };

  return (
    <CVModal
      bgHeader='green'
      colorHeader='white'
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <Flex flexDirection='column' w='100%'>
          <Box textAlign='center' w='100%' py={2}>
            <CVButton
              width='90%'
              fontWeight='bold'
              onClick={() => validateCode()}
              isLoading={isLoading}
              disabled={!next}
              color={next ? 'white' : 'boldGray'}
              backgroundColor={next ? 'green' : 'mediumGray'}>
              Continuar
            </CVButton>
          </Box>
          {validateResendCode && (
            <Box textAlign='center' w='100%' py={2}>
              <CVButton
                width='90%'
                fontWeight='bold'
                variant='outlined'
                onClick={() => resendCode()}
                disabled={!!timer}
                isLoading={isLoadingResendCode}
                color={!timer ? 'green' : 'boldGray'}
                backgroundColor={!timer ? 'green' : 'gray'}>
                Reenviar código
                {!!timer && (
                  <Fragment>
                    &nbsp;
                    <CountDownTimerNormal
                      time={timer}
                      setTimer={HandleSetTimer}
                    />
                    &nbsp;seg
                  </Fragment>
                )}
              </CVButton>
            </Box>
          )}
        </Flex>
      }
      header='Introduce el código de verificación'
      children={
        <Box>
          {errorMessage !== '' && (
            <Fragment>
              <SizeBox />
              <CVText color='red' fontWeight='Bold' textAlign='center'>
                {errorMessage}
              </CVText>
            </Fragment>
          )}
          <Flex p={2} mt={2}>
            {items.map((item, index) => {
              const getRef = (element) => {
                if (element) {
                  itemsRef.current[index] =
                    element.getElementsByTagName('input')[0];
                }
              };
              return (
                <>
                  <Box px={1} key={index} ref={getRef}>
                    <CVInput
                      height='4.5rem'
                      fontSize='2.8rem'
                      value={item}
                      focusIn={index == 0}
                      onPaste={(value) => {
                        if (value) {
                          setCurrentEvent('paste');
                          setInputFocus({
                            previousValue: items[5],
                            position: 5
                          });
                          setItems(
                            value.substring(0, 6).padEnd(6, '-').split('')
                          );
                        }
                      }}
                      onBackspace={(value) => {
                        if (!value) {
                          setCurrentEvent('backspace');
                          setInputFocus({
                            previousValue: items[index],
                            position: index
                          });
                          setBackspace(!backspace);
                        }
                      }}
                      onValidate={(value) => {
                        if (currentEvent == 'change') {
                          setInputFocus({
                            previousValue: items[index],
                            position: index
                          });
                          setItems(
                            items.map((item, i) => (i == index ? value : item))
                          );
                        }
                      }}
                      maxLength={1}
                    />
                  </Box>

                  {index == 2 && <Box w={32}></Box>}
                </>
              );
            })}
          </Flex>

          <Box p={3}>
            <CVText color='blue' textAlign='center'>
              Recibiste un número de 6 dígitos al correo:
            </CVText>
            <Box mt={1}>
              <CVText fontWeight='Bold' textAlign='center' color='blue'>
                {userEmail}
              </CVText>
            </Box>
          </Box>
        </Box>
      }
    />
  );
}

export default ValidationCode;
