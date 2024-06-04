import React, { useState } from 'react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Box } from '@chakra-ui/layout';
import { Button } from '@material-ui/core';
import { IoIosImages } from 'react-icons/io';
import { IoDocumentAttachOutline } from 'react-icons/io5';
import { MdCancelScheduleSend } from 'react-icons/md';
import {
  CVButton,
  CVColumn,
  CVInput,
  CVInputFileLink,
  CVRow,
  CVText
} from '..';

function CVMessagesAddMessageForms({
  sendmessage,
  trashattach,
  addattach,
  attach,
  sending,
  message,
  setmessage,
  cancelSala,
  sala,
  typeUser,
  totalMessages,
  closeSala
}) {
  const [closeLoading, setCloseLoading] = useState(false);
  return (
    <Box backgroundColor='#EFEFEF' width='100%'>
      <CVRow wrap='nowrap'>
        <Box rounded='1rem' backgroundColor='#FFFFFF' margin='1rem' width='80%'>
          <CVInput
            value={message}
            onChange={(value) => setmessage(value)}
            multiline={true}
            backgroundColor='white'
            width='100%'
            height='100%'
          />
        </Box>
        <CVColumn justifyContent='center' width='15%' alignItems='center'>
          <SizeBox height='3rem' />
          <Button>
            <CVRow wrap='nowrap' justifyContent='space-around'>
              <CVInputFileLink
                accept='application/pdf'
                callback={(e) => addattach({ type: 'documents', file: e })}>
                <IoDocumentAttachOutline style={{ fontSize: '2rem' }} />
              </CVInputFileLink>
              <SizeBox />
              <CVInputFileLink
                accept='image/*'
                callback={(e) => addattach({ type: 'image', file: e })}>
                <IoIosImages style={{ fontSize: '2rem' }} />
              </CVInputFileLink>
            </CVRow>
          </Button>
          <SizeBox />

          <CVButton
            onClick={() => sendmessage()}
            width='100%'
            isLoading={sending}
            disabled={sending}>
            Enviar
          </CVButton>
          <SizeBox />
          {sala && totalMessages > 0 && sala?.auth?.id == sala?.created_by?.id && (
            <CVButton
              onClick={async () => {
                setCloseLoading(true);
                await closeSala(sala.sala);
              }}
              width='100%'
              backgroundColor='red'
              isLoading={closeLoading}
              disabled={closeLoading}>
              Fin Conver.
            </CVButton>
          )}
        </CVColumn>
      </CVRow>
      <CVRow wrap='nowrap' alignItems='center'>
        {attach.length > 0 ? <SizeBox /> : ''}
        <CVText>
          {attach.length > 0
            ? 'Adjuntado ' + attach.length + ' documentos'
            : ''}
        </CVText>
        {attach.length > 0 ? <SizeBox /> : ''}

        {attach.length > 0 ? (
          <CVButton
            backgroundColor='red'
            onClick={() => trashattach()}
            height='1.5rem'
            padding='0px'
            width='2rem'>
            <MdCancelScheduleSend />
          </CVButton>
        ) : (
          ''
        )}
      </CVRow>
      <SizeBox />
    </Box>
  );
}

export default CVMessagesAddMessageForms;
