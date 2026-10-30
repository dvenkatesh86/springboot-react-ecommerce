function Cart({ cartItems, setCartItems }) {
    const totalPrice = cartItems.reduce(
        (total, item) => total + Number(item.price),
        0
    );

    const removeFromCart = (indexToRemove) => {
        const updatedCart = cartItems.filter(
            (_, index) => index !== indexToRemove
        );

        setCartItems(updatedCart);
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <div className="cart-page">
            <h1>Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <p className="message">Your cart is empty.</p>
            ) : (
                <>
                    <div className="cart-container">
                        {cartItems.map((item, index) => (
                            <div
                                className="cart-item"
                                key={`${item.id}-${index}`}
                            >
                                <div>
                                    <h3>{item.name}</h3>
                                    <p>₹{Number(item.price).toLocaleString("en-IN")}</p>
                                </div>

                                <button
                                    className="delete-button"
                                    onClick={() => removeFromCart(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <h2>
                        Total: ₹{totalPrice.toLocaleString("en-IN")}
                    </h2>

                    <button
                        className="clear-button"
                        onClick={clearCart}
                    >
                        Clear Cart
                    </button>
                </>
            )}
        </div>
    );
}

export default Cart;