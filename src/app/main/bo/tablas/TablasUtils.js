import React from 'react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVImage, CVSwitch } from '@/common/CovendeTemplate';
import { Flex } from '@chakra-ui/layout';
import { svgEdit, svgDelete } from '@/app/assets/images/SVG';
import CVLink from '@CVTemplate/core/CVLink';
import RemisionGuide from '@/app/components/OrderDetails/components/RemisionGuide/RemisionGuide';

const getImage = (image, typeFile) => {
  let img = '-';
  if (typeFile && image && image !== '') {
    if (typeFile == 'IMAGE') {
      return <CVImage width='auto' height='50px' image={image} />;
    } else if (typeFile == 'DOCUMENT') {
      return (
        <CVLink href={image} target='_blank' color='blue'>
          <Flex>
            <RemisionGuide />
          </Flex>
        </CVLink>
      );
    }
  }
  return img;
};

export const rows = ({ lista, methods }) => {
  let data = lista.map((item) => ({
    code: item.code,
    title: item.title,
    description: item.description,
    image: getImage(item?.image, item?.typeFile),
    // item?.image && item?.image != '' ? (
    //   <CVImage width='auto' height='50px' image={item?.image} />
    // ) : (
    //   '-'
    // ),
    status: <CVSwitch value={item.status} onChange={(value) => {}} />,
    acciones: (
      <Flex>
        <a href='#!' onClick={() => methods.edittabla(item)}>
          {svgEdit}
        </a>
        <SizeBox />
        <a href='#!' onClick={() => methods.deletetabla(item)}>
          {svgDelete}
        </a>
      </Flex>
    )
  }));
  return data;
};

export const columns = [
  {
    label: 'Código',
    data: 'code',
    first: true,
    align: 'center'
  },
  {
    label: 'Título',
    data: 'title'
  },
  {
    label: 'Descripción',
    data: 'description'
  },
  {
    label: 'Image',
    data: 'image'
  },
  {
    label: 'Estado',
    data: 'status'
  },
  {
    label: 'Acciones',
    data: 'acciones',
    last: true,
    align: 'center'
  }
];
