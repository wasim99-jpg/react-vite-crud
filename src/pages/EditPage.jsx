import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";



const EditPage =  () => {
    let {id} = useParams();
    const navigate = useNavigate();
    const [isLoading,setIsLoading] = useState("");
    const [product, setProduct] = useState({
        name : "",
        quantity : "",
        price : "",
        image : "",
    })

    const getProducts = async () => {
        setIsLoading(true);
        try {
        const response = await axios.get(`http://localhost:3000/api/products/${id}`);
            setProduct({
                name: response.data.name,
                quantity : response.data.quantity,
                price : response.data.price,
                image : response.data.image,
            })
            setIsLoading(false)

        }catch (error) {
            setIsLoading(false)
            toast.error(error.message)
        }
    }

    const updateProduct= async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try{
            await axios.put(`http://localhost:3000/api/products/${id}`,product)
            toast.success("update product successfully")
            navigate('/')

        }catch(error){
            setIsLoading(false);
            toast.error(error.message);
        }

    }

    useEffect(() => {
        getProducts();
    },[])

    return (
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
           <h2 className="font-semibold text-2xl mb-4 block text-center">
           Edit a Product - {product.name}
           </h2>
           {isLoading ? ("Loading") : (
            <>
            
           
            <form onSubmit={updateProduct}>
            <div className="space-y-2">
                    <label>ID {id}</label>
                </div>
                <div className="space-y-2">
                    <label>Name</label>
                    <input type="text" value={product.name} onChange={(e) => setProduct({...product, name : e.target.value}) } className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400" placeholder="enter Name"/>
                </div>
                <div className="space-y-2">
                    <label>Quantity</label>
                    <input type="number" value={product.quantity} onChange={(e) => setProduct({...product, quantity : e.target.value}) }  className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400" placeholder="enter Quantity"/>
                </div>
                <div className="space-y-2">
                    <label>Price</label>
                    <input type="number" value={product.price} onChange={(e) => setProduct({...product, price : e.target.value}) }  className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400" placeholder="enter Price"/>
                </div>
                <div className="space-y-2">
                    <label>Image URL</label>
                    <input type="text" value={product.image} onChange={(e) => setProduct({...product, image : e.target.value}) }  className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400" placeholder="enter image URL"/>
                </div>
                <div>
                    {!isLoading && (
                        <button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">Update</button>
                    )}
                    
                </div>
            </form>
            </>
            )}
        </div>
    );
}

export default EditPage;