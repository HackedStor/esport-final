import React from "react";

function Input({htmlFor, labelValue, InputName, InputId, type})  {
    return(
        <div className="form">
            <label htmlFor={htmlFor}>{labelValue} :</label>
            <input className="input" type={type} name={InputName} id={InputId} required></input>
            <span className="input-border"></span>
        </div>
    );
}

export default Input