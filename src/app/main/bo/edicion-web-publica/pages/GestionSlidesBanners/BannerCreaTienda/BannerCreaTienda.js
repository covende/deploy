import { CVButton, CVDataTable, CVModal } from '@/common/CovendeTemplate';
import useGetPermisions from '@/common/hooks/useGetPermisions';
import { Flex } from '@chakra-ui/layout';
import React, { useState, useEffect } from 'react';

// Components
import ModalForm from '../../../components/GestionSlidesBanners/BannerCreaTienda/ModalForm';

// Utils
import Utils from '../../../components/GestionSlidesBanners/BannerCreaTienda/utils';

// Estado inicial del formulario
const initialState = {
  category_product_id: '',
  name: '',
  description: '',
  permissions: [],
  image: ''
};

function BannerCreaTienda({
  bannersCreaTienda,
  fetchBannerCreaTienda,
  addBannerCreaTienda: addItem,
  editBannerCreaTienda: editItem,
  deleteBannerCreaTienda
}) {
  // Acciones del modal role
  const [openModal, setOpenModal] = useState(false);
  const [titleModal, setTitleModal] = useState('Crear banner crea tienda');
  const closeModal = () => {
    setOpenModal(!openModal);
  };
  const webPublicaPermisions = useGetPermisions(
    'Backoffice',
    'Edición web pública'
  );

  const [state, setState] = useState(initialState);
  const [isAddItem, setIsAddItem] = useState(true);

  const updateBannerCreaTienda = (item) => {
    setState(item);
    setIsAddItem(false);
    setTitleModal('Editar banner crea tienda');
    setOpenModal(true);
  };

  const removeBannerCreaTienda = (item) => {
    deleteBannerCreaTienda({
      banner_createstore_id: item.banner_createstore_id
    });
  };

  // Send data of Form
  const onSubmit = (data) => {
    data = { ...data, image: state.image };
    if (isAddItem) {
      addItem(data);
    } else {
      data = {
        ...data,
        banner_createstore_id: state.banner_createstore_id
      };
      editItem(data);
    }
    setState(initialState);
    closeModal();
  };

  useEffect(() => {
    fetchBannerCreaTienda();
  }, []);

  return (
    <div>
      <Flex>
        {webPublicaPermisions.crear && (
          <CVButton
            backgroundColor='blue'
            onClick={() => {
              setIsAddItem(true);
              setState(initialState);
              setOpenModal(true);
              setTitleModal(`Crear Banner crear Tienda`);
            }}>
            Crear +
          </CVButton>
        )}
      </Flex>

      {bannersCreaTienda.loading ? null : bannersCreaTienda.error ? null : (
        <CVDataTable
          data={Utils.inputDataProcessed(
            bannersCreaTienda.data,
            {
              edit: updateBannerCreaTienda,
              delete: removeBannerCreaTienda
            },
            webPublicaPermisions
          )}
          headers={Utils.columnsData}
        />
      )}
      <CVModal isOpen={openModal} onClose={closeModal} title={titleModal}>
        <ModalForm
          state={state}
          setState={setState}
          sizeimage={'BANNER_CREA_TIENDA_IMAGE'}
          onSubmit={onSubmit}
          dataDependency={[]}
        />
      </CVModal>
    </div>
  );
}

export default BannerCreaTienda;
