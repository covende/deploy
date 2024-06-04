/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import CustomTable from '../Table';
import ModalCategoria from '../ModalCategoria';
import ModalPreguntas from '../ModalPreguntas';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import Utils from '../../FaqBo.utils.js';
import { useDispatch, useSelector } from 'react-redux';
import { A_FAQ } from '../../redux/Actions';
import { useToast } from '@chakra-ui/toast';
import { LIST_FAQ } from '@/app/api/graphql/faq/FaqServices';
import CVRangePagination from '@/common/CovendeTemplate/CVRangePagination';
import { Grid, useDisclosure, Box } from '@chakra-ui/react';
import ModalDelete from '../ModalDelete';

const VendedorFaq = ({
  faqPermisions,
  search,
  value,
  setValue,
  showValues,
  setShowValues
}) => {
  const { Faqs, modalview, faq } = useSelector((state) => state.Faq);
  const [data, setData] = useState(showValues);
  const addToast = useToast();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fetch, setFetch] = useState(true);
  const [itemToDelete, setItemToDelete] = useState('');
  const fetchFaks = async () => {
    let faqs = await AxiosGQL(LIST_FAQ('SELLER'));
    setShowValues(faqs.Faq.slice(0, 10));
    if (fetch) dispatch(A_FAQ({ Faqs: faqs.Faq }));
    setFetch(false);
  };

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

  // console.log({ value });

  const editarfaq = (tablaFaq) => {
    dispatch(
      A_FAQ({
        modalview: 'categoria',
        faq: {
          _id: tablaFaq._id ? tablaFaq._id : '',
          category: tablaFaq.category ? tablaFaq.category : '',
          position: tablaFaq.position ? tablaFaq.position : 0,
          quantity: tablaFaq.quantity ? tablaFaq.quantity : 0,
          status: tablaFaq.status ? tablaFaq.status : false,
          icon: tablaFaq.icon ? tablaFaq.icon : '',
          type_faq: tablaFaq.type_faq ? tablaFaq.type_faq : ''
        }
      })
    );
    onOpen();
  };

  useEffect(() => {
    fetchFaks();
  }, [Faqs]);

  const modales = () => {
    switch (modalview) {
      case 'categoria':
        return (
          <ModalCategoria isOpen={isOpen} onClose={onClose} type='SELLER' />
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
      {/* <AddLastStep/> */}
    </Grid>
  );
};

export default VendedorFaq;
