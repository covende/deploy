import React from 'react';

import { Box, Flex } from '@chakra-ui/layout';
import { BsChatText } from 'react-icons/bs';
import { IoDocumentAttachOutline, IoImageOutline } from 'react-icons/io5';
import { v4 } from 'uuid';

import { COLORS } from '../CVThemes';
import { CVFormatDate } from '../CVMethods';
import { CVImage, CVLine, CVText } from '..';
import { hoursLocal } from '@CVPages/core/admin/mensajes/components/MessageSala';
import { ParseJsonMessage } from './CVParseJsonMessage';
import SizeBox from '@/common/components/CustomComponent/SizeBox';

function CVMessagesMessage({ message, sala }) {
  const icons = {
    image: <IoImageOutline />,
    documents: <IoDocumentAttachOutline />,
    text: <BsChatText />
  };

  return (
    <Box width='95%'>
      <Flex width='100%'>
        {message && message?.created_by?.id != sala?.auth?.id && (
          <>
            <Flex>
              <CVImage
                variant='avatar'
                image={
                  message?.created_by
                    ? message?.created_by?.photo
                    : sala?.auth?.photo
                }
                width='50px'
                height='50px'
                name={
                  message?.created_by
                    ? message?.created_by?.name
                    : sala?.auth?.name
                }
              />
            </Flex>
            <SizeBox />
          </>
        )}

        {message && message?.created_by?.id == sala?.auth?.id && (
          <SizeBox width='6rem' />
        )}

        <Flex flexDirection='column' width='100%'>
          <Flex
            flexDirection='column'
            alignItems={
              message && message?.created_by?.id == sala?.auth?.id
                ? 'end'
                : 'start'
            }>
            <CVText fontWeight='bold' color='blue'>
              {message?.created_by
                ? message?.created_by?.id == sala?.auth?.id
                  ? 'Yo'
                  : message?.created_by?.name
                : sala?.auth?.name}
            </CVText>
            <CVText fontSize='0.85rem' fontWeight='bold'>
              {CVFormatDate({
                date: message?.createdAt,
                format: 'DD/MM/YYYY'
              })}{' '}
              {hoursLocal(message?.createdAt)}
            </CVText>
          </Flex>
          <SizeBox />
          {message.message == '' ? (
            <>
              {/* <Messadetails /> */}
              {message.adjunts.length > 0 && (
                <Flex flexWrap='wrap' px='0.5rem'>
                  {message.adjunts &&
                    message.adjunts.map((item) => (
                      <a
                        key={v4()}
                        style={{
                          padding: '1px 5px',
                          boxShadow: '0 0 2px 2px #ececec',
                          borderRadius: '1rem',
                          margin: '0.25rem',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                        href={item.location}
                        target='_blank'>
                        {icons[item.type]} <SizeBox width='0.25rem' />
                        <CVText>{item.type}</CVText>
                      </a>
                    ))}
                </Flex>
              )}
            </>
          ) : (
            <>
              {message.message != '' && (
                <Box
                  padding='1rem'
                  rounded='1rem'
                  width='100%'
                  backgroundColor={
                    message.type !== 'normal'
                      ? 'transparent'
                      : message?.created_by?.id == sala?.auth?.id
                      ? COLORS['primary'] + '10'
                      : COLORS['red'] + '10'
                  }>
                  <CVText>
                    <ParseJsonMessage
                      msg={
                        message.type !== 'normal'
                          ? message.message
                          : JSON.stringify(message.message)
                      }
                      createdBy={message.created_by}
                      type={message.type}
                      auth={sala?.auth}
                    />
                  </CVText>
                </Box>
              )}
              <Flex flexWrap='wrap' padding='0.5rem'>
                {message.adjunts &&
                  message.adjunts.map((item) => (
                    <a
                      key={v4()}
                      style={{
                        padding: '1px 5px',
                        boxShadow: '0 0 2px 2px #ececec',
                        borderRadius: '1rem',
                        margin: '0.25rem',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      href={item.location}
                      target='_blank'>
                      {icons[item.type]} <SizeBox width='0.25rem' />
                      <CVText>{item.type}</CVText>
                    </a>
                  ))}
              </Flex>
            </>
          )}
        </Flex>

        {message && message?.created_by?.id != sala?.auth?.id && (
          <SizeBox width='6rem' />
        )}

        {/* {message && message?.created_by?.id == sala?.auth?.entity_id && (
          <>
            <SizeBox />
            <Flex>
              <CVImage
                variant='avatar'
                image={
                  message?.created_by ? message?.created_by?.photo : us?.image
                }
                width='50px'
                height='50px'
                name={
                  message?.created_by
                    ? message?.created_by?.name
                    : us?.first_name + ' ' + us?.last_name.split(' ')[0]
                }
              />
            </Flex>
          </>
        )} */}
      </Flex>

      <CVLine lineHeight='1px' color='lightGray' />
    </Box>
  );
}

export default CVMessagesMessage;
