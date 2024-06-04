import React from 'react';
import CVRatingBars from './CVRating/CVRatingBars';
import CVRatingSimple from './CVRating/CVRatingSimple';
import CVRatingStars from './CVRating/CVRatingStars';
import { COLORS } from './CVThemes';

/**
 *
 * @param {Object} param0
 * @param {('stars' | 'bars' | 'simple')} param0.variant
 * @param {String} param0.height
 * @param {Number} param0.puntuation
 * @param {Number} param0.precision
 * @param {Boolean} param0.readOnly
 * @param {Function} param0.onChange
 * @param {Object} param0.totales
 * @param {String} param0.totales.label
 * @param {String} param0.totales.percentage
 * @param {String} param0.marginStar
 * @param {('primary' | 'skyblue' | 'blue' | 'red' | 'yellow' | 'green' | 'gray' | 'white' | 'black' | 'lightGray')} param0.color
 * @returns
 */
function CVRating({
  variant = 'stars' || 'bars' || 'simple',
  height = '1.5rem',
  color = 'yellow',
  puntuation = 2.5,
  precision = 0.1,
  readOnly = true,
  onChange = () => {},
  totales,
  marginStar = '0px',
  custom = {}
}) {
  let variants = {
    stars: (
      <CVRatingStars
        height={height}
        puntuation={puntuation}
        precision={precision}
        readOnly={readOnly}
        onChange={onChange}
        color={COLORS[color]}
        marginStar={marginStar}
      />
    ),
    bars: (
      <CVRatingBars
        totales={totales}
        height={height}
        color={COLORS[color]}
        custom={custom}
      />
    ),
    simple: <CVRatingSimple puntuation={puntuation} color={COLORS[color]} />
  };
  return variants[variant];
}

export default CVRating;
