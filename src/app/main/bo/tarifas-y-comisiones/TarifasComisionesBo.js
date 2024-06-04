/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Grid, useDisclosure, Box, useToast } from '@chakra-ui/react';
import CustomTable from './components/Table';
import ModalPlanes from './components/ModalPlanes';
import ModalPlanesCategory from './components/ModalPlanesCategory';
import ModalPlanesSubCategory from './components/ModalPlanesSubCategory';

import Utils from './TarifasComisionesBo.utils';
import { useDispatch, useSelector } from 'react-redux';
import { plans } from '@/app/api/graphql/plans/services/planesservice';
import { A_PLANCATEGORY, A_PLANES } from './redux/Actions';
import TableCategory from './components/TableCategory';
import arrayToTree from 'array-to-tree';
import { A_CATEGORYPRODUCTS } from '../arborescencia-de-categorias/redux/Action';
import { categoryProductsList } from '@/app/api/graphql/categories/services/categoryservice';
import useGetPermisions from '@/common/hooks/useGetPermisions';
import { ok } from 'assert';
import ModalDeleteplan from './components/ModalDeleteplan';

function TarifasComisionesBo() {
  const [date, setdate] = useState([new Date(), new Date()]);

  const { planes, roles, roleSelected, modalview, plan } = useSelector(
    (state) => state.Planes
  );
  const permisions = useGetPermisions('Backoffice', 'Tarifas y Comisiones');
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const maketree = (data) => {
    const tree = arrayToTree(data, {
      parentProperty: 'parent_id',
      customID: '_id'
    });
    dispatch(A_CATEGORYPRODUCTS({ treecategorys: [...tree] }));
  };

  const fetchPlans = async (roleID = '0') => {
    //let _categorys = await PlanCategoryRole(roleID);
    let _planes = await plans();
    dispatch(
      A_PLANES({
        planes: _planes,
        roleSelected: roleID
      })
    );

    //dispatch(A_PLANCATEGORY({ plancategorys: _categorys }));
  };

  const deleteplanes = async (plans) => {
    dispatch(
      A_PLANES({
        modalview: 'planesdelete',
        plan: {
          ...plans
        }
      })
    );
    onOpen();
  };

  const editarplanes = (plans) => {
    dispatch(
      A_PLANES({
        modalview: 'planes',
        plan: {
          ...plans,
          status: plans.status ? plans.status : true,
          periodo: plans.periodo ? plans.periodo : '',
          datestart: plans.datestart ? new Date(plans.datestart) : new Date(),
          dateends: plans.dateends ? new Date(plans.dateends) : new Date()
        }
      })
    );
    onOpen();
  };
  const editarcomision = (subcategory) => {
    dispatch(A_PLANES({ modalview: 'planessubcategory' }));
    dispatch(
      A_PLANCATEGORY({
        plansubcategory: {
          ...subcategory,
          status: subcategory.status ? subcategory.status : true,
          datestart: subcategory.datestart ? subcategory.datestart : new Date(),
          dateends: subcategory.dateends ? subcategory.dateends : new Date()
        }
      })
    );
    onOpen();
  };
  const initialdata = async () => {
    const data = await categoryProductsList(true);
    dispatch(A_CATEGORYPRODUCTS({ categorys: [...data] }));
    maketree([...data]);
    fetchPlans();
  };

  useEffect(() => {
    initialdata();
  }, []);

  const modales = () => {
    switch (modalview) {
      case 'planes':
        return <ModalPlanes isOpen={isOpen} onClose={onClose} />;
      case 'planescategory':
        return <ModalPlanesCategory isOpen={isOpen} onClose={onClose} />;
      case 'planessubcategory':
        return <ModalPlanesSubCategory isOpen={isOpen} onClose={onClose} />;
      case 'planesdelete':
        return <ModalDeleteplan isOpen={isOpen} onClose={onClose} />;
      default:
        return <Box></Box>;
    }
  };
  return (
    <Grid templateRows='repeat(3, max-content)' gap='16px'>
      {/*
      <HStack mb='16px' spacing='24px'>
        {roles.map((role, key) => (
          <Button
            variant='bo-primary'
            bg={
              roleSelected === role.roleID
                ? 'covende.default.main'
                : 'covende.info.contrastText'
            }
            color={
              roleSelected === role.roleID
                ? 'covende.info.contrastText'
                : 'covende.primary.main'
            }
            key={key}
            onClick={() => fetchPlans(role.roleID)}>
            {role.roleName}
          </Button>
        ))}
      </HStack>
      */}
      <>
        <CustomTable
          style={{ fontSize: '1rem' }}
          setOpenModal={() => {
            dispatch(A_PLANES({ modalview: 'planes' }));
            onOpen();
          }}
          nameListCRUD='Planes'
          inputData={Utils.inputDataFeedsProcessed(
            planes,
            {
              editarplanes,
              deleteplanes
            },
            permisions
          )}
          inputColumns={Utils.columnsDataFeeds}
        />
        {modales()}
      </>
      <br />
     

      <TableCategory
        date={date}
        setdate={setdate}
       
        addcategory={() => {
          //dispatch(A_PLANES({ modalview: 'planescategory' }));
          //onOpen();
        }}
        addsubcategory={() => {
          //dispatch(A_PLANES({ modalview: 'planessubcategory' }));
          //onOpen();
        }}
        editarcomision={editarcomision}
        permisions={permisions}
      />
    </Grid>
  );
}

export default TarifasComisionesBo;