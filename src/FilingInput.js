import React from "react";
import styled from 'styled-components';

const Select = styled.select`
  padding: 0.5em;
  margin: 0.5em;
  color: ${props => props.selectColor || "blue"};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

const FilingInput = ({value, onChange}) => (
    <div>
        <label htmlFor="filingStatus">Choose a filing status: </label>
        <Select name="status" id="filingStatus" value={value} onChange={onChange}>
        <option value="single">Single</option>
        <option value="marriedJoint">Married Filing Joint</option>
        <option value="marriedSeperate">Married Filing Seperate</option>
        <option value="headOfHousehold">Head of Household</option>
        </Select>
    </div>
);


export default FilingInput