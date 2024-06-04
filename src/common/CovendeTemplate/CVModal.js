import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react';
import { COLORS } from './CVThemes';

/**
 *
 * @param {Object} param0
 * @param {Function} param0.onClose
 * @param {Boolean} param0.isOpen
 * @param {React.ReactElement} param0.header
 * @param {React.ReactElement} param0.footer
 *  * @param {('primary' |'skyblue' |'blue' |'red' |'yellow' |'green' |'gray' |'white' |'black')} param0.bgHeader
 * @param {('white' | 'primary' | 'skyblue' | 'blue' | 'red' | 'yellow' | 'green' | 'gray' | 'black')} param0.colorHeader
 * @param {String} param0.size
 * @param {('start'|'center'|'end')} param0.justifyContentHeader
 * @param {('start'|'center'|'end')} param0.justifyContentFooter
 * @returns
 */
function CVModal({
  onClose,
  isOpen,
  header,
  children,
  footer,
  size = 'lg',
  bgHeader = 'inherit',
  colorHeader = 'inherit',
  justifyContentHeader = 'start',
  justifyContentFooter = 'start',
  maxW = ''
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={size}
      rounded='1rem'>
      <ModalOverlay />
      <ModalContent rounded='1rem' m='auto' {...(maxW ? { maxW: maxW } : {})}>
        <ModalHeader
          justifyContent={justifyContentHeader}
          borderRadius='1rem 1rem 0 0'
          backgroundColor={COLORS[bgHeader]}
          color={COLORS[colorHeader]}>
          {header}
        </ModalHeader>
        <ModalCloseButton rounded='50%' color={COLORS[colorHeader]} />
        <ModalBody>{children}</ModalBody>
        <ModalFooter justifyContent={justifyContentFooter}>
          {footer}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CVModal;
