import React, { useEffect } from 'react';
import { Heading, List, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { Container, Typography } from '@material-ui/core';
import { CVGoUp } from '@CVTemplate/core/CVMethods';

function documentos_covende(props) {
  useEffect(() => {
    CVGoUp();
  }, []);
  return (
    <>
      <object
        data='https://evanzu.com/Presentacion_2023.pdf'
        type='application/pdf'
        width='100%'
        height='2000px'></object>
    </>
  );
}

export default documentos_covende;
