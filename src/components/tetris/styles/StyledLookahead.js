import styled from 'styled-components'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  grid-auto-rows: auto;
`;

export const StyledLookahead = styled.div`
  display: grid;
  grid-template-rows: repeat(
    ${props => props.height},
    min(25px)
  );
  grid-template-columns: repeat(${props => props.height}, min(25px));
  grid-gap: 1px;
  border: 2px solid #333;
  width: 59%;
  max-width: 25vw;
  background: #111;
`