import { Entypo } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { api_URl } from '../assets/lib';

const Popularcats = () => {
    const [placetypesare, setplacetypesare] = useState(null);
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
                            return <View key={index} className="w-1/3 p-1 py-4">
                                <View className="justify-center items-center ">
                                    {item?.image?<Image source={{uri:item?.image}} className={`w-20 h-20 rounded-full`} />:
                                    <Image source={require("../assets/images/icon.png")} className={`w-20 h-20 rounded-full`} />}
                                </View>
                                <Text className='text-center text-gray-300'>{item?.name}</Text>
                            </View>
                        })
                    }
                    
                    
                    
                    
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Popularcats;
