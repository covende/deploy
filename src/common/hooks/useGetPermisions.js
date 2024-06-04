import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function useGetPermisions(user = 'Vender' || 'Comprar', menuName) {
  const listmenuBO = useSelector((state) => state.Auth.Backoffice.menu);
  const listmenuBS = useSelector((state) => state.Auth.BuyerSeller.menu);
  const [crear, setCrear] = useState(false);
  const [editar, setEditar] = useState(false);
  const [eliminar, setEliminar] = useState(false);
  const [ver, setVer] = useState(false);
  const listMenu = listmenuBO == null ? listmenuBS : listmenuBO;

  useEffect(() => {
    try {
      const type = listMenu
        ? listMenu.length == 1
          ? listMenu[0].typeDashboard
          : 'Vender'
        : user;
      // listMenu && listMenu.length == 1
      //   ? listMenu[0].typeDashboard == 'Comprar'
      //     ? 'Comprar'
      //     : 'Backoffice'
      //   : user;

      const typeMenu = listMenu.find((found) => found.typeDashboard === type);
      const { permissions } = typeMenu?.headers.find(
        (found) => found.menuName === menuName
      );

      permissions.map(({ name }) => {
        switch (name) {
          case 'ver':
            setVer(true);
            break;
          case 'crear':
            setCrear(true);
            break;
          case 'editar':
            setEditar(true);
            break;
          case 'eliminar':
            setEliminar(true);
            break;
          default:
            break;
        }
      });
    } catch (error) {
      console.log('Error en GP', error);
    }
  }, [listMenu]);

  return {
    crear,
    editar,
    eliminar,
    ver
  };
}

export default useGetPermisions;
