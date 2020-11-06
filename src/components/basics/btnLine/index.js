import React from 'react';
import './style.css';

const BtnLine = (props) =>
    <button className={'btnLine'} onClick={() => props.onClick()}>
        {props.children}
    </button>


BtnLine.defaultProps = {
    onClick: () => true,
}

export default BtnLine;