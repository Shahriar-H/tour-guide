import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { api_URl } from "../assets/lib";

const useAuth = ()=>{
    const [data, setdata] = useState({});

    const getData = async () => {
        try {
            fetch(api_URl+"/get-item",{
                method:"POST",
                headers:{
                  "Content-Type":"application/json"
                },
                body: JSON.stringify({query:formData,table:"users"})
            })
            .then((res)=>res.json())
            .then((res)=>{
                console.log(res);
                setisLoading(false)
                if(res.status!==200){
                    return ToastAndroid.show(res?.message,ToastAndroid.LONG)
                }
            
                if(res?.result?.length<1){
                    return ToastAndroid.show("Wrong Info.",ToastAndroid.LONG)
                }
            
            
                
                setformData({
                    email:"",
                    password:''
                })
                ToastAndroid.show(res?.message,ToastAndroid.LONG)
            })
        } catch (e) {
          // error reading value
        }
    };

    useEffect(() => {
        getData()
    }, []);

    return {data,getData}
}

export default useAuth