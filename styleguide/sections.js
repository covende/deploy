const sections = [
  {
    name: 'Introducción',
    content: 'README.md'
  },
  {
    name: 'Documentación',
    sections: [
      {
        name: 'Instalación',
        description: 'The description for the installation section',
        content: 'docs/installation.md'
      },
      {
        name: 'Configuración',
        content: 'docs/configuration.md'
      },
      {
        name: 'Redux',
        sections: [
          {
            name: 'Introducción',
            content: 'docs/pages/redux/introduction.md'
          },
          {
            name: 'Redux vs MVC',
            content: 'docs/pages/redux/redux-vs-mvc.md'
          },
          {
            name: 'Ejemplo práctico',
            content: 'docs/pages/redux/redux-basic-example.md'
          },
          {
            name: 'Middleware',
            content: 'docs/pages/redux/redux-middleware.md'
          },
          {
            name: 'En el sistema',
            content: 'docs/pages/redux/in-system.md'
          }
        ]
      },
      {
        name: 'Demo de la aplicación',
        external: true,
        href: 'https://www.v0.covende.pe'
      }
    ]
  },
  {
    name: 'UI Components',
    content: 'docs/ui.md',
    sections: [
      {
        name: 'Accordion',
        components: 'src/common/components/Accordion/Accordion.js',
        description: 'La descripción de Accordion'
      },
      {
        name: 'Card',
        components: 'src/common/components/Card/CardBody.js',
        content: 'docs/installation.md',
        description: 'La descripción de CardBody'
      },
      {
        name: 'Card',
        components: 'src/common/components/Card/CardBody.js',
        content: 'docs/installation.md',
        description: 'La descripción de CardBody'
      },
      {
        name: 'Card',
        components: 'src/common/components/Card/CardBody.js',
        content: 'docs/installation.md',
        description: 'La descripción de CardBody'
      },
      {
        name: 'Card',
        components: 'src/common/components/Card/CardBody.js',
        content: 'docs/installation.md',
        description: 'La descripción de CardBody'
      },
      {
        name: 'Card',
        components: 'src/common/components/Card/CardBody.js',
        content: 'docs/installation.md',
        description: 'La descripción de CardBody'
      },
      {
        name: 'Card',
        components: 'src/common/components/Card/CardBody.js',
        content: 'docs/installation.md',
        description: 'La descripción de CardBody'
      },
      {
        name: 'Card',
        components: 'src/common/components/Card/CardBody.js',
        content: 'docs/installation.md',
        description: 'La descripción de CardBody'
      },
      {
        name: 'Card',
        components: 'src/common/components/Card/CardBody.js',
        content: 'docs/installation.md',
        description: 'La descripción de CardBody'
      },
      {
        name: 'Card',
        components: 'src/common/components/Card/CardBody.js',
        content: 'docs/installation.md',
        description: 'La descripción de CardBody'
      },
      {
        name: 'Card',
        components: 'src/common/components/Card/CardBody.js',
        content: 'docs/installation.md',
        description: 'La descripción de CardBody'
      },
      {
        name: 'Card',
        components: 'src/common/components/Card/CardBody.js',
        content: 'docs/installation.md',
        description: 'La descripción de CardBody'
      },
      {
        name: 'Card',
        components: 'src/common/components/Card/CardBody.js',
        content: 'docs/installation.md',
        description: 'La descripción de CardBody'
      },
      {
        name: 'Card',
        components: 'src/common/components/Card/CardBody.js',
        content: 'docs/installation.md',
        description: 'La descripción de CardBody'
      }
    ]
    // components: 'src/common/components/**/*.js',
    // exampleMode: 'collapse', // 'hide' | 'collapse' | 'expand'
    // usageMode: 'collapse', // 'hide' | 'collapse' | 'expand'
  }
];

module.exports = sections;
