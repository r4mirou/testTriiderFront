import React, { useRef, useState } from 'react'
import './style.css';
import AppBar from '../../components/appBar';
import InputTxt from '../../components/basics/inputTxt';
import BtnGradient from '../../components/basics/btnGradient';
import { POST } from '../../utils/handleRequest';
import { useHistory } from "react-router-dom";

export default () => {
    const history = useHistory();
    const userRef = useRef(null);
    const passRef = useRef(null);
    const [messageAlert, setMessageAlert] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!validadeInputs())
            return;

        console.log(userRef.current.value, passRef.current.value)

        const res = await POST({
            query: `
                mutation createNewToken($login: String!, $password: String!) {
                    createToken(login: $login, password: $password) {
                        token
                    }
                }
                `,
            variables: {
                login: userRef.current.value,
                password: passRef.current.value,

            },
        });

        if (res.errors) {
            setMessageAlert(true);
            return
        }

        await localStorage.setItem('tknTriider', res.data.createToken.token);
        history.push({ pathname: '/calendar' })
    }

    const validadeInputs = () => {        
        if (!(userRef.current.value === ''))
            if (!(passRef.current.value === ''))
                return true;
                
        setMessageAlert(true);
        return false;
    }

    return <>
        <AppBar />
        <div className={'container-login'}>
            <div className={'box-left'}></div>
            <div className={'box-right'}>
                <div className={'wrap-login'}>                    
                    <form className='form-login' onSubmit={(e) => submitHandler(e)}>                    
                    {!!messageAlert && <div className={'alert-login'}>Login inválido!</div>}
                        <div className={'title-login'}>Login</div>
                        <InputTxt label={'Email/Usuário'} internRef={userRef} />
                        <InputTxt type={'password'} label={'Senha'} internRef={passRef} />
                        <BtnGradient >Entrar</BtnGradient>
                    </form>
                    <div className={'options-login'}>
                        <div className={'recovery-pass'}>Esqueci minha senha</div>
                        <hr />
                        <div className={'no-account'}>Não possui uma conta?</div>
                        <div className={'create-account'}>Criar conta</div>
                    </div>
                </div>
            </div>

        </div>
    </>
}