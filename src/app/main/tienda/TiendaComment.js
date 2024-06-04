import React, { useState, useEffect } from 'react';
import { Grid, Container } from '@material-ui/core';
import { CVBreadcrumb, CVPanel } from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { useParams } from 'react-router';
import PFeedBack from '../producto/components/PFeedBack';
import PStore from '../producto/components/PStore';

function TiendaComment() {
  const { id } = useParams();
  const [totalcomment, settotalcomment] = useState(0);
  const [rating, setrating] = useState(0);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <>
      <CVBreadcrumb
        backgroundColor='white'
        data={[
          { text: 'inicio', uri: '/' },
          { text: 'Opiniones de la Tienda', uri: '/' }
        ]}
      />
      <SizeBox />
      <Container>
        <Grid container spacing={2}>
          <PStore
            store={id}
            setienda={(company) => {
              setrating(company.stars);
            }}
          />
          <Grid item xs={12} sm={7} md={9}>
            <CVPanel height='100%' variant='box'>
              <PFeedBack
                product_id={id}
                rating={rating}
                totalcomment={totalcomment}
                settotalcomment={settotalcomment}
                title='la tienda'
              />
            </CVPanel>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default TiendaComment;
