import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//import { VITE_BACKEND_URL } from "../App";

const CreatePage = () => {

    const [name, setName] =useState("");
    const [quantity,setQuantity] =useState("");
    const [price,setPrice] =useState("");
    const [image,setImage] =useState("");
    const [isLoading,setIsLoading] =useState("");
    const navigate = useNavigate();
 

    const saveProduct = async (e) => {
        e.preventDefault();
        if(name === "" || quantity === "" || price === "" || image ==="") {
            
            toast.warn('please fill all input completely', {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        }
        try{
            setIsLoading(true);
            const response = await axios.post(`https://be-node-api.onrender.com/api/products`,
            {
                name: name,
                quantity:quantity,
                price:price,
                image:image
            })
            
            toast.success(`save ${response.data.name} successuflly`, {
                position: toast.POSITION.TOP_CENTER
            })
            setIsLoading(false);
            navigate("/");
        }catch {
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER
            });
            
            setIsLoading(false);
        }
    }
 
    return (
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
           <h2 className="font-semibold text-2xl mb-4 block text-center">
           Create a Product
           </h2>
            <form onSubmit={saveProduct}>
                <div className="space-y-2">
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400" placeholder="enter Name"/>
                </div>

                <div className="space-y-2">
                    <label>Quantity</label>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400" placeholder="enter Quantity"/>
                </div>
                <div className="space-y-2">
                    <label>Price</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400" placeholder="enter Price"/>
                </div>
                <div className="space-y-2">
                    <label>Image URL</label>
                    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400" placeholder="enter image URL"/>
                </div>
                <div>
                    {!isLoading && (
                        <button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">Create</button>
                    )}
                    
                </div>
            </form>
        </div>
    );
}

export default CreatePage;