const getFederalTaxResponsibility = (incomeValue , brackets) => {
    let taxSum = 0;
    let prevLevel = 0 ;
    incomeValue = incomeValue - 24800; //Standard Deduction
    console.log(incomeValue);
    console.log(brackets);
    for (const [key, value] of brackets.entries()) {
      if (incomeValue <= key){
        taxSum = ((incomeValue-prevLevel) * (value/100)) + taxSum;
        if (taxSum <= 0) {
          return 0;
        } else {
          return taxSum;
        }
      }else {
        taxSum = (key-prevLevel) * (value/100) + taxSum;
        prevLevel = key
      }
    }
  return 0;
  }

  export default getFederalTaxResponsibility;