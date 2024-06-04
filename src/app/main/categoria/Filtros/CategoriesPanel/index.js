import { SUB_CATEGORIES_PUBLIC } from '@/app/api/graphql/webpublic/category/CategoryService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVPanel, CVText } from '@/common/CovendeTemplate';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles
} from '@material-ui/core';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { Fragment, useEffect, useState } from 'react';
import { CategoriesItem } from './_styles';
import arrayToTree from 'array-to-tree';
import { initfiltro } from '@CVPages/core/tienda/Productos';

const useStyles = makeStyles({
  ExteriorBox: {
    paddingLeft: '15%',
    width: '150%'
  },

  Box: {
    textTransform: 'capitalize',
    marginBottom: '6%',
    '&:hover': {
      color: COLORS.skyblue
    }
  },
  MuiAccordionroot: {
    '&.MuiAccordion-root:before': {
      backgroundColor: 'white'
    }
  }
});

function CategoriesPanel({
  category,
  setblug,
  hide,
  allCategorysStore,
  blug,
  setHeaders,
  setfiltro
}) {
  const [categorys, setcategorys] = useState([]);
  const [nested, setNested] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const classes = useStyles();

  const initdata = async () => {
    let tree = [];

    tree = arrayToTree(allCategorysStore || [], {
      parentProperty: 'parent_id',
      customID: '_id'
    });
    if (hide) {
      const newdata = allCategorysStore.map((item) => {
        let data = [];
        if (item.parent_id == category._id) {
          data['_id'] = item._id;
          data['parent_id'] = item.parent_id;
          data['name'] = item.name;
          data['slug'] = item.slug;
        }
        return data;
      });

      setNested(newdata);
      setcategorys(allCategorysStore);
    } else {
      const { subcategoriesPublic } = await AxiosGQL(
        SUB_CATEGORIES_PUBLIC(category?._id, true)
      );
      tree = arrayToTree(subcategoriesPublic?.categories || [], {
        parentProperty: 'parent_id',
        customID: '_id'
      });
      setNested(tree);
      setcategorys(subcategoriesPublic?.categories || []);
    }
  };

  const changeCategory = (category) => {
    if (category._id == blug) return;

    if (category?.parents?.length > 0) {
      let headers = category.parents.map((h) => ({
        text: h.name,
        uri: h.slug
      }));
      headers.unshift({ text: 'inicio', uri: '/' });
      setHeaders(headers);
    }
    setfiltro(initfiltro);
    setblug(category._id);
  };

  useEffect(() => {
    setcategorys([]);
    setNested([]);
    initdata();
  }, [category?._id]);
  return (
    <Fragment>
      {nested.length > 0 && (
        <CVPanel variant='box' height='auto'>
          {hide ? (
            ''
          ) : (
            <>
              <CVText fontWeight='bold' fontSize='1.5rem' color='blue'>
                Subcategorías
              </CVText>
              <SizeBox />
            </>
          )}

          {nested.map(
            (cat, index) =>
              cat._id && (
                <Accordion
                  elevation={0}
                  classes={{
                    root: classes.MuiAccordionroot
                  }}
                  key={index}
                  expanded={expanded === index}
                  onChange={(event, isExpanded) =>
                    (cat.children || []).length > 0
                      ? setExpanded(isExpanded ? index : false)
                      : {}
                  }>
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon
                        style={{
                          fill:
                            (cat.children || []).length > 0
                              ? COLORS.blue
                              : COLORS.white,
                          fontSize: 30
                        }}
                      />
                    }
                    id='panel1a-header'>
                    <span
                      onClick={() => changeCategory(cat)}
                      style={{
                        textTransform: 'capitalize',
                        color: blug == cat._id ? COLORS.skyblue : COLORS.black
                      }}>
                      {cat.name}
                    </span>
                  </AccordionSummary>

                  {(cat.children || []).length > 0 && (
                    <AccordionDetails>
                      <CategoriesItem>
                        {(cat.children || []).map((catChild, index) => (
                          <Box className={classes.ExteriorBox} key={index}>
                            {catChild.parent_id == cat._id && (
                              <Box
                                onClick={(e) => changeCategory(catChild)}
                                style={{}}
                                className={classes.Box}
                                color={
                                  blug == catChild._id
                                    ? COLORS.skyblue
                                    : COLORS.black
                                }>
                                {catChild.name}
                              </Box>
                            )}
                          </Box>
                        ))}
                      </CategoriesItem>
                    </AccordionDetails>
                  )}
                </Accordion>
              )
          )}
        </CVPanel>
      )}
    </Fragment>
  );
}

export default CategoriesPanel;
