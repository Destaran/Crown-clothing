import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

import Button from '../button/button.component';
import FormInput from '../formInput/formInput.component';

import {SignUpContainer, SignUpH2} from './sign-up-form.styles';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};


const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            if(error.code == 'auth/email-already-in-use') {
                alert('Email already in use!');
            } else {
                console.log('User creation encountered an error!', error);
            }
        }
    };

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <SignUpContainer>
            <SignUpH2>Don't have an account?</SignUpH2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Display Name' 
                    required 
                    type="text" 
                    onChange={handleChange} 
                    name='displayName' 
                    value={displayName} 
                />
                <FormInput
                    label='Email' 
                    required 
                    type="text" 
                    onChange={handleChange} 
                    name='email' 
                    value={email} 
                />
                <FormInput
                    label='Password' 
                    required 
                    type="password" 
                    onChange={handleChange} 
                    name='password' 
                    value={password} 
                />
                <FormInput
                    label='Confirm Password' 
                    required 
                    type="password" 
                    onChange={handleChange} 
                    name='confirmPassword' 
                    value={confirmPassword} 
                />

                <Button type="submit" >Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;