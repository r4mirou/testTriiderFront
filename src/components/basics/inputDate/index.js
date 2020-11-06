import React from 'react';
import './style.css';

export default (props) => {
    return <div>
        <div className={'desc'}>{props.label}</div>
        <input type="date" className={'input'} ref={props.internRef} />
    </div>
}