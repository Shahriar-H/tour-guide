import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useTailwind } from 'nativewind';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import Header2 from '../../components/Header2';
import Footer from '../../components/Footer';
import Placebox from '../../components/Placebox';
import Popularcats from '../../components/Popularcats';
import Header from '../../components/Header';
import Mainbg from '../../components/Mainbg';
import useSessionget from '../../hooks/useSessionget';
import { Link, useLocalSearchParams, usePathname } from 'expo-router';
import PlaceData from '../../components/PlaceData';
import Contactbg from '../../components/Contactbg';
import { api_URl } from '../../assets/lib';
import { Picker } from '@react-native-picker/picker';
import {AuthProvider} from "../_layout"
import ShowProfile from '../../components/ProfileShow';
import { useIsFocused } from '@react-navigation/native';



const ContactProfile = ({email}) => {
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
  const [searchword, setsearchword] = useState('');
  const parameters = useLocalSearchParams()
  const isFocused= useIsFocused()
  

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
  
  
   
    
  }, [isFocused]);
  useEffect(() => {
    console.log("path",parameters);
  }, [isFocused]);

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
    <ScrollView className={  ` bg-black`}>
      <Mainbg/>
      <View className='flex items-center mt-10'>
        <View className="w-2/3">
            <Text className={  `text-white text-3xl font-bold text-center`}>Contributor</Text>
            <Text className={  `text-3xl font-bold mb-4 text-center text-green-400`}>Profile</Text>

        </View>
      </View>
      {/* <View className='flex items-center'>
        <TouchableOpacity onPress={allClearFilter} className={  `flex-row items-center mb-4 bg-green-500 p-2 px-5 rounded-3xl`}>
            <Entypo name="location-pin" size={24} color="white" />
            <Text className={  `text-gray-100 ml-2`}>All of Bangladesh</Text>
        </TouchableOpacity>
      </View> */}
      
      <ShowProfile email={parameters?.email}/>
      
     
      {/* PlaceCard */}
      
      <PlaceData placeType={filtertype} district={filterDistrict} searchword={searchword} profile={true}/>
      <View className="p-2">
        

        <Popularcats/>
      </View>
    

    <Contactbg/>
      



      <Footer/>
    </ScrollView>
  );
};

export default ContactProfile;