import React, { useEffect, useState } from 'react';
import { Flex, HStack, Box, useToast, useDisclosure } from '@chakra-ui/react';
import Utils from './components/utils';
import {
  CVButton,
  CVDataTable,
  CVModal,
  CVText
} from '@/common/CovendeTemplate';
import { v4 } from 'uuid';
import ModalForm from './components/ModalForm';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Trash } from '@/app/assets/icons';
import { ImUserPlus } from 'react-icons/im';
import { formatpaginate } from '@/common/utils/methods';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import CVUseStateCallback from '@CVTemplate/core/CVHooks/CVUseStateCallback';
import { ADD_USER_ADMINISTRATIVE } from '@CVApi/core/users/userServices';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import ModalDelete from '@/app/main/bo/faq/components/ModalDelete';
import useGetPermisions from '@/common/hooks/useGetPermisions';

// Estado inicial del formulario
const initialState = {
  user_id: '',
  email: '',
  password: '',
  password_again: '',
  company_name: '',
  name: '',
  lastName: '',
  image: '',
  flag_active: true,
  role: '',
  isRepresent: false,
  typeUser: 'VENDEDOR',
  tipodoc: '60c3d90e6766872ac869cf99'
};

// Component
function UsuariosBo({
  platforms,
  roles,
  users,
  fetchPlatform,
  fetchUsers,
  addUsers: addItem,
  editUsers: editItem,
  deleteUsers
}) {
  const [platformSelected, setPlatformSelected] = useState('PBO');
  // const [platformSelected, setPlatformSelected] = useState(
  //   platforms.data ? platforms.data[0].platformID : null
  // );

  const [datapaginate, setdatapaginate] = useState([]);
  const [pagination, setpagination] = useState({});
  const [itemDelete, setItemDelete] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, seterrors] = CVUseStateCallback(false);
  const UserPermisions = useGetPermisions('Backoffice', 'Usuarios');
  const closeModal = () => {
    setOpenModal(!openModal);
  };

  const [state, setState] = useState(initialState);
  const [isAddItem, setIsAddItem] = useState(true);
  const addToast = useToast();

  // Send data of Form
  const withoutError = () => {
    !errors ? seterrors(true, onSubmit) : onSubmit();
  };

  const onSubmit = () => {
    setLoading(true);
    AxiosGQL(ADD_USER_ADMINISTRATIVE(state))
      .then((response) => {
        if (response.addUserAdministrative.status == true) {
          CVAlertSuccess({
            addToast,
            message: 'Usuario agregado correctamente'
          });
          setState(initialState);
          closeModal();
          seterrors(false);
          return true;
        } else {
          CVAlertError({
            addToast,
            message: 'Compruebe haber rellenado los campos correctamente'
          });
        }
      })
      .then((res) => {
        !!res && fetchUsers(platformSelected);
        setLoading(false);
      })
      .catch((err) => {
        err &&
          CVAlertError({
            addToast,
            message:
              'Estamos teniendo problemas, por favor intentelo mas tarde.'
          });
        setLoading(false);
      });
  };

  const fechdata = (page = 1, limit = 10) => {
    const lista = users?.data || [];
    const total = lista.length;
    const itemsPage = limit;
    const pages = Math.ceil(total / itemsPage);
    const startIndex = page * itemsPage - itemsPage;
    const endIndex = startIndex + itemsPage;
    const datas = lista.slice(startIndex, endIndex);
    setdatapaginate(
      datas.map((data, index) => ({
        ...data,
        orden: (page - 1) * limit + (index + 1)
      }))
    );
    setpagination(formatpaginate({ total, itemsPage, page, pages }));
  };

  useEffect(() => {
    fetchPlatform();
    fechdata();
  }, [users?.data, platformSelected]);

  useEffect(() => {
    fetchUsers('PBO');
  }, []);

  const deleteUser = async (item) => {
    const res = await deleteUsers({ user_id: item.user_id });
    await onClose();
    if (res.payload.user_id != '') {
      return setdatapaginate(
        datapaginate.filter((element) => element.user_id != res.payload.user_id)
      );
    }
  };

  const btnDelete = (item) => (
    <a
      onClick={() => {
        onOpen();
        setItemDelete(item);
      }}>
      {Trash}
    </a>
  );

  return (
    <>
      {JSON.stringify(platforms.data?.platformID)}
      <Flex justifyContent='space-between'>
        <CVText color='blue' fontSize='1.5rem' fontWeight='bold'>
          Usuarios y Administracion
        </CVText>
        {UserPermisions.crear && (
          <CVButton
            disabled={platformSelected == null}
            onClick={() => setOpenModal(true)}>
            <ImUserPlus />
            <SizeBox /> Crear Usuario
          </CVButton>
        )}
      </Flex>
      <SizeBox />
      <Box rounded='1rem' backgroundColor='white' padding='1rem'>
        {/* <HStack mb='16px' spacing='24px'>
          {platforms.loading
            ? null
            : platforms.error
            ? null
            : platforms.data.map(
                (platf, key) =>
                  platf.active && (
                    <CVButton
                      key={v4()}
                      variant={
                        platformSelected === platf.platformID
                          ? 'contained'
                          : 'outlined'
                      }
                      onClick={() => {
                        setPlatformSelected(platf.platformID);
                        fetchUsers(platf.platformID);
                      }}>
                      {platf.name}
                    </CVButton>
                  )
              )}
        </HStack> */}

        {users.loading ? null : users.error ? null : (
          <CVDataTable
            headers={Utils.columnsData}
            data={Utils.inputDataProcessed(
              datapaginate,
              {
                delete: btnDelete
              },
              UserPermisions
            )}
            fetchdata={fechdata}
            pagination={pagination}
          />
        )}
        <CVModal
          isOpen={openModal}
          onClose={closeModal}
          size='5xl'
          bgHeader='skyblue'
          header={
            <CVText
              fontWeight='bold'
              color='white'
              fontSize='1.2rem'
              textAlign='center'>
              Crear nuevo Usuario
            </CVText>
          }>
          {roles.loading ? null : roles.error ? null : (
            <ModalForm
              state={state}
              setState={setState}
              onSubmit={withoutError}
              dataDependency={roles}
              {...{ errors, seterrors }}
            />
          )}
        </CVModal>
        <ModalDelete
          {...{ isOpen, onClose, deleteUser }}
          title='Usuario'
          itemToDelete={itemDelete}
        />
      </Box>
    </>
  );
}

export default UsuariosBo;
