import { Fragment, useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import { Outlet, Link } from 'react-router-dom';
import CrwnLogo from '../../assets/crown.svg';

import CartIcon from '../../Components/cart-icon/CartIcon.component';
import CartDropdown from '../../Components/cart-dropdown/CartDropdown.component';

import './navigation.styles.scss';

import {signOutAuthUser} from '../../utils/firebase/firebase.utils';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { showCart } = useContext(CartContext);

    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <img src={CrwnLogo} className='logo' />
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                    {currentUser ? (
                        <span className='nav-link' onClick={signOutAuthUser}>
                            SIGN OUT
                        </span>
                    ) : (
                        <Link className='nav-link' to='/auth'>
                            SIGN IN
                        </Link>
                    )}
                    <CartIcon />
                </div>
                {showCart && <CartDropdown />}
            </div>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;