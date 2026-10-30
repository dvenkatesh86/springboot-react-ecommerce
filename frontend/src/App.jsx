import {
    useState,
} from "react";

import "./App.css";

import Navbar
    from "./components/Navbar.jsx";

import Home
    from "./pages/Home.jsx";

import Cart
    from "./components/Cart.jsx";

import AddProduct
    from "./components/AddProduct.jsx";

import UpdateProduct
    from "./components/UpdateProduct.jsx";


function App() {


    const [
        cartItems,
        setCartItems,
    ] = useState([]);


    const [
        currentPage,
        setCurrentPage,
    ] = useState("home");


    const [
        productToUpdate,
        setProductToUpdate,
    ] = useState(null);


    // Stores the product search text

    const [
        searchKeyword,
        setSearchKeyword,
    ] = useState("");


    const addToCart =
        (product) => {


            setCartItems(

                (previousItems) => [

                    ...previousItems,

                    product,

                ]

            );

        };


    return (

        <div className="app">


            <Navbar

                cartCount={
                    cartItems.length
                }

                setCurrentPage={
                    setCurrentPage
                }

                setSearchKeyword={
                    setSearchKeyword
                }

            />


            {

                currentPage
                === "home"

                && (

                    <Home

                        addToCart={
                            addToCart
                        }

                        setProductToUpdate={
                            setProductToUpdate
                        }

                        setCurrentPage={
                            setCurrentPage
                        }

                        searchKeyword={
                            searchKeyword
                        }

                    />

                )

            }


            {

                currentPage
                === "addProduct"

                && (

                    <AddProduct

                        setCurrentPage={
                            setCurrentPage
                        }

                    />

                )

            }


            {

                currentPage
                === "updateProduct"

                &&

                productToUpdate

                && (

                    <UpdateProduct

                        productToUpdate={
                            productToUpdate
                        }

                        setCurrentPage={
                            setCurrentPage
                        }

                    />

                )

            }


            {

                currentPage
                === "cart"

                && (

                    <Cart

                        cartItems={
                            cartItems
                        }

                        setCartItems={
                            setCartItems
                        }

                    />

                )

            }


        </div>

    );

}


export default App;