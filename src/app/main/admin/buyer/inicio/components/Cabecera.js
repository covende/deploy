import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVImage, CVLink, CVText } from '@/common/CovendeTemplate';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import useGetPermisions from '@/common/hooks/useGetPermisions';
import { Flex, Progress, Text } from '@chakra-ui/react';
import { COUNTER_HOME_BUYER } from '@CVApi/core/webquotation/QTypes';
// import CVTooltip from '@CVTemplate/core/CVTooltip';
import CVTooltip from '@/common/CovendeTemplate/CVTooltip';
import { Box, Button, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BotonesStyle } from '../InicioStyles';
import { FaExclamation } from 'react-icons/fa';
import { USER_BY_ID } from '@CVApi/core/webpublic/userData/UserService';
import { USER_DIRECTION_BY_USER } from '@CVApi/core/webpublic/userData/UserDirectionService';

function Cabecera() {
  const { ver } = useGetPermisions('Comprar', 'Inicio');
  const [percent, Setpercent] = useState(0);
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone: '',
    dni: '',
    image: '',
    inWhatapp: ''
  });
  const [homeBuyer, setHomeBuyer] = useState({
    favorites: 0,
    orders: 0,
    quotations: 0
  });

  const initdata = async (isMounted) => {
    if (!isMounted) return;

    const us = getLoggedInUser();

    const { userFind } = await AxiosGQL(USER_BY_ID(us.user_id));
    setProfile({
      ...profile,
      ...userFind
    });
    const { userDirectionByUser } = await AxiosGQL(
      USER_DIRECTION_BY_USER(us.user_id)
    );
    const { counterHomeBuyer } = await AxiosGQL(COUNTER_HOME_BUYER(us.user_id));
    setHomeBuyer(counterHomeBuyer);

    let total = 0;
    if (userFind.email) total += 30;
    if (userFind.first_name) total += 10;
    if (userFind.last_name) total += 10;
    if (userFind.dni) total += 20;
    if (userFind.phone[0]?.number) total += 10;
    if (userDirectionByUser.length > 1) total += 20;

    // // if (userFind.tele)
    // if (userFind.first_name) {
    //   Setpercent(10);
    // }
    // if (userFind.last_name) {
    //   Setpercent(20);
    // }
    // if (userFind.email) {
    //   Setpercent(30);
    // }
    // if (userFind.phone && userFind.email) {
    //   Setpercent(60);
    // }
    // if (userFind.dni && userFind.email) {
    //   Setpercent(70);
    // }
    // if (userFind.image && userFind.dni) {
    //   Setpercent(80);
    // }
    // if (userDirectionByUser.length > 1 && userFind.image) {
    //   Setpercent(100);
    // }

    Setpercent(total);

    // if (counterHomeBuyer.orders > 0) {
    //   Setpercent(70);
    // }
    // if (counterHomeBuyer.quotations > 0) {
    //   Setpercent(80);
    // }
    // if (userDirectionByUser.quotations >= 2) {
    //   Setpercent(100);
    // }
  };

  const Botones = ({ color, value, text }) => (
    <BotonesStyle>
      <Button
        style={{
          backgroundColor: color,
          borderRadius: '20px',
          width: '100%',
          height: '100%'
        }}>
        <span>{value}</span>
        <span>{text}</span>
      </Button>
    </BotonesStyle>
  );

  useEffect(() => {
    let isMounted = true;
    initdata(isMounted);
    return () => (isMounted = false);
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={8}>
        <Button
          style={{
            backgroundColor: '#FF5454',
            borderRadius: '20px',
            width: '100%',
            height: '100%'
          }}>
          <Grid container spacing={2}>
            <Grid item xs={3} sm={2} md={1}>
              <CVImage
                height='64px'
                width='64px'
                variant='avatar'
                name={
                  profile.first_name != '' && profile.last_name != ''
                    ? `${profile.first_name} ${profile.last_name}`
                    : profile.email
                }
                image={profile.image}
              />
            </Grid>
            <Grid item xs={6} sm={7} md={8}>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                  marginLeft: '1%'
                }}>
                <Flex justifyContent='center'>
                  <CVText fontWeight='bold' color='white'>
                    {profile.first_name + ' ' + profile.last_name}
                  </CVText>
                </Flex>
                <Flex alignItems='center' justifyContent='center' color='white'>
                  <CVText color='white'>Nivel de perfil: </CVText>
                  <SizeBox />
                  <CVText color='white' fontWeight='bold'>
                    {percent}%
                  </CVText>
                </Flex>
                <Box
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '1%'
                  }}>
                  <Progress
                    colorScheme='purple'
                    size='lg'
                    value={percent}
                    rounded='5px'
                    width='90%'
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={3} sm={3} md={3}>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'end',
                  width: '100%',
                  height: '100%',
                  marginTop: profile.image ? '0rem' : '2.5rem'
                }}>
                {ver &&
                  (profile.image ? (
                    <Link
                      to='buyer/configuracion'
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: '20px',
                        width: '90%',
                        marginRight: '20px',
                        color: '#FF5454',
                        padding: '0.5rem '
                      }}>
                      Ver Perfil
                    </Link>
                  ) : (
                    <CVTooltip
                      isOpen={true}
                      a
                      icon={<FaExclamation style={{ fontSize: '3rem' }} />}
                      colorIcon='white'
                      title='Por favor, completa tu información personal'
                      titleColor='red'
                      bgIcon='red'
                      widthIcon='75px'>
                      <Link
                        to='buyer/configuracion'
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          borderRadius: '20px',
                          width: '100%',
                          color: '#FF5454',
                          padding: '0.5rem'
                        }}>
                        VER PERFIL
                      </Link>
                    </CVTooltip>
                  ))}
              </Box>
            </Grid>
          </Grid>
        </Button>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <CVLink
              href='/buyer/pedidos'
              text={
                <Botones
                  color={COLORS['green']}
                  value={homeBuyer.orders}
                  text='Pedidos'
                />
              }
            />
          </Grid>
          <Grid item xs={4}>
            <CVLink
              href='/buyer/cotizacion'
              text={
                <Botones
                  color={COLORS['purple']}
                  value={homeBuyer.quotations}
                  text='Cotizaciones'
                />
              }
            />
          </Grid>
          <Grid item xs={4}>
            <CVLink
              href='/buyer/lista'
              text={
                <Botones
                  color={COLORS['yellow']}
                  value={homeBuyer.favorites}
                  text='Lista de deseos'
                />
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Cabecera;
