import React, { useEffect, useState } from 'react';

import {
  MenuBarContainer,
  MenuSwitchUsers,
  MenuConcaveContainer,
  MenuConcave,
  MenuBarList,
  MenuBarItem
} from './Sidebar.styles';

import { typeUsers, paths } from './Sidebar.data';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { v4 } from 'uuid';
import { rolesidebar } from '@/app/helpers';
import { Box, Text } from '@chakra-ui/react';
import CVTooltip from '@/common/CovendeTemplate/CVTooltip';
import { useDispatch, useSelector } from 'react-redux';
import { tienda } from '@CVPages/core/admin/seller/productos/redux/ProductUpdate';
import { icons } from '@/app/main/bo/menus/modals/data';
import useGetPermisions from '@/common/hooks/useGetPermisions';

function Sidebar() {
  const { product, store_status } = useSelector((state) => state.ProductView);
  const { menu } = useSelector((state) => state.Auth.BuyerSeller);
  const dispatch = useDispatch();
  const [seetooltip, setseetooltip] = useState(null);
  const [tipos, setTipos] = useState(typeUsers);
  const [typeUserSelected, setTypeUserSelected] = useState(tipos[0]);
  const history = useHistory();
  const state = useLocation();
  // const listmenuBS = useSelector((state) => state.Auth.BuyerSeller.menu);

  const handleItemSelected = (base, ItemSelected) => {
    history.push(`/${base}/${ItemSelected}`);
  };
  const ordena = async (typeUser) => {
    let tp = [...tipos];
    tp = tp.filter((da) => da.type != typeUser.type);
    tp = [...tp, typeUser];
    setTipos(tp);
    setTypeUserSelected(typeUser);
    let id = await tienda(dispatch, product, false);
    setseetooltip(id && id != '' ? true : false);
  };

  useEffect(() => {
    let isMounted = true;
    const typeUser = tipos.find((item) => item.type == rolesidebar());
    ordena(typeUser);

    return () => (isMounted = false);
  }, [product]);

  const getIconMenu = (textIcon) => {
    const getIcon = icons.find((icon) => icon.code == textIcon);
    return getIcon.svg;
  };

  return (
    <MenuBarContainer>
      {tipos.map((typeUser, index) => {
        return (
          <CVTooltip
            isOpen={typeUser.type === 'Vender' && !seetooltip ? null : false}
            key={index}
            // disabled={typeUser.type == 'Comprar'  ? false : true}
            title={typeUser.tooltip}
            icon={typeUser.icon}
            widthIcon='75px'>
            <MenuSwitchUsers
              selected={index}
              color={typeUser.color + (typeUser.disabled() ? '50' : '')}
              onClick={() => {
                if (typeUser.title == 'Comprador') {
                  let foundDashboard = menu?.find(
                    (me) => me.typeDashboard == 'Comprar'
                  );

                  if (!foundDashboard) return;
                }

                if (!typeUser.disabled()) {
                  let type = typeUser.type == 'Comprar' ? 'buyer' : 'seller';

                  if (state.pathname.indexOf(type) == -1)
                    history.push('/' + type);

                  return ordena(typeUser);
                } else {
                  return {};
                }

                return typeUser.disabled() ? {} : ordena(typeUser);
              }}>
              {typeUser.title}
            </MenuSwitchUsers>
          </CVTooltip>
        );
      })}
      <MenuConcaveContainer>
        <MenuConcave color={typeUserSelected.color}></MenuConcave>
        <MenuBarList>
          {/* {paths.map((path) => {
            if (typeUserSelected.type === path.type) {
              {
                return path.items.map((item) => (
                  <Link key={v4()} to={item.route}>
                    <MenuBarItem
                      color={typeUserSelected.color}
                      selected={item.route === state.pathname}
                      onClick={() => handleItemSelected(item)}>
                      <Box fontSize='2.5rem'>{item.icon}</Box>
                      <span>{item.name}</span>
                    </MenuBarItem>
                  </Link>
                ));
              }
            }
          })} */}

          {menu.map(({ typeDashboard, headers }) => {
            if (typeUserSelected.type === typeDashboard) {
              return headers.map(({ menuName, menuSlug, icon }, ndx) => {
                const base = typeDashboard == 'Vender' ? 'seller' : 'buyer';
                return (
                  <Link
                    key={v4()}
                    to={ndx == 0 ? `/${base}` : `/${base}/${menuSlug}`}>
                    <MenuBarItem
                      color={typeUserSelected.color}
                      selected={
                        ndx == 0
                          ? `/${base}` == state.pathname
                          : `/${base}/${menuSlug}` === state.pathname
                      }
                      onClick={() => handleItemSelected(base, menuSlug)}>
                      <Box fontSize='2.5rem'>{getIconMenu(icon)}</Box>
                      <Text fontWeight='bold'>{menuName}</Text>
                      {/* <span>{menuName}</span> */}
                    </MenuBarItem>
                  </Link>
                );
              });
            }
          })}
        </MenuBarList>
      </MenuConcaveContainer>
    </MenuBarContainer>
  );
}

export default Sidebar;
