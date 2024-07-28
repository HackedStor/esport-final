import React from 'react';

function SelectInputH({ selectID, selectName, options }) {
    return (
        <div className="form">
            <label htmlFor={selectID}>{selectName}:</label>
            <select id={selectID} className="input" name={selectID} required  style={{border: '1px solid rgba(221, 221, 221, 0.39)'}}>
                {options.map((option, index) => (
                    <option className="option" value={option.id} key={index}>
                        {option.horaire}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectInputH;
