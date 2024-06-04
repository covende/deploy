import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import {
  REJECTION_ITEM_SAVE,
  REJECTION_ITEM_UPDATE
} from '@/app/api/graphql/webbo/BProductoService';
import { CVInput } from '@/common/CovendeTemplate';
import CVButton from '@CVTemplate/core/CVButton';
import CVModal from '@CVTemplate/core/CVModal';
import SizeBox from '@/common/components/CustomComponent/SizeBox';

function AddItemRejected({ isOpen, onClose, setitems, items, rejection }) {
  const [loading, setloading] = useState(false);
  const [state, setstate] = useState({
    title: '',
    rejections: [],
    _id: ''
  });

  const saveitem = async () => {
    setloading(true);

    let resp;
    const response = await AxiosGQL(
      state?._id
        ? REJECTION_ITEM_UPDATE(state._id, state.title)
        : REJECTION_ITEM_SAVE(state.title)
    );

    resp = state?._id
      ? response.RejectionItemUpdate
      : response?.RejectionItemSave;

    if (state?._id) {
      setitems(
        items.map((item) =>
          item._id == state._id ? { ...item, title: state.title } : item
        )
      );
    } else {
      setitems([...items, resp]);
    }
    setstate({
      title: '',
      rejections: [],
      _id: ''
    });
    setloading(false);
    onClose();
  };

  useEffect(() => {
    if (rejection?._id) setstate({ ...rejection });
  }, [rejection]);

  return (
    <CVModal
      isOpen={isOpen}
      onClose={onClose}
      header='Categoria de Rechazo'
      footer={
        <Flex width='100%' justifyContent='center'>
          <CVButton
            disabled={loading}
            isLoading={loading}
            onClick={() => saveitem()}>
            {state._id ? 'Actualizar' : 'Enviar'}
          </CVButton>
          <SizeBox />
          <CVButton backgroundColor='red' onClick={() => onClose()}>
            Cancelar
          </CVButton>
        </Flex>
      }>
      <CVInput
        title={'Categoria'}
        titleOrientation='column'
        height='3rem'
        value={state.title}
        onChange={(value) => setstate({ ...state, title: value })}
      />
    </CVModal>
  );
}

export default AddItemRejected;
