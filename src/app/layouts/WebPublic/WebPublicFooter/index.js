import React from 'react';

// @components
import Copyright from './Copyright';

// Subsections
import FooterSubscribe from './FooterSubscribe';
import FooterBrand from './FooterBrand';
import FooterSiteMap from './FooterSiteMap';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { Container } from '@material-ui/core';

function WebPublicFooter() {
  return (
    <footer style={{ color: COLORS['blue'], backgroundColor: COLORS['white'] }}>
      <Container>
        <FooterSubscribe />
        <FooterBrand />
        <FooterSiteMap />
      </Container>
      <Copyright company='CoVende Perú' />
    </footer>
  );
}

export default WebPublicFooter;
