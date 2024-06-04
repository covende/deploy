import React, { useState, useEffect } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex } from '@chakra-ui/react';
import FormUsers from './FormUsers';
import FormStore from './FormStore';
import FormPayment from './FormPayment';
import { labelTabs } from './utils';
import { useParams } from 'react-router';
import CVTooltip from '@/common/CovendeTemplate/CVTooltip';
import { fromBase64 } from '@/common/CovendeTemplate/CVCardProduct/CVCardProductMethod';
import { AiOutlineLike } from 'react-icons/ai';

const CustomTab = ({ tools, ...props }) => {
  const [tooltipShown, setTooltipShown] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    let timeout;
    if (hovered && !tooltipShown) {
      timeout = setTimeout(() => {
        setTooltipShown(true);
      }, 200);
    }
    return () => clearTimeout(timeout);
  }, [hovered, tooltipShown]);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <Tab
      {...props}
      height='4rem'
      fontSize='1rem'
      fontWeight='bold'
      rounded='16px 16px 0px 0px'
      bg='#ABABAB'
      color='#ffffff'
      _selected={{
        color: '#004f80',
        borderImage:
          'linear-gradient(to bottom, rgba(0,0,0,0) 25%, #00ADF6 25%, #00ADF6 75%, rgba(0,0,0,0) 75%)',
        borderImageSlice: '1',
        borderLeft: '8px solid #00ADF6',
        bg: '#FFFFFF'
      }}
      _focus={{ borderColor: 'transparent' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <CVTooltip
        icon={<AiOutlineLike style={{ fontSize: '3rem' }} />}
        disabled={tools || false}
        isOpen={tooltipShown && !(tools || false)}
        title={
          !(tools || false)
            ? 'Estos campos se habilitarán cuando confirmes tu correo electrónico.'
            : ''
        }
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <Flex
          width='100%'
          height='100%'
          justifyContent='center'
          alignItems='center'>
          {props.children}
        </Flex>
      </CVTooltip>
    </Tab>
  );
};

function TabsUI({ docs, tabIndex }) {
  const { user_id, store_id } = useParams();
  let iduser = fromBase64(user_id);
  let idstore = fromBase64(store_id);
  return (
    <Tabs
      isLazy
      isFitted
      variant='enclosed'
      index={tabIndex || 0}
      margin='auto'
      height='100%'
      padding='16px'>
      <TabList>
        <CustomTab tools={tabIndex == 0}>
          {labelTabs.DATOS_DE_USUARIO}
        </CustomTab>
        <CustomTab tools={tabIndex == 1}>
          {labelTabs.DATOS_DE_TU_NEGOCIO}
        </CustomTab>
        <CustomTab tools={tabIndex == 2}>{labelTabs.PAGA_Y_ACTIVA}</CustomTab>
      </TabList>
      <TabPanels bg='white' rounded='0px 0px 10px 10px'>
        <TabPanel>{tabIndex == 0 && <FormUsers docs={docs} />}</TabPanel>
        <TabPanel>
          {tabIndex == 1 && <FormStore user_id={iduser} docs={docs} />}
        </TabPanel>
        <TabPanel>
          {tabIndex == 2 && <FormPayment user_id={iduser} store_id={idstore} />}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default TabsUI;