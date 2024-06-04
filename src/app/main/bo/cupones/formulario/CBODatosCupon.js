import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVDateRangePicker, CVInput, CVText } from '@/common/CovendeTemplate';
import { CVRandomString } from '@/common/CovendeTemplate/CVMethods';
import CVRadio from '@/common/CovendeTemplate/CVRadio';
import {
  isOnlyNumber,
  onlyNumber
} from '@/common/CovendeTemplate/CVValidation';
import { Box, Flex } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { Spinner } from '@chakra-ui/react';
import { generate_coupon_name } from '@CVApi/core/webcoupon/WCouponService';

function CBODatosCupon({ datos, setdatos }) {
  const [loading, setloading] = useState(false);
  const generate = async () => {
    // let code = CVRandomString(8);
    setloading(true);
    let code = await generate_coupon_name();
    setloading(false);
    setdatos({ ...datos, nombre: (code + '').toUpperCase() });
  };

  return (
    <Box width='100%'>
      <CVText color='blue' fontSize='1.5rem' fontWeight='bold'>
        1. Datos de cupón
      </CVText>

      <Flex margin='1rem' alignItems='center'>
        <CVText color='blue' fontWeight='bold'>
          Nombre
        </CVText>
        <SizeBox />

        <Box maxWidth='350px'>
          <CVInput
            maxLength='15'
            placeholder='Puedes usar Números y Letras'
            value={datos.nombre}
            onChange={(value) =>
              setdatos({ ...datos, nombre: (value + '').toUpperCase() })
            }
          />
        </Box>
        <SizeBox />
        <Box textDecorationLine='underline' onClick={() => generate()}>
          {loading ? (
            <Spinner />
          ) : (
            <CVText color='green'>Generar automaticamente</CVText>
          )}
        </Box>
      </Flex>

      <Flex margin='1rem' alignItems='center'>
        <CVText color='blue' fontWeight='bold'>
          Tipo
        </CVText>
        <SizeBox />

        <Box maxWidth='350px'>
          <CVRadio
            itemDirection='column'
            onChange={(value) => setdatos({ ...datos, tipo: value })}
            value={datos.tipo}
            options={[
              { value: 'FIXED', text: 'Fijo' },
              { value: 'PERCENT', text: 'Porcentaje' }
            ]}
          />
          <SizeBox />
          <Flex alignItems='center' marginLeft='1rem'>
            <CVInput
              error={datos.valor == '' ? false : !isOnlyNumber(datos.valor)}
              placeholder='Ingresa el Valor'
              value={datos.valor}
              onChange={(value) =>
                setdatos({ ...datos, valor: onlyNumber(value) })
              }
            />
            <SizeBox />
            <CVText color='gray'>
              {datos.tipo == 'PERCENT' ? '%' : 'soles'}
            </CVText>
          </Flex>
        </Box>
      </Flex>

      <Flex margin='1rem' alignItems='center'>
        <CVText color='blue' fontWeight='bold'>
          Inicio - Fin
        </CVText>
        <SizeBox />

        <CVDateRangePicker
          maxWidth='250px'
          dateend={datos.daterange[1]}
          datestart={datos.daterange[0]}
          onChange={(range) => setdatos({ ...datos, daterange: range })}
        />
      </Flex>

      <Flex margin='1rem' alignItems='center'>
        <CVText color='blue' fontWeight='bold'></CVText>
        <SizeBox />

        <Box maxWidth='350px'>
          <CVInput
            error={datos.maxuse == '' ? false : !isOnlyNumber(datos.maxuse)}
            value={datos.maxuse}
            onChange={(value) =>
              setdatos({ ...datos, maxuse: onlyNumber(value) })
            }
          />
        </Box>
        <SizeBox />
        <CVText color='gray'>cupones</CVText>
      </Flex>

      <Flex margin='1rem' alignItems='center' width='100%'>
        <CVText color='blue' fontWeight='bold'>
          Máximo de usos por un mismo usuario
        </CVText>
        <SizeBox />
        <Box maxWidth='350px'>
          <CVInput
            error={
              datos.maxuse_foruser == ''
                ? false
                : !isOnlyNumber(datos.maxuse_foruser)
            }
            value={datos.maxuse_foruser}
            onChange={(value) =>
              setdatos({ ...datos, maxuse_foruser: onlyNumber(value) })
            }
          />
        </Box>
        <SizeBox />
        <CVText color='gray'>usos</CVText>
      </Flex>
    </Box>
  );
}

export default CBODatosCupon;
