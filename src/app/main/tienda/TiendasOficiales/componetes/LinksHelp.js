import React from 'react'
import { Container } from "@material-ui/core"
import { Box } from "@chakra-ui/react"
import { Link } from "react-router-dom"


export const LinksHelp = () => {
  const styleLinks = {
    fontWeight: 500,
    fontSize: '12px',
    color: '#004772'
  };
  return (
    <Container>
      <Box
        width='30%'
        padding='10px'
        pl={0}
        display='flex'
        justifyContent='space-between'
        mt='10px'>
        <Link style={styleLinks} to='/buyer/CentroAyuda'>
          Qué es CoVende
        </Link>
        <Link style={styleLinks} to='/buyer/CentroAyuda'>
          ¿Cómo compro?
        </Link>
        <Link style={styleLinks} to='/buyer/CentroAyuda'>
          Ayuda
        </Link>
      </Box>
    </Container>
  );
};

export default LinksHelp