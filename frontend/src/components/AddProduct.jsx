import { useState } from "react";

function AddProduct({ setCurrentPage }) {
    const [product, setProduct] = useState({
        proName: "",
        desc: "",
        date: "",
        color: "",
        price: "",
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setProduct((previousProduct) => ({
            ...previousProduct,
            [name]: value,
        }));
    };

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];

        if (selectedImage) {
            setImageFile(selectedImage);

            const previewUrl = URL.createObjectURL(selectedImage);

            setImagePreview(previewUrl);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!imageFile) {
            setMessage("Please select a product image.");
            return;
        }

        setLoading(true);
        setMessage("");

        const formData = new FormData();

        formData.append(
            "product",
            new Blob([JSON.stringify(product)], {
                type: "application/json",
            })
        );

        formData.append("imageFile", imageFile);

        try {
            const response = await fetch(
                "http://localhost:8083/api/product",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Failed to add product: ${response.status}`
                );
            }

            setMessage("Product added successfully!");

            setProduct({
                proName: "",
                desc: "",
                date: "",
                color: "",
                price: "",
            });

            setImageFile(null);
            setImagePreview("");

            setTimeout(() => {
                setCurrentPage("home");
            }, 1000);
        } catch (error) {
            console.error("Add-product error:", error);

            setMessage(
                "Failed to add product. Check the Spring Boot console."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="add-product-page">
            <div className="add-product-card">
                <h1>Add New Product</h1>

                <p className="form-description">
                    Enter the product information and select an image.
                </p>

                <form
                    className="product-form"
                    onSubmit={handleSubmit}
                >
                    <div className="form-group">
                        <label htmlFor="proName">
                            Product Name
                        </label>

                        <input
                            id="proName"
                            type="text"
                            name="proName"
                            value={product.proName}
                            placeholder="Enter product name"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="desc">
                            Description
                        </label>

                        <textarea
                            id="desc"
                            name="desc"
                            value={product.desc}
                            placeholder="Enter product description"
                            rows="4"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="color">
                                Product Color
                            </label>

                            <input
                                id="color"
                                type="text"
                                name="color"
                                value={product.color}
                                placeholder="Example: Black"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="price">
                                Price
                            </label>

                            <input
                                id="price"
                                type="number"
                                name="price"
                                value={product.price}
                                placeholder="Enter price"
                                min="0"
                                step="0.01"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">
                            Product Date
                        </label>

                        <input
                            id="date"
                            type="date"
                            name="date"
                            value={product.date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">
                            Product Image
                        </label>

                        <input
                            id="image"
                            type="file"
                            accept="image/png, image/jpeg, image/webp"
                            onChange={handleImageChange}
                            required
                        />
                    </div>

                    {imagePreview && (
                        <div className="image-preview-container">
                            <p>Image Preview</p>

                            <img
                                className="image-preview"
                                src={imagePreview}
                                alt="Selected product preview"
                            />
                        </div>
                    )}

                    <div className="form-actions">
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={() => setCurrentPage("home")}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="submit-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Adding Product..."
                                : "Add Product"}
                        </button>
                    </div>
                </form>

                {message && (
                    <p className="form-message">
                        {message}
                    </p>
                )}
            </div>
        </main>
    );
}

export default AddProduct;