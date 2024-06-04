import styled from '@emotion/styled';

const CardBody = styled.div`
  display: inline-block;
  flex: 0 0 auto;
  margin: ${({ margin }) => margin || '0px'};
  padding: ${({ padding }) => padding || '16px'};
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100%'};
  background-color: ${({ color }) => color || '#fff'};
  // border-top: 1px solid rgba(0, 0, 0, 0.12);
  // border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: ${({ borderRadius }) => borderRadius || '0px'};
  box-shadow: ${({ boxShadow }) => boxShadow || 'none'};
  box-sizing: border-box;
`;
export default CardBody;
