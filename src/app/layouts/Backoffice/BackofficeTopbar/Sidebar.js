import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Wrapper, iconSidebar } from './Sidebar.styles';
import { sideBarProtectedRoutes } from './Sidebar.data';
import CVText from '@CVTemplate/core/CVText';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { GET_CATEGORIES } from '@/app/api/graphql/webbo/categoriasBo.js';
import { icons } from '@/app/main/bo/menus/modals/data';
import { useSelector } from 'react-redux';

const isActive = ({ path, location }) => {
  // return path == location;
  return location.includes(path);
};

const MenuText = ({ item, state }) => {
  return (
    <CVText
      color='currentColor'
      fontWeight={
        isActive({
          location: state.pathname,
          // path: item.path
          path: item.menuSlug
        })
          ? 'bold'
          : 'normal'
      }>
      {/* {item.name} */}
      {item.menuName}
    </CVText>
  );
  // return item.name;
};

const SubMenuComponent = ({ menuitem, state, onChangeMenu, getIcon }) => {
  const [webPublicChildren, setWebPublicChildren] = useState(menuitem);
  const getChildren = () => {
    try {
      if (menuitem.menus) {
        const father = menuitem.menus.find(
          (menu) => menu.menuSlug === 'gestion-slides-banners'
        );
        const children = menuitem.menus.filter(
          (menu) => menu.parentID == father.menuID
        );
        const other = menuitem.menus.filter(
          (menu) =>
            menu.parentID !== father.menuID && menu.menuID !== father.menuID
        );
        return [...other, { ...father, menus: children }];
      }
    } catch (error) {
      return null;
    }
  };
  useEffect(() => {
    if (getChildren()) {
      setWebPublicChildren({ ...menuitem, menus: getChildren() });
    } else {
      setWebPublicChildren(menuitem);
    }
  }, [menuitem]);
  // console.log({ webPublicChildren, menuitem });
  // console.log('menus', getChildren());
  return (
    <SubMenu
      title={<MenuText item={webPublicChildren} state={state} />}
      icon={getIcon(webPublicChildren.icon)}
      defaultOpen={state.pathname.includes(webPublicChildren.path)}>
      {webPublicChildren &&
        webPublicChildren?.menus.map((submenuitem, index) =>
          submenuitem.menus && submenuitem.menus.length > 0 ? (
            <SubMenu
              key={`submenu2-${index}`}
              title={<MenuText item={submenuitem} state={state} />}
              defaultOpen={isActive({
                location: state.pathname,
                path: submenuitem.path
              })}>
              {submenuitem &&
                submenuitem?.menus.map((submenu2item, index) => (
                  <MenuItem
                    key={`submenu2item-${index}`}
                    icon={getIcon(submenu2item.icon)}
                    onClick={() =>
                      onChangeMenu({
                        menuSlug: `${webPublicChildren.menuSlug}/${submenuitem.menuSlug}/${submenu2item.menuSlug}`
                      })
                    }
                    {...(isActive({
                      location: state.pathname,
                      path: submenu2item.menuSlug
                    })
                      ? { active: true }
                      : {})}>
                    <MenuText item={submenu2item} state={state} />
                  </MenuItem>
                ))}
            </SubMenu>
          ) : (
            <MenuItem
              key={`submenuitem-${index}`}
              icon={getIcon(webPublicChildren.icon)}
              onClick={() =>
                onChangeMenu({
                  menuSlug: `${webPublicChildren.menuSlug}/${submenuitem.menuSlug}`
                })
              }
              {...(isActive({
                location: state.pathname,
                path: submenuitem.menuSlug
              })
                ? { active: true }
                : {})}>
              <MenuText item={submenuitem} state={state} />
            </MenuItem>
          )
        )}
    </SubMenu>
  );
};;
// const SubMenuComponent = ({ menuitem, iconSidebar, state, onChangeMenu }) => (
//   <SubMenu
//     title={<MenuText item={menuitem} state={state} />}
//     icon={iconSidebar[menuitem.name]}
//     defaultOpen={state.pathname.includes(menuitem.path)}>
//     {menuitem.children.map((submenuitem, index) =>
//       submenuitem.children && submenuitem.children.length > 0 ? (
//         <SubMenu
//           key={`submenu2-${index}`}
//           title={<MenuText item={submenuitem} state={state} />}
//           defaultOpen={isActive({
//             location: state.pathname,
//             path: submenuitem.path
//           })}>
//           {submenuitem.children.map((submenu2item, index) => (
//             <MenuItem
//               key={`submenu2item-${index}`}
//               icon={iconSidebar[submenu2item.name]}
//               onClick={() => onChangeMenu(submenu2item)}
//               {...(isActive({
//                 location: state.pathname,
//                 path: submenu2item.path
//               })
//                 ? { active: true }
//                 : {})}>
//               <MenuText item={submenu2item} state={state} />
//             </MenuItem>
//           ))}
//         </SubMenu>
//       ) : (
//         <MenuItem
//           key={`submenuitem-${index}`}
//           icon={iconSidebar[submenuitem.name]}
//           onClick={() => onChangeMenu(submenuitem)}
//           {...(isActive({
//             location: state.pathname,
//             path: submenuitem.path
//           })
//             ? { active: true }
//             : {})}>
//           <MenuText item={submenuitem} state={state} />
//         </MenuItem>
//       )
//     )}
//   </SubMenu>
// );

function Sidebar(props) {
  const history = useHistory();
  const state = useLocation();

  const onChangeMenu = (newMenuItem) => {
    history.push(`/bo/${newMenuItem.menuSlug}`);
    // history.push(newMenuItem.path);
  };

  const getIcon = (findIcon) => {
    try {
      const icon = icons.find((icon) => icon.code == findIcon);
      return icon.svg;
    } catch (error) {
      return null;
    }
  };

  const listmenu = useSelector((state) => state.Auth.Backoffice.menu);
  return (
    <Wrapper>
      <ProSidebar collapsed={props.collapse}>
        <Menu iconShape='square'>
          {listmenu &&
            listmenu.length == 1 &&
            listmenu[0]?.headers.map((menuitem, index) =>
              menuitem.menus && menuitem.menus.length > 0 ? (
                <SubMenuComponent
                  key={index}
                  getIcon={getIcon}
                  menuitem={menuitem}
                  iconSidebar={iconSidebar}
                  state={state}
                  onChangeMenu={onChangeMenu}
                />
              ) : (
                <MenuItem
                  key={index}
                  icon={getIcon(menuitem.icon)}
                  onClick={() => onChangeMenu(menuitem)}
                  {...(isActive({
                    location: state.pathname,
                    path: menuitem.menuSlug
                  })
                    ? { active: true }
                    : {})}>
                  <MenuText item={menuitem} state={state} />
                </MenuItem>
              )
            )}
        </Menu>
        {/* <Menu iconShape='square'>
          {sideBarProtectedRoutes.map((menuitem, index) =>
            menuitem.children && menuitem.children.length > 0 ? (
              <SubMenuComponent
                key={index}
                menuitem={menuitem}
                iconSidebar={iconSidebar}
                state={state}
                onChangeMenu={onChangeMenu}
              />
            ) : (
              <MenuItem
                key={index}
                icon={iconSidebar[menuitem.name]}
                onClick={() => onChangeMenu(menuitem)}
                {...(isActive({
                  location: state.pathname,
                  path: menuitem.path
                })
                  ? { active: true }
                  : {})}>
                <MenuText item={menuitem} state={state} />
              </MenuItem>
            )
          )}
        </Menu> */}
      </ProSidebar>
    </Wrapper>
  );
}

export default Sidebar;
