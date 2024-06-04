import React, { Suspense } from 'react';
import {} from '@chakra-ui/react';

// Components
import Loading from '@/app/components/Loading';
import { Container } from '@chakra-ui/react';
import { Breadcrumb } from '@/common/components';
import { SCREEN } from '@CVTemplate/core/CVThemes';

// Loading
const loading = () => <Loading>Cargando PublicLayout...</Loading>;

const CleanOutLayout = (props) => {
  const children = props.children || null;
  // console.log('props.crumbs', props.crumbs);
  return (
    <>
      {/* <Suspense fallback={loading()}></Suspense> */}
      <>
        <Suspense fallback={loading()}>{children}</Suspense>
      </>
    </>
  );
};

export default CleanOutLayout;
