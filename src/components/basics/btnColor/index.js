import React from 'react';
import './style.css';

const BtnColor = (props) =>
    <button className={'btnColor'} onClick={() => props.onClick()}>
        {props.children}
    </button>

BtnColor.defaultProps = {
    onClick: () => true,
}

export default BtnColor;