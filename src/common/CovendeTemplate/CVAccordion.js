import { chevbronDown, chevbronUp } from '@/app/assets/icons';
import React, { useState } from 'react';

/**
 *
 * @param {Object} param0
 * @param {React.ReactComponentElement} param0.title
 * @param {React.ReactComponentElement} param0.content
 * @returns
 */
const CVAccordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className='accordion-item'>
      <div
        className='accordion-title'
        onClick={() => setIsActive(!isActive)}
        style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>{title}</div>
        <div>{isActive ? chevbronDown : chevbronUp}</div>
      </div>
      {isActive && <div className='accordion-content'>{content}</div>}
    </div>
  );
};

export default CVAccordion;
