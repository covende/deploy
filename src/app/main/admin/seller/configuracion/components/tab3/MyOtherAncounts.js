import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import React from 'react';
import { v4 } from 'uuid';
import { CardStyle } from '../ConfigurationStyles';

function MyOtherAccounts({ newAccounts, storeID, setNewAccounts }) {
  const updateItem = (index) => {};
  const removeItem = (index) => {
    setNewAccounts([...newAccounts.filter((it, idx) => idx != index)]);
  };
  return (
    <Grid container spacing={2}>
      {newAccounts.map((it, idx) => (
        <Grid key={v4()} item xs={12} sm={6} md={3}>
          <CardStyle>
            <Card variant='outlined'>
              <CardContent>
                <Typography color='textSecondary' gutterBottom>
                  {it.titular}
                </Typography>
                <Divider />
                <Text fontWeight='bold'>{it.bank}</Text>
                <Typography color='textSecondary'>{it.numeroCC}</Typography>
                <Typography color='textSecondary'>{it.numeroCCI}</Typography>
                <Divider />
              </CardContent>
              <Flex justifyContent='space-around'>
                <Button
                  variant='text'
                  style={{
                    color: '#00ADF6',
                    textTransform: 'capitalize',
                    backgroundColor: 'inherit'
                  }}
                  onClick={() => updateItem(idx)}
                >
                  Editar
                </Button>
                <Button
                  variant='text'
                  style={{
                    color: '#00ADF6',
                    textTransform: 'capitalize',
                    backgroundColor: 'inherit'
                  }}
                  onClick={() => removeItem(idx)}
                >
                  Eliminar
                </Button>
              </Flex>
              <CardActions>
                <Button
                  fullWidth={true}
                  variant={idx == 0 ? 'contained' : 'outlined'}
                  style={{
                    backgroundColor: idx == 0 ? '#17BF93' : '#FFFFFF',
                    color: idx == 0 ? '#FFFFFF' : '#17BF93'
                  }}
                >
                  PREDETERMINADO
                </Button>
              </CardActions>
            </Card>
          </CardStyle>
        </Grid>
      ))}
    </Grid>
  );
}

export default MyOtherAccounts;
