import { CVAlertError } from '@CVTemplate/core/CVAlert';
import CVMessagesAddMessageForms from '@CVTemplate/core/CVMessages/CVMessagesAddMessageForms';
import CVModal from '@CVTemplate/core/CVModal';
import React, { useEffect, useRef, useState } from 'react';
import { useToast } from '@chakra-ui/toast';
import { replyquotation } from '@CVApi/core/webtopbar/MessageManager';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVImage from '@CVTemplate/core/CVImage';
import CVText from '@CVTemplate/core/CVText';
import { Flex, Box } from '@chakra-ui/react';
function CotReply({ isOpen, onClose, process, idcot, cotizacion }) {
  const addToast = useToast();
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
    // if (message == '') {
    //   CVAlertError({ addToast, message: 'Escribe un mensaje' });
    //   return false;
    // }
    setsending(true);
    const result = await replyquotation({
      quotation_id: idcot,
      message,
      adjunts: attach
    });
    if (result?.status) {
      process();
    }
  };

  useEffect(() => {}, [idcot]);

  return (
    <CVModal
      size='3xl'
      isOpen={isOpen}
      onClose={onClose}
      header={
        'Responder a ' +
        cotizacion?.user?.first_name +
        ' ' +
        cotizacion?.user?.last_name
      }>
      <SizeBox />

      <Flex>
        <CVImage height='50px' width='auto' image={cotizacion?.product_photo} />
        <SizeBox />
        <Box>
          <CVText color='blue' fontWeight='bold'>
            {cotizacion?.product_name}
          </CVText>
          <CVText>
            {cotizacion?.quantity} {cotizacion?.measure_unit}
          </CVText>
        </Box>
      </Flex>
      <SizeBox />

      <CVMessagesAddMessageForms
        sendmessage={sendmessage}
        trashattach={trashattach}
        addattach={addattach}
        attach={attach}
        sending={sending}
        message={message}
        setmessage={setmessage}
      />
    </CVModal>
  );
}

export default CotReply;
