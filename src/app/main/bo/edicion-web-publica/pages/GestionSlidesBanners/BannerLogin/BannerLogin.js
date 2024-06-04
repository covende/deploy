import { CVButton, CVDataTable, CVModal } from '@/common/CovendeTemplate';
import useGetPermisions from '@/common/hooks/useGetPermisions';
import { Flex } from '@chakra-ui/layout';
import React, { useState, useEffect } from 'react';

// Components
import ModalForm from '../../../components/GestionSlidesBanners/BannerLogin/ModalForm';

// Utils
import Utils from '../../../components/GestionSlidesBanners/BannerLogin/utils';

// Estado inicial del formulario
const initialState = {
  category_product_id: '',
  name: '',
  description: '',
  permissions: [],
  image: ''
};

function BannerLogin({
  bannersLogin,
  fetchBannerLogin,
  addBannerLogin: addItem,
  editBannerLogin: editItem,
  deleteBannerLogin
}) {
  // Acciones del modal role
  const [openModal, setOpenModal] = useState(false);
  const [titleModal, setTitleModal] = useState('Crear banner login');
  const closeModal = () => {
    setOpenModal(!openModal);
  };

  const webPublicaPermisions = useGetPermisions(
    'Backoffice',
    'Edición web pública'
  );

  const [state, setState] = useState(initialState);
  const [isAddItem, setIsAddItem] = useState(true);

  const updateBannerLogin = (item) => {
    setState(item);
    setIsAddItem(false);
    setTitleModal('Editar banner login');
    setOpenModal(true);
  };

  const removeBannerLogin = (item) => {
    deleteBannerLogin({
      banner_login_id: item.banner_login_id
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
        banner_login_id: state.banner_login_id
      };
      editItem(data);
    }
    setState(initialState);
    closeModal();
  };

  useEffect(() => {
    fetchBannerLogin();
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
              setTitleModal(`Crear Banner Login`);
            }}>
            Crear +
          </CVButton>
        )}
      </Flex>

      {bannersLogin.loading ? null : bannersLogin.error ? null : (
        <CVDataTable
          data={Utils.inputDataProcessed(
            bannersLogin.data,
            {
              edit: updateBannerLogin,
              delete: removeBannerLogin
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
          onSubmit={onSubmit}
          dataDependency={[]}
          sizeimage={'BANNER_LOGIN_IMAGE'}
        />
      </CVModal>
    </div>
  );
}

export default BannerLogin;
