import React from 'react';

import {
  HStack,
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  UnorderedList,
  ListItem
} from '@chakra-ui/react';

import useWindowSize from '@/common/hooks/useWindowSize';
import { dataFooterSiteMap } from './FooterSiteMap.data';

import {
  FooterSections,
  SeccionTitle,
  Container
} from './FooterSiteMap.styles';
import { Link, useHistory } from 'react-router-dom';
import { FaFacebook, FaInfoCircle, FaInstagram } from 'react-icons/fa';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { SiTiktok } from 'react-icons/si';
import { CVText } from '@/common/CovendeTemplate';
import { userLoginByCode } from '@CVApi/core/webpublic/userData/UserValidationCode';

const ListLinks = (props) => {
  const { list } = props;
  return (
    <UnorderedList listStyleType='none' marginLeft='0px'>
      {list.map((item, index) => (
        <ListItem key={index} margin='16px 0px'>
          {item.route ? (
            <Link to={item.route}>
              <CVText color='blue'>{item.title}</CVText>
            </Link>
          ) : (
            item.title
          )}
        </ListItem>
      ))}
    </UnorderedList>
  );
};

const SectionList = (props) => {
  const { sections } = props;
  return sections.map((item, index) => (
    <div key={index} style={{ display: 'block' }}>
      <Text fontSize='14px' fontWeight='600' margin='0px'>
        {item.title}
      </Text>
      <ListLinks list={item.sections} />
    </div>
  ));
};

function FooterSiteMap(props) {
  const screenSize = useWindowSize();
  const isMobile = screenSize.width < 576;

  const history = useHistory();
  // const isLoggedIn= isLoggedIn()

  return dataFooterSiteMap.length ? (
    isMobile ? (
      <>
        <Accordion bg='#FAFDFF'>
          {dataFooterSiteMap.map((columna, index) => (
            <AccordionItem key={index} borderColor='transparent'>
              <AccordionButton
                _focus={{
                  boxShadow: 'none'
                }}>
                <Box flex='1' textAlign='left'>
                  {columna.title}
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4} display='block' color='blue'>
                {columna.sections.length ? (
                  <ListLinks list={columna.sections} />
                ) : null}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
        <div style={{ padding: '16px', backgroundColor: '#FAFDFF' }}>
          <HStack spacing='8px'>
            <SeccionTitle> Síguenos en</SeccionTitle>
            <FaFacebook />
            <FaInstagram />
            <AiFillTwitterCircle />
          </HStack>
          <br />
          <HStack spacing='8px'>
            <FaInfoCircle />
            <SeccionTitle> Centro de ayuda</SeccionTitle>
          </HStack>
        </div>
      </>
    ) : (
      <FooterSections>
        <Container>
          <SectionList sections={dataFooterSiteMap} />
          <div>
            <SeccionTitle>Síguenos en</SeccionTitle>
            <HStack spacing='8px'>
              <a href='https://www.facebook.com/CoVende/' target='_blank'>
                <FaFacebook style={{ fontSize: '2rem' }} />
              </a>
              <a href='https://www.instagram.com/covendeperu/' target='_blank'>
                <FaInstagram style={{ fontSize: '2rem' }} />
              </a>
              <a href='https://www.tiktok.com/@covende?_t=8kU5PH8c1XK&_r=1' target='_blank'>
                <SiTiktok style={{ fontSize: '2rem' }} />
              </a>
              {/* <a href='https://twitter.com/EvanzuPeru' target='_blank'>
                <AiFillTwitterCircle style={{ fontSize: '2rem' }} />
              </a> */}
            </HStack>
            <br />
            {/* {isLoggedIn && ( */}
            <HStack
              spacing='8px'
              onClick={() => history.push('/buyer/centroayuda')}>
              <FaInfoCircle style={{ fontSize: '2rem' }} />
              <SeccionTitle> Centro de ayuda</SeccionTitle>
            </HStack>
            {/* // )} */}
          </div>
        </Container>
      </FooterSections>
    )
  ) : null;
}

export default FooterSiteMap;
