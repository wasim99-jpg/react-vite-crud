const HomePage = () => {

    const [ products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const getProducts = () => {
        try{
            setIsLoading(true);
            const response = axios.get();
        }catch (error){
            console.log(error);
        }
    }
    return (
        <div>This is Homepage</div>
    );
}

export default HomePage;