import React, { useEffect, useState } from 'react';
import CVSwitchCapsule from './CVSwitch/CVSwitchCapsule';
import CVSwitchOption from './CVSwitch/CVSwitchOption';
import CVSwitchSimple from './CVSwitch/CVSwitchSimple';
import CVSwitchWithText from './CVSwitch/CVSwitchWithText';
import { FONTSIZE, FONTSIZE_DEFAULT } from './CVThemes';

/**
 *
 * @param {Object} param0
 * @param {Boolean} param0.value
 * @param {Function} param0.onChange
 * @param {String} param0.height
 * @param {String} param0.fontSize
 * @param {('simple' | 'withtext' | 'capsule' | 'option')} param0.variant
 * @param {String} param0.yesText
 * @param {String} param0.noText
 * @param {('green' | 'skyblue' | 'blue' | 'red' | 'yellow' | 'primary' | 'gray' | 'white' | 'black')} param0.yesColor
 * @param {('red' | 'skyblue' | 'blue' | 'primary' | 'yellow' | 'green' | 'gray' | 'white' | 'black')} param0.noColor
 * @returns
 */
function CVSwitch({
  value = false,
  onChange = (e) => {},
  height = '1.5rem',
  fontSize = '1rem',
  variant = 'simple' || 'withtext' || 'capsule' || 'option',
  yesText = 'SI',
  noText = 'NO',
  yesColor = 'green' ||
    'skyblue' ||
    'blue' ||
    'red' ||
    'yellow' ||
    'primary' ||
    'gray' ||
    'white' ||
    'black',
  noColor = 'red' ||
    'skyblue' ||
    'blue' ||
    'primary' ||
    'yellow' ||
    'green' ||
    'gray' ||
    'white' ||
    'black'
}) {
  const rtp = (rem) =>
    parseFloat(rem) * parseFloat(FONTSIZE) * parseFloat(FONTSIZE_DEFAULT) +
    'px';

  height = height.toString().includes('em') ? rtp(height) : height;

  const [valor, setvalor] = useState(true);
  useEffect(() => {
    if (value != valor) {
      setvalor(value);
    }
  }, [value]);

  let variants = {
    simple: (
      <CVSwitchSimple
        value={valor}
        onChange={(value) => onChange(value)}
        height={height}
        fontSize={fontSize}
        yesText={yesText}
        noText={noText}
        yesColor={yesColor}
        noColor={noColor}
      />
    ),
    withtext: (
      <CVSwitchWithText
        value={valor}
        onChange={(value) => onChange(value)}
        height={height}
        fontSize={fontSize}
        yesText={yesText}
        noText={noText}
        yesColor={yesColor}
        noColor={noColor}
      />
    ),
    capsule: (
      <CVSwitchCapsule
        value={valor}
        onChange={(value) => onChange(value)}
        height={height}
        fontSize={fontSize}
        yesText={yesText}
        noText={noText}
        yesColor={yesColor}
        noColor={noColor}
      />
    ),
    option: (
      <CVSwitchOption
        value={valor}
        onChange={(value) => onChange(value)}
        height={height}
        fontSize={fontSize}
        yesText={yesText}
        noText={noText}
        yesColor={yesColor}
        noColor={noColor}
      />
    )
  };

  return variants[variant];
}

export default CVSwitch;
