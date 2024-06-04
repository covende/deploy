import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVImage, CVPanel, CVRating } from '@/common/CovendeTemplate';
import CVGridText from '@/common/CovendeTemplate/CVGridText';
import { CVFormatDate } from '@/common/CovendeTemplate/CVMethods';
import { Box } from '@chakra-ui/layout';
import { CVEstadoProducto } from '@CVTemplate/core/CVEstado/CVEstadoProducto';
import CVText from '@CVTemplate/core/CVText';
import React from 'react';
import { useSelector } from 'react-redux';

function Cabecera() {
  const {
    custom_id,
    description,
    product,
    createdAt,
    updatedAt,
    precios,
    product_state,
    information,
    rejection_reasons
  } = useSelector((state) => state.ProductView);

  console.log({ rejection_reasons });

  return (
    <>
      <CVPanel itemJustify='space-between' itemsAlign='center'>
        <Box>
          <CVImage
            name={description?.product_name || ''}
            image={description?.fotografias[0] || null}
            width='64px'
            height='64px'
            variant='avatar'
          />
        </Box>
        <SizeBox />
        <CVGridText
          options={[
            { title: 'ID Producto', content: custom_id },
            {
              title: 'Fecha de publicación',
              content: CVFormatDate({ date: createdAt, time: true })
            },
            {
              title: 'Última actualización',
              content: CVFormatDate({ date: updatedAt, time: true })
            }
          ]}
        />
        <CVGridText
          options={[
            {
              title: 'Estado',
              content: (
                <CVText color={CVEstadoProducto(product_state).color}>
                  {CVEstadoProducto(product_state).text}
                </CVText>
              )
            },
            {
              title: 'URL',
              content: process.env.APP_URL + '/producto/' + information.slug
            }
          ]}
        />
        <CVGridText
          options={[
            { title: 'Calificacion', content: <CVRating puntuation={4} /> },
            { title: 'Vendidos', content: '-' },
            { title: 'Stock', content: precios.stock }
          ]}
        />
      </CVPanel>

      {(rejection_reasons || []).length > 0 && (
        <>
          <SizeBox />
          <CVPanel border='0.5rem solid #FF5454'>
            <Box display='flex' flexDirection='column' borderRadius='1rem'>
              <CVText color='red' fontSize='1.5rem' fontWeight='bold'>
                Producto rechazado
              </CVText>
              <SizeBox />
              <CVText color='blue' fontWeight='bold'>
                Motivos de Rechazos:
              </CVText>
              <SizeBox />
              <Box
                display='flex'
                flexDirection='column'
                alignItems='right'
                margin-left='1rem'>
                {rejection_reasons.map((motive) => (
                  <CVText>* {motive}</CVText>
                ))}
              </Box>
              <SizeBox />
              <CVText>
                Corrige la información de tu producto para la aprobación en
                nuestra plataforma.
              </CVText>
            </Box>
          </CVPanel>
        </>
      )}
    </>
  );
}

export default Cabecera;
