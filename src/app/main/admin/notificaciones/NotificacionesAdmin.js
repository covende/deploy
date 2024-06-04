import { Flex, Text } from '@chakra-ui/react';
import {
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Grid
} from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Avatar } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import {
  NOTIFICACION_LIST_BY_CUSTOMER_ID,
  NOTIFICATIONS_BY_USER,
  READ_NOTIFICATION
} from '@/app/api/graphql/webtopbar/MessageManager';
import { get_time_diff } from '@/common/utils/methods';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVImage, CVText } from '@/common/CovendeTemplate';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import notificacionimage from '@/app/assets/products/notificacionimage.svg';
import { useHistory } from 'react-router-dom';
import { CVRenderHTML } from '@CVTemplate/core/CVMethods';

export const fullName = (name, type) => {
  let nombre = name || '';
  if (type == 'administrative') nombre += ' ' + '(Covende)';
  return nombre;
};

function NotificacionesAdmin() {
  const [page, setPage] = useState(1);
  const [lista, setlista] = useState([]);
  const history = useHistory();

  const goto = (uri) => {
    //update read
    if (uri != '#' && uri != '#!') history.push(uri);
  };

  const initdata = async () => {
    let { notificationsByUser } = await AxiosGQL(
      NOTIFICATIONS_BY_USER({ page: page, limit: 10 })
    );

    setPage(notificationsByUser.page);
    setlista([...lista, ...notificationsByUser.docs]);
  };

  useEffect(() => {
    initdata();
  }, []);

  return (
    <Box>
      <Text color='#FF5454' fontSize='2rem' fontWeight='bold'>
        Notificaciones
      </Text>
      <Container
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '1rem',
          padding: '1rem'
        }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={8} padding='1rem'>
            {lista.length > 0 ? (
              <List>
                {lista.map((item) => (
                  <React.Fragment key={v4()}>
                    <ListItem
                      onClick={() => item.link_to && goto(item.link_to)}
                      alignItems='center'
                      style={{
                        borderBottom:
                          '1px solid ' +
                          COLORS[item.status ? 'primary' : 'gray']
                        // backgroundColor:
                        //   COLORS[item.status ? 'primary' : 'white'] + 10
                      }}>
                      <CVImage
                        name={fullName(
                          item?.remitente?.name,
                          item?.remitente?.type
                        )}
                        image={
                          item?.remitente?.photo ||
                          'https://covendefiles.s3.amazonaws.com/images/1639771669863'
                        }
                        width='48px'
                        height='48px'
                        variant='avatar'
                      />

                      <SizeBox />
                      <Flex direction='column' width='100%'>
                        <Box>
                          <CVText color='blue' fontWeight='bold'>
                            {item?.title}
                            {/* {fullName(
                            item?.remitente?.first_name,
                            item?.remitente?.last_name,
                            item?.remitente?.type
                          )} */}
                          </CVText>
                          <CVText variant='maxtext'>
                            <CVRenderHTML>{item.message || ''}</CVRenderHTML>
                          </CVText>
                          <Flex justifyContent='space-between' width='100%'>
                            <CVText color='primary'>{item.details}</CVText>
                            <Typography variant='caption'>
                              {get_time_diff(item.createdAt)}
                            </Typography>
                          </Flex>
                        </Box>
                      </Flex>
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Box>
                <CVText color='blue' fontWeight='bold' fontSize=' 1.5rem'>
                  Usted no cuenta con notificaciones
                </CVText>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={4} padding='1rem'>
            <Flex height='100%' flexDirection='column' justifyContent='center'>
              <CVImage image={notificacionimage} />
            </Flex>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default NotificacionesAdmin;
