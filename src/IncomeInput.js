import React from "react";
import styled from 'styled-components';

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: ${props => props.inputColor || "blue"};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;



const IncomeInput = ({value, onChange, updateEnter}) => (
<div>
    <label htmlFor="incomeInput">Income: </label>
    <Input id="incomeInput" type="text" pattern="[0-9]*" value={value} onChange={onChange} onKeyPress={updateEnter}/>
</div>
);



export default IncomeInput;