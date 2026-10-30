import {
    useState,
} from "react";


function UpdateProduct({

                           productToUpdate,

                           setCurrentPage,

                       }) {


    const [product, setProduct] =
        useState({

            proName:
            productToUpdate.proName,

            desc:
            productToUpdate.desc,

            color:
            productToUpdate.color,

            price:
            productToUpdate.price,

            date:
                productToUpdate.date
                    ? productToUpdate.date
                        .substring(0, 10)
                    : "",

        });


    const [imageFile, setImageFile] =
        useState(null);


    const [loading, setLoading] =
        useState(false);


    const [message, setMessage] =
        useState("");


    const handleChange = (event) => {

        const {
            name,
            value,
        } = event.target;


        setProduct({

            ...product,

            [name]: value,

        });

    };


    const handleSubmit =
        async (event) => {


            event.preventDefault();


            setLoading(true);


            const formData =
                new FormData();


            formData.append(

                "product",

                new Blob(

                    [
                        JSON.stringify(
                            product
                        ),
                    ],

                    {

                        type:
                            "application/json",

                    }

                )

            );


            if (imageFile) {

                formData.append(

                    "imageFile",

                    imageFile

                );

            }


            try {


                const response =
                    await fetch(

                        `http://localhost:8083/api/product/${productToUpdate.proId}`,

                        {

                            method:
                                "PUT",

                            body:
                            formData,

                        }

                    );


                if (!response.ok) {

                    throw new Error(

                        "Update failed"

                    );

                }


                setMessage(

                    "Product updated successfully!"

                );


                setTimeout(

                    () => {

                        setCurrentPage(
                            "home"
                        );

                    },

                    1000

                );


            } catch (error) {


                console.error(
                    error
                );


                setMessage(

                    "Failed to update product."

                );


            } finally {


                setLoading(false);


            }

        };


    return (

        <main
            className="add-product-page"
        >

            <div
                className="add-product-card"
            >


                <h1>

                    Update Product

                </h1>


                <p
                    className="form-description"
                >

                    Change the product
                    information below.

                </p>


                <form

                    className="product-form"

                    onSubmit={
                        handleSubmit
                    }

                >


                    <div
                        className="form-group"
                    >

                        <label>

                            Product Name

                        </label>


                        <input

                            name="proName"

                            value={
                                product.proName
                            }

                            onChange={
                                handleChange
                            }

                            required

                        />

                    </div>


                    <div
                        className="form-group"
                    >

                        <label>

                            Description

                        </label>


                        <textarea

                            name="desc"

                            value={
                                product.desc
                            }

                            onChange={
                                handleChange
                            }

                            required

                        />

                    </div>


                    <div
                        className="form-row"
                    >


                        <div
                            className="form-group"
                        >

                            <label>

                                Product Color

                            </label>


                            <input

                                name="color"

                                value={
                                    product.color
                                }

                                onChange={
                                    handleChange
                                }

                                required

                            />

                        </div>


                        <div
                            className="form-group"
                        >

                            <label>

                                Price

                            </label>


                            <input

                                type="number"

                                name="price"

                                value={
                                    product.price
                                }

                                onChange={
                                    handleChange
                                }

                                required

                            />

                        </div>


                    </div>


                    <div
                        className="form-group"
                    >

                        <label>

                            Product Date

                        </label>


                        <input

                            type="date"

                            name="date"

                            value={
                                product.date
                            }

                            onChange={
                                handleChange
                            }

                            required

                        />

                    </div>


                    <div
                        className="form-group"
                    >

                        <label>

                            New Image

                        </label>


                        <input

                            type="file"

                            accept="image/*"

                            onChange={

                                (event) =>

                                    setImageFile(

                                        event
                                            .target
                                            .files[0]

                                    )

                            }

                        />

                    </div>


                    <div
                        className="form-actions"
                    >


                        <button

                            type="button"

                            className=
                                "cancel-button"

                            onClick={

                                () =>

                                    setCurrentPage(
                                        "home"
                                    )

                            }

                        >

                            Cancel

                        </button>


                        <button

                            type="submit"

                            className=
                                "submit-button"

                            disabled={
                                loading
                            }

                        >

                            {

                                loading

                                    ? "Updating..."

                                    : "Update Product"

                            }

                        </button>


                    </div>


                </form>


                {

                    message && (

                        <p
                            className=
                                "form-message"
                        >

                            {message}

                        </p>

                    )

                }


            </div>

        </main>

    );

}


export default UpdateProduct;