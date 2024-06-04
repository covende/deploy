import React, { useEffect } from 'react';
import { Grid, GridItem } from '@chakra-ui/layout';
import CustomTable from './components/CustomTable';
import CustomModal from './components/CustomModal';
import { useDisclosure } from '@chakra-ui/hooks';
import useGetPermisions from '@/common/hooks/useGetPermisions';

// Page
function ArborescenciaCategoriasBo() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const permisions = useGetPermisions(
    'Backoffice',
    'Arborescencia de categorías'
  );
  return (
    <Grid>
      <GridItem w='100%'>
        <CustomTable permisions={permisions} onOpen={onOpen} />
      </GridItem>
      <Grid w='100%'>
        <CustomModal
          permisions={permisions}
          isOpen={isOpen}
          onClose={onClose}
        />
      </Grid>
    </Grid>
  );
}

export default ArborescenciaCategoriasBo;
