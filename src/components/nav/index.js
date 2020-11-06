import React from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { handleShowModal } from '../../fluxArchiteture/actions/general_action';
import BtnColor from '../basics/btnColor';
import BtnLine from '../basics/btnLine';

const Nav = (props) => {
    const dispatch = useDispatch();
    const handleModal = useSelector(state => state.general.showModal);
    const selectedMonth = useSelector(state => state.general.selectedMonth);
    const selectedMonthDay = useSelector(state => state.general.selectedMonthDay);

    const modalHandler = () => {
        dispatch(handleShowModal(!handleModal));
    }

    return <div className={`nav ${props.type}`}>
        <div className={'item start'} >
            {selectedMonth}<span className={'month-day'}>&nbsp;{selectedMonthDay}</span>
        </div>
        <div className={'item end'}>
            <div className={'wrap-btn'}>
                {props.type === 'top' &&
                    <BtnColor onClick={modalHandler}>Novo Evento</BtnColor>}
                {props.type === 'bottom' &&
                    <BtnLine onClick={modalHandler}>Cadastrar Evento</BtnLine>}
            </div>
        </div>
    </div>
}

Nav.defaultProps = {
    type: 'bottom',
}

export default Nav;