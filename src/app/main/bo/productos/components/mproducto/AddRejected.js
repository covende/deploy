import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import {
  REJECTION_SAVE,
  REJECTION_UPDATE
} from '@/app/api/graphql/webbo/BProductoService';
import { CVInput, CVSelect } from '@/common/CovendeTemplate';
import CVButton from '@CVTemplate/core/CVButton';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVModal from '@CVTemplate/core/CVModal';

function AddRejected({ isOpen, onClose, setitems, items, rejectionItem }) {
  const [loading, setloading] = useState(false);
  const [state, setstate] = useState({
    title: '',
    item: '',
    _id: '',
    description: ''
  });
  const saveitem = async () => {
    setloading(true);

    const response = await AxiosGQL(
      state?._id ? REJECTION_UPDATE(state) : REJECTION_SAVE(state)
    );

    if (response?.RejectionSave) {
      let ls = [...items];
      ls = ls.map((ti) => {
        if (ti._id == state.item) {
          ti.rejections = [...ti.rejections, response?.RejectionSave];
        }
        return ti;
      });
      setitems(ls);
    }

    if (response?.RejectionUpdate) {
      setitems(
        items.map((it) =>
          it._id == state.item
            ? {
                ...it,
                rejections: it.rejections.map((rej) =>
                  rej._id == state._id
                    ? {
                        ...rej,
                        title:
                          response?.RejectionUpdate?.title || state.title || '',
                        description:
                          response?.RejectionUpdate?.description ||
                          state.description ||
                          ''
                      }
                    : rej
                )
              }
            : it
        )
      );
    }

    setstate({
      title: '',
      item: '',
      _id: '',
      description: ''
    });
    setloading(false);
    onClose();
  };

  useEffect(() => {
    if (rejectionItem?._id) setstate({ ...rejectionItem });
  }, [rejectionItem]);

  return (
    <CVModal
      isOpen={isOpen}
      onClose={onClose}
      header='Categoria de Rechazo'
      footer={
        <Flex width='100%' justifyContent='center'>
          <CVButton
            isLoading={loading}
            disabled={loading}
            backgroundColor='primary'
            onClick={() => saveitem()}>
            {state?._id ? 'Actualizar' : 'Enviar'}
          </CVButton>
          <SizeBox />
          <CVButton backgroundColor='red' onClick={onClose}>
            Cancelar
          </CVButton>
        </Flex>
      }>
      <CVSelect
        options={(items || []).map((item) => ({
          text: item.title,
          value: item._id
        }))}
        disabled={!!state?._id}
        title={'Item'}
        titleOrientation='column'
        value={state.item}
        onChange={(value) => setstate({ ...state, item: value })}
      />

      <Flex height='20px'></Flex>

      <CVInput
        title='Título de Rechazo'
        titleOrientation='column'
        value={state.title}
        onChange={(value) => setstate({ ...state, title: value })}
      />
      <Flex height='20px'></Flex>
      <CVInput
        title='Descripción'
        titleOrientation='column'
        height='auto'
        multiline={true}
        value={state.description}
        onChange={(value) => setstate({ ...state, description: value })}
      />
    </CVModal>
  );
}

export default AddRejected;
