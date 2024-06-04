import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Box
} from '@chakra-ui/react';
import { v4 } from 'uuid';
const Item = () => {
  return (
    <svg
      width='18'
      height='5'
      viewBox='0 0 18 5'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M3.03834 4.6789C4.22126 4.6789 5.18019 3.72594 5.18019 2.55039C5.18019 1.37484 4.22126 0.421875 3.03834 0.421875C1.85543 0.421875 0.896484 1.37484 0.896484 2.55039C0.896484 3.72594 1.85543 4.6789 3.03834 4.6789Z'
        fill='#B0B0B0'
      />
      <path
        d='M9.44851 4.6789C10.6314 4.6789 11.5904 3.72594 11.5904 2.55039C11.5904 1.37484 10.6314 0.421875 9.44851 0.421875C8.26559 0.421875 7.30664 1.37484 7.30664 2.55039C7.30664 3.72594 8.26559 4.6789 9.44851 4.6789Z'
        fill='#B0B0B0'
      />
      <path
        d='M15.8587 4.6789C17.0416 4.6789 18.0005 3.72594 18.0005 2.55039C18.0005 1.37484 17.0416 0.421875 15.8587 0.421875C14.6757 0.421875 13.7168 1.37484 13.7168 2.55039C13.7168 3.72594 14.6757 4.6789 15.8587 4.6789Z'
        fill='#B0B0B0'
      />
    </svg>
  );
};

const ThreePoints = ({ actions = [], sala }) => {
  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label='Options'
          icon={<Item />}
          variant='gosht'
        />
        <MenuList>
          {actions.map((item) => (
            <MenuItem
              key={v4()}
              icon={item.icon}
              command={item.command}
              onClick={() => item.action(sala)}>
              {item.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default ThreePoints;
