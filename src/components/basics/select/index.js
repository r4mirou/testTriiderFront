import React from 'react';
import './style.css';

const Select = (props) => {
    return <div>
        <div className={'desc'}>{props.label}</div>
        <select className={'select'} ref={props.internRef}>
            {props.options.map((item, index) =>
                <option key={index} value={index}>{item}</option>
            )}
        </select>
    </div>
}

Select.defaultProps = {
    options: [],
}

export default Select;