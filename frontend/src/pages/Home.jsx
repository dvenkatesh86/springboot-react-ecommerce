import {
    useEffect,
    useState,
} from "react";

import Product
    from "../components/Product.jsx";


function Home({

                  addToCart,

                  setProductToUpdate,

                  setCurrentPage,

                  searchKeyword,

              }) {


    const [
        products,
        setProducts,
    ] = useState([]);


    const [
        loading,
        setLoading,
    ] = useState(true);


    const [
        error,
        setError,
    ] = useState("");


    const getProducts =
        async () => {


            setLoading(true);


            try {


                let url;


                // If search is empty,
                // get all products

                if (
                    !searchKeyword
                ) {


                    url =
                        "http://localhost:8083/api/product";


                } else {


                    // Search products

                    url =

                        "http://localhost:8083/api/product/search"

                        + "?keyword="

                        + encodeURIComponent(

                            searchKeyword

                        );


                }


                const response =

                    await fetch(

                        url

                    );


                if (
                    !response.ok
                ) {


                    throw new Error(

                        "Unable to get products"

                    );


                }


                const data =

                    await response.json();


                setProducts(

                    data

                );


                setError("");


            } catch (error) {


                console.error(

                    error

                );


                setError(

                    "Products could not be loaded."

                );


            } finally {


                setLoading(

                    false

                );


            }


        };


    useEffect(

        () => {


            getProducts();


        },

        [
            searchKeyword,
        ]

    );


    const handleUpdate =

        (product) => {


            setProductToUpdate(

                product

            );


            setCurrentPage(

                "updateProduct"

            );


        };


    const handleDelete =

        async (proId) => {


            const confirmDelete =

                window.confirm(

                    "Are you sure you want to delete this product?"

                );


            if (
                !confirmDelete
            ) {


                return;


            }


            try {


                const response =

                    await fetch(


                        `http://localhost:8083/api/product/${proId}`,


                        {

                            method:
                                "DELETE",

                        }


                    );


                if (
                    !response.ok
                ) {


                    throw new Error(

                        "Product could not be deleted"

                    );


                }


                alert(

                    "Product deleted successfully"

                );


                setProducts(

                    (
                        previousProducts
                    ) =>


                        previousProducts.filter(


                            (product) =>


                                product.proId

                                !==

                                proId


                        )


                );


            } catch (error) {


                console.error(

                    error

                );


                alert(

                    "Failed to delete product"

                );


            }


        };


    if (
        loading
    ) {


        return (

            <h2
                className="message"
            >

                Loading products...

            </h2>

        );


    }


    if (
        error
    ) {


        return (

            <h2
                className="error-message"
            >

                {error}

            </h2>

        );


    }


    return (

        <main>


            <h1>


                {

                    searchKeyword

                        ? `Search results for "${searchKeyword}"`

                        : "Our Products"

                }


            </h1>


            {

                products.length

                === 0

                    ? (


                        <p
                            className="message"
                        >


                            {

                                searchKeyword

                                    ? `No products found for "${searchKeyword}".`

                                    : "No products available."

                            }


                        </p>


                    )

                    : (


                        <div
                            className="product-container"
                        >


                            {

                                products.map(

                                    (product) => (


                                        <Product


                                            key={
                                                product.proId
                                            }


                                            product={
                                                product
                                            }


                                            addToCart={
                                                addToCart
                                            }


                                            onUpdate={
                                                handleUpdate
                                            }


                                            onDelete={
                                                handleDelete
                                            }


                                        />


                                    )

                                )


                            }


                        </div>


                    )


            }


        </main>

    );


}


export default Home;