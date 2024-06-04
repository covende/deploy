import React, { useEffect, useRef, useState } from 'react';
import Filters from '@/app/components/Filters';
import CategoriesPanel from './CategoriesPanel';
import { Flex } from '@chakra-ui/react';
import { CVPanel } from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CategoryFilterStyle } from './_styles';
import { SCREEN } from '@CVTemplate/core/CVThemes';
import { AddsSpace } from '../AddsSpace';

function Filtros({
  category,
  filtro,
  setfiltro,
  fetchdata,
  setblug,
  blug,
  setHeaders,
  refGrid = null
}) {
  const reff = useRef(null);
  const [position, setposition] = useState('relative');
  const [width, setwidth] = useState('100%');
  const [top, settop] = useState(null);
  const [initial, setinitial] = useState({
    width: '100%',
    top: ''
  });
  const isSticky = (e) => {
    if (refGrid?.current != null) {
      let posGrid = refGrid.current.getBoundingClientRect();
      setwidth(initial.width);
      if (posGrid.bottom > 561) {
        setposition(window.screen.width < SCREEN.xs.max ? 'relative' : 'fixed');
        settop(initial.top);
      } else {
        settop(null);
        setposition('absolute');
      }
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  });
  useEffect(() => {
    if (refGrid?.current != null) {
      let pos = refGrid.current.getBoundingClientRect();
      let posReff = reff.current.getBoundingClientRect();
      console.log(posReff.top);
      setinitial({
        width: pos.width,
        // top: posReff.top
        top: 230
      });
    }
    return () => {
      setinitial({
        width: '100%',
        top: ''
      });
    };
  }, [reff, refGrid]);
  return (
    <CategoryFilterStyle
      ref={(ref) => (reff.current = ref)}
      width={width}
      position={position}
      top={top}>
      <CategoriesPanel
        setblug={setblug}
        category={category}
        blug={blug}
        setHeaders={setHeaders}
        setfiltro={setfiltro}
      />
      <SizeBox />
      <CVPanel variant='box' height='auto'>
        <Filters
          category={category}
          filtro={filtro}
          blug={blug}
          setfiltro={setfiltro}
          fetchdata={fetchdata}
        />
      </CVPanel>
      <AddsSpace />
      <SizeBox />
    </CategoryFilterStyle>
  );
}

export default Filtros;
