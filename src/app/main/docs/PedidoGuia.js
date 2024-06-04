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

function PedidoGuia() {
  const ref = React.createRef();
  const { guide } = useParams();
  const [loading, setloading] = useState(false);
  const [guiadata, setguiadata] = useState({
    guide_number: '',
    courier: '',
    sender: {
      name: '',
      direction: '',
      reference: '',
      province: '',
      department: '',
      district: ''
    },
    receiver: {
      direction: '',
      reference: '',
      province: '',
      department: '',
      district: '',
      name: '',
      dni: '',
      phone: ''
    }
  });

  const initdata = async () => {
    const result = await get_shipping(guide);
    if (result != null) setguiadata(result);
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
    <div>
      <Flex justifyContent='space-between' width='100%' alignItems='center'>
        <Box>
          {svgCovende}
          <SizeBox height='2rem' />
          <CVText>INFORMACIÓN PARA ENVIO</CVText>
          <CVText>{guiadata?.guide_number}</CVText>
        </Box>
        <Box>
          <Barcode value={guide} width={0.5} height={60} fontSize={12} />
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
            REMITENTE
          </CVText>
        </Box>
        <CVText>{guiadata?.sender?.name}</CVText>
        <CVText>{guiadata?.sender?.direction}</CVText>
        <CVText>{guiadata?.sender?.reference}</CVText>
        <CVText>
          {guiadata?.sender?.department}, {guiadata?.sender?.province},
          {guiadata?.sender?.district}
        </CVText>
      </Box>
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
          <span style={{ fontWeight: 'bold' }}>Dirección: </span>{' '}
          {guiadata?.receiver?.direction}
        </CVText>
        <CVText>
          <span style={{ fontWeight: 'bold' }}>Referencia: </span>{' '}
          {guiadata?.receiver?.reference}
        </CVText>
        <CVText>
          {guiadata?.receiver?.department}, {guiadata?.receiver?.province},{' '}
          {guiadata?.receiver?.district}
        </CVText>
        <SizeBox />
        <CVText>{guiadata?.receiver?.name}</CVText>
        <CVText>
          <span style={{ fontWeight: 'bold' }}>DNI/CNE: </span>{' '}
          {guiadata?.receiver?.dni}
        </CVText>
        <CVText>
          <span style={{ fontWeight: 'bold' }}>Celular: </span>{' '}
          {guiadata?.receiver?.phone}
        </CVText>
      </Box>
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
          {/* <CVButton
            onClick={() =>
              exportComponentAsJPEG(ref, { fileName: guide + '.pdf' })
            }>
            Export As JPEG
          </CVButton> */}
          <CVButton
            isLoading={loading}
            disabled={loading}
            // onClick={() => generatePDF()}
          >
            Descargar <SizeBox /> <BsCloudArrowDown />
          </CVButton>
          {/* <CVButton
            onClick={() =>
              exportComponentAsPNG(ref, { fileName: guide + '.pdf' })
            }>
            Export As PNG
          </CVButton> */}
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

export default PedidoGuia;
