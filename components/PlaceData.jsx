import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, ToastAndroid } from 'react-native';
import { useTailwind } from 'nativewind';
import { Entypo, FontAwesome } from '@expo/vector-icons';

import Placebox from '../components/Placebox';
import Popularcats from '../components/Popularcats';

import { api_URl } from '../assets/lib';
import { Picker } from '@react-native-picker/picker';
import { Link } from 'expo-router';
import { AuthProvider } from '../app/_layout';


const PlaceData = ({district,placeType}) => {
  const [region, setRegion] = useState('');

  const [title, settitle] = useState('');
  const [description, setdescription] = useState('');
  const [website, setwebsite] = useState('');
  const [phone, setphone] = useState('');
  const [googlemap, setgooglemap] = useState('');
  const [isSelectedRule, setisSelectedRule] = useState(true);
  const [districts, setdistricts] = useState([]);

  const [isLoading, setisLoading] = useState(false);
  const [placetypesare, setplacetypesare] = useState(null);
  const [palcesmine, setpalcesmine] = useState([]);
  const [fetchingDistrict, setfetchingDistrict] = useState(false);
  const [isFetcingType, setisFetcingType] = useState(false);
  const {data} = useContext(AuthProvider)

//   const [filterDistrct, setfilterDistrct] = useState('');
//   const [filterType, setfilterType] = useState('');

//   useEffect(() => {
//     if(sele)
//   }, []);


  const getMyplaces = ()=>{
    setisLoading(true)
    fetch(api_URl+"/get-item",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({query:{district:district,placeType:placeType},table:"places"})
    })
    .then((res)=>res.json())
    .then((result)=>{
        console.log(result);
        
        setisLoading(false)
        setpalcesmine(result?.result)
    })
  }

  useEffect(() => {
   console.log(district,placeType);
   
    getMyplaces()
  }, [district,placeType]);



  return (
    <View>
      
    

      {/* PlaceCard */}
      <View className="p-2">
        <Text className='text-gray-400'>Places</Text>
        {isLoading&&<Text className='text-gray-200 my-4 text-center'>Places are Loading...</Text>}
        {!isLoading&&palcesmine.length<1&&<Text className='text-gray-200 my-4 text-center'>No Places Found</Text>}
        {
            palcesmine&&palcesmine.map((item,index)=>{
                return <Placebox data={item} key={index}/>
            })
        }
        
      </View>


      <View className="m-2 rounded bg-[#4A7D4A] p-4">
        <Text className="text-2xl mb-2 text-gray-100">Start Contributing Today!</Text>
        <Text style={{lineHeight:20}} className=" text-gray-200 ">Become a part of the Village Tour BD community! Share your hidden gems and help fellow travelers discover the beauty of Bangladesh's villages. Your contributions can make a difference.</Text>
        <Link href={data?.name?'/-contribution':"/login"} className={  `w-1/2 flex-row items-center my-4 bg-[#F9D189] p-2 px-5 rounded-3xl`}>
            <Text className={  `text-gray-800 ml-2`}>Be A Contributer</Text>
        </Link>
      </View>
      

    </View>
  );
};

export default PlaceData;