import React, { useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import AddAfter from './modales/AddAfter';
import { Flex, useToast, Box } from '@chakra-ui/react';
import { CVAlertError } from '@CVTemplate/core/CVAlert';
import { CVErrorTags } from '@CVTemplate/core/CVValidation';
import CVButton from '@CVTemplate/core/CVButton';
import SizeBox from '@/common/components/CustomComponent/SizeBox';

/**
 *
 * @param {Object} param0
 * @param {Boolean} param0.errors
 * @param {Function} param0.seterrors
 * @param {Function} param0.ejecutar
 * @param {Boolean} param0.loading
 * @param {String} param0.status
 * @returns
 */
const PFActions = ({ errors, seterrors, ejecutar, loading, in_draft }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const addToast = useToast();

  const onValidate = () => {
    if (CVErrorTags()) {
      CVAlertError({
        addToast,
        message: 'Completa y corrige los campos en rojo'
      });
      return false;
    }
    if (CVErrorTags('Mui-error')) {
      CVAlertError({
        addToast,
        message: 'Completa y corrige los campos en rojo'
      });
      return false;
    }
    return true;
  };

  const isValidate = async (method) => {
    if (!onValidate()) {
      return false;
    }
    await ejecutar(method);
  };

  const saveproducto = async (method) =>
    !errors ? seterrors(true, () => isValidate(method)) : isValidate(method);

  const seemodal = () => {
    if (!onValidate()) {
      return false;
    }
    onOpen();
  };
  const saveindraft = () => (!errors ? seterrors(true, seemodal) : seemodal());

  return (
    <>
      <Flex alignItems='center' justifyContent='center' wrap='wrap'>
        <Box m={'2'}>
          <CVButton
            onClick={() => saveindraft()}
            disabled={loading || !in_draft}
            isLoading={loading}>
            Guardar en Borrador
          </CVButton>
        </Box>
        <Box m='2'>
          <CVButton
            onClick={() => saveproducto(2)}
            disabled={loading}
            isLoading={loading}>
            Guardar y Continuar
          </CVButton>
        </Box>
      </Flex>
      {/* <Flex justifyContent='center' wrap='wrap'>
        <CVButton
          onClick={() => saveindraft()}
          disabled={loading || !in_draft}
          isLoading={loading}>
          Guardar en Borrador
        </CVButton>
        <SizeBox />
        <CVButton
          onClick={() => saveproducto(2)}
          disabled={loading}
          isLoading={loading}>
          Guardar y Continuar
        </CVButton>
      </Flex> */}
      {isOpen && (
        <AddAfter
          isOpen={isOpen}
          onClose={onClose}
          loading={loading}
          gotoStart={() => saveproducto(1)}
          gotoNext={() => saveproducto(2)}
        />
      )}
    </>
  );
};

export default PFActions;
