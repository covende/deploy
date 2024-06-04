import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import { useParams } from 'react-router';
import Barcode from 'react-barcode';
import { svgCovende } from '@/app/assets/images/SVG';
import { Flex, Box } from '@chakra-ui/react';
import { CVText } from '@CVTemplate/core';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVButton from '@CVTemplate/core/CVButton';
import { BsCloudArrowDown } from 'react-icons/bs';
import { exportComponentAsPDF } from 'react-component-export-image';
import { get_shipping } from '@CVApi/core/webpedido/PedidoService';
import { GoPrimitiveDot } from 'react-icons/go';
// import Pdf from './Presentacion_2023.pdf';
function DevolutionGuia() {
  const ref = React.createRef();
  const { guide } = useParams();
  const [loading, setloading] = useState(false);
  const [guiadata, setguiadata] = useState({
    guide_number: '',
    courier: '',
    pedido_id: '',
    pedido_id_custom: '',
    receiver: {
      direction: '',
      store_name: '',
      manager_name: '',
      ruc: '',
      razon_social: ''
    }
  });

  const initdata = async () => {
    // const result = await get_shipping(guide);
    // if (result != null) setguiadata(result);
  };

  const generatePDF = async () => {
    setloading(true);
    await exportComponentAsPDF(ref, {
      pdfOptions: {
        unit: 'mm',
        orientation: 'l',
        pdfFormat: 'a4',
        h: 210,
        w: 297,
        x: 0,
        y: 0
      },
      fileName: guide + '.pdf'
    });
    setloading(false);
  };

  const ToPrint = () => (
    <div style={{ maxWidth: '40%' }}>
      <Flex justifyContent='space-between' width='100%' alignItems='center'>
        <Box>
          {svgCovende}
          <SizeBox height='2rem' />
          <CVText>INFORMACIÓN PARA ENVIO</CVText>
          <CVText>{guiadata?.guide_number}</CVText>
        </Box>
        <Box display='flex' flexDirection='column' alignItems='end'>
          <Barcode
            value={guide || '15670470'}
            width={0.5}
            height={60}
            fontSize={12}
          />
          <Flex width='100%' justifyContent='end'>
            <CVText textAlign='end'>PIEZAS 1/1</CVText>
            <SizeBox />
          </Flex>
          <Flex width='100%' justifyContent='end'>
            <CVText textAlign='end'>TRASLADADO POR: {guiadata?.courier}</CVText>
            <SizeBox />
          </Flex>
        </Box>
      </Flex>
      <SizeBox height='3rem' />
      <Box
        position='relative'
        padding='2rem'
        border='1px solid black'
        rounded='1rem'>
        <Box
          backgroundColor='white'
          position='absolute'
          top='-1rem'
          left='-1'
          paddingRight='1rem'
          paddingBottom='1rem'>
          <CVText fontWeight='bold' fontSize='1.5rem'>
            DESTINATARIO
          </CVText>
        </Box>
        <CVText>
          <span style={{ fontWeight: 'bold' }}> Dirección: </span>Jr. Dirección
          del vendedor Nº 007
        </CVText>
        <CVText> Huancayo, Huancayo, Junín </CVText>
        <SizeBox />
        <CVText>
          <span style={{ fontWeight: 'bold' }}> Tienda: </span> Nombre de la
          Tienda
        </CVText>
        <CVText>
          <span style={{ fontWeight: 'bold' }}> Destinatario: </span> Andrés
          Punez Arias - 947755999
        </CVText>
        <CVText>
          <span style={{ fontWeight: 'bold' }}> RUC: </span> 10764538950
        </CVText>
        <CVText>
          <span style={{ fontWeight: 'bold' }}> Razón social: </span> MI TIENDA
          SAC
        </CVText>
      </Box>
      <SizeBox height='3rem' />

      <Flex alignItems='center'>
        <GoPrimitiveDot />
        <SizeBox />
        <CVText>
          Asegúrate de haber seguido las instrucciones para el empaque.
        </CVText>
      </Flex>
      <SizeBox />
      <Flex alignItems='center'>
        <GoPrimitiveDot />
        <SizeBox />
        <CVText>
          Incluye en el paquete todos los accesorios, documentos o comprobantes
          que hayas recibido.
        </CVText>
      </Flex>
      <SizeBox />
      <Flex alignItems='center'>
        <GoPrimitiveDot />
        <SizeBox />
        <CVText>
          Toma fotos del contenido, empaque y comprobante de envío. Consérvalas
          como evidencia de la devolución.
        </CVText>
      </Flex>
      <SizeBox />
      <SizeBox />
      <CVText textAlign='center' fontStyle='italic'>
        Pegar Sobre el paquete
      </CVText>
      <SizeBox />
    </div>
  );

  useEffect(() => {
    initdata();
  }, [guide]);

  return (
    <Container>
      <Box>
        <SizeBox />
        <React.Fragment>
          <CVButton
            isLoading={loading}
            disabled={loading}
            onClick={() => generatePDF()}>
            Descargar <SizeBox /> <BsCloudArrowDown />
          </CVButton>

          {/* <a href={Pdf} without rel='noopener noreferrer' target='_blank'>
            <button trailingIcon='picture_as_pdf' label='Resume'>
              PDF
            </button>
          </a> */}
        </React.Fragment>
        <SizeBox />
        <div
          ref={ref}
          style={{
            width: 1122.519685,
            height: 793.7007874,
            padding: '1rem',
            backgroundColor: 'white'
          }}>
          <Flex
            alignItems='center'
            justifyContent='space-around'
            height='100%'
            width='100%'>
            <ToPrint />
            <ToPrint />
          </Flex>
        </div>
      </Box>
    </Container>
  );
}

export default DevolutionGuia;
