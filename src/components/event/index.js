import React from 'react';
import './style.css';

const Event = (props) => (
    <div className={`all ${props.type}`}>
        <div className={'description'}>{props.description}</div>
    </div>
)

Event.defaultProps = {
    type: 'unavailable',
    description: "NÃO DISPONÍVEL",
}

export default Event;