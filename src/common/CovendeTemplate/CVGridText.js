import React, { useEffect } from 'react';
import { v4 } from 'uuid';
import { CVText } from '.';

/**
 *
 * @param {Object} param0
 * @param {[{title:String, content:String }]} param0.options
 * @param {('white' | 'primary' | 'skyblue' | 'blue' | 'red' | 'yellow' | 'green' | 'gray' | 'black')} param0.titleColor
 * @param {('normal'|'bold')} param0.titleWeight
 * @param {('white' | 'primary' | 'skyblue' | 'blue' | 'red' | 'yellow' | 'green' | 'gray' | 'black')} param0.contentColor
 * @param {('normal'|'bold')} param0.contentWeight
 * @param {('start' | 'center' | 'end')} param0.titleAlign
 * @param {('start' | 'center' | 'end')} param0.contentAlign
 * @param {String} param0.width
 * @param {String} param0.maxWidth
 * @param {String} param0.padding
 * @returns
 */
function CVGridText({
  options,
  titleColor = 'blue',
  titleWeight = 'bold',
  contentColor = 'black',
  contentWeight = 'normal',
  titleAlign = 'start',
  contentAlign = 'start',
  width = '100%',
  maxWidth = '100%',
  padding = '0px'
}) {
  const RowData = ({ title, content }) => (
    <tr>
      <td style={{ padding }}>
        <CVText
          fontWeight={titleWeight}
          color={titleColor}
          textAlign={titleAlign}>
          {title}
        </CVText>
      </td>
      <td style={{ padding }}>
        <CVText
          fontWeight={contentWeight}
          color={contentColor}
          textAlign={contentAlign}>
          {content}{' '}
        </CVText>
      </td>
    </tr>
  );

  useEffect(() => {}, []);
  return (
    <table style={{ width, maxWidth }}>
      <tbody>
        {options.map((item) => (
          <RowData key={v4()} title={item.title} content={item.content} />
        ))}
      </tbody>
    </table>
  );
}

export default React.memo(CVGridText);
