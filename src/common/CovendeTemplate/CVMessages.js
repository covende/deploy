import {
  GET_SALA_BY_ID,
  SALA_MESSAGE_BY_SALA
} from '@/app/api/graphql/webtopbar/MessageManager';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { Box } from '@chakra-ui/layout';
import { Spinner, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { CVPanel, CVRow, CVText } from '.';
import SizeBox from '../components/CustomComponent/SizeBox';
import CVMessagesMessages from './CVMessages/CVMessagesMessages';
import { useDispatch, useSelector } from 'react-redux';
import { updateSala } from '@CVPages/core/admin/mensajes/redux/salaActions';

/**
 *
 * @param {Object} param0
 * @param {String} param0.sala
 * @param {String} param0.user
 * @param {String} param0.details_link
 * @returns
 */
function CVMessages({
  sala,
  user,
  details_link = '#!',
  typeUser = 'sellerandbuyer',
  closeSala
}) {
  const salaCurrent = useSelector((state) => state.sala);

  const [loading, setloading] = useState(true);
  const mountedRef = useRef(true);
  const dispatch = useDispatch();

  const initdata = async () => {
    setloading(true);
    // if (salaCurrent.sala == '') {
    //   console.log('No tiene sala');
    //   const { getSalaByID } = await AxiosGQL(GET_SALA_BY_ID(sala));
    //   dispatch(updateSala(getSalaByID));
    // }
    setloading(false);
  };

  useEffect(() => {
    initdata();
    return () => {};
  }, [salaCurrent.sala]);

  return (
    <Box>
      <CVPanel>
        {loading ? (
          <Spinner />
        ) : (
          <Flex justifyContent='space-between' alignItems='center' width='100%'>
            <CVText color='blue' fontWeight='bold'>
              {salaCurrent ? salaCurrent.case : 'ID - : -'}
            </CVText>
            <Box>
              <CVText textAlign='end'>N° Caso</CVText>
              <CVText fontWeight='bold'>{salaCurrent?.custom_id}</CVText>
            </Box>
          </Flex>
        )}
      </CVPanel>
      <SizeBox />

      {salaCurrent?.sala && (
        <CVMessagesMessages
          salaID={salaCurrent.sala}
          sala={salaCurrent}
          closeSala={closeSala}
        />
      )}
    </Box>
  );
}

export default CVMessages;
