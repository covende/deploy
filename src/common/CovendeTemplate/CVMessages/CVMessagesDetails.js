import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { CVPanel } from '..';
import CVMessageDetailsDenunce from './CVMessageDetails/CVMessageDetailsDenunce';
import CVMessageDetailsPedido from './CVMessageDetails/CVMessageDetailsDenunce';
import CVMessageDetailsDevolution from './CVMessageDetails/CVMessageDetailsDevolution';
import CVMessageDetailsProducto from './CVMessageDetails/CVMessageDetailsProducto';
import CVMessageDetailsQuotation from './CVMessageDetails/CVMessageDetailsQuotation';
import CVMessageDetailsTienda from './CVMessageDetails/CVMessageDetailsTienda';
import CVMessageDetailsUser from './CVMessageDetails/CVMessageDetailsUser';
import { fetchapi } from './CVMessageDetails/CVMessageDetailsUtils';

function CVMessagesDetails({ sala, salamessage, setcustom_id }) {
  const [id, setid] = useState('');
  const [type, settype] = useState('');
  const [model, setmodel] = useState(null);
  const [isOpen, setisOpen] = useState(true);
  const fetchdata = async (tipo, sala) => {
    if (tipo && tipo != '') {
      const result = await fetchapi[tipo](sala);
      setmodel(result);
      setcustom_id(result?.custom_id || '');
    }
  };

  useEffect(() => {
    if (sala != id) {
      fetchdata(salamessage.type, sala);
      setid(sala);
    }
    if (type != salamessage.type) settype(salamessage.type);
  }, [sala]);

  const details = {
    pedido: <CVMessageDetailsPedido model={model} />,
    producto: <CVMessageDetailsProducto model={model} />,
    tienda: <CVMessageDetailsTienda model={model} />,
    user: <CVMessageDetailsUser model={model} />,
    devolucion: <CVMessageDetailsDevolution model={model} />,
    company_denuncia: <CVMessageDetailsDenunce model={model} />,
    product_cotizacion: <CVMessageDetailsQuotation model={model} />
  };

  return (
    <Box position='relative' zIndex={10} width={isOpen ? '100%' : 'initial'}>
      {/* <Box>
        <Box onClick={() => setisOpen(!isOpen)} padding='1rem'>
          {isOpen ? <FaTimes /> : <FaHamburger />}
        </Box>
        {isOpen ? ( */}
      <CVPanel variant='box' style={{ border: '1px solid #ECECEC' }}>
        {details[type]}
      </CVPanel>
      {/* ) : (
          <></>
        )}
      </Box> */}
    </Box>
  );
}

export default CVMessagesDetails;
