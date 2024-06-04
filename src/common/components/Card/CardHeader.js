import styled from '@emotion/styled';

import themeCovende from '@/themeCovende';

const CardHeader = styled.h3`
  display: block;
  flex: 0 0 auto;
  margin: 0;
  padding: 16px;
  background: ${({ color }) => themeCovende.palette[color || 'default'].main};
  color: ${({ color }) =>
    themeCovende.palette[color || 'default'].contrastText};
  font-weight: ${({ fontWeight }) => fontWeight || '500'};
  font-size: ${({ fontSize }) => fontSize || '18px'};
  text-align: ${({ textAlign }) => textAlign || 'left'};
  letter-spacing: 0.0075em;
  border-radius: 10px 10px 0px 0px;
`;
export default CardHeader;
