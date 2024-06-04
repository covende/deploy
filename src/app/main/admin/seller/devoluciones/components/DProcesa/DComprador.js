import CVGridText from '@CVTemplate/core/CVGridText';
import React from 'react';

function DComprador({ comprador }) {
  return (
    <CVGridText
      options={[
        { title: 'Nombre', content: comprador.name },
        { title: 'Celular', content: comprador.phone },
        { title: 'Email', content: comprador.email }
      ]}
    />
  );
}

export default DComprador;
