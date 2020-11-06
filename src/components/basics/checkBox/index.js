import React from 'react';
import './style.css';

export default (props) => {
    return <label className={'label-check'}>
        <input type='checkbox' ref={props.internRef} />
        {props.name}
    </label>
}