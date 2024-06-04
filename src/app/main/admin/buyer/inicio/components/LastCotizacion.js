import { quotations_by_user_id } from '@/app/api/graphql/webquotation/QService';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import { CVButton, CVImage, CVLink } from '@/common/CovendeTemplate';
import { get_time_diff } from '@/common/utils/methods';
import { Flex, Text } from '@chakra-ui/react';
import { CVRenderHTML } from '@CVTemplate/core/CVMethods';
import { Box, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';

function LastCotizacion({ ver }) {
  const [cotizacion, setcotizacion] = useState([]);
  const [loading, setloading] = useState(true);

  const initdata = async (isMounted) => {
    if (!isMounted) return;
    const us = getLoggedInUser();
    const { quotations } = await quotations_by_user_id({
      user_id: us.user_id,
      itemsPage: 3
    });
    let lista = quotations.map((item) => ({
      foto: item?.product?.photo,
      image: item?.seller?.store?.logo,
      first_name: item?.seller?.first_name,
      last_name: item?.seller?.last_name,
      pais: 'Perú',
      last_message: item.message || '- Sin respuesta -',
      time: get_time_diff(item?.request_date),
      id: item?.custom_id,
      idquatation: item?._id
    }));
    setcotizacion(lista);
  };

  useEffect(() => {
    let isMounted = true;
    initdata(isMounted);
    return () => (isMounted = false);
  }, []);

  return (
    <Grid container>
      {cotizacion.map((item, idx) => (
        <Grid className='rows' key={v4()} item xs={12} sm={12} md={12}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4} md={2}>
              <Box style={{ paddingRight: '1rem' }}>
                <CVImage image={item.foto} width='100px' height='auto' />
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <Flex>
                <Box style={{ paddingRight: '1rem' }}>
                  <CVImage
                    name={item.first_name + ' ' + item.last_name}
                    image={item.image ? item.image : null}
                    width='64px'
                    height='64px'
                    variant='avatar'
                  />
                </Box>
                <Box style={{ display: 'flex', flexDirection: 'column' }}>
                  <Text color='#004772' fontWeight='bold'>
                    {item.first_name} {item.last_name}
                  </Text>
                  <Typography>{item.pais}</Typography>
                </Box>
              </Flex>
            </Grid>
            <Grid item xs={12} sm={4} md={6}>
              <Box
                style={{
                  borderRadius: '18px',
                  border: '1px solid #E5E5E5',
                  padding: '1rem',
                  overflow: 'auto'
                }}>
                <CVRenderHTML>{item.last_message}</CVRenderHTML>
              </Box>
              <Flex justifyContent='end'>
                <Typography variant='caption'>{item.time}</Typography>
              </Flex>
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%'
                }}>
                {ver && (
                  <CVLink
                    text={
                      <CVButton backgroundColor='purple'>
                        Ver cotización
                      </CVButton>
                    }
                    href={`/buyer/cotizacion/${item.idquatation}`}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}

export default LastCotizacion;
