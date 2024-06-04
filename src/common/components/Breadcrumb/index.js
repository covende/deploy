import {
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@chakra-ui/react';

import { TiChevronRight } from 'react-icons/ti';

import React from 'react';
import { Link } from 'react-router-dom';
import CVLink from '@CVTemplate/core/CVLink';
import CVText from '@CVTemplate/core/CVText';

function StyledBreadcrumb(props) {
  const listPaths = props.rootLayoutPath
    ? props.data.filter(
        (i) =>
          i.path.includes(props.rootLayoutPath) ||
          i.path.includes('/seller') ||
          i.path.includes('/buyer')
      )
    : props.data;

  return (
    <>
      <Breadcrumb
        color='#00ADF6'
        marginBottom='16px'
        spacing='8px'
        separator={<TiChevronRight color='gray.500' />}>
        {listPaths.map((item, index) => (
          <BreadcrumbItem key={index} isCurrentPage={item.current}>
            <CVLink href={item.path}>
              <CVText color='primary'>{item.name}</CVText>
            </CVLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </>
  );
}

export default StyledBreadcrumb;
