import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Link, useRouter, } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PagerView from 'react-native-pager-view';

const SinglePlacebox = () => {
  const router = useRoute()
  const {data} = router.params
  console.log("Param",data);
  
  
  return (
    <ScrollView className="bg-gray-900">
      <View className={`w-full  py-5 px-4 mt-4`}>
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
        
        
        <View className="flex flex-row justify-start space-x-2 items-center mt-2">
          {data?.googlemap&&<Link
            href={data?.googlemap}
            className={`flex-row bg-green-400 p-2 rounded-lg items-center mb-2 w-fit`}
          >
            <Entypo name="location-pin" size={16} color="white" />
            <Text className={`text-gray-100 ml-2`}>Find Place</Text>
          </Link>}

          {data?.website&&<Link
            href={data?.website}
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
        
        <View className={` mt-4`}>
          {/* <Image
            source={require("../../assets/images/icon.png")}
            className={`w-1/2 rounded h-40 mr-2`}
          />
          <Image
            source={require("../../assets/images/icon.png")}
            className={`w-1/2 rounded h-40`}
          /> */}
          {data?.images&&<PagerView className="bg-white h-60 p-5 rounded-md" initialPage={0}>
            {
              data?.images&&data?.images?.map((item,index)=>{
                return <View className='h-[232px]' key={index}>
                    <Image
                    key={index}
                    source={{uri:item}}
                    resizeMode="cover"
                    className={`rounded max-w-full h-full m-1`}
                  />
                </View>
              })
            }
          </PagerView>}
          {
          // data?.images&&data?.images?.map((item,index)=>{
          //     return <Image
          //     key={index}
          //     source={{uri:item}}
          //     resizeMode="cover"
          //     className={`rounded max-w-full h-40 m-1`}
          //   />
          //   })
          }

        </View>
        <Text className={`text-gray-400 my-5`}>
          {data?.description}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
    backgroundColor:'red'
  },
});

export default SinglePlacebox;
