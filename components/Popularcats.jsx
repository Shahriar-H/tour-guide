import { Entypo } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { api_URl } from '../assets/lib';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const Popularcats = () => {
    const [placetypesare, setplacetypesare] = useState(null);
    const router = useRouter()
    const getplacetype = ()=>{
        fetch(api_URl+"/get-item",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({query:{},table:"place_type"})
        })
        .then((res)=>res.json())
        .then((result)=>{
            console.log(result);
            
            setplacetypesare(result?.result)
        })
    }
    useEffect(() => {
        getplacetype()
    }, []);
    return (
        <View>
            <View className={`w-full rounded bg-gray-800 py-5 px-4 mt-4`}>
                <Text className={`text-white text-2xl font-bold mb-2`}>
                <Entypo name="circle" size={24} color="white" /> Category
                </Text>
                <View className="flex flex-row justify-start flex-wrap">
                    {
                        placetypesare&&placetypesare?.map((item,index)=>{
                            return <TouchableOpacity onPress={()=>router.push({pathname:"catwiseplaces", params:{data:item?.name}})} key={index} className="w-1/3 p-1 py-4">
                                <View className="justify-center items-center ">
                                    {<Image source={{uri:item?.image??"https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"}} className={`w-20 h-20 rounded-full`} />
                                    }
                                </View>
                                <Text className='text-center text-gray-300'>{item?.name.substr(0,10)}{item?.name?.length>10&&'...'}</Text>
                            </TouchableOpacity>
                        })
                    }
                    
                    
                    
                    
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Popularcats;
