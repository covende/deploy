import React from 'react';
import { shape } from 'prop-types';
import Styled from 'rsg-components/Styled';

import { useStyleGuideContext } from 'rsg-components/Context';

const propTypes = {
  classes: shape().isRequired,
};

const styles = ({ color, fontFamily, fontSize }) => ({
  root: {
    fontFamily: fontFamily.base,
    fontSize: fontSize.base,
    color: color.base,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const ThemeSwitcher = ({ classes }) => {
  const { brand, setBrand } = useStyleGuideContext();
  const onBrandChange = (e) => setBrand(e.target.value);

  const brands = ['brand1', 'brand2'];

  return (
    <label className={classes.root}>
      Brand
      <select value={brand} onBlur={onBrandChange} onChange={onBrandChange}>
        {brands.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>
    </label>
  );
};

ThemeSwitcher.propTypes = propTypes;

export default Styled(styles)(ThemeSwitcher);
