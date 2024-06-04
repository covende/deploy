import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton } from '@/common/CovendeTemplate';
import CVGridText from '@/common/CovendeTemplate/CVGridText';
import { estadoTexto } from '@/common/utils';
import { Text, useDisclosure } from '@chakra-ui/react';
import { Button, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/toast';
import ApproveProducto from '../mproducto/ApproveProducto';
import { udpatestatus } from '../ProductsMethod';
import { HeadStyle, rowdata } from './PStyles';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import { CVFormatDate, CVJsonFormat } from '@CVTemplate/core/CVMethods';
import CVText from '@CVTemplate/core/CVText';
import { CVEstadoProducto } from '@CVTemplate/core/CVEstado/CVEstadoProducto';
import api from '@CVApi/core/users/index';

function HeaderProduct({ producto, setproducto }) {
  const addToast = useToast();
  const [providerUser, setProviderUser] = useState('No verificado');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const verficaproducto = async (motivos) => {
    let user = getLoggedInUser();
    const result = await udpatestatus({
      product_id: producto.product_id,
      status: 'APPROVED',
      store_id: producto.store_id,
      user_id: user.user_id,
      message: 'Producto Aprobado',
      links: [],
      enable: true
    });
    setproducto({
      ...producto,
      status: result.status ? 'APPROVED' : 'REJECTED',
      product_state: result.status ? 'APPROVED' : 'REJECTED'
    });
    result.status
      ? CVAlertSuccess({ addToast, message: result.message })
      : CVAlertError({ addToast, message: result.message });
  };
  const blockproducto = async (motivos) => {
    let user = getLoggedInUser();
    const result = await udpatestatus({
      product_id: producto.product_id,
      status: 'REJECTED',
      user_id: user.user_id,
      store_id: producto.store_id,
      message: 'Producto Rechazdo',
      links: motivos.length > 0 ? motivos.map((it) => it.title) : [],
      enable: false
    });
    setproducto({
      ...producto,
      status: 'REJECTED',
      product_state: 'REJECTED'
    });
    result.status
      ? CVAlertSuccess({ addToast, message: result.message })
      : CVAlertError({ addToast, message: result.message });
  };

  const getUserProvider = async () => {
    const usersValid = await api.fetch({ platformID: 'PBO' });
    if (usersValid) {
      let user = await usersValid.find(
        (user) => user.user_id == producto.asesor
      );
      setProviderUser(user?.first_name || 'No verificado');
    }
  };
  useEffect(() => {
    getUserProvider();
  }, [producto]);

  return (
    <HeadStyle>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <CVGridText
            options={[
              { title: 'ID Producto:', content: producto.custom_id },
              {
                title: 'Fecha de publicación:',
                content: CVFormatDate({ date: producto.createdAt, time: true })
              },
              {
                title: 'Ultima actualización:',
                content: CVJsonFormat({ date: producto.updatedAt, time: true })
              }
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CVGridText
            options={[
              {
                title: 'Estado:',
                content: (
                  <CVText
                    color={
                      CVEstadoProducto(
                        producto.product_state || producto.status
                      ).color
                    }>
                    {
                      CVEstadoProducto(
                        producto.product_state || producto.status
                      ).text
                    }
                  </CVText>
                )
              },
              { title: 'Verificado por:', content: providerUser },
              {
                title: 'URL:',
                content: process.env.APP_URL + '/producto/' + producto.slug
              }
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <CVGridText
            options={[
              { title: 'Calificación: ', content: producto.stars || 0 },
              { title: 'Vendidos: ', content: '' },
              { title: 'Stock:', content: producto.stock }
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={2} md={2}>
          <CVGridText
            options={[
              {
                title: '',
                content: (
                  <CVButton
                    height='2rem'
                    onClick={() => verficaproducto()}
                    disabled={
                      (producto.product_state || producto.status) == 'APPROVED'
                    }
                    backgroundColor={
                      (producto.product_state || producto.status) == 'APPROVED'
                        ? 'gray'
                        : 'primary'
                    }>
                    Verificar producto
                  </CVButton>
                )
              },
              { title: '', content: <SizeBox /> },
              {
                title: '',
                content: (
                  <CVButton
                    height='2rem'
                    onClick={() => onOpen()}
                    backgroundColor='red'>
                    Bloquear producto
                  </CVButton>
                )
              }
            ]}
          />
        </Grid>
      </Grid>
      <ApproveProducto
        onClose={onClose}
        isOpen={isOpen}
        blockproducto={blockproducto}
        verficaproducto={verficaproducto}
      />
    </HeadStyle>
  );
}

export default HeaderProduct;
