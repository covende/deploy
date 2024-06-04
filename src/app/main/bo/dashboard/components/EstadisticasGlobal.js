import React from 'react';

// UI Components
import { Grid } from '@material-ui/core';
import { v4} from 'uuid';
import EstadisticaGlobal from './EstadisticaGlobal';
import EstadisticasTiendas from './EstadisticasTiendas';
import EstadisticasProductos from './EstadisticasProductos';


function EstadisticasGlobal({ buyers, sellers, messages, products }) {
  const lista = [
    {
      image: 'https://i.imgur.com/5AlWHZi.png',
      title: 'Total de Vendedores',
      quantity: sellers,
      variation: 33,
      status: true,
      color: 'primary'
    },
    {
      image: 'https://i.imgur.com/0Z43a3O.png',
      title: 'Total de Compradores',
      quantity: buyers,
      variation: 23,
      status: false,
      color: 'red'
    },
    {
      image: 'https://i.imgur.com/Unr9TyS.png',
      title: 'Mensajes por responder',
      quantity: messages,
      variation: 3,
      status: false,
      color: 'yellow'
    },
    /*{
      image: 'https://i.imgur.com/fARC2CJ.png',
      title: 'Productos por aprobar',
      quantity: products,
      variation: 13,
      status: true,
      color: 'green'
    }*/
  ];

  return (
    <>
      <Grid container spacing={2}>
         {/*{lista.map((item) => (
          <EstadisticasGlobal key={v4()} stats={item} />
         ))} */}
        <EstadisticasTiendas stats={lista[0]}/>



        <EstadisticaGlobal stats={lista[0]}/>
        <EstadisticaGlobal stats={lista[1]}/>
        <EstadisticasProductos stats={lista[0]}
        />
    
        
      </Grid>
    </>
  );
}

export default EstadisticasGlobal;