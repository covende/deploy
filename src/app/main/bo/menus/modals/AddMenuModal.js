import React, { useState, useEffect } from 'react';
import { Flex, useToast, Box } from '@chakra-ui/react/';
import CVButton from '@CVTemplate/core/CVButton';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Grid } from '@/../node_modules/@material-ui/core/index';
import CVText from '@CVTemplate/core/CVText';
import CVInput from '@CVTemplate/core/CVInput';
import CVModal from '@CVTemplate/core/CVModal';
import CVSelect from '@CVTemplate/core/CVSelect';
import { Spinner } from '@chakra-ui/spinner';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { ADD_MENU, UPDATE_MENU } from '@CVApi/core/webbo/categoriasBo';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import { dashboards, icons, plataform } from './data';

const AddMenuModal = ({
  isOpen,
  onClose,
  _id = '',
  parentID = '',
  setIsRefresh,
  isRefresh,
  setParentID,
  item,
  setItem,

  menuName,
  aliasMenu,
  icon,
  positionMenu,
  setMenuName,
  setAliasMenu,
  setIcon,
  setPositionMenu,
  valueInitial,
  setDashboard,
  index
}) => {
  const [loading, setLoading] = useState(false);
  const [iconComplete, setIconComplete] = useState({
    svg: ''
  });

  const addToast = useToast();

  const onSubmit = async () => {
    setLoading(true);
    try {
      if (item.menuID != '' && item.menuID != undefined) {
        const { updateMenu } = await AxiosGQL(
          UPDATE_MENU(
            {
              menuName: menuName.value,
              aliasMenu: aliasMenu.value,
              icon: icon.value,
              positionMenu: positionMenu.value,
              parentID: item.parentID,
              menuID: item.menuID
            },
            index
          )
        );
        if (updateMenu.status == true) {
          CVAlertSuccess({ addToast, message: updateMenu.message });
          onClose();
          setMenuName(valueInitial);
          setAliasMenu(valueInitial);
          setIcon(valueInitial);
          setPositionMenu(valueInitial);
          setIsRefresh(!isRefresh);
          setParentID('');
          setItem({});
        } else {
          CVAlertError({ addToast, message: updateMenu.message });
        }
        setLoading(false);
      } else {
        let { addMenu } = await AxiosGQL(
          ADD_MENU(
            {
              menuName: menuName.value,
              aliasMenu: aliasMenu.value,
              icon: icon.value,
              parentID: parentID,
              positionMenu: positionMenu.value
            },
            index
          )
        );
        if (addMenu.status == true) {
          CVAlertSuccess({ addToast, message: addMenu.message });
          onClose();
          setMenuName(valueInitial);
          setAliasMenu(valueInitial);
          setIcon(valueInitial);
          setIdPlataform(valueInitial);
          setDashboard(valueInitial);
          setPositionMenu(valueInitial);
          setIsRefresh(!isRefresh);
          setParentID('');
          setItem({});
        } else {
          CVAlertError({ addToast, message: addMenu.message });
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  console.log({ iconComplete });

  useEffect(() => {
    let iconComplete = icons.find(({ code }) => code == icon.value);
    setIconComplete(iconComplete);
  }, [icon]);

  console.log({
    menuName: menuName.value,
    aliasMenu: aliasMenu.value,
    icon: icon.value,
    positionMenu: positionMenu.value,
    parentID: item.parentID,
    menuID: item.menuID
  });
  return (
    <CVModal
      size='2xl'
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setMenuName(valueInitial);
        setAliasMenu(valueInitial);
        setIcon(valueInitial);
        setIdPlataform(valueInitial);
        setDashboard(valueInitial);
        setPositionMenu(valueInitial);
        setParentID('');
        setItem({});
      }}
      header={(_id != '' ? 'Editar' : 'Agregar') + ' ' + 'Menu'}
      footer={
        <Flex width='100%' justifyContent='center'>
          <CVButton
            onClick={() => {
              // function
              onClose();
              setMenuName(valueInitial);
              setAliasMenu(valueInitial);
              setIcon(valueInitial);
              setIdPlataform(valueInitial);
              setDashboard(valueInitial);
              setPositionMenu(valueInitial);
              setParentID('');
              setItem({});
            }}
            backgroundColor='red'
            width='150px'>
            Cancelar
          </CVButton>
          <SizeBox />
          <CVButton
            width='150px'
            onClick={() => {
              if (
                menuName.isValid == false &&
                menuName.value != '' &&
                aliasMenu.isValid == false &&
                aliasMenu.value != '' &&
                icon.value != '' &&
                positionMenu.isValid == false &&
                positionMenu.value != ''
              ) {
                console.log('al menos esta aquí');
                onSubmit();
              } else {
                CVAlertError({
                  addToast,
                  message: 'Solucione los errores por favor'
                });
                menuName.isValid != false
                  ? setMenuName({ ...menuName, isValid: true })
                  : setMenuName({ ...menuName, isValid: false });
                aliasMenu.isValid != false
                  ? setAliasMenu({ ...aliasMenu, isValid: true })
                  : setAliasMenu({ ...aliasMenu, isValid: false });
                positionMenu.isValid != false
                  ? setPositionMenu({ ...positionMenu, isValid: true })
                  : setPositionMenu({ ...positionMenu, isValid: false });
                icon.value == ''
                  ? setIcon({ ...icon, isValid: true })
                  : setIcon({ ...icon, isValid: false });
              }
            }}
            disabled={loading}>
            {loading ? <Spinner /> : _id != '' ? 'Editar' : 'Agregar'}
          </CVButton>
        </Flex>
      }>
      <Grid container spacing={1}>
        <Grid item xs={4} sm={4} md={4}>
          <CVText color='blue'>Nombre del Menu:</CVText>
        </Grid>
        <Grid item xs={8} sm={8} md={8}>
          <CVInput
            value={menuName.value}
            onChange={(value) =>
              setMenuName({ isValid: value != '' ? false : true, value: value })
            }
            placeholder='Ingrese nombre del nuevo menu'
            error={menuName.isValid}
          />
        </Grid>

        <Grid item xs={4} sm={4} md={4}>
          <CVText color='blue'>Alias del Menu:</CVText>
        </Grid>
        <Grid item xs={8} sm={8} md={8}>
          <CVInput
            value={aliasMenu.value}
            onChange={(value) =>
              setAliasMenu({
                isValid: value != '' ? false : true,
                value: value
              })
            }
            placeholder='ejemplo-ejemplo'
            error={aliasMenu.isValid}
          />
        </Grid>

        <Grid item xs={4} sm={4} md={4}>
          <CVText color='blue'>Icono:</CVText>
        </Grid>
        <Grid item xs={8} sm={8} md={8}>
          <Flex align='center'>
            <CVSelect
              options={icons.map((icon) => ({
                value: icon.code,
                text: icon.title
              }))}
              value={icon.value}
              onChange={(value) => setIcon({ ...icon, value })}
              placeholder='Icono del menu'
              error={
                icon.isValid != null ? (icon.value != '' ? false : true) : ''
              }
            />
            <Box borderRadius='50%' p='3px' ml='3px' bg='black'>
              {iconComplete?.svg}
            </Box>
          </Flex>
        </Grid>

        <Grid item xs={4} sm={4} md={4}>
          <CVText color='blue'>Número de orden de menu:</CVText>
        </Grid>
        <Grid item xs={8} sm={8} md={8}>
          <CVInput
            value={positionMenu.value}
            onChange={(value) =>
              setPositionMenu({
                isValid: value != '' ? false : true,
                value: value
              })
            }
            placeholder='ejem: 10'
            error={positionMenu.isValid}
          />
        </Grid>
      </Grid>
    </CVModal>
  );
};

export default AddMenuModal;
