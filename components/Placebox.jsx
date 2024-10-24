import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Placebox = ({data}) => {
  const navigation= useNavigation()

  const passData = ()=>{
    navigation.navigate("singleplace",{data:data})
  }
  
  return (
    <View>
      <TouchableOpacity onPress={passData} className={`w-full rounded bg-gray-800 py-5 px-4 mt-4`}>
        <View className="flex flex-row mb-2 items-start border-b pb-2 border-gray-700">
          <Text className="mt-1"><Entypo name="location-pin" size={30} color="white" /></Text>
          <View>
            <Text className={`text-white text-2xl font-bold`}>{data?.title}</Text>
            <View className="flex flex-row space-x-1">
              <Text className="text-gray-400">{data?.district}</Text>
              <Text className="text-gray-400"> | </Text>
              <Text className="text-gray-400">{data?.placeType}</Text>
            </View> 
          </View>
        </View>
        
        <Text className={`text-gray-400 mb-2`}>
          {data?.description.substr(0,150)}
        </Text>
        <View className="flex flex-row justify-start space-x-2 items-center mt-2">
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
            href={`tel:${data?.phone}`}
            className={`flex-row items-center bg-green-400 p-2 rounded-lg mb-2 w-fit`}
          >
            <Entypo name="phone" size={16} color="white" />
            <Text className={`text-gray-100 ml-2`}>Contact</Text>
          </Link>}

        </View>
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
