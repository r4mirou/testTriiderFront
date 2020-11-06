import React from 'react';
import './style.css';
import AppBar from '../appBar';
import Nav from '../nav';
import Modal from '../modal';

export default (props) => (  
    <div className={'main'} >
        <Modal/>
        <AppBar/>
        <Nav type='top'/>
        {props.children}
        <Nav type='bottom'/>
    </div>
)