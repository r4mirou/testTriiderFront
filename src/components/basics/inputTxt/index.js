import React from 'react';
import './style.css';

const Input = (props) => {
    return <div>
        <div className={'desc'}>{props.label}</div>
        <input type={props.type} className={'input'} ref={props.internRef}/>
    </div>
}

Input.defaultProps = {
    type: 'text',
}

export default Input;