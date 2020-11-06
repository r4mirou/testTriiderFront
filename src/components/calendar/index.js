import React, { useEffect, useRef } from 'react';
import './style.css';
import { useLocation } from "react-router-dom";
import { POST } from '../../utils/handleRequest';
import { calcWeek, castDayWeek } from '../../utils//handleDate';
import { useDispatch } from 'react-redux';
import {
    handleCalendarWeek,
    handleSelectedWeekDay,
    handleSelectedMonth,
    handleSelectedMonthDay
} from '../../fluxArchiteture/actions/general_action';
import More from '../../images/more.svg';
import Less from '../../images/less.svg';
import DayWeek from '../dayWeek';
import Event from '../event';
import Core from './core'

export default () => {
    var refBox = useRef(null);
    const dispatch = useDispatch();
    const useQuery = new URLSearchParams(useLocation().search).get("date");
    let dateInf = calcWeek(!!useQuery ? new Date(useQuery) : new Date());    
    dispatch(handleSelectedMonth(dateInf.month));
    dispatch(handleSelectedMonthDay(dateInf.days['']));
    let selectedWeekDay = 0;

    let eventList = [];
    const getEvents = async (initDate, finDate) => { // eslint-disable-line
        const res = await POST({
            query: `
                query getRangeEvent($initial: String!, $final: String!) {
                    events(initial: $initial, final: $final) {
                        id
                        name
                        date_event
                        day_week
                        period
                    }
                    availabilities{
                        binary
                    }
                }
            `,
            variables: {
                initial: initDate,
                final: finDate
            },
        });

        eventList = res.data;
        await loadWeek();
    };

    useEffect(() => {
        console.log("effect")
        getEvents(dateInf.range[0], dateInf.range[1])
    }, [dateInf]);

    const clearEffects = () => {
        refBox.current.classList.remove('slideLeft');
        refBox.current.classList.remove('slideRight');
        void refBox.current.offsetWidth;
    }

    const handleWeek = (option) => {
        clearEffects();
        option === 'more' ? refBox.current.classList.add('slideLeft') : refBox.current.classList.add('slideRight');

        let d = new Date(option === 'more' ? dateInf.range[1] : dateInf.range[0]);
        d.setUTCDate(option === 'more' ? d.getUTCDate() + 1 : d.getUTCDate() - 1);

        dateInf = calcWeek(d);

        dispatch(handleSelectedMonth(dateInf.month));
        getEvents(dateInf.range[0], dateInf.range[1]);
    };

    const handleWeekMobile = (option) => {
        if (option === 'more') {
            if (selectedWeekDay >= 6) {
                handleWeek(option);
                dispatch(handleSelectedMonthDay(dateInf.days[0]));
                dispatch(handleSelectedWeekDay(selectedWeekDay));
                selectedWeekDay = 0;
                return;
            }
        }
        else if (option === 'less') {
            if (selectedWeekDay <= 0) {
                handleWeek(option);
                dispatch(handleSelectedMonthDay(dateInf.days[6]));
                selectedWeekDay = 6;
                dispatch(handleSelectedWeekDay(6));
                return;
            }
        }

        dispatch(handleSelectedWeekDay(option === 'more' ? ++selectedWeekDay : --selectedWeekDay))
        dispatch(handleSelectedMonthDay(dateInf.days[selectedWeekDay]));
    }

    const loadWeek = async () => {
        var week = []
        for (let i = 0; i < (eventList.availabilities.binary.length - 3); i++) {
            let morning, afternoon, night;

            //eventos
            //se não trabalha nesse dia... insere 3 indisponíveis
            if (eventList.availabilities.binary[i] === '0') {
                morning = <Event />;
                afternoon = <Event />;
                night = <Event />;
            } else { //se trabalha nesse dia
                if (eventList.availabilities.binary[7] === '1') { //se trabalha pela manhã                                        
                    const ev = await searchEvent(i, '0')
                    if (ev) morning = <Event type='event' description={ev.name} />;
                    else morning = <Event type='free' description='Manhã' />;
                } else //se não trabalha pela manhã
                    morning = <Event />;

                if (eventList.availabilities.binary[8] === '1') { //se trabalha pela tarde
                    const ev = searchEvent(i, '1')
                    if (ev) afternoon = <Event type='event' description={ev.name} />;
                    else afternoon = <Event type='free' description='Tarde' />;
                } else //se não trabalha pela tarde
                    afternoon = <Event />;

                if (eventList.availabilities.binary[9] === '1') { //se trabalha pela noite
                    const ev = searchEvent(i, '2')
                    if (ev) night = <Event type='event' description={ev.name} />;
                    else night = <Event type='free' description='Noite' />;
                } else //se não trabalha pela noite
                    night = <Event />;
            }

            week.push(<DayWeek
                numberDay={dateInf.days[i]}
                nameDay={castDayWeek(i)}
                morning={morning}
                afternoon={afternoon}
                night={night}
            />)
        }
        dispatch(handleCalendarWeek(week))
    }

    const searchEvent = (day, period) => {
        for (let i = 0; i < eventList.events.length; i++)
            if (eventList.events[i].day_week === day)
                if (eventList.events[i].period.toString() === period.toString())
                    return eventList.events[i];
    }

    return <div className={'container'}>
        
        <div className={'less'} onClick={() => handleWeek('less')}>
            <img src={Less} draggable={false} alt='' />
        </div>
        <div className={'more'} onClick={() => handleWeek('more')}>
            <img src={More} draggable={false} alt='' />
        </div>

        <div className={'box left'} onClick={() => handleWeekMobile('less')} />
        <div className={'box center'} ref={refBox}>
            <div className={'wrap'}>
                <Core />
            </div>
        </div>
        <div className={'box right'} onClick={() => handleWeekMobile('more')} />
    </div>
}