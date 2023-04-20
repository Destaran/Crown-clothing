import SignInForm from '../../Components/sign-in-form/sign-in-form.component';
import SignUpForm from '../../Components/sign-up-form/sign-up-form.component';

import {AuthenticationContainer} from './authentication.styles';

const Authentication = () => {

    return (
        <div>
            <AuthenticationContainer>
            <SignInForm />
            <SignUpForm />
            </AuthenticationContainer>
        </div>
    );
};

export default Authentication;