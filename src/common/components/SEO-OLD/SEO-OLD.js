import React from 'react';
import { Helmet } from 'react-helmet';

function SEO_OLD({
  siteTitle,
  title,
  description,
  keywords,
  type,
  url,
  image
}) {
  return (
    <Helmet
      title={title}
      titleTemplate={siteTitle ? `%s - ${siteTitle}` : null}
      meta={[
        {
          name: 'title',
          content: `${title} - ${siteTitle}`
        },
        {
          name: 'description',
          content: description
        },
        {
          name: 'keywords',
          content: keywords
        },
        {
          property: 'og:title',
          content: `${title} - ${siteTitle}`
        },
        {
          property: 'og:description',
          content: description
        },
        {
          property: 'og:type',
          content: type
        },
        {
          property: 'og:url',
          content: url
        },
        {
          property: 'og:image',
          content: image
        },
        {
          property: 'og:site_name',
          content: title
        },
        {
          name: 'twitter:card',
          content: description
        },
        {
          name: 'twitter:url',
          content: url
        },
        {
          name: 'twitter:title',
          content: `${title} - ${siteTitle}`
        },
        {
          name: 'twitter:description',
          content: description
        },
        {
          name: 'twitter:image',
          content: image
        }
      ]}
    />
  );
}

// Ejemplo
// <meta property='og:title' content='Title of the article'/>
// <meta property='og:image' content='//media.example.com/ 1234567.jpg'/>
// <meta property='og:description' content='Description that will show in the preview'/>
// <meta property='og:url' content='//www.example.com/URL of the article'/>

export default SEO_OLD;
