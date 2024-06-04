import React, { useState } from 'react';

import { Flex, Box, Text } from '@chakra-ui/react/';

import { COLORS } from '../CVThemes';
import { Link } from 'react-router-dom';
import CVImage from '../CVImage';
import CVLine from '../CVLine';
import CVText from '../CVText';

const Clip = () => (
  <svg width='20' height='12' viewBox='0 0 20 12'>
    <path
      d='M15.4749 3.20098L13.6648 3.25123L5.50978 3.47761C4.01452 3.51912 2.93342 4.76617 3.0914 6.25363C3.24937 7.7411 4.58822 8.92096 6.08347 8.87946L14.2385 8.65308C14.573 8.64379 14.8149 8.36717 14.7796 8.03445C14.7442 7.70172 14.4451 7.44012 14.1107 7.4494L5.96108 7.68054C5.12492 7.70375 4.37988 7.05212 4.29153 6.22032C4.20319 5.38851 4.80585 4.69947 5.64201 4.67625L13.797 4.44987L15.6071 4.39963C17.1122 4.35785 18.4554 5.53269 18.6144 7.02994C18.7735 8.52719 17.6869 9.76948 16.1818 9.81126L14.6713 9.84828L6.22114 10.0829L5.62107 10.0995C3.45817 10.1252 1.55711 8.43585 1.33054 6.30251C1.10397 4.16917 2.64048 2.37949 4.78187 2.2906L13.8419 2.03909C14.0583 2.03309 14.2426 1.91019 14.3311 1.72126C14.4195 1.53232 14.3956 1.30724 14.2677 1.12431C14.1397 0.941384 13.9261 0.834444 13.7141 0.835422L4.65404 1.08693C1.82197 1.17536 -0.227941 3.51911 0.0713778 6.33747C0.370697 9.15582 2.90492 11.3723 5.73907 11.3035L14.7991 11.052L16.3141 11.0099C18.449 10.9065 19.9712 9.12208 19.7457 6.99853C19.5148 4.87023 17.6137 3.18087 15.4749 3.20098Z'
      fill='#B0B0B0'
    />
  </svg>
);

export function QuotationRender({ messageParse }) {
  const [showQuotation, setShowQuotation] = useState(false);
  return (
    <Box>
      {messageParse && (
        <Flex
          border='1px solid #DCE0E3'
          p='18px 13px'
          align='start'
          borderRadius='10px'>
          {messageParse.product_photo && (
            <CVImage
              height='73px'
              width='91px'
              image={messageParse.product_photo}
            />
          )}
          <Box ml='10px'>
            <CVText
              variant='maxtext'
              color='blue'
              fontSize='14'
              fontWeight={600}>
              {messageParse.product_name}
            </CVText>
            <CVLine lineHeight='2px' color='lightGray' height='1rem' />

            <CVText fontWeight='bold' fontSize='10' color='textDescription'>
              Cantidad:{' '}
              <span style={{ fontWeight: 'normal' }}>
                {messageParse.quantity}
              </span>
            </CVText>
            <CVText fontWeight='bold' fontSize='10' color='textDescription'>
              Tiempo de entrega requerido:{' '}
              <span style={{ fontWeight: 'normal' }}>
                {messageParse.delivery_time}
              </span>
            </CVText>
            {showQuotation && (
              <Box mt='13px'>
                <CVText size='12'>{messageParse.detail}</CVText>
              </Box>
            )}
            {messageParse.file && (
              <Flex
                align='center'
                mt='13px'
                p='5px'
                borderRadius='14px'
                cursor='pointer'
                maxW='12rem'
                justify='center'
                boxShadow='0px 2px 1px rgba(0, 0, 0, 0.1)'
                onClick={() => window.open(messageParse.file, '_blank')}>
                <Clip />
                <CVText
                  marginLeft='5px'
                  color='gray'
                  size='11'
                  fontWeight='bold'>
                  Archivo adjunto
                </CVText>
              </Flex>
            )}
          </Box>
        </Flex>
      )}
      <Text
        onClick={() => setShowQuotation(!showQuotation)}
        textDecoration='underline'
        textAlign='end'
        color='#004772'>
        {!showQuotation ? 'Ver todo' : 'Ver menos'}
      </Text>
    </Box>
  );
}

export function DevolutionRender({ messageParse, createdBy }) {
  return (
    <Flex flexDirection='column' alignItems='center'>
      {createdBy.guest ? (
        <Text color={COLORS['green']}>
          {createdBy?.name}{' '}
          {messageParse?.message?.[createdBy?.guest || 'guest']}
        </Text>
      ) : (
        <Text color={COLORS['green']}>{messageParse?.message?.owner}</Text>
      )}
      {messageParse?.link && (
        <Link
          to={
            createdBy.guest
              ? messageParse?.link?.[createdBy?.guest || 'guest']
              : messageParse?.link?.owner
          }
          style={{
            color: COLORS['green'],
            borderBottom: `1px solid ${COLORS['green']}`
          }}>
          Ver
        </Link>
      )}
    </Flex>
  );
}

export function SaleCutRender({ messageParse, createdBy }) {
  return (
    <Flex flexDirection='column' alignItems='center'>
      {createdBy.guest ? (
        <Text color={COLORS['green']}>
          {createdBy?.name}{' '}
          {messageParse?.message?.[createdBy?.guest || 'guest']}
        </Text>
      ) : (
        <Text color={COLORS['green']}>{messageParse?.message?.owner}</Text>
      )}
      {messageParse?.link && (
        <Link
          to={
            createdBy.guest
              ? messageParse?.link?.[createdBy?.guest || 'guest']
              : messageParse?.link?.owner
          }
          style={{
            color: COLORS['green'],
            borderBottom: `1px solid ${COLORS['green']}`
          }}>
          Ver
        </Link>
      )}
    </Flex>
  );
}

export function ParseJsonMessage({ msg, type, auth, createdBy }) {
  try {
    let messageParse = JSON.parse(msg);
    if (typeof messageParse == 'object') {
      if (auth?.id != createdBy?.id)
        createdBy.guest = auth?.type || 'administrative';

      let messageTypes = {
        devolution: () => DevolutionRender({ messageParse, createdBy }),
        quotation: () => QuotationRender({ messageParse }),
        sale_cut: () => SaleCutRender({ messageParse, createdBy })
      };
      return messageTypes[type]();
    } else {
      return JSON.parse(msg);
    }
  } catch (error) {
    return msg;
  }
}
