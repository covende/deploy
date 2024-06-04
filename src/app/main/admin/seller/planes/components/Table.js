import React from 'react';

// UI components
import { v4 } from 'uuid';

// Styles
import { HeaderView, SubHeaderView } from './Table.styles';
import { Box, Heading } from '@chakra-ui/react';
import { CVButton } from '@CVTemplate/core/index';
import { Link } from 'react-router-dom';
import { DataPlans } from './DataPlans';
// Table filters advanced
function Table({ listPlan }) {
  return (
    <div>
      <HeaderView>
        <SubHeaderView>
          <Heading fontWeight='bold' fontSize='26px'>
            Mi suscripción
          </Heading>
        </SubHeaderView>
      </HeaderView>
      <Box my={5}>
        <Link to='/seller/seleccionar_plan'>
          <CVButton
            fontSize='14px'
            fontWeight='600'
            width='25%'
            color='white'
            backgroundColor='green'>
            COMPRAR UN PLAN
          </CVButton>
        </Link>
      </Box>
      {/* New Table Plans */}
      {(listPlan || []).map((plan, index) => (
        <DataPlans key={v4()} expand={!!(index === 0)} plan={plan} />
      ))}
      {/* <Box
        bg='white '
        border='1px'
        borderColor='#004772'
        borderLeftColor='#004772'
        borderLeftWidth='15px'
        borderRadius='12px'>
        <CVDataTable
          headers={inputColumns}
          data={inputData}
          hideheaders={true}
          ExpandData={ExpandData}
          firstItemExpanded={true}
        />
      </Box> */}
    </div>
  );
}

export default Table;
