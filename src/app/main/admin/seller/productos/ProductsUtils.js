import { rolemenu } from '@/app/helpers/role';
import { CVImage } from '@/common/CovendeTemplate';
import { CVMoneyFormat } from '@/common/CovendeTemplate/CVMethods';
import CVSwitch from '@/common/CovendeTemplate/CVSwitch';
import { HStack, Text, Button, Center, Flex } from '@chakra-ui/react';
import ProductVerifyAction from '@CVPages/core/bo/productos/components/ProductVerifyAction';
import { CVAlertError } from '@CVTemplate/core/CVAlert';
import { CVEstadoProducto } from '@CVTemplate/core/CVEstado/CVEstadoProducto';
import CVText from '@CVTemplate/core/CVText';
import CVTooltip from '@CVTemplate/core/CVTooltip';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow
} from '@chakra-ui/react';
import { Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Acciones from './components/Acciones';
import { iconDestacado, iconNodestacado } from './ProductoIcons';
import { AiOutlineLike } from 'react-icons/ai';
import PVMayor from '@CVPages/core/producto/components/precios/PVMayor';

export const ExpandData = (row) => (
  <Box margin={1}>
    <CVText>History</CVText>
    {JSON.stringify(row)}
  </Box>
);

export const headCells = [
  {
    first: true,
    align: 'center',
    data: 'numero',
    label: 'N°',
    align: 'center'
  },
  {
    data: 'destacado',
    label: iconNodestacado
  },
  { data: 'nombre', label: 'Producto' },
  { data: 'sku', label: 'SKU' },
  {
    data: 'precioUn',
    label: 'Precio Uni.(S/)',
    align: 'center'
  },
  {
    data: 'precioMa',
    label: 'Precio x Mayor(S/)',
    align: 'center'
  },
  { data: 'stock', label: 'Stock', align: 'center' },
  { data: 'estado', label: 'Estados', align: 'center' },
  { data: 'fecha', label: 'Fecha', align: 'center' },
  { data: 'enable', label: 'Activo' },

  { data: 'acciones', label: 'Acciones', last: true }
];

export const rows = (lista = [], method, addToast) => {
  let data = lista.map((it, index) => {
    return {
      params: it.product_id,
      status: it.status || 'IN_DRAFT',
      numero: (method.page - 1) * 10 + (index + 1),
      destacado: (
        <>
          <Button
            variant='unstyled'
            display='flex'
            justifyContent='center'
            onClick={() => method.startProduct(it.product_id, !it.destacado)}>
            {it.destacado ? iconDestacado : iconNodestacado}
          </Button>
        </>
      ),
      nombre: (
        <HStack>
          <CVImage
            image={
              it.product_detail.photographs[0] ||
              'https://via.placeholder.com/700x700'
            }
            width='auto'
            height='50px'
          />

          <Flex maxW='200px'>
            <CVText variant='maxtext'>{it.product_name} </CVText>
          </Flex>
        </HStack>
      ),
      sku: it.sku,
      precioUn: CVMoneyFormat({ amount: it.price_unit, currency: '' }),
      precioMa: (
        <>
          <Popover placement='top' size='5xl'>
            <PopoverTrigger>
              {it?.wholesale && it?.wholesale.length > 0 ? (
                <Button size='xs' variant='outline' colorScheme='gray'>
                  VER
                </Button>
              ) : (
                <CVText>-</CVText>
              )}
            </PopoverTrigger>
            <PopoverContent boxShadow='dark-lg' borderColor='gray.200'>
              <PopoverArrow />
              <PopoverBody>
                <Center>
                  <PVMayor
                    wholesale={it.wholesale}
                    price={it.price_unit}
                    offer_percentage={it.offer_percentage}
                  />
                </Center>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </>
      ),
      stock: it.stock,
      estado: (
        <CVText color={CVEstadoProducto(it.status || 'IN_DRAFT').color}>
          {CVEstadoProducto(it.status || 'IN_DRAFT').text}
        </CVText>
      ),
      fecha: it.createdAt.toString().substring(0, 10),

      enable: (
        <CVSwitch
          variant='capsule'
          yesColor={
            (it.status || 'IN_DRAFT') != 'IN_DRAFT' ? 'primary' : 'gray'
          }
          noColor={(it.status || 'IN_DRAFT') != 'IN_DRAFT' ? 'red' : 'gray'}
          value={it.product_active}
          onChange={(value) => {
            if (it.status == 'APPROVED') {
              if (!it?.stockUpdatedStatus && rolemenu() != '/bo/') {
                return CVAlertError({
                  addToast,
                  message:
                    'El producto esta deshabilitado temporalmente. Por favor, contáctanos para reactivar tus productos o envía un mensaje a través del Centro de Ayuda.'
                });
              }

              method.setattribute({
                _id: it.product_id,
                attribute: 'enable',
                boolean: value || false
              });
            } else {
              CVAlertError({
                addToast,
                message: 'El producto no está aprobado.'
              });
            }
          }}
        />
      ),
      acciones: (
        // rolemenu() == '/bo/' ? (
        //   <ProductVerifyAction
        //     action={() => {
        //       method.removeproducts([it.product_id]);
        //     }}
        //     product_id={it.product_id}
        //     store_id={it.store_id}
        //   />
        // ) : (
        //   <Acciones
        //     removeproducts={method.removeproducts}
        //     duplicateProduct={method.duplicateProduct}
        //     id={it.product_id}
        //     step={it.step < 4 ? it.step : 0}
        //     store_id={it.store_id || ''}
        //     slug={it.slug}
        //     status={it.status}
        //     admin={rolemenu() == '/bo/' ? true : false}
        //   />
        // )

        <Acciones
          removeproducts={method.removeproducts}
          duplicateProduct={method.duplicateProduct}
          id={it.product_id}
          step={it.step < 4 ? it.step : 0}
          store_id={it.store_id || ''}
          slug={it.slug}
          status={it.status}
          isAdmin={rolemenu() == '/bo/' ? true : false}
        />
      )
    };
  });
  return data;
};
