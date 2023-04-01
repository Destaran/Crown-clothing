import SignInForm from '../../Components/sign-in-form/sign-in-form.component';
import SignUpForm from '../../Components/sign-up-form/sign-up-form.component';

import './authentication.scss';

const Authentication = () => {

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