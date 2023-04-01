import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import './CartIcon.styles.scss';

const CartIcon = () => {
  const { showCart, setShowCart } = useContext(CartContext);

  const toggleShowCart = () => {setShowCart(!showCart)}

  return (
    <div className="cart-icon-container" onClick={toggleShowCart}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
}

export default CartIcon;