import React, { useEffect, useState } from 'react';
import ModalDelete from '../../faq/components/ModalDelete';
import { useDispatch, useSelector } from 'react-redux';
import { deletePlan } from '@CVApi/core/plans/services/planesservice';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import { A_PLANES } from '../../faq/redux/Actions';
import { useToast } from '@chakra-ui/react';
// Components
function ModalDeleteplan({ isOpen, onClose }) {
  const addToast = useToast();
  const dispatch = useDispatch();
  const { plan, planes } = useSelector((state) => state.Planes);
  const editplanes = async (confirm) => {
    if (plan._id) {
      const upadte_plan = planes.filter((data) => data._id !== plan._id);
      const erase = await deletePlan(plan._id);
      if (erase.status) {
        CVAlertSuccess({ addToast, message: 'Eliminado Correctamente' });
        dispatch(
          A_PLANES({
            modalview: 'planesdelete',
            planes: upadte_plan
          })
        );
      } else {
        CVAlertError({ addToast, message: 'Ocurrió un error al eliminar.' });
      }
    } else {
      CVAlertError({ addToast, message: 'Ocurrió un error' });
    }
    onClose();
  };
  useEffect(() => {}, []);

  return (
    <>
      <ModalDelete
        isOpen={isOpen}
        onClose={onClose}
        title='Eliminar'
        confirm={editplanes}
        onConfirm={true}
        itemToDelete={true}
      />
    </>
  );
}

export default ModalDeleteplan;
