import { useEffect,useState } from "react";
import axios from 'axios';


const useGetColorSwatches = (trigger)=>{
    const [colorsList,setColorsList] = useState([]);
    const [loading,setLoading]=useState(false);
    const [error,setError]= useState(null);

    useEffect(()=>{
        if(trigger){
            const fetchColors=async()=>{
                setLoading(true);
                try{
                    const response = await axios.get('http://127.0.0.1:8000/api/getColors/')
                    setColorsList(response.data)
                }
                catch (err){
                    setError(err)
                }
                finally{
                    setLoading(false)
                }
            };
            fetchColors();
        }
        
    },[trigger])
    return {colorsList,loading,error}
}

export default useGetColorSwatches;