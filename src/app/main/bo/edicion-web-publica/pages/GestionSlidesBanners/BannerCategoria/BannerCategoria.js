import React, { useState, useEffect } from 'react';

import ModalForm from '../../../components/GestionSlidesBanners/BannerCategoria/ModalForm';

// Utils
import Utils from '../../../components/GestionSlidesBanners/BannerCategoria/utils';
import { categoryProductsList } from '@/app/api/graphql/categories/services/categoryservice';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import {
  CVButton,
  CVDataTable,
  CVModal,
  CVSelect
} from '@/common/CovendeTemplate';
import { Flex } from '@chakra-ui/layout';
import useGetPermisions from '@/common/hooks/useGetPermisions';

// Estado inicial del formulario
const initialState = {
  category_product_id: '',
  name: '',
  description: '',
  permissions: [],
  image: ''
};

function BannerCategoria({
  bannersCategory,
  fetchBannerCategory,
  addBannerCategory: addItem,
  editBannerCategory: editItem,
  deleteBannerCategory
}) {
  // Acciones del modal role
  const [categories, setcategories] = useState([]);

  const fetchCategories = async () => {
    const data = await categoryProductsList(true);
    setcategories(data);
  };
  const webPublicaPermisions = useGetPermisions(
    'Backoffice',
    'Edición web pública'
  );

  const [openModal, setOpenModal] = useState(false);
  const [titleModal, setTitleModal] = useState('Crear banner categoría');
  const closeModal = () => {
    setOpenModal(!openModal);
  };

  const [state, setState] = useState(initialState);
  const [isAddItem, setIsAddItem] = useState(true);

  const updateBannerCategory = (item) => {
    setState(item);
    setIsAddItem(false);
    setTitleModal('Editar banner categoría');
    setOpenModal(true);
  };

  const removeBannerCategory = (item) => {
    deleteBannerCategory({
      banner_categoryproduct_id: item.banner_categoryproduct_id
    });
  };

  // Send data of Form
  const onSubmit = () => {
    let data = { ...state };
    if (isAddItem) {
      addItem(data);
    } else {
      data = {
        ...data,
        banner_categoryproduct_id: state.banner_categoryproduct_id
      };
      editItem(data);
    }
    setState(initialState);
    closeModal();
  };

  useEffect(() => {
    fetchCategories();
    fetchBannerCategory();
  }, []);

  return (
    <div>
      <Flex justifyContent='space-between'>
        <CVSelect
          height='3rem'
          options={[
            { value: '', text: 'Todos' },
            ...(categories || []).map((category) => ({
              text: category.name,
              value: category._id
            }))
          ]}
          title={'Categoría: '}
          value={state.category_product_id || ''}
          onChange={(value) => {
            setState({ ...state, category_product_id: value });
            fetchBannerCategory({ category_product_id: value });
          }}
        />
        {webPublicaPermisions.crear && <CVButton
          backgroundColor='blue'
          onClick={() => {
            setIsAddItem(true);
            setState(initialState);
            setOpenModal(true);
            setTitleModal(`Crear Banner Categoria`);
          }}
        >
          Crear +
        </CVButton>}
      </Flex>
      <SizeBox />
      {/* 
      setOpenModal={setOpenModal}
          setTitleModal={setTitleModal}
          setIsAddItem={setIsAddItem} */}

      {bannersCategory.loading ? null : bannersCategory.error ? null : (
        <CVDataTable
          headers={Utils.columnsData}
          data={Utils.inputDataProcessed(
            bannersCategory.data,
            {
              edit: updateBannerCategory,
              delete: removeBannerCategory
            },
            state.category_product_id,
            webPublicaPermisions
          )}
        />
      )}
      <CVModal isOpen={openModal} onClose={closeModal} title={titleModal}>
        <ModalForm
          state={state}
          setState={setState}
          onSubmit={onSubmit}
          dataDependency={categories}
          sizeimage={'BANNER_CATEGORIA_IMAGE'}
        />
      </CVModal>
    </div>
  );
}

export default BannerCategoria;
