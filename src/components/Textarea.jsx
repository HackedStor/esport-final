// TextArea.jsx
import React from "react";

function TextArea({ htmlFor, labelValue, TextAreaName, TextAreaId }) {
    return (
        <div className="form">
            <label htmlFor={htmlFor}>{labelValue} :</label>
            <textarea
                className="textarea"
                name={TextAreaName}
                id={TextAreaId}
                required
            ></textarea>
            <span className="input-border"></span>
        </div>
    );
}

export default TextArea;
