import {
  CLOSE_SALA,
  saveChatMessage
} from '@/app/api/graphql/webtopbar/MessageManager';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import React, { useEffect, useRef, useState } from 'react';
import CVText from '@/common/CovendeTemplate/CVText';

import { useToast } from '@chakra-ui/toast';
import { Flex } from '@chakra-ui/react/';
import { CVAlertError, CVAlertSuccess } from '../CVAlert';
import CVMessagesAddMessageForms from './CVMessagesAddMessageForms';
import { useDispatch, useSelector } from 'react-redux';
import { detect_cellphone, detect_url } from '../CVValidation';
import { updateStatusSala } from '@CVPages/core/admin/mensajes/redux/salaActions';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import { updateSala } from '@CVPages/core/admin/mensajes/redux/salaActions';

function CVMessagesAddMessage({
  addmessage,
  salamessage,
  typeUser = 'bo',
  totalMessages,
  closeSala
}) {
  const addToast = useToast();
  const sala = useSelector((state) => state.sala);
  const us = getLoggedInUser();
  const dispatch = useDispatch();
  const [sending, setsending] = useState(false);
  const [message, setmessage] = useState('');
  const [attach, setattach] = useState([]);
  const mountedRef = useRef(true);
  const addattach = ({ type, file }) => {
    if (file.status == 'ok') {
      setattach([...attach, { type, location: file.data }]);
    } else {
      CVAlertError({ addToast, message: 'No se pudo subir' });
    }
  };
  const trashattach = () => setattach([]);

  const sendmessage = async () => {
    if (message == '' && attach.length == 0) {
      CVAlertError({
        addToast,
        message: 'Envía al menos un mensaje o un archivo.'
      });
      return false;
    }
    if (message.match(detect_cellphone) != null) {
      CVAlertError({ addToast, message: 'No se admiten números de teléfono.' });
      return false;
    }
    if (message.match(detect_url) != null) {
      CVAlertError({
        addToast,
        message: 'No se admiten direcciones de sitios web.'
      });
      return false;
    }
    setsending(true);

    let newMessage = await saveChatMessage({
      sala: salamessage.sala,
      message,
      adjunts: attach
    });

    if (newMessage) {
      if (salamessage?.auth?.id !== newMessage?.created_by?.id) {
        dispatch(
          updateSala({
            ...salamessage,
            auth: newMessage.created_by
          })
        );
      }
      addmessage(newMessage);
    }

    setsending(false);
    setmessage('');
    setattach([]);
  };

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, [salamessage]);

  const cancelSala = async () => {
    // const { closeSala } = await AxiosGQL(CLOSE_SALA(sala.sala));
    // if (closeSala) {
    //   CVAlertSuccess({
    //     addToast,
    //     message: 'Terminaste la conversación de forma exitosa'
    //   });
    //   const status = closeSala && 'Cerrado';
    //   dispatch(updateStatusSala(status));
    // }
  };
  return sala && sala?.status != 'Cerrado' ? (
    <CVMessagesAddMessageForms
      sendmessage={sendmessage}
      trashattach={trashattach}
      addattach={addattach}
      attach={attach}
      sending={sending}
      message={message}
      setmessage={setmessage}
      {...{ cancelSala, sala, typeUser, closeSala, totalMessages }}
    />
  ) : (
    <Flex justify='center' w='100%'>
      <CVText color='blue'>
        {salamessage?.auth?.id === salamessage?.created_by?.id
          ? 'Has '
          : 'El creador del chat ha '}
        decidido finalizar el chat.
      </CVText>
    </Flex>
  );
}

export default CVMessagesAddMessage;
