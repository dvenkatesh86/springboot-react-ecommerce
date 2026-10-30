function Product({
                     product,
                     addToCart,
                     onUpdate,
                     onDelete,
                 }) {
    return (
        <div className="product-card">

            <img
                src={`http://localhost:8083/api/product/${product.proId}/image`}
                alt={product.proName}
                onError={(event) => {
                    event.currentTarget.style.display = "none";
                }}
            />

            <h2>{product.proName}</h2>

            <p>
                <strong>Description:</strong>{" "}
                {product.desc}
            </p>

            <p>
                <strong>Color:</strong>{" "}
                {product.color}
            </p>

            <p>
                <strong>Date:</strong>{" "}
                {product.date
                    ? new Date(product.date).toLocaleDateString(
                        "en-IN"
                    )
                    : "Not available"}
            </p>

            <h3>
                ₹
                {Number(product.price).toLocaleString(
                    "en-IN"
                )}
            </h3>

            <div className="product-buttons">

                <button
                    className="cart-button"
                    onClick={() => addToCart(product)}
                >
                    Add to Cart
                </button>

                <button
                    className="update-button"
                    onClick={() => onUpdate(product)}
                >
                    Update
                </button>

                <button
                    className="delete-button"
                    onClick={() =>
                        onDelete(product.proId)
                    }
                >
                    Delete
                </button>

            </div>

        </div>
    );
}

export default Product;