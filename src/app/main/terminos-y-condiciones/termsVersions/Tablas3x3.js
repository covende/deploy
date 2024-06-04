// TablaPersonalizada.jsx
import React from 'react';

const TablaPersonalizada = ({ contenidoCeldas }) => {
  return (
    <table style={{  width: '60%', borderCollapse: 'collapse', marginBottom: '60px', margin: '0 auto', border: '1px solid #050505',  }}>
      <tbody>
        {contenidoCeldas.map((fila, rowIndex) => (
          <tr key={rowIndex}>
            {fila.map((texto, colIndex) => (
              <td key={colIndex} style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center', }}>
                {texto}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaPersonalizada;


