import React, { useState } from 'react'

function CounterApp() {
    const[count, setCount] = useState(0)
    const handleIncrement = ()=>{
        setCount((prev) => prev + 1)
    }
    const handleDecrement = ()=>{
        setCount((prev) => prev - 1)
    }
  return (
    <div style={{textAlign: 'center'}}>
        <h1>CounterApp</h1>
        <p>Count: {count}</p>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement}>Decrement</button>
    </div>
  )
}

export default CounterApp