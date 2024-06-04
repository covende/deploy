import React, { useEffect } from 'react';
import CVCarrusel from '@/common/CovendeTemplate/CVCarrusel';
import { Grid, Box } from '@material-ui/core';
import { CVImage } from '@/common/CovendeTemplate';
import { v4 } from 'uuid';
import { useSelector } from 'react-redux';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import useWindowSize from '@/common/hooks/useWindowSize';
function Publicitario() {
  const { Publicitario, Banners } = useSelector((state) => state.HomeData);
  // const auth = getLoggedInUser();
  const screenSize = useWindowSize();
  const isMobile = screenSize.width < 576;

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={8} md={9}>
        <Box style={{ marginTop: isMobile ? '5rem' : 'unset' }}>
          <CVCarrusel
            pagination={true}
            delay={4000}
            datalist={(Banners || []).map((banner, index) => (
              <CVImage
                key={v4()}
                image={banner.image}
                width='100%'
                height='100%'
                borderRadius='10px'
                display='flex'
                link={banner.link}
                // link={index == 0 && auth == null ? '/crea-tu-tienda' : '#!'}
              />
            ))}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <Grid container spacing={1}>
          {Publicitario.map((item, ndx) => (
            <Grid item xs={6} sm={12} md={12} key={v4()}>
              <CVImage
                // link={
                //   ndx == 0
                //     ? auth == null
                //       ? '/crea-tu-tienda'
                //       : '#'
                //     : item.imagelink
                // }
                link={item.imagelink}
                image={item.image}
                borderRadius='10px'
                width='100%'
                height='100%'
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Publicitario;
