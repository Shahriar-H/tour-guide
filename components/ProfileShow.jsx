import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useTailwind } from 'nativewind';
import { Entypo, FontAwesome } from '@expo/vector-icons';

import Footer from './Footer';

import Popularcats from './Popularcats';

import Mainbg from './Mainbg';

import { Link } from 'expo-router';
import PlaceData from './PlaceData';
import Contactbg from './Contactbg';
import { api_URl } from '../assets/lib';
import { Picker } from '@react-native-picker/picker';
import { AuthProvider } from '../app/_layout';
import { useIsFocused } from '@react-navigation/native';




const ShowProfile = ({email}) => {
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
  const [userInfo, setuserInfo] = useState({});
  const isFocused = useIsFocused()

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

  const getUserdata = ()=>{
    setisFetcingType(true)
    fetch(api_URl+"/get-item",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({query:{email:email??data?.email},table:"users"})
    })
    .then((res)=>res.json())
    .then((result)=>{
        setisFetcingType(false)
       console.log("user",result);
       
        
        setuserInfo(result?.result[0])
    })
  }
 

  const handleFindPlace = () => {
    // Handle find place logic here
  };

  useEffect(() => {
    // getdistrict()
    // getplacetype()
    
    
  }, []);

  useEffect(() => {
    getUserdata()
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

  if(!userInfo?.name && !userInfo?.email && !userInfo?.phone){
    return <View className="bg-[#0000009b] rounded-md p-3 justify-center items-center flex flex-row space-x-3">
        <Text className="text-center text-white">No Profile FOund</Text>
    </View>
  }

  return (
    <View className="m-4 ">
      <View className="bg-[#0000009b] rounded-md p-3 flex flex-row space-x-3">
        <View className="justify-center items-center space-y-2">
            <Image className='h-20 w-20 border-2 border-green-500 rounded-full' source={{uri:userInfo?.image??"https://res.cloudinary.com/dqljmx6ai/image/upload/v1726842097/file_gu2tc2.jpg"}}/>
            
        </View>
        {data?.email===userInfo?.email&&
        <Link href={'/edit-profile?email='+data?.email} className="rounded-md absolute right-3 top-3 text-center">
            <Text className="text-center text-xs text-white"><FontAwesome name='edit' /> Edit</Text>
        </Link>}
        <View>
            <Text className="text-white text-xl font-bold">{userInfo?.name}</Text>
            <Text className="text-gray-300 text-md"><FontAwesome name='envelope' /> {userInfo?.email}</Text>
            <Text className="text-gray-300 text-md"><FontAwesome name='phone' /> {userInfo?.phone}</Text>
            <Text className="text-gray-300 text-md"><FontAwesome name='map-marker' /> {userInfo?.district}</Text>
        </View>
      </View>
    </View>
  );
};

export default ShowProfile;