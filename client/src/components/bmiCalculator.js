import React, { useState } from "react";
import axios from "axios";

function BmiCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const info = {weight, height};
    const result = await axios.post('/bmiCalc', info)
    const {data} = result;
    setBmi(data.toFixed(1));
  }

  return (
    <>
      <h1>BMI Calculator</h1>
      <form onSubmit={handleSubmit}>
        <input 
          value={weight} 
          onChange={(e) => setWeight(e.target.value)} 
          placeholder="Weight (kg)" 
        />
        <input 
          value={height} 
          onChange={(e) => setHeight(e.target.value)} 
          placeholder="Height (meters)" 
        />
        <button>Calculate BMI</button>
      </form>
      {bmi && <h3>BMI: {bmi}</h3>}
    </>
  )
}

export default BmiCalculator;