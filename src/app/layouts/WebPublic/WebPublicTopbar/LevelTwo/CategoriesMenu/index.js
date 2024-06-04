import {
  categoriesHome,
  categoryProductsList
} from '@/app/api/graphql/categories/services/categoryservice';
import { A_CATEGORYPRODUCTS } from '@/app/main/bo/arborescencia-de-categorias/redux/Action';
import arrayToTree from 'array-to-tree';
import React, { useEffect, useState } from 'react';
import { ReactMegaMenu } from 'react-mega-menu';
import { useDispatch, useSelector } from 'react-redux';

import { DataMenus } from './dataHTML';

function CategoriesMenu({ onMouseLeave, seemenu, setseemenu }) {
  const { categorys, treecategorys, loading } = useSelector(
    (state) => state.CategoryProducts
  );
  const dispatch = useDispatch();
  const [menus, setMenus] = useState([]);

  const initdata = async () => {
    if (
      (categorys.length == 0 || treecategorys.length == 0) &&
      (!loading || seemenu)
    ) {
      // const data = await categoryProductsList(true);
      const anotherData = await categoriesHome();

      const tree = arrayToTree(anotherData, {
        parentProperty: 'parent_id',
        customID: '_id'
      });

      dispatch(
        A_CATEGORYPRODUCTS({ treecategorys: tree, categorys: anotherData })
      );
      setMenus(DataMenus(tree, setseemenu, seemenu));

      // setMenus(tree);
      // DataMenus(setseemenu, seemenu);
    } else {
      if (menus.length == 0) setMenus(DataMenus(treecategorys, setseemenu));
    }
  };
  useEffect(() => {
    initdata();
  }, [loading, seemenu]);

  return (
    <ReactMegaMenu
      tolerance={50}
      direction={'RIGHT'}
      styleConfig={{
        // menuProps: {
        //   style: {
        //     height: '100%',
        //     width: '25%',
        //     padding: '0px',
        //     margin: '0'
        //   }
        // },
        contentProps: {
          style: {
            width: '75%',
            padding: '1rem'
          }
        },
        menuItemProps: {
          style: {
            fontSize: '1rem',
            width: '308px',
            height: '3rem',
            color: '#000000',
            paddingLeft: '1rem',
            paddingTop: '5px',
            paddingBottom: '5px'
          }
        },
        menuItemSelectedProps: {
          style: {
            fontWeight: 'bold',
            fontSize: '1rem',
            paddingLeft: '1rem',
            height: '3rem',
            // width: '308px',
            // width: '100%',
            backgroundColor: '#00ADF620',
            color: '#00ADF6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start'
          }
        },
        containerProps: {
          style: {
            // width: '100%',
            maxWidth: '1254px',
            backgroundColor: 'white',
            padding: '0px',
            position: 'fixed',
            boxShadow: '0 10px 10px #00000030',
            maxHeight: '550px',
            overflowY: 'auto',
          }
        }
      }}
      onExit={(e) => {
        // console.log('on exist');
        // console.log(e);
        // onMouseLeave();
      }}
      data={menus}
    />
  );
}

export default CategoriesMenu;
