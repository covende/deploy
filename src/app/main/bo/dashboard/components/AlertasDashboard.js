import React, { useEffect, useState } from 'react';
import { Box, Grid, Flex } from '@chakra-ui/react';
import { CVImage, CVText } from '@/common/CovendeTemplate';

import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { COMPANY_ALERT } from '@CVApi/core/webbo/CovendeData/datosCovende';

function AlertasDashboard() {
  const [userBlocked, setuserBlocked] = useState();
  const getCompanyAlert = async () => {
    const { companyAlerts } = await AxiosGQL(COMPANY_ALERT());
    if (companyAlerts) setuserBlocked(companyAlerts[0]);
  };

  useEffect(() => {
    getCompanyAlert();
  }, []);
  return userBlocked ? (
    <Grid
      background='#FFFFFF'
      borderRadius='12px'
      p='10px'
      borderLeft='15px solid #FF5454'>
      <Flex align='center' gap='5px'>
        <CVImage
          link={userBlocked?.link}
          variant='avatar'
          width='44px'
          height='39px'
          image='https://i.imgur.com/tQ3wG7g.png'
          name='Segun Adebayo'
        />
        <Box margin='auto'>
          <CVText fontSize='12' color='blue'>
            <span style={{ color: '#FF5454', fontWeight: '700' }}>
              {userBlocked?.title}
            </span>
            &nbsp; {userBlocked?.message}
          </CVText>
        </Box>
      </Flex>
    </Grid>
  ) : (
    <></>
  );
}

export default AlertasDashboard;
