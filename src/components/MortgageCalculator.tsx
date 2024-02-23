// MortgageCalculator.tsx
import React, { useState } from 'react';
import axios from 'axios';
import './MortgageCalculator.css';
import config from '../config.json';

interface MortgageCalculatorResponse {
  monthly_payment: {
    total: number;
    mortgage: number;
    property_tax: number;
    hoa: number;
    annual_home_ins: number;
  };
  annual_payment: {
    total: number;
    mortgage: number;
    property_tax: number;
    hoa: number;
    home_insurance: number;
  };
  total_interest_paid: number;
}

const MortgageCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number | ''>('');
  const [interestRate, setInterestRate] = useState<number | ''>('');
  const [durationYears, setDurationYears] = useState<number | ''>('');
  const [propertyTax, setPropertyTax] = useState<number | ''>('');
  const [hoa, setHoa] = useState<number | ''>('');
  const [monthlyPayment, setMonthlyPayment] = useState<MortgageCalculatorResponse['monthly_payment'] | null>(null);
  const [annualPayment, setAnnualPayment] = useState<MortgageCalculatorResponse['annual_payment'] | null>(null);

  const handleCalculate = async () => {
    try {
      // Ensure that loanAmount, interestRate, and durationYears are non-empty strings
      if (!loanAmount || !interestRate || !durationYears || !propertyTax || !hoa) {
        console.error('Please enter valid values for loan amount, interest rate, and duration.');
        return;
      }

      const apiKey = config.NINJAS_API_KEY;
      const headers = {
        'X-Api-Key': apiKey,
      };

      const response = await axios.get<MortgageCalculatorResponse>(
        `https://api.api-ninjas.com/v1/mortgagecalculator?loan_amount=${loanAmount}&interest_rate=${interestRate}&duration_years=${durationYears}&annual_property_tax=${propertyTax}&monthly_hoa=${hoa}`,
        { headers }
      );

      setMonthlyPayment(response.data.monthly_payment);
      setAnnualPayment(response.data.annual_payment);
    } catch (error) {
      console.error('Error calculating mortgage:', error);
    }
  };

  return (
    <div className="mortgage-calculator-container">
      <h2>Mortgage Calculator</h2>

      <div className="label-input-container">
        <label>Loan Amount:</label>
        <input
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
          placeholder="Enter loan amount"
        />
      </div>

      <div className="label-input-container">
        <label>Interest Rate:</label>
        <input
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(parseFloat(e.target.value))}
          placeholder="Enter interest rate"
        />
      </div>

      <div className="label-input-container">
        <label>Duration (Years):</label>
        <input
          type="number"
          value={durationYears}
          onChange={(e) => setDurationYears(parseFloat(e.target.value))}
          placeholder="Enter duration in years"
        />
      </div>

      <div className="label-input-container">
        <label>Property Tax:</label>
        <input
          type="number"
          value={propertyTax}
          onChange={(e) => setPropertyTax(parseFloat(e.target.value))}
          placeholder="Enter property tax"
        />
      </div>

      <div className="label-input-container">
        <label>HOA:</label>
        <input
          type="number"
          value={hoa}
          onChange={(e) => setHoa(parseFloat(e.target.value))}
          placeholder="Enter HOA"
        />
      </div>

      <button className="calculate-button" onClick={handleCalculate}>
        Calculate
      </button>

      <div className="results-container">
        {monthlyPayment && (
          <>
            <h3>Monthly Payment</h3>
            <p>Total: ${monthlyPayment.total}</p>
            <p>Mortgage: ${monthlyPayment.mortgage}</p>
            <p>Property Tax: ${monthlyPayment.property_tax}</p>
            <p>HOA: ${monthlyPayment.hoa}</p>
            <p>Annual Home Insurance: ${monthlyPayment.annual_home_ins}</p>
          </>
        )}

        {annualPayment && (
          <>
            <h3>Annual Payment</h3>
            <p>Total: ${annualPayment.total}</p>
            <p>Mortgage: ${annualPayment.mortgage}</p>
            <p>Property Tax: ${annualPayment.property_tax}</p>
            <p>HOA: ${annualPayment.hoa}</p>
            <p>Home Insurance: ${annualPayment.home_insurance}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default MortgageCalculator;
