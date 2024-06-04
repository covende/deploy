import React, { useState, useEffect } from 'react';
import { Flex, Text, Box } from '@chakra-ui/react/';
import CVSelect from '@CVTemplate/core/CVSelect';
import { categoryProductsList } from '@CVApi/core/categories/services/categoryservice';
import arrayToTree from 'array-to-tree';

export function FilterSeller({ filtro, setfiltro }) {
  const [categories, setCategories] = useState();
  const [subCategories, setSubCategories] = useState([]);
  useEffect(() => {
    categoryProductsList()
      .then((res) => {
        if (res) {
          const tree = arrayToTree(res, {
            parentProperty: 'parent_id',
            customID: '_id'
          });
          const showItems =
            tree && tree.filter((element) => element.status != false);
          const transformItemsToSelect =
            showItems &&
            showItems.map(
              (item, ndx) =>
                (showItems[ndx] = { ...item, text: item.name, value: item._id })
            );
          setCategories(transformItemsToSelect);
          return showItems;
        }
      })
      .then((showItems) => {
        console.log(typeof showItems);
        let asd = [];
        showItems.map(({ children }, ndx) => {
          if (children) {
            asd = [...asd, ...children];
          }
        });
        let showSubcategory = [];
        asd.map((item, ndx) => {
          if (item) {
            showSubcategory[ndx] = {
              ...item,
              text: item.name,
              value: item._id
            };
          }
        });
        setSubCategories(showSubcategory);
      })
      .catch((error) => console.error(error));
  }, []);

  const type_of_sales = [
    {
      text: 'Por mayor',
      value: 'wholesale'
    },
    {
      text: 'Por menor',
      value: 'retail'
    },
    {
      text: 'Por Ambos',
      value: 'both'
    }
  ];
  const rank = [
    {
      text: '5 mejores',
      value: 'best'
    },
    {
      text: '5 peores',
      value: 'worst'
    }
  ];
  return (
    <Flex>
      <Box w='100%'>
        <Text>Todas las categorías</Text>
        <CVSelect
          options={categories && categories}
          value={filtro.idCategoryFilter || ''}
          onChange={(value) =>
            setfiltro({
              ...filtro,
              idCategoryFilter: value
            })
          }
        />
      </Box>
      <Box w='100%' ml='1rem'>
        <Text>Todas las subcategorías</Text>
        <CVSelect
          options={subCategories && subCategories}
          value={filtro.idSubCategoryFilter || ''}
          onChange={(value) =>
            setfiltro({
              ...filtro,
              idSubCategoryFilter: value
            })
          }
        />
      </Box>
      <Box w='100%' ml='1rem'>
        <Text>Tipo de venta</Text>
        <CVSelect
          options={type_of_sales}
          value={filtro.type_sales || ''}
          onChange={(value) => setfiltro({ ...filtro, type_sales: value })}
        />
      </Box>
      <Box w='100%' ml='1rem'>
        <Text>Ranking</Text>
        <CVSelect
          options={rank}
          value={filtro.rank || ''}
          onChange={(value) => setfiltro({ ...filtro, rank: value })}
        />
      </Box>
    </Flex>
  );
}
