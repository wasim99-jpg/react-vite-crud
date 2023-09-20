import { useEffect, useState } from "react";
import axios from "axios"
import Product from "../components/Product"
import { Link } from "react-router-dom";
//import { VITE_BACKEND_URL } from "../App";

const HomePage = () => {

    const [ products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getProducts = async () => {
        try{
            //start loading
            setIsLoading(true);

            //await response from http request
            const response = await axios.get(`https://be-node-api.onrender.com/api/products`);

            //display response data in console log
            console.log(response.data);

            //set product into product variable from response data
            setProducts(response.data);

            //loading is finish
            setIsLoading(false);
        }catch (error){
            console.log(error);
        }
    }

    //call useeffect when application first load
    useEffect(() => {
        getProducts();
    },[])

    return (
        //if loading=yes, then display "loading"
        <div>
            <div>
                <Link to="/create" className="inline-block mt-4 shadow-md bg-blue-700 text-white rounded-lg px-4 py-2 font-bold hover:bg-blue-500 hover:cursor-pointer">Create a product</Link>
            </div>
            
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
            {isLoading ? (
            "Loading"
        // ") : (" == else statement
        //if loading=no, then display product
        ) : (
            // if product more than 0, display product
            <>
            {products.length > 0 ? (
                <>
                {
                    products.map((product,index) => {
                        return (
                            <Product key={index} product={product} getProducts={getProducts}/>
                        )
                    })
                }
                </>

            //if product =< 0, display "there is no product"
            ) : (
                <div>
                    There is no product
                </div>
            ) }
            </>
        )}</div>
        </div>
    );
}

export default HomePage;