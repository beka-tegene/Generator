import React from 'react'

const Input = ({ type, placeholder, id, name, setData, data }) => {
    return (
        <input
            type={type || 'text'}
            placeholder={placeholder || ''}
            className=' px-5 py-2 rounded outline-none border-[1px] border-[#B0A695] w-full'
            onChange={(e) => setData(e.target.value)}
            value={data || ''}
            id={id || ''}
            name={name || ''}
        />
    )
}

export default Input