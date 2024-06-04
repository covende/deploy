import { plus } from '@/app/assets/icons';
import { CVButton, CVInput } from '@/common/CovendeTemplate';
import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { Button, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { tienda } from '../../../productos/redux/ProductUpdate';
import MiModal from './MiModal';
import { headCells, lista, rows } from './SubCuentaUtils';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Grid } from '@material-ui/core';
import CVDataTable from '@CVTemplate/core/CVDataTable';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { ROLES_BY_SUBACCOUNT } from '@CVApi/core/roles/typeDefs/query';
import {
  deleteSubAccount,
  getSubAccounts
} from '@CVApi/core/subAccount/service';
import SubAccountValidationCode from './SValidationCode';
import MActiveSubAccount from './MActiveSubAccount';
import ModalDelete from '@CVPages/core/bo/faq/components/ModalDelete';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import { useToast } from '@chakra-ui/toast';
import { formatpaginate } from '@/common/utils/methods';

let initUser = {
  user_id: '',
  first_name: '',
  last_name: '',
  role: '',
  email: '',
  password: '',
  // status: true,
  active: false,
  validated: false
};

function MiSubcuenta() {
  const [datalist, setDatalist] = useState([]);
  const [users, setUsers] = useState([]);
  const [storeID, setStoreID] = useState('');
  const [search, setSearch] = useState('');
  const { product } = useSelector((state) => state.ProductView);
  const dispatch = useDispatch();
  const [userCurrent, setUserCurrent] = useState(initUser);
  const [roles, setRoles] = useState([]);
  const [loading, setloading] = useState(false);
  const [validateCode, setValidateCode] = useState(false);
  const [activeSubAccount, setActiveSubAccount] = useState(false);
  const [addActive, setAddActive] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const addToast = useToast();
  const [repeatValidate, setRepeatValidate] = useState(false);
  const [paginate, setPaginate] = useState({});
  const [total, setTotal] = useState(0);

  const getUsers = async (page, itemsPage, init) => {
    !init && setloading(true);
    let resp = await getSubAccounts({
      page,
      itemsPage,
      search
    });
    if (resp?.status) {
      setPaginate(formatpaginate(resp?.info));
      setUsers(resp.data);
      setTotal(resp?.info?.total || 0);
    }
    !init && setloading(false);
  };

  const deleteAccount = async () => {
    try {
      let resp = await deleteSubAccount(userCurrent.user_id);
      if (resp.status) CVAlertSuccess({ addToast, message: resp.message });
      else CVAlertError({ addToast, message: resp.message });
      setDeleteModal(false);

      await getUsers();
    } catch (error) {
      CVAlertError({ addToast, message: 'Error' });
    }
  };

  const initdata = async () => {
    setloading(true);
    let store = storeID || (await tienda(dispatch, product));
    storeID == '' && setStoreID(store);
    await getUsers(1, 10, true);
    const { rolesBySubAccount } = await AxiosGQL(ROLES_BY_SUBACCOUNT(store));
    if (rolesBySubAccount)
      setRoles(
        rolesBySubAccount.map((rol) => ({
          value: rol.roleID,
          text: rol.roleName
        }))
      );

    setloading(false);
  };

  useEffect(() => {
    initdata();
  }, []);

  return (
    <Container style={{ backgroundColor: '#FFFFFF', padding: '1rem' }}>
      <SizeBox />
      <Flex
        justifyContent='space-between'
        alignItems='center'
        padding='0.5rem'
        wrap='wrap'>
        <Text fontSize='2rem' fontWeight='bold' textColor='#004772'>
          Sub-cuentas
        </Text>
        <Box style={{ maxWidth: '400px' }}>
          <CVInput
            height='3rem'
            placeholder=''
            value={search}
            buttonClick={() => getUsers(1, 10)}
            onChange={(value) => setSearch(value)}
            iconFind={true}
          />
        </Box>
      </Flex>
      <SizeBox />

      <Box>
        <CVDataTable
          loading={loading}
          pagination={paginate}
          fetchdata={(page) => getUsers(page, 10)}
          headers={headCells}
          data={rows({
            users,
            actions: {
              delete: (user_id) => {
                setUserCurrent({ ...userCurrent, user_id });
                setDeleteModal(true);
              },
              active: (user, value) => {
                setUserCurrent({ ...user, active: value });
                setActiveSubAccount(true);
              }
            }
          })}
        />
      </Box>
      <Box ml='1rem' mt='-2rem'>
        <Text fontSize='1rem'>{total} Subcuentas</Text>
      </Box>

      <SizeBox />

      {roles.length > 0 && (
        <Flex justifyContent={{ base: 'center', md: 'left' }}>
          <CVButton onClick={() => setAddActive(true)}>
            {plus} Agregar Sub-cuenta
          </CVButton>
        </Flex>
      )}

      <SizeBox />

      <Flex justifyContent='center'>
        <Link to='/seller/configuracion'>
          <CVButton variant='outlined'>Regresar a mi cuenta</CVButton>
        </Link>
      </Flex>

      {activeSubAccount && (
        <MActiveSubAccount
          isOpen={activeSubAccount}
          onClose={() => {
            setUserCurrent({ ...initUser });
            setActiveSubAccount(false);
          }}
          user={userCurrent}
          showValidateCode={() => {
            setActiveSubAccount(false);
            setRepeatValidate(true);
            setValidateCode(true);
          }}
          process={(value) => {
            setActiveSubAccount(false);
            setUsers(
              users.map((user) =>
                user.user_id == userCurrent.user_id
                  ? { ...user, active: userCurrent.active }
                  : user
              )
            );
            setUserCurrent({ ...initUser });
          }}
        />
      )}

      {addActive && (
        <MiModal
          storeID={storeID}
          setUserCurrent={setUserCurrent}
          userCurrent={userCurrent}
          isOpen={addActive}
          roles={roles}
          onClose={() => {
            setAddActive(false);
            setUserCurrent({ ...initUser });
          }}
          process={() => {
            setAddActive(false);
            setValidateCode(true);
          }}
        />
      )}

      {validateCode && (
        <SubAccountValidationCode
          isOpen={validateCode}
          onClose={async () => {
            setUserCurrent({ ...initUser });
            setValidateCode(false);
            if (!repeatValidate) {
              await getUsers();
            } else setRepeatValidate(false);
          }}
          userEmail={userCurrent?.email}
          process={async () => {
            setUserCurrent({ ...initUser });
            setValidateCode(false);
            repeatValidate && setRepeatValidate(false);
            await getUsers();
          }}
        />
      )}

      {deleteModal && (
        <ModalDelete
          isOpen={deleteModal}
          onClose={() => setDeleteModal(false)}
          title='la subcuenta'
          confirm={deleteAccount}
          onConfirm={true}
          itemToDelete={true}
        />
      )}
    </Container>
  );
}

export default MiSubcuenta;
