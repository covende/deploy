import React from 'react';
import Copyright from '../../WebPublic/WebPublicFooter/Copyright';

function BackofficeFooter() {
  return (
    <footer
      style={{
        width: '100%',
        color: '#ffffff',
        gridArea: 'footer'
      }}
    >
      <Copyright company='CoVende Perú' />
    </footer>
  );
}

export default BackofficeFooter;
