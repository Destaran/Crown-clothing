import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const itExists = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if (itExists) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

export const CartContext = createContext({
    showCart: false,
    setShowCart: () => { },
    cartItems: [],
    addItemToCart: () => { },
    itemsCount: 0
});

export const CartProvider = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [itemsCount, setItemsCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setItemsCount(newCartCount)
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const incrementItemsCount = () => {
        setItemsCount(itemsCount + 1)
    }

    const value = { showCart, setShowCart, addItemToCart, cartItems, itemsCount };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}