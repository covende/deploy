// Styles
import styled from '@emotion/styled';

/**
 * Container of DatosCovendeBo
 *
 * ### Usage
 *
 * ```
 * import DatosCovendeBoContainer from 'DatosCovendeBo.styles.js'
 * ```
 *
 * @component
 * @category Pages
 */
export const DatosCovendeBoContainer = styled.div`
  margin: ${({ margin }) => margin || '8px 0px 0px 0px'};
  // padding: ${({ padding }) => padding || '16px'};
  width: ${({ width }) => width || '100%'};
  // background-color: ${({ color }) => color || '#fff'};
  box-sizing: border-box;
`;
