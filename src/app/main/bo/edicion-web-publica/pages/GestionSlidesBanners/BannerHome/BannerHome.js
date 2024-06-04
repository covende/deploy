import React, { useState, useEffect } from 'react';

import ModalForm from '../../../components/GestionSlidesBanners/BannerHome/ModalForm';

// Utils
import Utils from '../../../components/GestionSlidesBanners/BannerHome/utils';
import { CVButton, CVDataTable, CVModal } from '@/common/CovendeTemplate';
import { Flex } from '@chakra-ui/layout';
import useGetPermisions from '@/common/hooks/useGetPermisions';

// Estado inicial del formulario
const initialState = {
  category_product_id: '',
  name: '',
  description: '',
  image: '',
  permissions: []
};

function BannerCategoria({
  bannersHome,
  fetchBannerHome,
  addBannerHome: addItem,
  editBannerHome: editItem,
  deleteBannerHome
}) {
  // Acciones del modal role
  const [openModal, setOpenModal] = useState(false);
  const [titleModal, setTitleModal] = useState('Crear banner home');
  const closeModal = () => {
    setOpenModal(!openModal);
  };

  // Acciones del form
  const [state, setState] = useState(initialState);
  const [isAddItem, setIsAddItem] = useState(true);

  const webPublicaPermisions = useGetPermisions(
    'Backoffice',
    'Edición web pública'
  );

  const updateBannerHome = (item) => {
    setState(item);
    setIsAddItem(false);
    setTitleModal('Editar banner home');
    setOpenModal(true);
  };

  const removeBannerHome = (item) => {
    deleteBannerHome({
      banner_home_id: item.banner_home_id
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
    fetchBannerHome();
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
              setTitleModal(`Crear Banner Home`);
            }}>
            Crear +
          </CVButton>
        )}
      </Flex>
      {bannersHome.loading ? null : bannersHome.error ? null : (
        <CVDataTable
          data={Utils.inputDataProcessed(
            bannersHome.data,
            {
              edit: updateBannerHome,
              delete: removeBannerHome
            },
            state.banner_home_id,
            webPublicaPermisions
          )}
          headers={Utils.columnsData}
        />
      )}
      <CVModal isOpen={openModal} onClose={closeModal} title={titleModal}>
        <ModalForm
          state={state}
          setState={setState}
          onSubmit={onSubmit}
          dataDependency={[]}
          sizeimage={'BANNER_HOME_IMAGE'}
        />
      </CVModal>
    </div>
  );
}

export default BannerCategoria;
