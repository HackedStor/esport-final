// InputDate.jsx
import React from "react";

function InputDate({ htmlFor, labelValue, InputName, InputId }) {
    return (
        <div className="form">
            <label htmlFor={htmlFor}>{labelValue} :</label>
            <input
                className="input"
                type="date"
                name={InputName}
                id={InputId}
                required
            />
            <span className="input-border"></span>
        </div>
    );
}

export default InputDate;
