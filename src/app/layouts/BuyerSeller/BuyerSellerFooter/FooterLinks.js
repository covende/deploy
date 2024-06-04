import React from 'react';

import { Flex, Text } from '@chakra-ui/react';

// Data Links
import dataFooterLinks from './FooterLinks.data';
import { Link } from 'react-router-dom';

function FooterLinks() {
  return (
    <Flex justifyContent='center' backgroundColor='#e9e9e9' padding='16px'>
      <Text color='#4d4d4d' width='850px' fontSize='12px' textAlign='center'>
        {dataFooterLinks.map((item, index) => (
          <React.Fragment key={index}>
            <Link to={item.route}>
              <span style={{ textColor: '#4d4d4d', fontSize: '12px' }}>
                {item.title}
              </span>
            </Link>
            {` ${item.separator} `}
          </React.Fragment>
        ))}
      </Text>
    </Flex>
  );
}

export default FooterLinks;
