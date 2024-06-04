import React, { useEffect, useState } from 'react';

import { Box } from '@chakra-ui/layout';
import { useToast, useDisclosure } from '@chakra-ui/react';

import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import { CVDataTable, CVModal, CVInput } from '@/common/CovendeTemplate';
import { isEmail } from '@/common/CovendeTemplate/CVValidation';
import { DataCampania, HeaderCampania } from './campania.data';
import { formatpaginate } from '@/common/utils/methods';
import {
  NEWS_LETTERS,
  DELETE_NEWSLETTER,
  UPDATE_NEWSLETTER
} from '@CVApi/core/webpublic/newsletter/NLTypes';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import CVButton from '@CVTemplate/core/CVButton';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVSearchInput from '@CVTemplate/core/CVSearchInput';

function CampaniaTable() {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [newsLetters, setNewsLetters] = useState([]);
  const [pagination, setPagination] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [_id, set_id] = useState('');
  const [email, setemail] = useState('');
  const addToast = useToast();

  const initData = async (page, itemsPage = 10, search) => {
    try {
      setLoading(true);
      const { newsletters } = await AxiosGQL(
        NEWS_LETTERS(page, itemsPage, search)
      );
      if (newsletters.message === 'ok') {
        setNewsLetters(newsletters.newsletters);
        setPagination(formatpaginate(newsletters.info));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initData(1, 10, search);
    return () => {};
  }, []);

  const deleteEmail = async (id) => {
    const { deleteNewsletter } = await AxiosGQL(DELETE_NEWSLETTER(id));
    if (deleteNewsletter.status) {
      setNewsLetters(newsLetters.filter((item) => item._id !== id));
      CVAlertSuccess({ addToast, message: 'Eliminado correctamente' });
    }
  };

  const edit = async (id, email) => {
    set_id(id);
    setemail(email);
    onOpen();
  };

  const onSubmit = async (mail) => {
    const { editNewsletter } = await AxiosGQL(UPDATE_NEWSLETTER(_id, mail));
    if (!editNewsletter.status) {
      CVAlertError({ addToast, message: editNewsletter.message });
    } else {
      console.log(editNewsletter);
      setNewsLetters(
        newsLetters.map((item) => {
          if (item._id === editNewsletter.newsletter._id) {
            item = editNewsletter.newsletter;
          }
          return item;
        })
      );
      CVAlertSuccess({ addToast, message: 'Actualizado correctamente' });
      setemail('');
      onClose();
    }
  };

  return (
    <Box backgroundColor='#FFFFFF' rounded='1rem' padding='1rem'>
      <Box maxWidth='21rem' mb='1rem'>
        <CVSearchInput
          placeholder='email'
          onSubmit={(e) => initData(1, 10, e)}
        />
      </Box>
      <CVDataTable
        data={DataCampania(newsLetters, { deleteEmail, edit })}
        headers={HeaderCampania}
        loading={loading}
        pagination={pagination}
        fetchdata={initData}
      />

      <CVModal header='Editar email' isOpen={isOpen} onClose={onClose}>
        <Box>
          <CVInput
            title='Correo'
            onChange={(e) => setemail(e)}
            onEnter={(e) => onSubmit(e)}
            value={email}
            placeholder='Email:'
          />
          <SizeBox height='1rem' />
          <CVButton
            isLoading={loading}
            width='100%'
            onClick={() => onSubmit(email)}
            backgroundColor='primary'>
            Actualizar
          </CVButton>
        </Box>
      </CVModal>
    </Box>
  );
}

export default CampaniaTable;
