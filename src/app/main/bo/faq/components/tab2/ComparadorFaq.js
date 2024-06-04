/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Grid, useDisclosure, Box } from '@chakra-ui/react';
import CustomTable from '../Table';

import { A_FAQ } from '../../redux/Actions';
import Utils from '../../FaqBo.utils.js';
import { useDispatch, useSelector } from 'react-redux';
import { LIST_FAQ } from '@/app/api/graphql/faq/FaqServices';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import ModalCategoria from '../ModalCategoria';
import ModalPreguntas from '../ModalPreguntas';
import CVRangePagination from '@/common/CovendeTemplate/CVRangePagination';

import ModalDelete from '../ModalDelete';
const ComparadorFaq = ({
  faqPermisions,
  search,
  value,
  setValue,
  showValues,
  setShowValues
}) => {
  const [itemToDelete, setItemToDelete] = useState('');
  const { Faqs, modalview } = useSelector((state) => state.Faq);
  const [fetch, setFetch] = useState(true);
  const [data, setData] = useState(showValues);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialdata = async () => {
    const faqs = await AxiosGQL(LIST_FAQ('BUYER'));
    setShowValues(faqs.Faq.slice(0, 10));
    if (fetch) dispatch(A_FAQ({ Faqs: faqs.Faq }));
    setFetch(false);
  };
console.log({ Faqs });
  useEffect(() => {
    if (value.length == 0) {
      setData(showValues);
    } else {
      setData(value);
    }
    return () => {
      setData([]);
    };
  }, [value, showValues, Faqs]);

  const editarfaq = (tablaFaq) => {
    dispatch(
      A_FAQ({
        modalview: 'categoria',
        faq: {
          _id: tablaFaq._id || '',
          category: tablaFaq.category || '',
          position: tablaFaq.position || '',
          quantity: tablaFaq.quantity || '',
          status: tablaFaq.status || '',
          icon: tablaFaq.icon || '',
          type_faq: tablaFaq.type_faq || ''
        }
      })
    );
    onOpen();
  };

  useEffect(() => {
    initialdata();
  }, [Faqs]);

  const modales = () => {
    switch (modalview) {
      case 'categoria':
        return (
          <ModalCategoria isOpen={isOpen} onClose={onClose} type='BUYER' />
        );
      case 'preguntas':
        return <ModalPreguntas isOpen={isOpen} onClose={onClose} />;
      case 'eliminar':
        return (
          <ModalDelete
            isOpen={isOpen}
            onClose={onClose}
            title='Categoría'
            itemToDelete={itemToDelete}
          />
        );
      default:
        return <Box></Box>;
    }
  };
  return (
    <Grid templateRows='repeat(3, max-content)' gap='16px'>
      <>
        <CustomTable
          style={{ fontSize: '1rem' }}
          setOpenModal={() => {
            dispatch(A_FAQ({ modalview: 'categoria' }));
            onOpen();
          }}
          setOpenModal2={() => {
            dispatch(A_FAQ({ modalview: 'preguntas' }));
            onOpen();
          }}
          inputData={Utils.inputDataFeedsProcessed(
            data,
            {
              editarfaq,
              cdeleteitem: (itemDeleted) => {
                dispatch(A_FAQ({ modalview: 'eliminar' }));
                onOpen();
                setItemToDelete(itemDeleted);
              }
            },
            faqPermisions
          )}
          inputColumns={Utils.columnsDataFeeds}
        />
        <CVRangePagination data={Faqs} setShowValues={setShowValues} />
        {modales()}
      </>
      <br />
    </Grid>
  );
};

export default ComparadorFaq;
