import React, { useEffect, useState } from 'react';
import {
  allreviews,
  total_de_calificaciones
} from '@/app/api/graphql/webbuyer/WBReviewService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVPanel, CVRating, CVText } from '@/common/CovendeTemplate';
import { Flex, Text, Heading } from '@chakra-ui/react';
import { hoursLocal } from '@CVPages/core/admin/mensajes/components/MessageSala';
import { RAITINGS_PERCENTAGE } from '@CVApi/core/webbuyer/WBReviewTypes';
import { CVFormatDate } from '@CVTemplate/core/CVMethods';
import { Box } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import PComments from './PComments';

const CPromedio = ({ rating }) => (
  <Flex direction='column' alignItems='center'>
    <Box>
      <Text color='#00ADF6' fontWeight='bold'>
        Calificación Promedio
      </Text>
    </Box>
    <Box>
      <Text color='#004772' fontSize='7rem' fontWeight='bold'>
        {rating}
      </Text>
    </Box>
    <Box
      style={{
        borderRadius: '1rem',
        border: '1px solid #ECECEC',
        padding: '0.5rem 1rem'
      }}>
      <CVRating puntuation={rating} height='2.5rem' />
    </Box>
  </Flex>
);

const TCalificacion = ({ valoracion, totalpoints }) => {
  const styleCalification = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
  };
  return (
    <Flex direction='column' width='100%' height='100%'>
      <Text color='#00ADF6' fontWeight='bold'>
        Total de calificaciones ({totalpoints})
      </Text>
      <SizeBox />
      <CVRating
        variant='bars'
        totales={valoracion}
        custom={styleCalification}
      />
    </Flex>
  );
};

function PFeedBack({
  product_id,
  rating,
  totalcomment,
  settotalcomment,
  title = 'el Producto'
}) {
  const [lista, setlista] = useState([]);
  const [valoracion, setvaloracion] = useState([]);
  const [totalpoints, settotalpoints] = useState(0);
  const [loading, setloading] = useState(false);
  const [filtro, setfiltro] = useState({
    value: 0,
    pagination: {
      page: 1,
      total: 0,
      itemsPage: 3,
      pages: 1
    }
  });

  const loadcomments = async (page = 1, itemsPage = 3, product_id) => {
    setloading(true);
    const { info, reviews } = await allreviews({
      id: product_id,
      score: filtro.score,
      page,
      itemsPage
    });
    setloading(false);
    setfiltro({ ...filtro, pagination: { ...info } });
    settotalcomment(info.total);
    setlista([
      ...(page != 1 ? lista : []),
      ...reviews.map((item) => ({
        image: item?.customer?.image || '',
        name: item?.customer?.full_name || '',
        direction: (item?.customer?.provincia || '') + ' - Perú',
        comment: item?.comment || '',
        tags: item?.tags || [],
        date: `${CVFormatDate({ date: item.date })} - ${hoursLocal(item.date)}`,
        points: item?.rating || 0
      }))
    ]);
  };

  const initdata = async (product_id) => {
    const { ratingsPercentage } = await AxiosGQL(
      RAITINGS_PERCENTAGE(product_id)
    );
    if (ratingsPercentage) {
      setvaloracion(ratingsPercentage.stars);
      settotalpoints(ratingsPercentage.reviews_total);
      loadcomments(1, 3, product_id);
    }
  };

  useEffect(() => {
    initdata(product_id);
  }, [product_id]);

  return (
    <Grid item xs={12} sm={12} md={12}>
      <CVPanel variant='box' height='100%'>
        <div id='#comment_id'>
          <CVText fontSize='1.25rem' fontWeight='bold' color='blue'>
            Opiniones sobre {title}
          </CVText>
        </div>
        <SizeBox height='1rem' />
        {rating != 0 && totalcomment != 0 ? (
          <Grid container spacing={1}>
            <Grid item xs={12} sm={5} md={4}>
              <CPromedio rating={rating} />
            </Grid>
            <Grid item xs={12} sm={7} md={8}>
              <TCalificacion
                valoracion={valoracion}
                totalpoints={totalpoints}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <PComments lista={lista} totalcomment={totalcomment} />
              {filtro.pagination.page < filtro.pagination.pages && (
                <>
                  <SizeBox />
                  <Flex justifyContent='center'>
                    <Box>
                      <CVButton
                        isLoading={loading}
                        disabled={loading}
                        onClick={() =>
                          loadcomments(filtro.pagination.page + 1)
                        }>
                        Cargar mas comentarios
                      </CVButton>
                    </Box>
                  </Flex>
                </>
              )}
            </Grid>
          </Grid>
        ) : (
          <Heading as='h2' color='gray'>
            Aún no hay opiniones sobre el producto.
          </Heading>
        )}
      </CVPanel>
    </Grid>
  );
}

export default PFeedBack;
