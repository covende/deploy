import { Box } from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { COLORS } from './CVThemes';

const styles = (color) => ({
  color: COLORS[color],
  textDecoration: 'none',
  textDecorationStyle: 'none',
  cursor: 'pointer'
});

/**
 *
 * @param {Object} param0
 * @param {('path'|'location'|'_blank')} param0.target
 * @param {React.ReactHTMLElement} param0.text
 * @param {String} param0.color
 * @param {String} param0.href
 * @returns
 */
function CVLink({ target = 'path', text, href, color = 'primary', children }) {
  const history = useHistory();

  const goto = () => {
    if (target == 'path') {
      history.push(href);
    } else {
      location.href = href;
    }
  };

  return target == '_blank' ? (
    <a target='_blank' href={href} style={styles(color)}>
      {text}
      {children}
    </a>
  ) : (
    <Box style={styles(color)} onClick={() => goto()} color={COLORS[color]}>
      {text}
      {children}
    </Box>
  );
}

export default CVLink;
