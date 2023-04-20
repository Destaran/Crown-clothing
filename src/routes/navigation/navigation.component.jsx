import { Fragment, useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import { Outlet, Link } from 'react-router-dom';
import CrwnLogo from '../../assets/crown.svg';

import CartIcon from '../../Components/cart-icon/CartIcon.component';
import CartDropdown from '../../Components/cart-dropdown/CartDropdown.component';

import {NavigationContainer, LogoContainer, NavLink, NavLinks } from './navigation.styles.jsx';

import {signOutAuthUser} from '../../utils/firebase/firebase.utils';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { showCart } = useContext(CartContext);

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <img src={CrwnLogo} className='logo' />
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>
                        SHOP
                    </NavLink>
                    {currentUser ? (
                        <NavLink as='span' onClick={signOutAuthUser}>
                            SIGN OUT
                        </NavLink>
                    ) : (
                        <NavLink to='/auth'>
                            SIGN IN
                        </NavLink>
                    )}
                    <CartIcon />
                </NavLinks>
                {showCart && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;