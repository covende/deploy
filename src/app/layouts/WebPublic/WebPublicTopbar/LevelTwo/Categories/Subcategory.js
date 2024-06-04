import React from 'react';
import { Link } from 'react-router-dom';

function Subcategory(props) {
  const { data } = props;
  return (
    <>
      <span
        style={{
          fontStyle: 'normal',
          fontWeight: 'bold',
          fontSize: '18px',
          lineHeight: '27px',
          letterSpacing: '-0.01em'
        }}
      >
        {data.title}
      </span>
      <ul className='content' style={{ position: 'relative' }}>
        {data.sections.length ? (
          data.sections.map((section, index) => (
            <li id={`section-${index}`} key={`section-${index}`}>
              <Link to={section.route}>
                <span>{section.name}</span>
              </Link>
            </li>
          ))
        ) : (
          <li> No hay secciones </li>
        )}
      </ul>
    </>
  );
}

export default Subcategory;
