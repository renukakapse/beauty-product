import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // ✅ Get current logged in user
  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("currentUser"));
  };

  // ✅ Dynamic cart key per user
  const getCartKey = () => {
    const currentUser = getCurrentUser();
    return currentUser
      ? `shoppingCart_${currentUser.id}`
      : "shoppingCart_guest";
  };

  // ✅ Load cart based on user
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem(getCartKey());
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // ✅ Reload cart when user changes
  useEffect(() => {
    const savedCart = localStorage.getItem(getCartKey());
    setCartItems(savedCart ? JSON.parse(savedCart) : []);
  }, []);

  // ✅ Save cart to user-specific localStorage
  useEffect(() => {
    localStorage.setItem(getCartKey(), JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Add product to cart
  const addToCart = (product) => {
    const selectedSize = product.selectedSize || "M";

    setCartItems((previousCart) => {
      const existingProduct = previousCart.find(
        (cartItem) =>
          cartItem.id === product.id && cartItem.selectedSize === selectedSize,
      );

      if (existingProduct) {
        return previousCart.map((cartItem) =>
          cartItem.id === product.id && cartItem.selectedSize === selectedSize
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem,
        );
      }

      return [
        ...previousCart,
        {
          ...product,
          selectedSize,
          quantity: 1,
        },
      ];
    });
  };

  // ✅ Increase quantity
  const increaseQuantity = (productId, selectedSize) => {
    setCartItems((previousCart) =>
      previousCart.map((cartItem) =>
        cartItem.id === productId && cartItem.selectedSize === selectedSize
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            }
          : cartItem,
      ),
    );
  };

  // ✅ Decrease quantity
  const decreaseQuantity = (productId, selectedSize) => {
    setCartItems((previousCart) =>
      previousCart
        .map((cartItem) =>
          cartItem.id === productId && cartItem.selectedSize === selectedSize
            ? {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              }
            : cartItem,
        )
        .filter((cartItem) => cartItem.quantity > 0),
    );
  };

  // ✅ Remove product
  const removeFromCart = (productId, selectedSize) => {
    setCartItems((previousCart) =>
      previousCart.filter(
        (cartItem) =>
          !(
            cartItem.id === productId && cartItem.selectedSize === selectedSize
          ),
      ),
    );
  };

  // ✅ Clear cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(getCartKey());
  };

  // ✅ Logout helper
  const resetCartForUser = () => {
    const savedCart = localStorage.getItem(getCartKey());
    setCartItems(savedCart ? JSON.parse(savedCart) : []);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        resetCartForUser,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ✅ Custom hook
export function useCart() {
  return useContext(CartContext);
}