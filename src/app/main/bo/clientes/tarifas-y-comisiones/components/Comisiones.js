import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DecorativeHeading from '../../components/DecorativeHeading';
import DecorativeText from '../../components/DecorativeText';
import DataText from '../../components/DataText';
import { Flex } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import { svgEdit } from '@/app/assets/images/SVG';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { HStack, Text } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';
import { FiSave } from 'react-icons/fi';
import { useToast } from '@chakra-ui/toast';
import CVInput from '@CVTemplate/core/CVInput';
import CVUseStateCallback from '@CVTemplate/core/CVHooks/CVUseStateCallback';
import { CVErrorTags } from '@CVTemplate/core/CVValidation';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import { updateStoreData } from '@CVApi/core/webbo/BClientService';
import { A_CLIENTS } from '../../redux/actions';

function DatosGenerales() {
  const addToast = useToast();
  const { client } = useSelector((state) => state.Clients);

  const [percentageCommission, setPercentageCommission] = useState(0);
  const [edit, setEdit] = useState(true);
  const [errors, seterrors] = CVUseStateCallback(false);
  const [companyID, setCompanyID] = useState('');
  const dispatch = useDispatch();

  const editPercentageCommision = async () => {
    if (CVErrorTags()) return false;

    if (client?.store?.percentage_commission == percentageCommission) {
      setEdit(true);
      return CVAlertSuccess({
        addToast,
        message: 'Datos actualizados correctamente'
      });
    }

    const { editCompany: resp } = await updateStoreData({
      company_id: companyID,
      percentage_commission: percentageCommission
    });

    if (resp?._id) {
      dispatch(
        A_CLIENTS({
          client: {
            ...client,
            store: {
              ...client.store,
              percentage_commission: percentageCommission
            }
          }
        })
      );
      CVAlertSuccess({
        addToast,
        message: 'Datos actualizados correctamente'
      });
    } else {
      CVAlertError({
        addToast,
        message: 'Ocurrieron errores, vuelva a enviarlo mas tarde'
      });
    }
    setEdit(true);
  };

  const onSubmit = () => {
    !errors
      ? seterrors(true, editPercentageCommision)
      : editPercentageCommision();
  };
  useEffect(() => {
    if (client?.store?.percentage_commission) {
      setPercentageCommission(client.store.percentage_commission);
      setCompanyID(client?.store?._id || '');
    }
  }, [client?.store]);

  const datosComisiones = (
    <Grid item xs={12} sm={12} md={6} lg={4}>
      <DecorativeHeading>Comisiones</DecorativeHeading>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={4} md={5}>
          <DecorativeText>Comisión Porcentual:</DecorativeText>
        </Grid>
        <Grid item xs={6} sm={4} md={4}>
          {edit ? (
            <Flex>
              <DataText>{percentageCommission}%</DataText>
              <SizeBox />
              <Tooltip label='Editar'>
                <Link
                  style={{ marginLeft: 0 }}
                  to='#'
                  onClick={() => {
                    console.log('onclic');
                    setEdit(false);
                  }}>
                  {svgEdit}
                </Link>
              </Tooltip>
            </Flex>
          ) : (
            <Flex>
              <HStack alignItems='start'>
                <CVInput
                  errorMessage='Campo obligatorio. Máximo 99% (ingrese solo números enteros)'
                  error={
                    errors &&
                    (percentageCommission < 0 || percentageCommission >= 100)
                  }
                  type='number'
                  value={+percentageCommission}
                  onChange={(value) => setPercentageCommission(+value || 0)}
                  max={99}
                />
                <Text style={{ marginTop: '0.5rem' }}>%</Text>
              </HStack>
              <SizeBox />
              <Tooltip label='Guardar'>
                <Link
                  style={{ marginTop: '0.5rem' }}
                  to='#'
                  onClick={() => {
                    console.log('onclic');
                    onSubmit();
                  }}>
                  <FiSave style={{ color: '004574', fontSize: '1.5rem' }} />
                </Link>
              </Tooltip>
            </Flex>
          )}
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <Grid container spacing={2}>
      {datosComisiones}
    </Grid>
  );
}

export default DatosGenerales;
