import SignInForm from '../../Components/sign-in-form/sign-in-form.component';
import SignUpForm from '../../Components/sign-up-form/sign-up-form.component';

import './authentication.scss';

const Authentication = () => {

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };

    return (
        <div>
            <div className='authentication-container'>
            <SignInForm />
            <SignUpForm />
            </div>
        </div>
    );
};

export default Authentication;