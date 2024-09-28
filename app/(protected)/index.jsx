import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { useTailwind } from 'nativewind';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import Header2 from '../../components/Header2';
import Footer from '../../components/Footer';
import Placebox from '../../components/Placebox';
import Popularcats from '../../components/Popularcats';
import Header from '../../components/Header';
import Mainbg from '../../components/Mainbg';
import useSessionget from '../../hooks/useSessionget';
import { Link } from 'expo-router';
import PlaceData from '../../components/PlaceData';
import Contactbg from '../../components/Contactbg';
import { api_URl } from '../../assets/lib';
import { Picker } from '@react-native-picker/picker';
import {AuthProvider} from "../_layout"




const Index = () => {
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [village, setVillage] = useState('');
  const [placeType, setPlaceType] = useState();
  const [fetchingDistrict, setfetchingDistrict] = useState(false);
  const [districts, setdistricts] = useState([]);
  const [isFetcingType, setisFetcingType] = useState(false);
  const [placetypesare, setplacetypesare] = useState(null);
  const [selectedDistrict, setselectedDistrict] = useState();
  const {data} = useContext(AuthProvider)
  const [filterDistrict, setfilterDistrict] = useState(undefined);
  const [filtertype, setfiltertype] = useState(undefined);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
        
      setRefreshing(false);
    }, 2000);
  }, []);

  const refreshDataFun = (calFunc)=>{
    calFunc()
  }

  const getdistrict = ()=>{
    setfetchingDistrict(true)
    fetch("https://bdapis.com/api/v1.2/districts")
    .then((res)=>res.json())
    .then((result)=>{
        setfetchingDistrict(false)
        setdistricts(result?.data)
    })
  }

  const getplacetype = ()=>{
    setisFetcingType(true)
    fetch(api_URl+"/get-item",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({query:{},table:"place_type"})
    })
    .then((res)=>res.json())
    .then((result)=>{
        setisFetcingType(false)
        setplacetypesare(result?.result)
    })
  }
 

  const handleFindPlace = () => {
    // Handle find place logic here
  };

  useEffect(() => {
    getdistrict()
    getplacetype()
   
    
  }, []);

  useEffect(() => {
    if(data?.district){
      setselectedDistrict(data?.district)
    }
  }, [data?.district]);

  const allClearFilter = ()=>{
    setfilterDistrict(undefined)
    setfiltertype(undefined)
  }

  const filterQuery = ()=>{
    if(selectedDistrict){
      setfilterDistrict(selectedDistrict)
    }
    if(placeType){
      setfiltertype(placeType)
    }
    
    
  }

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} className={  ` bg-black`}>
      {refreshing ? <ActivityIndicator /> : null}
      <Mainbg/>
      <View className='flex items-center mt-10'>
        <View className="w-2/3">
            <Text className={  `text-white text-3xl font-bold text-center`}>Welcome to</Text>
            <Text className={  `text-3xl font-bold mb-4 text-center text-green-400`}>Village Tour BD</Text>

            <Text className={  `text-gray-400 mb-2 text-center`}>Explore exciting locations around the Bangladesh village</Text>
        </View>
      </View>

      <View className='flex items-center'>
        <TouchableOpacity onPress={allClearFilter} className={  `flex-row items-center mb-4 bg-green-500 p-2 px-5 rounded-3xl`}>
            <Entypo name="location-pin" size={24} color="white" />
            <Text className={  `text-gray-100 ml-2`}>All of Bangladesh</Text>
        </TouchableOpacity>
      </View>

      <View className={  `px-4 rounded-md bg-[#000000bd] py-4 m-2`}>
        <Picker
            selectedValue={selectedDistrict}
            
            style={{backgroundColor:"#374151",color:selectedDistrict?"#fff":"gray", borderRadius:10}}
            onValueChange={(itemValue, itemIndex) =>
            setselectedDistrict(itemValue)
            }>
                {/* <Picker.Item label="Java" value="java" /> */}
                {fetchingDistrict&&<Picker.Item label="Loading..." value="No Value" />}
                <Picker.Item label="Select District" value={''} />
                {!fetchingDistrict&&districts.length>0&&districts?.map((item,index)=>{
                return <Picker.Item key={index} label={item?.district} value={item?.district} />
            })}
        </Picker>
        
        <View className="h-2"></View>
        <Picker
            selectedValue={placeType}
            style={{backgroundColor:"#374151",color:placeType?"#fff":"gray", borderRadius:10}}
            onValueChange={(itemValue, itemIndex) =>
            setPlaceType(itemValue)
            }>
                
                {isFetcingType&&<Picker.Item label="Loading..." value="No Value" />}
                <Picker.Item label="Select Type" value={''} />
                {!isFetcingType&&placetypesare?.length>0&&placetypesare?.map((item,index)=>{
                return <Picker.Item key={index} label={item?.name} value={item?.name} />
            })}
        </Picker>
        <TouchableOpacity
          
          className={  `bg-blue-500 mt-2 text-white p-4 rounded-md`}
          onPress={filterQuery}
        >
          <Text className="text-center text-md font-bold">FIND THE PLACE</Text>
        </TouchableOpacity>
      </View>
      

      {/* PlaceCard */}
      <PlaceData placeType={filtertype} refreshDataFun={refreshDataFun} district={filterDistrict}/>
      <View className="p-2">
        

        <Popularcats/>
      </View>
    

    <Contactbg/>
      



      <Footer/>
    </ScrollView>
  );
};

export default Index;