import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Mainbg1 from "../../components/Mainbg1";
import Contactbg from "../../components/Contactbg";
import Footer from "../../components/Footer";
import { TouchableOpacity } from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { api_URl } from "../../assets/lib";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { useIsFocused } from "@react-navigation/native";
import Placebox from "../../components/Placebox";

const About = () => {
  const [palcesare, setpalcesare] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const params = useGlobalSearchParams()
  const isFocused = useIsFocused()

  const getMyplaces = () => {
    setisLoading(true);
    fetch(api_URl + "/get-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: {
          placeType: params?.data,
          positive: "Yes",
        },
        table: "places",
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        setisLoading(false);
        setpalcesare(result?.result);
      });
  };
  useEffect(() => {
    getMyplaces()
    console.log("query",params);
    
  }, [isFocused]);
  return (
    <ScrollView className="bg-gray-800">
      <Mainbg1 />
      <View className="h-28"></View>
      <View className='flex items-center'>
        <View className="w-2/3">
            <Text className={  `text-white text-3xl font-bold text-center`}>
              <FontAwesome name="map-marker" size={30} /> {params?.data}</Text>
            

        </View>
        
      </View>
      
      <View className="mt-36 mb-4"></View>
      {
        !isLoading&&palcesare&&palcesare.length<1&&<Text className="text-center text-gray-300">No Data Found for {params?.data}</Text>
      }
      {
        isLoading&&<Text className="text-center text-white">Data Loading...</Text>
      }

      <View className="p-4">
        {
          palcesare&&palcesare.map((item,index)=>{
            return (
              <Placebox
                data={item}
                key={index}
                profile={false}
                getMyplaces={getMyplaces}
              />
            );
          })
        }
      </View>

      <Contactbg/>
      <Footer/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default About;
