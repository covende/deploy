import React from 'react';
import { CVMessages } from '@/common/CovendeTemplate';
import CVModal from '@CVTemplate/core/CVModal';
function CMMessage({ isOpen, onClose, sala }) {
  return (
    <CVModal isOpen={isOpen} onClose={onClose} size='3xl'>
      <CVMessages sala={sala} typeUser='bo' />
    </CVModal>
  );
}

export default CMMessage;
