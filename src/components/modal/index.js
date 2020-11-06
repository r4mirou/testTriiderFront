import React, { useRef, useState } from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { handleShowModal } from '../../fluxArchiteture/actions/general_action';
import { POST } from '../../utils/handleRequest';
import InputTxt from '../../components/basics/inputTxt'
import InputDate from '../../components/basics/inputDate'
import Select from '../../components/basics/select'
import CheckBox from '../../components/basics/checkBox'
import BtnGradient from '../../components/basics/btnGradient'

export default () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const handleModal = useSelector(state => state.general.showModal);
    const [messageAlert, setMessageAlert] = useState(false);
    const blockRef = useRef(null);
    const nameRef = useRef(null);
    const localRef = useRef(null);
    const dateRef = useRef(null);
    const turnRef = useRef(null);

    const submitHandler = async (e) => {

        e.preventDefault();
        if (!validadeInputs())
            return;

        const res = await POST({
            query: `
                mutation addEvent($input: EventCreateInput!) {
                    createEvent(input: $input){
                        id
                        name
                    }
                }
                `,
            variables: {
                input: {
                    name: nameRef.current.value,
                    date: dateRef.current.value,
                    local: localRef.current.value,
                    period: parseInt(turnRef.current.value),
                    block: blockRef.current.checked
                }
            },
        });

        if (res.errors) {
            setMessageAlert(res.errors[0].message);
            return
        }

        const filter = `?date=${dateRef.current.value}`
        clearInputs();
        setMessageAlert(false);
        dispatch(handleShowModal(!handleModal));

        history.push({
            pathname: '/calendar',
            search: filter,
        })
    }

    const clearInputs = () => {
        nameRef.current.value = '';
        localRef.current.value = '';
        dateRef.current.value = '';
        turnRef.current.value = 0;
    }

    const validadeInputs = () => {
        if (!(nameRef.current.value === ''))
            if (!(localRef.current.value === ''))
                if (!(dateRef.current.value === ''))
                    if (!(turnRef.current.value === ''))
                        return true;

        setMessageAlert('Todos os campos devem ser preenchidos!');
        return false;
    }

    return <div className={`modal-background modal-showing-${handleModal}`}>
        <div className='container-modal'>
            <div className={'container-title'}>
                <div className='title-modal'>Cadastrar evento</div>
                <div className='close-modal' onClick={() => {
                    dispatch(handleShowModal(!handleModal));
                    clearInputs();
                    setMessageAlert(false)
                }}>X</div>
            </div>
            {!!setMessageAlert && <div className={'alert'}>{messageAlert}</div>}
            <form className='form' onSubmit={(e) => submitHandler(e)}>
                <div className={'check-container'}>
                    <CheckBox name={'Evento Bloqueante'} internRef={blockRef} />
                </div>
                <InputTxt label={'Nome do evento'} internRef={nameRef} />
                <InputTxt label={'Local'} internRef={localRef} />

                <div className={'side-by-side'}>
                    <InputDate label={'Data'} internRef={dateRef} />
                    <Select label={'Turno'} internRef={turnRef} options={['Manhã', 'Tarde', 'Noite']} />
                </div>
                <BtnGradient>Adicionar evento</BtnGradient>
            </form>
        </div>
    </div>
}