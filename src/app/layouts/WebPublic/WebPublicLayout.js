import React, { Suspense } from 'react';
import {} from '@chakra-ui/react';

// Components
import Loading from '@/app/components/Loading';
import { Container } from '@chakra-ui/react';
import { Breadcrumb } from '@/common/components';
import { SCREEN } from '@CVTemplate/core/CVThemes';

// Layouts items
const Topbar = React.lazy(() => import('./WebPublicTopbar'));
const Footer = React.lazy(() => import('./WebPublicFooter'));

const width = () => {
  const ancho = window.screen.width;
  if (ancho > SCREEN.md.min) return 130;
  if (ancho > SCREEN.sm.min) return 190;
  return 200;
};

// Loading
const loading = () => <Loading>Cargando PublicLayout...</Loading>;

const WebPublicLayout = (props) => {
  const children = props.children || null;
  // console.log('props.crumbs', props.crumbs);
  return (
    <Container
      padding='0px'
      maxWidth='100%'
      width='100%'
      height='100%'
      overflow='hidden'>
      <Suspense fallback={loading()}>
        <Topbar {...props} />
      </Suspense>
      <Container
        padding={`${width()}px 0px 16px 0px`}
        minHeight={`calc(100vh - ${width()}px)`}
        maxWidth='100%'
        backgroundColor='#f2f2f2'
        boxSizing='border-box'>
        <Suspense fallback={loading()}>
          {/* <Breadcrumb data={props.crumbs} rootLayoutPath='/' /> */}
          {children}
        </Suspense>
      </Container>
      <Footer />
    </Container>
  );
};

export default WebPublicLayout;
