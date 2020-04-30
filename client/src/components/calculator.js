import React, {useState} from "react";
import axios from "axios";

function Calculator() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState("");

  // USING AXIOS:
  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   const nums = {num1, num2};
  //   const response = await axios.post('/calc', nums);
  //   const {data} = response;
  //   await setResult(data);
  // }

  // USING FETCH ASYNC AND ASYNC/AWAIT:
  async function handleSubmit(e) {
    e.preventDefault();
    const nums = {num1, num2};
    const response = await fetch('/calc', {
      method: 'POST',
      body: JSON.stringify(nums),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      }
      
    })
    const data = await response.json();
    setResult(data);
  }

  // USING FETCH NOT ASYNC/AWAIT:
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   const nums = {num1, num2};
  //   fetch('/calc', {
  //     method: 'POST',
  //     body: JSON.stringify(nums),
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json;charset=UTF-8'
  //     }
      
  //   })
  //   .then(response => response.json())
  //   .then(data => setResult(data));
  // }

  return (
    <div>
      <h1>Calculator</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="num1" 
          placeholder="first number" 
          value={num1} 
          onChange={(event) => setNum1(event.target.value)}
        />
        <input 
          type="text" 
          name="num2" 
          placeholder="second number" 
          value={num2} 
          onChange={(event) => setNum2(event.target.value)} 
        />
        <button type="submit" name="submit">Calculate</button>
      </form>
      <h3>Result: {result}</h3>
    </div>
  )
}

export default Calculator;