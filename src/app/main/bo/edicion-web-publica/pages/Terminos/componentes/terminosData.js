import React from 'react'
import { PencilAltIcon,Trash } from '@/app/assets/icons/index';
import {Flex,Button} from '@chakra-ui/react/';
import { from } from '@/../node_modules/rxjs/index';
import { CVDateFormat } from '@CVPages/core/admin/seller/estadisticas/components/MVendidosUtils';
import actions from '@/app/redux/Auth/actions';


export const HeaderTerminos = [
    { data: '_id', label: 'ID', first: true },
    { data: 'contents', label: 'contenido' },
    { data: 'createdAt', label: 'Fecha de Creación' },
    { data: 'updatedAt', label: 'Fecha de Actualización', last: true }
  ];

  export const rows =(list,actions)=>{
    return list.map((item) =>{
      return{
        _id: item._id ||'',
        contents:item.contents ||'',
        createAt:CVDateFormat(new Date(item.createAt)),
        updateAt:CVDateFormat(new Date(item.updateAt)),
        actions:(
          <Flex>
            <Button
              variant='link'
              onClick={() => actions.edit(item._id,item.contents)}>
              {PencilAltIcon}
            </Button>
            <Button variant='link' onChage={() => actions.deleteContents(item._id)}>
              {Trash}
            </Button>
          </Flex>
        )
      };
    });
  };
  // export const rows= (lists)=> lists.map((item)=>({
  //   _id: item._id,
  //   contents:item.contents,
  //   createdAt:item.createdAt,
  //   updatedAt: item.updatedAt
  // }))

  