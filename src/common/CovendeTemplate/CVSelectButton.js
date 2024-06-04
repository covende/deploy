import { Menu, MenuItem, Button } from '@material-ui/core';
import React from 'react';
import { BsChevronDown } from 'react-icons/bs';
import { v4 } from 'uuid';
import { COLORS } from './CVThemes';

/**
 *
 * @param {Object} param0
 * @param {[{action:Function, label:any, disabled:Boolean}]} param0.actions
 * @returns
 */
function CVSelectButton({ actions = [] }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const backgroundColor =
    COLORS[location.href.toString().includes('buyer') ? 'red' : 'blue'];
  return (
    <div>
      <Button
        style={{ padding: '0px', borderRadius: '10px' }}
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}>
        <div style={{ display: 'flex', borderRadius: '10px' }}>
          <div
            style={{
              display: 'flex',
              width: '100%',
              backgroundColor: backgroundColor,
              color: '#FFFFFF',
              paddingLeft: '10px',
              borderTopLeftRadius: '10px',
              borderBottomLeftRadius: '10px'
            }}>
            Acción
          </div>
          <div
            style={{
              color: '#FFFFFF',
              backgroundColor: '#004772',
              width: '25px',
              borderTopRightRadius: '10px',
              borderBottomRightRadius: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <BsChevronDown style={{ fontSize: '1rem' }} />
          </div>
        </div>
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        {actions.map((item) => (
          <MenuItem
            key={v4()}
            onClick={() => item.action()}
            disabled={item.disabled || false}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default CVSelectButton;
