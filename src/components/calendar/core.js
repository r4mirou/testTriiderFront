import React, { useState, useEffect } from 'react';
import './style.css';
import { useSelector } from 'react-redux';

export default (props) => {    
    const calendarWeek = useSelector(state => state.general.calendarWeek); 
    const selectedWeekDay = useSelector(state => state.general.selectedWeekDay); 
    const [breakLayout, setBreakLayout] = useState(window.innerWidth <= 550 ? true : false);

    const updateWidthAndHeight = () => {        
        setBreakLayout(window.innerWidth <= 550 ? true : false)
    };
    
    useEffect(() => {
        window.addEventListener("resize", updateWidthAndHeight);
        return () => window.removeEventListener("resize", updateWidthAndHeight);
    }, []);

    return <>
        {breakLayout && calendarWeek[selectedWeekDay]}
        {!breakLayout && <> {calendarWeek.map((item, index) =>
            <React.Fragment key={index}>{item}</React.Fragment>)}</>}
    </>
}