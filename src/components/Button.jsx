import React from "react";

function ButtonCus({type, classValue, text, action}) {
    return (
        <div className="submit_control">
            <input type={type} className={classValue} value={text} onClick={action}></input>
        </div>
    );
}

export default ButtonCus