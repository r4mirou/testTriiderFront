import React from 'react';
import './style.css';

const BtnGradient = (props) =>
    <button className={'btnGradient'} onClick={() => props.onClick()}>
        {props.children}
    </button>

BtnGradient.defaultProps = {
    onClick: () => true,
}

export default BtnGradient;