import React, { useState } from 'react';
import './App.css';

function App() {
  const [aylikOdeme, setAylikOdeme] = useState(null);
  const [toplamOdeme, setToplamOdeme] = useState(null);
  const [showResults, setShowResults] = useState(false);

  function handleCalculation(aylikOdeme, toplamOdeme) {
    setAylikOdeme(aylikOdeme);
    setToplamOdeme(toplamOdeme);
    setShowResults(true);
  }

  return (
    <div className="container">
      <CalculationSection onCalculation={handleCalculation} />
      <ResultSection aylikOdeme={aylikOdeme} toplamOdeme={toplamOdeme} showResults={showResults} />
    </div>
  );
}

function CalculationSection({ onCalculation }) {
  function calculation(e) {
    e.preventDefault();

    let krediMiktari = (e.target["mortgageAmount"].value);
    let aylikFaizOrani = (e.target["interestRate"].value) / 100 / 12;
    let toplamAy = (e.target["mortgageTerm"].value) * 12;

    let aylikOdeme = (krediMiktari * aylikFaizOrani * ((1 + aylikFaizOrani) ** toplamAy)) / (((1 + aylikFaizOrani) ** toplamAy) - 1);
    let toplamOdeme = aylikOdeme * toplamAy;

    onCalculation(aylikOdeme.toFixed(2), toplamOdeme.toFixed(2));
  }

  function clearAll(){
    let inputs = document.querySelectorAll("input");

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
      inputs[i].checked = false;
    }
  }

  return (
    <div className="calculationSection">
      <div className="calculatorHeader">
        <h1>Mortgage Calculator</h1>
        <button onClick={clearAll}>Clear All</button>
      </div>

      <form className='calculationFormGroup' onSubmit={calculation}>
        <div className="mortgageItems">
          <label>Mortgage Amount<div className="inputInside"><p>£</p><input required name='mortgageAmount' type="number" /></div></label>
          <label>Mortgage Term <div className="inputInside"><input required name='mortgageTerm' type="number" /><p>years</p></div></label>
          <label>Interest Rate <div className="inputInside"><input required name='interestRate' type="number" /><p>%</p></div></label>
        </div>
        
        <div className="calculationRadio">
          <p>Mortgage Type</p>
          <label><input type="radio" name="repayment"/>Repayment</label>
          <label><input type="radio" name="interestOnly"/>Interest Only</label>
        </div>
        
        <button className='submitButton' type="submit"> <img src="public/images/calcButton.png" alt="" /> Calculate Repayments</button>       
      </form>
    </div>
  );
}

function ResultSection({ aylikOdeme, toplamOdeme, showResults }) {
  return (
    <>
      <div className="resultSection" style={{ display: showResults ? 'block' : 'none' }}>
          <h1>Your results</h1>
          <p>Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments” again.</p>
          <div className="allResults">
            <div className="monthlyRepayments">
              <p>Your monthly repayments</p>
              <h1>£{aylikOdeme}</h1>
            </div>

            <div className="totalRepayments">
              <p>Total you'll repay over the term</p>
              <h2>£{toplamOdeme}</h2>
            </div>
          </div>
      </div>

      <div className="emptyResultSection" style={{ display: showResults ? 'none' : 'block' }}>
        <img src="public/images/emptyResults.png" alt="" />
        <h1>Results shown here</h1>
        <p>Complete the form and click “calculate repayments” to see what your monthly repayments would be.</p>
      </div>
    </>
  );
}

export default App;
