import React from 'react'
import Logo from './Logo'

function FormRow({ type, name, value, labeltext, handleChange }) {
    return (
      
            <div className='form-row'>
                <label htmlFor={name} className='form-label'>
                {labeltext || name}
                </label>
                <input type={type} name={name} onChange={handleChange} value={value} className='form-input'></input>
            </div>
      
    )
}

export default FormRow