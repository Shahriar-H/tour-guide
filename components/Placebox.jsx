import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { AuthProvider } from "../app/_layout";
import { api_URl } from "../assets/lib";

const Placebox = ({data,getMyplaces}) => {
  const navigation= useNavigation()
  const {data:sessiondata} = useContext(AuthProvider)
  const [isHowingControllMenu, setisHowingControllMenu] = useState(false);
  const isFocused = useIsFocused()

  const passData = ()=>{
    navigation.navigate("singleplace",{data:data})
  }

  useEffect(() => {
    setisHowingControllMenu(false)
  }, [isFocused]);

  const deleteData = (id)=>{
    fetch(api_URl+"/delete-item",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({query:{id:id},table:"places"})
    })
    .then((res)=>res.json())
    .then((res)=>{
      console.log(res);
      if(res.status!==200){
        return ToastAndroid.show(res?.message,ToastAndroid.SHORT)
      }
      
      
      getMyplaces()
      ToastAndroid.show(res?.message,ToastAndroid.SHORT)
    })
  }
  
  return (
    <View>
      <TouchableOpacity onPress={passData} className={`w-full rounded bg-gray-900 py-5 px-4 mt-4`}>
        <View className="flex flex-row mb-2 items-start border-b pb-2 border-gray-700">
          <Text className="mt-1"><Entypo name="location-pin" size={30} color="white" /></Text>
          <View>
            <Text className={`text-white text-lg font-bold`}>{data?.title}</Text>
            <View className="flex flex-row space-x-1">
              <Text className="text-gray-400 text-xs">{data?.district}</Text>
              <Text className="text-gray-400 text-xs"> | </Text>
              <Text className="text-gray-400 text-xs">{data?.placeType}</Text>
              {sessiondata?.email===data?.user_info?.email&&
              <View className="flex flex-row space-x-1">
                <Text className="text-gray-400 text-xs"> | </Text>
                <Text className="text-gray-400 text-xs">{data?.positive==="Yes"?"Approved":data?.positive==="No"?"Pending":"Rejected"}</Text>
              </View>}
            </View> 
          </View>


          
        </View>
        
        <Text className={`text-gray-400 mb-2`}>
          {data?.description.substr(0,150)}...<Text className="text-blue-400 text-xs">See more</Text>
        </Text>
        <View className="flex flex-row z-10 justify-start space-x-2 items-center mt-2">
          {data?.googlemap&&<Link
            href={`${data?.googlemap}`}
            className={`flex-row bg-green-400 p-2 rounded-lg items-center mb-2 w-fit`}
          >
            <Entypo name="location-pin" size={16} color="white" />
            <Text className={`text-gray-100 ml-2`}>Find Place</Text>
          </Link>}

          {data?.website&&<Link
            href={`${data?.website}`}
            className={`flex-row items-center bg-green-400 p-2 rounded-lg mb-2 w-fit`}
          >
            <Entypo name="link" size={16} color="white" />
            <Text className={`text-gray-100 ml-2`}>Visit Website</Text>
          </Link>}

          {data?.phone&&<Link
            href={`/profile?email=${data?.user_info?.email}`}
            className={`flex-row items-center bg-green-400 p-2 rounded-lg mb-2 w-fit`}
          >
            <Entypo name="user" size={16} color="white" />
            <Text className={`text-gray-100 ml-2`}>Contact</Text>
          </Link>}

        </View>
        
        {sessiondata?.email===data?.user_info?.email&&
        <TouchableOpacity onPress={()=>setisHowingControllMenu((prev)=>!prev)} className="absolute right-3 bg-gray-900 border border-gray-900 p-1 top-5 z-30">
          {isHowingControllMenu?<FontAwesome name="times" size={20} color={'red'} />:<Entypo name="dots-three-vertical" size={20} color="gray" />}
        </TouchableOpacity>}
        
        {isHowingControllMenu&&<View className="absolute z-[10000000000] top-12 right-3">
          <View className="bg-gray-800 z-50 p-3 rounded-md shadow-md">
              <Link href={'/editcontribution?id='+data?._id} className="flex p-2 flex-row space-x-1">
                <Text className="text-gray-400 text-xs"><FontAwesome name="edit" /> Edit this Item</Text>
              </Link>

              <TouchableOpacity onPress={()=>deleteData(data?._id)} className="flex p-2 flex-row space-x-1">
                <Text className="text-gray-400 text-xs"><FontAwesome name="trash" /> Delete this Item</Text>
              </TouchableOpacity>
              
              
          </View>
          
        </View>}
        <View className={`flex-row justify-between mt-4`}>
          
          {data?.images&&data?.images[0]&&<Image
            source={{uri:data?.images[0]}}
            className={`w-[49%] rounded h-40 mr-2`}
          />}
          {data?.images&&data?.images[1]&&<Image
            source={{uri:data?.images[1]}}
            className={`w-[49%] rounded h-40 mr-2`}
          />}
          {!data?.images&&<Image
            source={require("../assets/images/icon.png")}
            className={`w-[49%] rounded h-40`}
          />}
          {!data?.images&&<Image
            source={require("../assets/images/icon.png")}
            className={`w-[49%] rounded h-40`}
          />}
        </View>
        <Text className={`text-gray-400 text-center mt-2`}>{data?.images?.length}+ images</Text>
      </TouchableOpacity>
    </View>
  );
};



export default Placebox;
