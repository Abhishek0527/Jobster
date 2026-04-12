import React from 'react'

function FormRow({ type, name, value, labelText, handleChange, disabled = false }) {
    return (
        <div className='form-row'>
            <label htmlFor={name} className='form-label'>
                {labelText || name}
            </label>
            <input
                id={name}
                type={type}
                name={name}
                onChange={handleChange}
                value={value}
                disabled={disabled}
                className='form-input'
            />
        </div>
    )
}

export default FormRow
