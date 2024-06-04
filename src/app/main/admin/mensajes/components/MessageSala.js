import { Trash } from '@/app/assets/icons/index';
import { rolemenu } from '@/app/helpers';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVBadge, CVText } from '@/common/CovendeTemplate';
import { CVCapitalize, CVFormatDate } from '@/common/CovendeTemplate/CVMethods';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { Box, Flex, Text } from '@chakra-ui/layout';
import CVImage from '@CVTemplate/core/CVImage';

import React, { useEffect, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { useHistory } from 'react-router';
import { fullName } from '../../notificaciones/NotificacionesAdmin';
import Point from './points/Points';
import ThreePoints from './points/ThreePoints';
import { BsTrash } from 'react-icons/bs';
import { useToast } from '@chakra-ui/toast';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import { useDispatch, useSelector } from 'react-redux';
import { updateRead, updateSala } from '../redux/salaActions';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import {
  DELETE_SALA_MESSAGES,
  READ_ROOM_MESSAGE
} from '@CVApi/core/webtopbar/MessageManager';
import { AxiosGqlClient } from '@/app/infrastructure/graphql/axios-gql-client/axios-gql-client';

export const hoursLocal = (date) => {
  let hours = new Date(date).getHours();
  let minuts = new Date(date).getMinutes();
  const formatHour = hours > 12 ? hours - 12 : hours;

  return (
    formatHour.toString().padStart(2, '0') +
    ':' +
    minuts.toString().padStart(2, '0') +
    ' ' +
    (hours >= 12 ? 'pm' : 'am')
  );
};

function MessageSala({
  sala,
  room,
  allSalas,
  update,
  setUpdate,
  setlista,
  setNotRead
}) {
  const [color, setcolor] = useState('gray');
  const history = useHistory();
  const dispatch = useDispatch();
  const addToast = useToast();
  const [id, setId] = useState(room);

  const setsala = async () => {
    setId(sala.sala);
    if (!sala.read) {
      const { readRoomMessages } = await AxiosGQL(READ_ROOM_MESSAGE(sala.sala));
      if (readRoomMessages) {
        setNotRead(readRoomMessages);
        sala.read = true;
      }
    }
    setlista(
      allSalas.map((item) =>
        item.sala == sala.sala
          ? { ...sala, selected: true }
          : { ...item, selected: false }
      )
    );
    dispatch(updateSala({ ...sala, selected: true }));
    window.history.replaceState(
      '',
      '',
      (rolemenu() || '/buyer') + '/mensajes/' + sala.sala
    );
    // history.push((rolemenu() || '/buyer') + '/mensajes/' + sala.sala);
  };
  // const hovered = (value) => {
  //   setcolor(value ? 'primary' : 'gray');
  // };

  const typeFrom = {
    devolution: 'Devolución',
    cancellation: 'Cancelación',
    order: 'Pedido',
    quotation: 'Cotización',
    sale_cut: 'Corte de venta',
    default: '-'
  };

  const deleteSala = async (salaDelete) => {
    try {
      let { deleteSalaMessages } = await AxiosGQL(
        DELETE_SALA_MESSAGES(salaDelete.sala)
      );

      if (deleteSalaMessages.status) {
        let link = false;
        if (room == salaDelete.sala) link = true;
        setlista(allSalas.filter((sala) => sala.sala !== salaDelete.sala));

        if (link) {
          dispatch(updateSala({}));
          window.history.replaceState(
            '',
            '',
            (rolemenu() || '/buyer') + '/mensajes'
          );
        }

        CVAlertSuccess({ addToast, message: deleteSalaMessages.message });
      } else {
        CVAlertError({ addToast, message: deleteSalaMessages.message });
      }
    } catch (error) {
      CVAlertError({ addToast, message: error.message });
    }
  };

  const actions = [
    {
      icon: <BsTrash />,
      action: deleteSala,
      disabled: false,
      command: '⌘D',
      label: 'Eliminar'
    }
  ];
  return (
    <Box
      backgroundColor={sala.selected ? COLORS['lightGray'] : 'white'}
      onClick={setsala}
      // onMouseEnter={() => hovered(true)}
      // onMouseLeave={() => hovered(false)}
      style={{
        borderBottom: '1px solid ' + COLORS[color],
        paddingBottom: '1rem',
        paddingTop: '1rem',
        width: '100%'
      }}
      display='flex'
      justifyContent='space-between'>
      <Flex>
        <Flex justify='end'>
          {!sala.read && (
            <Box position='absolute' mt='5px' mr='5px'>
              <Point />
            </Box>
          )}
          {sala?.user_last?.photo ? (
            <Box h='6rem' w='6rem'>
              <CVImage borderRadius='50%' image={sala.user_last.photo} />
            </Box>
          ) : (
            <CVBadge
              icon={<FaUsers style={{ fontSize: '3rem' }} />}
              content={sala.newMessages}
            />
          )}
        </Flex>
        <SizeBox />
        <Flex flexDirection='column'>
          <Text
            textTransform='capitalize'
            color={COLORS['blue']}
            fontWeight='700'
            fontSize='14px'>
            {fullName(
              sala?.user_last?.name,
              sala?.user_last?.type
            ).toLowerCase()}
          </Text>
          <CVText color='green' fontSize='0.85rem'>
            {typeFrom[sala.type || 'default']}
          </CVText>
          <CVText color='gray' fontSize='0.85rem'>
            {sala.case || ''}
          </CVText>
        </Flex>
      </Flex>

      <Flex flexDirection='column' alignItems='end' justify='space-around'>
        <ThreePoints actions={actions} sala={sala} />
        <Flex flexDirection='column' alignItems='end' mr='5px'>
          <CVText color='textDescription' fontSize='11'>
            {CVFormatDate({ date: sala.updatedAt })}
          </CVText>
          <CVText color='textDescription' fontSize='11'>
            {hoursLocal(sala.updatedAt)}
          </CVText>
        </Flex>
      </Flex>
    </Box>
  );
}

export default MessageSala;
