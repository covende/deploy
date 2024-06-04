import React from 'react';

// SEO
import SEO_OLD from '@/common/components/SEO-OLD/SEO-OLD';

// const dataSEO = {
//   siteTitle: 'Sobre nosotros',
//   title: 'Covende',
//   description: 'Descripción sobre Nosotros de Covende houihoih',
//   keywords: 'Covende, compras, ventas, subastas, ofertas',
//   type: 'Artículo',
//   url: 'http://localhost:9000/',
//   image: 'https://via.placeholder.com/191x100',
// }

function Nosotros(props) {
  return (
    <div>
      <SEO_OLD
        siteTitle='Sobre nosotros'
        title='Covende'
        description='Descripción sobre Nosotros de Covende houihoih'
        keywords='Covende, compras, ventas, subastas, ofertas'
        type='Artículo'
        url='http://localhost:9000/'
        image='https://via.placeholder.com/191x100'
      />
      Nosotros new
    </div>
  );
}

export default Nosotros;
