import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils'

import { useState } from 'react';

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../formInput/formInput.component";

import {SignInContainer, SignInH2, ButtonsContainer} from './sign-in-form.styles';

const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password');
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with this email');
                    break;
                default:
                    console.log(error);
            }
        }
    };

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <SignInContainer>
            <SignInH2>Already have an account?</SignInH2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email'
                    required
                    type='text'
                    value={email}
                    name='email'
                    onChange={handleChange}
                />
                <FormInput
                    label='Password'
                    required
                    type="password"
                    value={password}
                    name='password'
                    onChange={handleChange}
                />
                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign In</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;