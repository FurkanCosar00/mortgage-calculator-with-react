import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleCalculation = (monthlyPayment, totalPayment) => {
    setMonthlyPayment(monthlyPayment);
    setTotalPayment(totalPayment);
    setShowResults(true);
  };

  const resetCalculator = () => {
    setShowResults(false);
    setMonthlyPayment(null);
    setTotalPayment(null);
  };

  return (
    <div className="container">
      <CalculationSection
        onCalculation={handleCalculation}
        onReset={resetCalculator}
      />
      <ResultSection
        monthlyPayment={monthlyPayment}
        totalPayment={totalPayment}
        showResults={showResults}
      />
    </div>
  );
}

function CalculationSection({ onCalculation, onReset }) {
  const formRef = useRef(null);

  const handleCalculation = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const mortgageAmount = parseFloat(formData.get("mortgageAmount"));
    const interestRate = parseFloat(formData.get("interestRate"));
    const mortgageTerm = parseFloat(formData.get("mortgageTerm"));
    const mortgageType = formData.get("mortgageType");

    if (!mortgageAmount || !interestRate || !mortgageTerm || !mortgageType) {
      alert("Please fill in all fields and select a mortgage type");
      return;
    }

    const monthlyInterestRate = interestRate / 100 / 12;
    const totalMonths = mortgageTerm * 12;

    let monthlyPayment, totalPayment;

    if (mortgageType === "repayment") {
      monthlyPayment =
        (mortgageAmount *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, totalMonths)) /
        (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);
      totalPayment = monthlyPayment * totalMonths;
    } else {
      monthlyPayment = mortgageAmount * monthlyInterestRate;
      totalPayment = monthlyPayment * totalMonths + mortgageAmount;
    }

    onCalculation(monthlyPayment.toFixed(2), totalPayment.toFixed(2));
  };

  const clearAll = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
    onReset();
  };

  return (
    <div className="calculationSection">
      <div className="calculatorHeader">
        <h1>Mortgage Calculator</h1>
        <button type="button" onClick={clearAll}>
          Clear All
        </button>
      </div>

      <form
        ref={formRef}
        className="calculationFormGroup"
        onSubmit={handleCalculation}
      >
        <div className="mortgageItems">
          <label>
            Mortgage Amount
            <div className="inputInside">
              <p>£</p>
              <input
                required
                name="mortgageAmount"
                type="number"
                min="1"
                step="0.01"
                placeholder="300000"
              />
            </div>
          </label>

          <label>
            Mortgage Term
            <div className="inputInside">
              <input
                required
                name="mortgageTerm"
                type="number"
                min="1"
                max="50"
                placeholder="25"
              />
              <p>years</p>
            </div>
          </label>

          <label>
            Interest Rate
            <div className="inputInside">
              <input
                required
                name="interestRate"
                type="number"
                min="0.01"
                max="20"
                step="0.01"
                placeholder="5.25"
              />
              <p>%</p>
            </div>
          </label>
        </div>

        <div className="calculationRadio">
          <p>Mortgage Type</p>
          <label>
            <input
              type="radio"
              name="mortgageType"
              value="repayment"
              required
            />
            Repayment
          </label>
          <label>
            <input
              type="radio"
              name="mortgageType"
              value="interestOnly"
              required
            />
            Interest Only
          </label>
        </div>

        <button className="submitButton" type="submit">
          <img src="./images/calcButton.png" alt="Calculator icon" />
          Calculate Repayments
        </button>
      </form>
    </div>
  );
}

function ResultSection({ monthlyPayment, totalPayment, showResults }) {
  if (showResults) {
    return (
      <div className="resultSection">
        <h1>Your results</h1>
        <p>
          Your results are shown below based on the information you provided. To
          adjust the results, edit the form and click "calculate repayments"
          again.
        </p>
        <div className="allResults">
          <div className="monthlyRepayments">
            <p>Your monthly repayments</p>
            <h1>£{monthlyPayment}</h1>
          </div>

          <div className="totalRepayments">
            <p>Total you'll repay over the term</p>
            <h2>£{totalPayment}</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="emptyResultSection">
      <img src="./images/emptyResults.png" alt="Empty results illustration" />
      <h1>Results shown here</h1>
      <p>
        Complete the form and click "calculate repayments" to see what your
        monthly repayments would be.
      </p>
    </div>
  );
}
export default App;
