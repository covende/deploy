import React, { useState } from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';
import MiAccountBank from './MiAccountBank';
import ModalAccoutBank from './ModalAccoutBank';
import MyOtherAccounts from './MyOtherAncounts';

function DatosBancarios({ storeID, permisions }) {
  const [newAccounts, setNewAccounts] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <MiAccountBank
        storeID={storeID}
        onOpen={onOpen}
        permisions={permisions}
      />
      <MyOtherAccounts
        newAccounts={newAccounts}
        setNewAccounts={setNewAccounts}
        storeID={storeID}
      />
      <ModalAccoutBank
        newAccounts={newAccounts}
        setNewAccounts={setNewAccounts}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
}

export default DatosBancarios;
