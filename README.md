exit# FRONTEND

## Tecnologias usadas 🛠️

- [ReactJS](https://reactjs.org). Biblioteca de JavaScript para construir interfaces de usuario.
- [Webpack](https://webpack.js.org). Herramienta de compilación de dependencias
- [Redux](https://es.redux.js.org). Es un contenedor de estados predecible de aplicaciones JavaScript
- [Redux Saga](https://redux-saga.js.org). Biblioteca que maneja los efectos secundarios de la aplicación.
- [Emotion](https://emotion.sh/docs/introduction). Biblioteca diseñada para escribir estilos CSS con JavaScript

## Pre-requisitos 📋

- [NPM](https://www.npmjs.com). Gestor de paquetes.
- Sólidos conocimientos en Javascript.

## Estructura de carpetas

```markup
├── src/
│    ├── common/                                # Directorio de herramientas comunes en la aplicación.
│    │   ├── cache/                              # Adaptadores (localStorage y sessionStorage).
│    │   │
│    │   ├── components/                         # Componentes atómicos reutilizables.
│    │   │   │── index.js                        # Contiene exports de componentes.
│    │   │   │── StyleGuideWrapper.js
│    │   │   └── [ComponentName]/                # Directorio de [ComponentName].
│    │   │       ├── index.js
│    │   │       ├── [ComponentName].js          # Componente principal.
│    │   │       ├── [ComponentPartialName].js   # Componentes parciales del principal.
│    │   │       ├── [ComponentName].md          # Markdown para documentación del componente principal.
│    │   │       ├── [ComponentName].styles.js   # Estilos definidos por Emotion.
│    │   │       └── [ComponentName].themes.js   # Estilos definidos como un tema.
│    │   │
│    │   ├── hooks/                              # Hooks reutilizables
│    │   │   ├── index.js                        # Contiene exports de hooks.
│    │   │   └── [useHookName].js                # Contiene la funcionalidad del [useHookName].
│    │   │
│    │   ├── routes/                             # Routes reutilizables
│    │   │   ├── PrivateRoute.js                 # PrivateRoute para rutas privadas (con autorización).
│    │   │   └── Routes.js                       # Routes para la gestión de todas las rutas
│    │   │
│    │   ├── services/                           [Posiblemente se anule o se inserte funcionalidad en otra carpeta]
│    │   │
│    │   └── utils/                              # Colección de varias funciones de apoyo.
│    │       ├── index.js                        # Contiene exports de utils.
│    │       └── [utilName].js                   # Contiene la funcionalidad del [utilName].
│    │
│    ├── app/
│    │   ├── api/
│    │   │   ├── graphql/                        # Directorio de recursos GraphQL.
│    │   │   │   ├── index.js                    # Contiene exports para las entidades.
│    │   │   │   └── [entityFolder]/             # Directorio de la entidad.
│    │   │   │        ├── index.js               # Contiene exports para queries, mutations & subscriptions de la entidad.
│    │   │   │        ├── mutations.graphql      # Contiene todas las Consultas (queries) de la entidad.
│    │   │   │        ├── queries.graphql        # Contiene todas las Mutaciones (mutations) de la entidad.
│    │   │   │        └── subscriptions.graphql  # Contiene todas las Suscripciones (subscriptions) de la entidad.
│    │   │   │
│    │   │   └── rest/                           # Directorio de recursos Rest.
│    │   │       ├── index.js                    # Contiene exports para las entidades.
│    │   │       └── [entityFolder]/             # Directorio de la entidad.
│    │   │            ├── fakeData.js            # Contiene data falsa (mock o fake) para pruebas de servicios Rest.
│    │   │            └── index.js               # Contiene servicios Rest de la entidad.
│    │   │
│    │   ├── assets/                             # Directorio para contenido estático (.png, .svg, etc)
│    │   │
│    │   ├── configs/                            # Directorio de configuración de herramientas de la aplicación.
│    │   │   ├── googleAnalyticsConfig.js        # Configuración de Google Analytics.
│    │   │   ├── niubizConfig.js                 # Configuración de Niubiz.
│    │   │   └── routesConfig.js                 # Configuración de rutas.
│    │   │
│    │   ├── helpers/                            # Recursos para el desarrollo del sistema.
│    │   │
│    │   ├── layouts/                            # Directorio de diseños.
│    │   │   ├── index.js                        # Contiene exports para los diseños.
│    │   │   ├── shared-components/              # Directorio de componentes comunes en los diseños.
│    │   │   └── [layoutNameFolder]/             # Directorio de algún diseño.
│    │   │       ├── index.js                    # Container para interacción entre Redux y Layout.
│    │   │       ├── components/                 # Contiene componentes parciales del diseño.
│    │   │       └── [layoutName].js             # Componente "layoutName".
│    │   │
│    │   ├── main/                               # Directorio de componentes principales (vistas)...
│    │   │                                       # ... Inspirado en un sitemap.xml para el SEO de la aplicación.
│    │   │
│    │   └── redux/
│    │       ├── actions.js
│    │       ├── reducers.js
│    │       ├── sagas.js
│    │       ├── store.js
│    │       └── [ReduxFeatureName]
│    │           ├── actions.js
│    │           ├── constants.js
│    │           ├── reducers.js
│    │           └── sagas.js
│    │
│    ├── App.js
│    ├── index.html
│    ├── index.js
│    ├── robots.txt
│    └── themeCovende.js
│
├── test/
│   ├── dom.js
│   └── helpers.js
│
├── .babelrc
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── commitlint.config.js
├── jsdoc.conf.json
├── package.json
├── README.md
└── webpack.config.js
```

## Instalación

```sh
npm install
```

## Ejecutando

En desarrollo

```sh
npm run dev
```

En producción

```sh
npm run build
```

## Pruebas

Para ejecutar las pruebas unitarias:

```sh
npm run test:unit
```

````
ionic capacitor add android
ionic capacitor add ios
````