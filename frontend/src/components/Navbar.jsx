import {
    useEffect,
    useState,
} from "react";


function Navbar({
                    cartCount,
                    setCurrentPage,
                    setSearchKeyword,
                }) {

    const [keyword, setKeyword] =
        useState("");

    const [suggestions, setSuggestions] =
        useState([]);

    const [showDropdown, setShowDropdown] =
        useState(false);


    // Search products while typing
    useEffect(() => {

        // Do not show dropdown when input is empty
        if (keyword.trim() === "") {

            setSuggestions([]);

            setShowDropdown(false);

            return;
        }


        // Wait 300 milliseconds after typing
        const timer = setTimeout(
            async () => {

                try {

                    const response = await fetch(

                        "http://localhost:8083/api/product/search"
                        + "?keyword="
                        + encodeURIComponent(
                            keyword
                        )

                    );


                    if (!response.ok) {

                        throw new Error(
                            "Unable to search products"
                        );

                    }


                    const data =
                        await response.json();


                    setSuggestions(
                        data
                    );


                    setShowDropdown(
                        true
                    );


                } catch (error) {

                    console.error(
                        "Search error:",
                        error
                    );


                    setSuggestions([]);

                }

            },

            300

        );


        // Cancels the previous search timer
        return () => {

            clearTimeout(
                timer
            );

        };


    }, [keyword]);


    const handleSearch = (event) => {

        event.preventDefault();


        if (
            keyword.trim() === ""
        ) {

            return;

        }


        setSearchKeyword(
            keyword.trim()
        );


        setCurrentPage(
            "home"
        );


        setShowDropdown(
            false
        );

    };


    const handleSuggestionClick =
        (product) => {


            setKeyword(
                product.proName
            );


            setSearchKeyword(
                product.proName
            );


            setCurrentPage(
                "home"
            );


            setShowDropdown(
                false
            );

        };


    const handleHome = () => {

        setKeyword("");

        setSearchKeyword("");

        setSuggestions([]);

        setShowDropdown(false);

        setCurrentPage(
            "home"
        );

    };


    return (

        <nav className="navbar">


            <h2
                className="logo"
                onClick={
                    handleHome
                }
            >

                My E-Commerce

            </h2>


            <div
                className="search-container"
            >


                <form

                    className="search-form"

                    onSubmit={
                        handleSearch
                    }

                >


                    <input

                        type="text"

                        placeholder=
                            "Search products..."

                        value={
                            keyword
                        }

                        onChange={
                            (event) => {

                                setKeyword(
                                    event.target.value
                                );

                            }
                        }

                        onFocus={
                            () => {

                                if (
                                    suggestions.length > 0
                                ) {

                                    setShowDropdown(
                                        true
                                    );

                                }

                            }
                        }

                        autoComplete="off"

                    />


                    <button
                        type="submit"
                    >

                        Search

                    </button>


                </form>


                {

                    showDropdown

                    && (

                        <div
                            className=
                                "search-dropdown"
                        >


                            {

                                suggestions.length > 0

                                    ? (

                                        suggestions.map(

                                            (product) => (


                                                <div

                                                    key={
                                                        product.proId
                                                    }

                                                    className=
                                                        "search-suggestion"

                                                    onClick={
                                                        () =>

                                                            handleSuggestionClick(
                                                                product
                                                            )
                                                    }

                                                >


                                                    <img

                                                        src={

                                                            `http://localhost:8083/api/product/${product.proId}/image`

                                                        }

                                                        alt={
                                                            product.proName
                                                        }

                                                    />


                                                    <div>


                                                        <h4>

                                                            {
                                                                product.proName
                                                            }

                                                        </h4>


                                                        <p>

                                                            {
                                                                product.brand
                                                            }

                                                            {

                                                                product.category

                                                                &&

                                                                ` • ${product.category}`

                                                            }

                                                        </p>


                                                        <strong>

                                                            ₹{
                                                            product.price
                                                        }

                                                        </strong>


                                                    </div>


                                                </div>


                                            )

                                        )

                                    )

                                    : (

                                        <p
                                            className=
                                                "no-search-result"
                                        >

                                            No related products

                                        </p>

                                    )

                            }


                        </div>

                    )

                }


            </div>


            <div
                className="nav-buttons"
            >


                <button
                    onClick={
                        handleHome
                    }
                >

                    Home

                </button>


                <button

                    onClick={
                        () =>

                            setCurrentPage(
                                "addProduct"
                            )
                    }

                >

                    Add Product

                </button>


                <button

                    onClick={
                        () =>

                            setCurrentPage(
                                "cart"
                            )
                    }

                >

                    Cart ({cartCount})

                </button>


            </div>


        </nav>

    );

}


export default Navbar;