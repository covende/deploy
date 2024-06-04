import React, { useEffect, useState } from 'react';
import { Grid } from '@/../node_modules/@material-ui/core/index';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVText from '@CVTemplate/core/CVText';
import { Box } from '@chakra-ui/react/';
import ReputationTotal from './ReputationTotal';
import ReTotales from './ReTotales';
import TimeFrame from './TimeFrame';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import {
  COMPANY_REPUTATION_AND_DAY,
  COMPANY_REPUTATION_CARDS,
  COMPANY_REPUTATION_BY_PEDIDO_TIME
} from '@CVApi/core/webseller/statistics';

const Reputation = ({ store_id }) => {
  const [companyRep, setCompanyRep] = useState({});
  const [cardReputation, setCardReputation] = useState({});
  const [reputation30, setReputation30] = useState({});
  const [reputation90, setReputation90] = useState({});
  const [reputation180, setReputation180] = useState({});
  const [loading, setLoading] = useState(false);
  const initData = async () => {
    setLoading(true);

    Promise.all([
      AxiosGQL(COMPANY_REPUTATION_AND_DAY(store_id)),
      AxiosGQL(COMPANY_REPUTATION_CARDS(store_id)),
      AxiosGQL(COMPANY_REPUTATION_BY_PEDIDO_TIME(store_id, 30)),
      AxiosGQL(COMPANY_REPUTATION_BY_PEDIDO_TIME(store_id, 90)),
      AxiosGQL(COMPANY_REPUTATION_BY_PEDIDO_TIME(store_id, 180))
    ])
      .then((response) => {
        if (response[0]) setCompanyRep(response[0].companyReputationAndDay);
        if (response[1]) setCardReputation(response[1].companyReputationCards);
        if (response[2])
          setReputation30(response[2].companyReputationByPeriodTime);
        if (response[3])
          setReputation90(response[3].companyReputationByPeriodTime);
        if (response[4])
          setReputation180(response[4].companyReputationByPeriodTime);
      })
      .catch((err) => console.log({ err }));

    setLoading(false);
  };

  useEffect(() => {
    initData();
  }, [store_id]);
  return (
    <>
      <CVText color='blue' fontSize='2rem' fontWeight='bold'>
        Reputación
      </CVText>
      <SizeBox />
      <Grid container spacing={2}>
        <ReputationTotal {...{ cardReputation }} />
        <ReTotales {...{ companyRep, loading }} />
      </Grid>
      <Box mt='3rem'>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <CVText color='blue' fontSize='2rem'>
              Reputación por periodos de tiempo
            </CVText>
            <TimeFrame {...{ reputation30, reputation90, reputation180 }} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Reputation;
