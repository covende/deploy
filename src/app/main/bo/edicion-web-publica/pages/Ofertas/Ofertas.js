import React, { useState, useEffect } from 'react';

// Components
import ModalForm from '../../components/Ofertas/ModalForm';

// Utils
import Utils from '../../components/Ofertas/utils';
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
  banner_offer_id: '',
  category_product_id: '',
  name: '',
  description: '',
  image: '',
  permissions: []
};

function Ofertas({
  categories,
  bannersOffers,
  fetchCategories,
  fetchBannerOffers,
  addBannerOffers: addItem,
  editBannerOffers: editItem,
  deleteBannerOffers
}) {
  // Acciones del modal role
  const [openModal, setOpenModal] = useState(false);
  const [titleModal, setTitleModal] = useState('Crear oferta por categoría');
  const webPublicaPermisions = useGetPermisions(
    'Backoffice',
    'Edición web pública'
  );
  console.log({ webPublicaPermisions });
  const closeModal = () => {
    setOpenModal(!openModal);
  };

  const [state, setState] = useState(initialState);
  const [isAddItem, setIsAddItem] = useState(true);

  const updateBannerOffers = (item) => {
    console.log({ item });
    setState(item);
    setIsAddItem(false);
    setTitleModal('Editar oferta por categoría');
    setOpenModal(true);
  };

  const removeBannerOffers = (item) => {
    deleteBannerOffers({
      banner_offer_id: item.banner_offer_id
    });
  };

  // Send data of Form
  const onSubmit = () => {
    let data = { ...state };
    if (isAddItem) {
      addItem(data);
    } else {
      editItem(data);
    }
    setState(initialState);
    closeModal();
  };

  useEffect(() => {
    fetchCategories();
    fetchBannerOffers();
  }, []);

  return (
    <div>
      <Flex justifyContent='space-between'>
        <CVSelect
          height='3rem'
          options={[
            { value: '', text: 'Todos' },
            ...(categories?.data || []).map((category) => ({
              text: category.name,
              value: category._id
            }))
          ]}
          title={'Categoría: '}
          value={state.category_product_id || ''}
          onChange={(value) => {
            fetchBannerOffers({ category_product_id: value });
            setState({ ...state, category_product_id: value });
          }}
        />

        {webPublicaPermisions.crear && (
          <CVButton
            backgroundColor='blue'
            onClick={() => {
              setIsAddItem(true);
              setState(initialState);
              setOpenModal(true);
              setTitleModal(`Crear Oferta`);
            }}>
            Crear +
          </CVButton>
        )}
      </Flex>

      <SizeBox />
      <CVDataTable
        data={Utils.inputDataProcessed(
          bannersOffers.data || [],
          {
            edit: updateBannerOffers,
            delete: removeBannerOffers
          },
          webPublicaPermisions
        )}
        headers={Utils.columnsData}
      />

      <CVModal isOpen={openModal} onClose={closeModal} header={titleModal}>
        <ModalForm
          state={state}
          setState={setState}
          onSubmit={onSubmit}
          dataDependency={categories?.data || []}
          sizeimage={'OFERTAIMAGE'}
        />
      </CVModal>
    </div>
  );
}

export default Ofertas;
