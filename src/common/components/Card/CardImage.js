import styled from '@emotion/styled';

const CardImage = styled.div`
  margin: auto;
  display: block;
  background-image: url('${({ image }) => image}');
  background-size: ${({ backgroundSize }) => backgroundSize || 'cover'};
  background-repeat: no-repeat;
  background-position: center;

  border-radius: ${({ borderRadius }) => borderRadius || '8px'};
  object-fit: cover;

  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100%'};

  grid-row: ${({ rows }) =>
    rows ? `${parseInt(rows.start)}/ span ${parseInt(rows.number)}` : 'none'};
  grid-column: ${({ columns }) =>
    columns
      ? `${parseInt(columns.start)}/ span ${parseInt(columns.number)}`
      : 'none'};
  // filter: drop-shadow(3px 4px 3px rgba(171, 171, 171, 0.5));
`;
export default CardImage;
