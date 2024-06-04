import { MESSAGE_BY_SALA } from '@/app/api/graphql/webtopbar/MessageManager';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { getLoggedInUser } from '@/app/helpers/authUtils';
// import { getLoggedInUser } from '@/app/helpers/authUtils';
import { Box } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';
import { CVButton, CVColumn, CVPanel, CVRow } from '..';
import CVMessagesAddMessage from './CVMessagesAddMessage';
import CVMessagesDetails from './CVMessagesDetails';
import CVMessagesMessage from './CVMessagesMessage';
import { useSelector } from 'react-redux';

function CVMessagesMessages({ salaID, sala, closeSala }) {
  const [loading, setloading] = useState(false);
  const [pagination, setpagination] = useState({});
  const [messages, setmessages] = useState([]);
  let reff = useRef(null);
  let mountedRef = useRef(true);
  const addmessage = (message) => {
    setScrollTop(false);
    setmessages([...messages, message]);
  };
  const [scrollTop, setScrollTop] = useState(false);
  // const sala = useSelector((state) => state.sala);

  const gotoscroll = () => {
    if (reff?.current != null) {
      if (scrollTop) reff.current.scrollTop = 0;
      else reff.current.scrollTop = reff?.current?.scrollHeight;
    }
  };

  const initdata = async ({ page = 1, limit = 10, top = false }) => {
    // const us = getLoggedInUser();
    const lastmessages = [...messages];
    if (page == 1) setmessages([]);

    setloading(true);
    const { MessageBySala } = await AxiosGQL(
      MESSAGE_BY_SALA(salaID, page, limit)
    );
    setmessages([
      ...MessageBySala.docs.reverse(),
      ...(page == 1 ? [] : lastmessages)
    ]);
    setpagination({ ...MessageBySala, docs: [] });
    setScrollTop(top);
    gotoscroll();
    setloading(false);
  };

  useEffect(() => {
    gotoscroll();
  }, [messages, reff, initdata]);

  useEffect(() => {
    initdata({});
  }, [salaID]);

  return (
    <CVPanel itemDirection='column' key={v4()}>
      {pagination?.hasNextPage ? (
        <CVRow justifyContent='center'>
          <Box>
            <CVButton
              disabled={loading}
              isLoading={loading}
              onClick={() =>
                initdata({ page: pagination.nextPage, limit: 10, top: true })
              }>
              Cargar más
            </CVButton>
          </Box>
        </CVRow>
      ) : (
        ''
      )}
      <Box
        position='relative'
        width='100%'
        overflow='auto'
        height='calc(100vh - 430px)'
        wrap='nowrap'
        transition='all .5s ease'
        ref={(ref) => {
          reff.current = ref;
        }}>
        {messages.map((item) => (
          <CVMessagesMessage key={v4()} message={item} sala={sala} />
        ))}
      </Box>

      <CVMessagesAddMessage
        salamessage={sala}
        addmessage={addmessage}
        closeSala={closeSala}
        totalMessages={pagination?.totalDocs || 0}
        // typeUser={typeUser}
      />
    </CVPanel>
  );
}

export default CVMessagesMessages;
