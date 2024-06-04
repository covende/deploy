import {
  SALA_MESSAGE_BY_USER_ID,
  MESSAGES_UNREAD,
  GET_SALA_BY_USER,
  CLOSE_SALA
} from '@/app/api/graphql/webtopbar/MessageManager';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVInput, CVPanel, CVText } from '@/common/CovendeTemplate';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';

import { Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';
import Messages from './components/Messages';
import MessageSala from './components/MessageSala';
import Point from './components/points/Points';
import { useDispatch, useSelector } from 'react-redux';
import CVMessages from '@CVTemplate/core/CVMessages';
import { updateSala, updateStatusSala } from './redux/salaActions';
import { useToast } from '@chakra-ui/toast';
import { CVAlertSuccess } from '@CVTemplate/core/CVAlert';

function MensajesAdmin() {
  const [search, setsearch] = useState('');
  const [lista, setlista] = useState([]);
  const [pagination, setPagination] = useState({});
  const [notRead, setNotRead] = useState(0);
  const [update, setUpdate] = useState(false);
  const { sala } = useParams();
  const dispatch = useDispatch();
  const addToast = useToast();
  const salaCurrent = useSelector((state) => state.sala);

  const initdata = async () => {
    console.log('cargando las salas....');
    let { getSalasByUser } = await AxiosGQL(GET_SALA_BY_USER());

    if (getSalasByUser?.status) {
      setPagination(getSalasByUser.info);
      let index = -1;
      if (sala) {
        index = getSalasByUser.salas.findIndex((room) => room.sala == sala);
        if (index > -1) getSalasByUser.salas[index].selected = true;
      }

      if (index > -1) dispatch(updateSala(getSalasByUser.salas[index]));
      setlista(getSalasByUser.salas);
    }

    let { messagesUnread } = await AxiosGQL(MESSAGES_UNREAD());
    if (messagesUnread) setNotRead(messagesUnread);
  };

  const searchSalas = (search) => {
    document.forms[0].elements[0].blur();
    if (lista.length != 0) {
      let wordSearch = new RegExp(search, 'i');
      let names = lista.filter((sala) => sala.user_last.name.match(wordSearch));
      if (names.length == 0) {
        let order_ids = lista.filter((sala) => sala.origin.match(wordSearch));
        setlista(order_ids);
      } else {
        setlista(names);
      }
    }
  };

  useEffect(() => {
    searchSalas(search);
    if (search == '') initdata();

    return () => dispatch(updateSala({}));
  }, [search, update]);

  const closeSala = async (sala) => {
    const { closeSala } = await AxiosGQL(CLOSE_SALA(sala));
    if (closeSala) {
      CVAlertSuccess({
        addToast,
        message: 'Terminaste la conversación de forma exitosa'
      });
      const status = closeSala && 'Cerrado';
      dispatch(updateStatusSala(status));
      setlista(
        lista.map((list) => ({
          ...list,
          status: list.sala == sala ? status : list.status
        }))
      );
    }
  };

  return (
    <Box>
      <CVText fontSize='2rem' fontWeight='bold' color='red'>
        Área de Mensajería
      </CVText>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={4}>
          <CVPanel
            itemDirection='column'
            height='100%'
            style={{ overflow: 'auto', maxHeight: 'calc(100vh - 180px)' }}>
            <SizeBox />
            <form
              style={{ width: '100%' }}
              onSubmit={(e) => {
                e.preventDefault();
                searchSalas(search);
              }}>
              <CVInput
                iconFind={true}
                submit
                buttonColor='white'
                widthBox='100%'
                icon={
                  <CVText>
                    <BsSearch color={COLORS['primary']} />
                  </CVText>
                }
                value={search}
                onChange={(value) => setsearch(value)}
              />
            </form>
            <SizeBox />
            <CVText fontWeight='bold' color='blue'>
              {notRead != 0 && <Point m='0 5px 0 0' />} ({notRead}) Mensajes no
              leídos
            </CVText>
            <SizeBox />
            {lista &&
              lista.map((item) => (
                <MessageSala
                  key={v4()}
                  sala={item}
                  room={salaCurrent.sala}
                  allSalas={lista}
                  setNotRead={(value) => setNotRead(notRead - value)}
                  // setSala={setSala}
                  {...{ update, setUpdate, setlista }}
                />
              ))}
          </CVPanel>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <Messages salas={lista} setSalas={setlista} closeSala={closeSala} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default MensajesAdmin;
