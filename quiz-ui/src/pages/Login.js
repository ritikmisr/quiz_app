import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
import Label from '../components/Label';
import TextField from '../components/TextField';
import Button from '../components/Button';
import { handleLogin } from '../actions/userAction';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [IsErrorFound, setIsErrorFound] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user);

    const handleClick = async () => {
        if(email === '' || password === '') {
            setIsErrorFound('Please fill all the details');
            return;
        }
        try {
            await dispatch(handleLogin({ email, password }));
        }
        catch (e) {
            setIsErrorFound('Something went wrong!');
        }

        setEmail('');
        setPassword('');
        setIsErrorFound('');
    }

    useEffect(() => {
        const { token, error } = userData;
        if (error) {
            setIsErrorFound(error);
        } else if (token) {
            localStorage.setItem('token', token);
            navigate('/get-camer-access');
        }
    }, [userData, navigate]);

    return (
        <Card className={'card center-aligned card-height-medium'}>
            <h1 className='sign-up-header'>Login</h1>
            {IsErrorFound && <div className='error'>{IsErrorFound}</div>}

            <div className='email-container'>
                <Label
                    label='Email'
                    className={'label bold-label'}
                    Htmlfor={'email-field'}
                />
                <TextField
                    type={'email'}
                    id={'email-field'}
                    className={'textfield'}
                    placeholder={'Enter Email'}
                    value={email}
                    handleChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className='password-container'>
                <Label
                    label='Password'
                    className={'label bold-label'}
                    Htmlfor={'password-field'}
                />
                <TextField
                    type={'password'}
                    id={'password-field'}
                    className={'textfield'}
                    placeholder={'Enter Password'}
                    value={password}
                    handleChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className='button-container'>
                <Button 
                    className={'btn btn-primary'} 
                    label={'Login'} 
                    handleClick = {handleClick} 
                />
                <Button
                    className={'btn'}
                    label={'Sign up'}
                    handleClick={() => navigate('/')}
                />
            </div>
        </Card>
    )
}


export default Login;