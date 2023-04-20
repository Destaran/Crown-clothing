import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import {ShoppingIcon, CartIconContainer, ItemCount} from './CartIcon.styles';

const CartIcon = () => {
  const { showCart, setShowCart, itemsCount } = useContext(CartContext);

  const toggleShowCart = () => {setShowCart(!showCart)}

  return (
    <CartIconContainer onClick={toggleShowCart}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{itemsCount}</ItemCount>
    </CartIconContainer>
  );
}

export default CartIcon;