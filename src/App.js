import React from "react";
import TaxCalculator from "./TaxCalculator";
import styled from 'styled-components';

const Block = styled.div`
  background-color: black;
  color: ${({ color }) => color || "#4d54b3"};
  padding: 10px;
  border: 2px solid ${({ color }) => color || "#4d54b3S"};
  display: inline-block;
  margin: 5px;
`;

const App = () => {
  return (
    <Block>
      <hr />
      <TaxCalculator />
    </Block>
  );
};

export default App;
