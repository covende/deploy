import React, { useEffect } from 'react';
import { Flex, Button, Text, Box } from '@chakra-ui/react';
import PresentPlan from './components/PresentPlan';
import { useDispatch, useSelector } from 'react-redux';
import { plansByRole } from '@/app/api/graphql/plans/services/planesservice';
import { A_PLANES } from '@/app/main/bo/faq/redux/Actions';
import SubscriptionCancel from './components/SubscriptionCancel';
import * as User from '@/app/helpers/authUtils';

function SelectPlan() {
  let us = User.getLoggedInUser();
  const { planes } = useSelector((state) => state.Planes);

  const dispatch = useDispatch();
  const fetchPlans = async (roleID = '0') => {
    let _planes = await plansByRole(us.user_id);
    dispatch(
      A_PLANES({
        planes: _planes,
        roleSelected: roleID
      })
    );
  };

  const initialdata = async () => {
    fetchPlans();
  };

  useEffect(() => {
    initialdata();
  }, []);

  return (
    <>
      <Text color='#004772' fontSize='2rem' fontWeight='bold' mb='5'>
        Elije tu mejor Plan
      </Text>
      <Flex justifyContent='center' flexWrap='wrap' gap='1.1rem'>
        {planes.map((plan, index) => (
          <PresentPlan
            key={index}
            title={plan.name}
            price={plan.price}
            periodo={plan.periodo}
            plan={plan}
          />
        ))}
      </Flex>
    </>
  );
}
export default SelectPlan;
