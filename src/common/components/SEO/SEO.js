import React from 'react';
// import { Helmet } from 'react-helmet';

import { Helmet } from 'react-helmet-async';

function SEO({ title, description, name, type, url, image }) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      <link rel='mobile_link' href={image} />
      <link rel='canonical' href={url} />
      <link
        rel='alternate'
        media='only screen and (max-width: 640px)'
        href={url}
      />
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      <meta property='og:type' content={type} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />
      <meta property='og:url' content={url} />
      <meta property='og:type' content={type} />
      {/* End Facebook tags */}
      {/* Twitter tags */}
      <meta name='twitter:creator' content={name} />
      <meta name='twitter:card' content={type} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      {/* End Twitter tags */}
    </Helmet>
  );
}

// Ejemplo
// <meta property='og:title' content='Title of the article'/>
// <meta property='og:image' content='//media.example.com/ 1234567.jpg'/>
// <meta property='og:description' content='Description that will show in the preview'/>
// <meta property='og:url' content='//www.example.com/URL of the article'/>

export default SEO;
