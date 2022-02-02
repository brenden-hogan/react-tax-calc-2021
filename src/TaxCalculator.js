import React, {useState, useEffect} from "react";
import FilingInput from "./FilingInput";
import getFederalTaxResponsibility from "./getFederalTaxResponsibility";
import IncomeInput from "./IncomeInput";

const marriedJoint2021Brackets = new Map([
    [19900,10],
    [81050,12],
    [172750,22],
    [329850,24],
    [418850,32],
    [628300,35],
    [1000000000000000000000000000000,37]
  ]);

  const marriedSeperate2021Brackets = new Map([
    [9950,10],
    [40525,12],
    [86375,22],
    [164925,24],
    [209425,32],
    [314150,35],
    [1000000000000000000000000000000,37]
  ]);

  const headOfHousehold2021Brackets = new Map([
    [14200,10],
    [54200,12],
    [86350,22],
    [164900,24],
    [209400,32],
    [523600,35],
    [1000000000000000000000000000000,37]
  ]);

  const single2021Brackets = new Map([
    [9950,10],
    [40525,12],
    [86375,22],
    [164925,24],
    [209425,32],
    [523600,35],
    [1000000000000000000000000000000,37]
  ]);

const getBracketMap = (bracketString) =>{
    if (bracketString === 'single'){
        return single2021Brackets;
    }else if (bracketString === 'marriedJoint'){
        return marriedJoint2021Brackets;
    }else if (bracketString === 'marriedSeperate'){
        return marriedSeperate2021Brackets;
    }else if (bracketString === 'headOfHousehold'){
        return headOfHousehold2021Brackets;
    }
    return null
}

const TaxCalculator = () => {
  const [federalTaxDue, setFederalTaxDue] = useState('');
  const [federalTaxDueDisplay, setFederalTaxDueDisplay] = useState('');
  const [federalTaxRate, setFederalTaxRate] = useState('');
  const [ssTaxDueDisplay, setSsTaxDueDisplay] = useState('');
  const [ssTaxDue, setSsTaxDue] = useState('');
  const [ssTaxRate, setSsTaxRate] = useState('');
  const [mcTaxDueDisplay, setMcTaxDueDisplay] = useState('');
  const [mcTaxDue, setMcTaxDue] = useState('');
  const [mcTaxRate, setMcTaxRate] = useState('');
  const [stateTaxDueDisplay, setStateTaxDueDisplay] = useState('');
  const [stateTaxDue, setStateTaxDue] = useState('');
  const [stateTaxRate, setStateTaxRate] = useState('');
  const [totalTaxDueDisplay, setTotalTaxDueDisplay] = useState('');
  const [totalTaxDue, setTotalTaxDue] = useState('');
  const [totalTaxRate, setTotalTaxRate] = useState('');
  const [income, setIncome] = useState(localStorage.getItem('income') || '');
  const [filingStatus, setFilingStatus] = useState(localStorage.getItem('filingStatus') || 'single');



const formatMoney = (amount, decimalCount = 2, decimal = ".", thousands = ",") => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    console.log(e)
  }
};


  useEffect(() => {
    localStorage.setItem('filingStatus', filingStatus)
  }, [filingStatus]);

  const updateFederalTaxesDue = (incomeValue, bracket) => {
    let federalTaxesDue = getFederalTaxResponsibility(incomeValue, bracket);
    setFederalTaxDue(federalTaxesDue.toFixed(2));
    setFederalTaxRate(((federalTaxesDue/incomeValue)*100).toFixed(2));
  };

  const updateSsTaxesDue = (incomeValue) => {
    let ssTaxesDue = incomeValue*(6.2/100);
    setSsTaxDue(ssTaxesDue.toFixed(2));
    setSsTaxRate(((ssTaxesDue/incomeValue)*100).toFixed(2));
  };

  const updateMcTaxesDue = (incomeValue) => {
    let mcTaxesDue = incomeValue*(1.45/100);
    setMcTaxDue(mcTaxesDue.toFixed(2));
    setMcTaxRate(((mcTaxesDue/incomeValue)*100).toFixed(2));
  };

  const updateStateTaxesDue = (incomeValue) => {
    let stateTaxesDue = incomeValue*(4.55/100);
    setStateTaxDue(stateTaxesDue.toFixed(2));
    setStateTaxRate(((stateTaxesDue/incomeValue)*100).toFixed(2));
  };

  const updateTotalTaxesDue = (incomeValue) => {
    let totalTaxesDue = +federalTaxDue + +ssTaxDue + +mcTaxDue + +stateTaxDue;
    setTotalTaxDue(totalTaxesDue.toFixed(2));
    setTotalTaxRate(((totalTaxesDue/incomeValue)*100).toFixed(2));
  };

  
  const onIncomeEnter = event  => {
    if (event.key === 'Enter') {
      updateFederalTaxesDue(event.target.value , getBracketMap(filingStatus));
      updateSsTaxesDue(event.target.value);
      updateMcTaxesDue(event.target.value);
      updateStateTaxesDue(event.target.value);
    };
  };

  const onIncomeChange = event => {
    setIncome(event.target.value.replace(/\D/,''));
  };

  useEffect(() => {
    updateTotalTaxesDue(income);
    setFederalTaxDueDisplay(formatMoney(federalTaxDue));
  }, [federalTaxDue]);

  useEffect(() => {
    updateTotalTaxesDue(income);
    setSsTaxDueDisplay(formatMoney(ssTaxDue));
  }, [ssTaxDue]);

  useEffect(() => {
    updateTotalTaxesDue(income);
    setMcTaxDueDisplay(formatMoney(mcTaxDue));
  }, [mcTaxDue]);

  useEffect(() => {
    localStorage.setItem('income', income)
  }, [income]);

  useEffect(() => {
    updateTotalTaxesDue(income);
    setStateTaxDueDisplay(formatMoney(stateTaxDue));
  }, [stateTaxDue]);

  useEffect(() => {
    setTotalTaxDueDisplay(formatMoney(totalTaxDue));
  }, [totalTaxDue]);

  const onFilingDropdownSelect = event => {
    setFilingStatus(event.target.value);
    updateFederalTaxesDue(income , getBracketMap(event.target.value));
    updateSsTaxesDue(income);
    updateMcTaxesDue(income);
    updateStateTaxesDue(income);
  };

  return (
    <div>
      <h1>Your Federal Income Tax Owed is: ${federalTaxDueDisplay} which is marginal tax rate of: {federalTaxRate}% </h1> 
      <hr />
      <IncomeInput value={income} onChange={onIncomeChange} updateEnter={onIncomeEnter} />
      <FilingInput value={filingStatus} onChange={onFilingDropdownSelect}/>
      <table>
        <tr>
          <th>Tax Source</th>
          <th>Amount</th>
          <th>Percent</th>
        </tr>
        <tr>
          <th>Federal</th>
          <th>${federalTaxDueDisplay}</th>
          <th>{federalTaxRate}%</th>
        </tr>
        <tr>
          <th>Social Security</th>
          <th>${ssTaxDueDisplay}</th>
          <th>{ssTaxRate}%</th>
        </tr>
        <tr>
          <th>Medicare</th>
          <th>${mcTaxDueDisplay}</th>
          <th>{mcTaxRate}%</th>
        </tr>
        <tr>
          <th>State (CO)</th>
          <th>${stateTaxDueDisplay}</th>
          <th>{stateTaxRate}%</th>
        </tr>
        <tr>
          <th>Total</th>
          <th>${totalTaxDueDisplay}</th>
          <th>{totalTaxRate}%</th>
        </tr>
      </table>
    </div>
  );
};

export default TaxCalculator;