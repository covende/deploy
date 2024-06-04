export const GET_MENUS = (type = 'Backoffice' | 'vender' | 'comprar') => {
  return `
  {
    menus(typeDashboard: "${type}") {
      menuID
      menuName
      menuSlug
      icon
      parentID
    	platformID
    	typeDashboard
      position
    }
  }
  `;
};

const getAutoTab = (index) => {
  if (index === 0) {
    return `
          typeDashboard: "Backoffice"
          platformID: "PBO"
      `;
  } else if (index === 1) {
    return `
          typeDashboard: "Vender"
          platformID: "PBS"
      `;
  } else {
    return `
          typeDashboard: "Comprar"
          platformID: "PBS"
      `;
  }
};
export const ADD_MENU = (menuData, ndx) => {
  return `mutation {
    addMenu(
      menuName: "${menuData.menuName}"
      alias: "${menuData.aliasMenu}"
      ${getAutoTab(ndx)}
      icon: "${menuData.icon}"
      parentID: "${menuData.parentID}"
      position: ${menuData.positionMenu}
    ) {
      status
      message
      menu {
        menuID
        menuName
        menuSlug
        alias
        icon
        platformID
        typeDashboard
        parentID
        position
      }
    }
  }`;
};

export const UPDATE_MENU = (
  { menuName, aliasMenu, icon, positionMenu, parentID, menuID },
  ndx
) => `
mutation {
  updateMenu(
    menuID: "${menuID}"
    menuName: "${menuName}"
    alias: "${aliasMenu}"
    icon: "${icon}"
    ${getAutoTab(ndx)}
    parentID: "${parentID}"
    position: ${positionMenu}
  ) {
    status
    message
    menu {
      menuID
      menuName
      menuSlug
      alias
      icon
      platformID
      typeDashboard
      parentID
      position
    }
  }
}
`;

export const DELETE_MENU = ({ menuID }) => `
mutation {
  deleteMenu(menuID: "${menuID}") {
    status
    message
    menu {
      menuName
    }
  }
}
`;
