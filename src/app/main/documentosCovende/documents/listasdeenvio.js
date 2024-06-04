import React, { useEffect } from 'react';
import { Heading, List, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { Container, Typography } from '@material-ui/core';
import { CVGoUp } from '@CVTemplate/core/CVMethods';

function listasdeenvio(props) {
  useEffect(() => {
    CVGoUp();
  }, []);
  return (
    <>
      <h1>Hola mundo gueyes </h1>
    </>
  );
}

export default listasdeenvio;
