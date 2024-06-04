import { Box } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { CVDataTable } from '@/common/CovendeTemplate';
import { CMData, CMHeaders } from './CMTabla.utils';
import {
  GET_SALA_BY_USER,
  MESSAGE_LIST,
  READ_ROOM_MESSAGE
} from '@/app/api/graphql/webtopbar/MessageManager';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import useGetPermisions from '@/common/hooks/useGetPermisions';
import { formatpaginate } from '@/common/utils/methods';
import { useDispatch } from 'react-redux';
import { updateSala } from '@CVPages/core/admin/mensajes/redux/salaActions';
import { getLoggedInUser } from '@/app/helpers/authUtils';

function CMTabla({ onOpen, setsala, filtro, setfiltro }) {
  const [loading, setloading] = useState(true);
  const [paginate, setPaginate] = useState({});
  const [lista, setlista] = useState([]);
  const dispatch = useDispatch();
  const permisionsMensajeriaBo = useGetPermisions(
    'Backoffice',
    'Centro de mensajería'
  );
  const initdata = async (page = 1) => {
    setloading(true);
    const moti = filtro.motive == 'motive' ? '' : filtro.motive;

    let { getSalasByUser } = await AxiosGQL(GET_SALA_BY_USER(page, moti));

    if (getSalasByUser?.status) {
      setPaginate(formatpaginate(getSalasByUser.info));
      setlista(getSalasByUser.salas);
    }
    setloading(false);
  };
  const searchSalas = (search) => {
    if (lista.length != 0 && search.length > 0) {
      let wordSearch = new RegExp(search, 'i');
      let names = lista.filter((sala) =>
        sala.created_by.name.match(wordSearch)
      );
      if (names.length == 0) {
        let order_ids = lista.filter((sala) => sala.origin.match(wordSearch));
        setlista(order_ids);
      } else {
        setlista(names);
      }
    }
  };

  useEffect(() => {
    searchSalas(filtro.search);
    if (filtro.search == '') initdata();
  }, [filtro]);

  const readRoomMessagesVoid = (sala_id) => {
    AxiosGQL(READ_ROOM_MESSAGE(sala_id))
      .then(({ readRoomMessages }) => {
        if (readRoomMessages)
          setlista(
            lista.map((item) => ({
              ...item,
              messages_no_read_bo:
                item.sala == sala_id ? 0 : item.messages_no_read_bo || 0
            }))
          );
      })
      .catch((err) => console.log({ err }));
  };

  let setSalaRedux = (sala) => {
    sala?.messages_no_read_bo && readRoomMessagesVoid(sala.sala);
    dispatch(updateSala(sala));
    setsala(sala.sala);
  };

  return (
    <Box backgroundColor='#FFFFFF' rounded='1rem' padding='1rem'>
      <CVDataTable
        data={CMData({
          lista,
          methods: {
            setsala: setSalaRedux,
            onOpen,
            page: paginate?.page || 1,
            itemsPage: paginate?.limit || 0
            // setsala
          },
          permisionsMensajeriaBo
        })}
        headers={CMHeaders(setfiltro, filtro)}
        loading={loading}
        pagination={paginate}
        fetchdata={initdata}
        selectable={true}
        selectedAction={(selecteds) => console.log(selecteds)}
        eliminar={permisionsMensajeriaBo.eliminar}
      />
    </Box>
  );
}

export default CMTabla;
