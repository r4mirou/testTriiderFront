import React from 'react';
import './style.css';
import Event from '../event'

const DayWeek = (props) => (
    <div className={'day'}>
        <div className={'header-day'}>
            <div className={'circle'}>{props.numberDay}</div>
            <span>{props.nameDay}</span>
        </div>
        <div className={'body-day'}>
            {props.morning}
            <hr className={'line'}/>
            {props.afternoon}
            <hr className={'line'}/>
            {props.night}
        </div>
    </div>
)

DayWeek.defaultProps = {
    numberDay: '0',
    nameDay: 'none',
    morning: <Event description='Manhã'/>,
    afternoon: <Event description='Tarde'/>,
    night: <Event description='Noite'/>,
}

export default DayWeek;
