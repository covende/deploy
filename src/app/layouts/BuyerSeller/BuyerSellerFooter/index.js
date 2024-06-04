import React from 'react';

import Copyright from '../../WebPublic/WebPublicFooter/Copyright';

// Subsections
import FooterLinks from './FooterLinks';

function BuyerSellerFooter() {
  return (
    <footer
      style={{
        width: '100%',
        color: '#ffffff'
      }}>
      <FooterLinks />
      <Copyright company='CoVende Perú' />
    </footer>
  );
}

export default BuyerSellerFooter;
