import React, { useState } from 'react'

function CalculatorApp() {
    const [input, setInput] = useState('')
    const [res, setRes] = useState('')

    const handleButtonClick = (val) => {
        setInput((prev) => prev + val)
    }

    const handleClear = () => {
        setInput('')
        setRes('')
    }

    const handleCalculator = () => {
        if(!input.trim()){
            setRes('Error')
            return
        }
        try{
            // eslint-disable-next-line no-eval
            const calRes = eval(input)

            if(isNaN(calRes)){
                setRes('NaN')
            }
            else if(!isFinite(calRes)){
                setRes('Infinity')
            }
            else{
                setRes(calRes.toString())
            }
        }catch(err){
            setRes('Error')
        }
    }
    
  return (
    <div style={{
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        margin: 'auto', 
        width: '400px', 
        padding: '30px',
        backgroundColor: '#f5f5f5',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
        <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>React Calculator</h1>
        <input 
            type='text' 
            value={input} 
            readOnly 
            style={{
                width: '100%',
                padding: '15px',
                fontSize: '24px',
                marginBottom: '20px',
                textAlign: 'right',
                border: '2px solid #ddd',
                borderRadius: '8px'
            }} 
        />
        <div style={{
            width: '100%',
            padding: '15px',
            fontSize: '24px',
            textAlign: 'right',
            marginBottom: '20px',
            minHeight: '30px',
            backgroundColor: '#fff',
            border: '2px solid #ddd',
            borderRadius: '8px'
        }}>
            {res}
        </div>
        <div style={{
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '15px',
            width: '100%'
        }}>
            <button style={buttonStyle} onClick={()=>handleButtonClick('7')}>7</button>
            <button style={buttonStyle} onClick={()=>handleButtonClick('8')}>8</button>
            <button style={buttonStyle} onClick={()=>handleButtonClick('9')}>9</button>
            <button style={buttonStyle} onClick={()=>handleButtonClick('+')}>+</button>
            <button style={buttonStyle} onClick={()=>handleButtonClick('4')}>4</button>
            <button style={buttonStyle} onClick={()=>handleButtonClick('5')}>5</button>
            <button style={buttonStyle} onClick={()=>handleButtonClick('6')}>6</button>
            <button style={buttonStyle} onClick={()=>handleButtonClick('-')}>-</button>
            <button style={buttonStyle} onClick={()=>handleButtonClick('1')}>1</button>
            <button style={buttonStyle} onClick={()=>handleButtonClick('2')}>2</button>
            <button style={buttonStyle} onClick={()=>handleButtonClick('3')}>3</button>
            <button style={buttonStyle} onClick={()=>handleButtonClick('*')}>*</button>
            <button style={buttonStyle} onClick={handleClear}>C</button>
            <button style={buttonStyle} onClick={()=>handleButtonClick('0')}>0</button>
            <button style={buttonStyle} onClick={handleCalculator}>=</button>
            <button style={buttonStyle} onClick={()=>handleButtonClick('/')}>/</button>
        </div>
    </div>
  )
}

const buttonStyle = {
    padding: '15px',
    fontSize: '20px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#4CAF50',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
}

export default CalculatorApp