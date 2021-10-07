import styled from 'styled-components'

export const StyledStage = styled.div`
  display: grid;
  grid-template-rows: repeat(
    ${props => props.height},
    calc(20vw / ${props => props.width})
  );
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-gap: 1px;
  border: 2px solid #ddd;
  width: 100%;
  max-width: 20vw;
  background: #f2f2f2;
  height: 100%;
  max-height: 100%;
  overflow: visible;
`