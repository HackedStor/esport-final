import React from 'react';

function SelectInputDate({ selectID, selectName, options, onChange }) {
    return (
        <div className="form">
            <label htmlFor={selectID}>{selectName}:</label>
            <select id={selectID} className="input" name={selectID} required onChange={onChange} style={{border: '1px solid rgba(221, 221, 221, 0.39)'}}>
                <option value="">Sélectionnez une date</option>
                {options.map((option, index) => (
                    <option className="option" value={option.value} key={index}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectInputDate;
