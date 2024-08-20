import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Label from '../components/Label';
import TextField from '../components/TextField';
import Button from '../components/Button';
import { handleSignup } from '../actions/userAction';
import './Signup.css';

function Signup() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isErrorFound, setIsErrorFound] = useState('');
    const userData = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = async () => {
        if (fullName === '' || email === '' || password === '') {
            setIsErrorFound('Please fill all the details');
            return;
        }
        try {
            await dispatch(handleSignup({ fullName, email, password }));
        }
        catch (e) {
            setIsErrorFound('Something went wrong!');
        }

        setFullName('');
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
        <Card className={'card center-aligned'}>
            <h1 className='sign-up-header'>Sign up</h1>
            {isErrorFound && <div className='error'>{isErrorFound}</div>}
            <div className='name-container'>
                <Label
                    label='Full Name'
                    className={'label bold-label'}
                    Htmlfor={'name-field'}
                />
                <TextField
                    type={'text'}
                    id={'name-field'}
                    className={'textfield'}
                    placeholder={'Enter Name'}
                    value={fullName}
                    handleChange={(e) => setFullName(e.target.value)}
                />
            </div>

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
                    label={'Signup'}
                    handleClick={handleClick}
                />
                <Button
                    className={'btn'}
                    label={'Login'}
                    handleClick={() => navigate('/login')}
                />
            </div>
        </Card>
    );
}

export default Signup;