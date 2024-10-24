import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ToastAndroid, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Link, useLocalSearchParams } from 'expo-router';

import Footer from '../../components/Footer';
import Header2 from '../../components/Header2';
import {Picker} from '@react-native-picker/picker';
import { api_URl } from '../../assets/lib';
import { useIsFocused } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { imageUpload } from '../../assets/imageupload';
import { AuthProvider } from '../_layout';

const Editprofile = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [selectedDistrict, setselectedDistrict] = useState();
  const [districts, setdistricts] = useState([]);
  const [isSelectedRule, setisSelectedRule] = useState(true);
  const [isSignupsuccess, setisSignupsuccess] = useState(false);
  const parameters = useLocalSearchParams()
  const isFocused= useIsFocused()
  const [userInfo, setuserInfo] = useState({});
  const {data} = useContext(AuthProvider)
  const [formData, setformData] = useState({
    name:'',
    email:"",
    phone:"",
    district:"",
    image:""
  });

  const [isUploading, setisUploading] = useState(false);

  const [image, setImage] = useState(null);
  const [uploadeImages, setuploadeImages] = useState(null);

  const pickImage = async () => {
    if(isUploading){
      return 0;
    }
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setisUploading(true)
      imageUpload(result.assets[0].uri).then((res)=>{
        console.log("imageUped",res);
        setuploadeImages(res)
        setisUploading(false)
        setformData({...formData,image:res})
      })
      
      setImage(result.assets[0].uri);
    }
  };

  const getUserdata = ()=>{
  
    fetch(api_URl+"/get-item",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({query:{email:parameters?.email},table:"users"})
    })
    .then((res)=>res.json())
    .then((result)=>{
      
       console.log("user",result);
       
       setuserInfo(result?.result[0])
        setformData({
          name:result?.result[0]?.name,
          email:result?.result[0]?.email,
          phone:result?.result[0]?.phone,
          district:result?.result[0]?.district,
        })
        setselectedDistrict(result?.result[0]?.district)
    })
  }

  useEffect(() => {
    getUserdata()
  }, [isFocused]);

  const getdistrict = ()=>{
    fetch("https://bdapis.com/api/v1.2/districts")
    .then((res)=>res.json())
    .then((result)=>{
    
      setdistricts(result?.data)
    })
  }

  useEffect(() => {
    setformData({...formData,district:selectedDistrict})
  }, [selectedDistrict]);

  const signup = ()=>{
    console.log(formData);

    let isEnputFilled=true;
    Object.keys(formData).map((key)=>{
      if(formData[key]===''){
        isEnputFilled=false
        return ToastAndroid.show(key+ " is empty",ToastAndroid.SHORT)
      }
    })

  

    setisLoading(true)

    fetch(api_URl+"/update-item",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({data:formData,table:"users",id:userInfo?._id})
    })
    .then((res)=>res.json())
    .then((res)=>{
      console.log(res);
      setisLoading(false)
      if(res.status!==200){
        return ToastAndroid.show(res?.message,ToastAndroid.LONG)
      }
      
      setformData({
        name:'',
        email:"",
        phone:"",
        image:"",
        district:""
      })
      getUserdata()
      setisSignupsuccess(true)
      ToastAndroid.show(res?.message,ToastAndroid.LONG)
    })
    
    
    
  }




  useEffect(() => {
    getdistrict()
  }, []);

  

  return (
    <ScrollView className="bg-gray-900 p-5">
      
      

      {/* Sign Up Text */}
      <Text className="text-white text-2xl text-center font-bold mb-8">Update Profile</Text>
      {isSignupsuccess&&<Text className="text-white bg-green-500 p-2 text-center font-bold mb-8">Update Success- 
       
      </Text>}

      <View className="flex mb-4 items-center">
        <TouchableOpacity onPress={pickImage} className="bg-gray-700 relative overflow-hidden h-32 w-32 flex justify-center rounded-full">
            {<Text className="text-center absolute z-50 bottom-0 bg-[#0000009b] py-3 w-full text-gray-100">{isUploading?"Uploading...":'Select'}</Text>}
            {(uploadeImages||userInfo?.image)&&<Image className="h-32 w-32 rounded-full" source={{uri:uploadeImages??userInfo?.image}} />}

        </TouchableOpacity>
        {uploadeImages&&<Text className="text-center text-white p-2">Save the Changes Now</Text>}
      </View>
      
      {/* <View className="bg-gray-700 rounded-md p-3 mt-2 flex flex-row flex-wrap">
        {uploadeImages&&uploadeImages.map((item,index)=>{
          return <View className="relative">
            <TouchableOpacity onPress={()=>filtterImageDelet(item)} className="absolute z-30 rounded-md bg-white p-1"><FontAwesome name='trash' size={16} /></TouchableOpacity>
            <Image key={index} resizeMode='cover' className="h-16 w-16 m-1" source={{uri:item}} />
            </View>
        })}
      </View> */}

      {/* Google Sign Up Button */}
      {/* <TouchableOpacity className="flex-row bg-gray-800 py-3 px-5 rounded-lg mb-6 items-center">
        <FontAwesome name="google" size={24} color="white" />
        <Text className="text-white ml-3 text-lg">Sign Up with Google</Text>
      </TouchableOpacity> */}

      {/* Divider */}
      {/* <View className="flex-row items-center justify-center mb-6">
        <View className="flex-1 h-0.5 bg-gray-500" />
        <Text className="text-gray-500 mx-4">OR</Text>
        <View className="flex-1 h-0.5 bg-gray-500" />
      </View> */}

      {/* Name Input */}
      <TextInput
        className="w-full bg-gray-800 text-white text-lg p-3 rounded-lg mb-4"
        placeholder="Enter Your Full Name"
        placeholderTextColor="gray"
        onChangeText={(v)=>setformData({...formData,name:v})}
        value={formData?.name}
      />

      {/* Email Input */}
      <TextInput
        className="w-full bg-gray-800 text-white text-lg p-3 rounded-lg mb-4"
        placeholder="Enter Your Email"
        placeholderTextColor="gray"
        onChangeText={(v)=>setformData({...formData,email:v})}
        value={formData?.email}
      />
      {/* Phone Input */}
      <TextInput
        className="w-full bg-gray-800 text-white text-lg p-3 rounded-lg mb-4"
        placeholder="Enter Your Phone"
        placeholderTextColor="gray"
        maxLength={11}
        keyboardType='number-pad'
        value={formData?.phone}
        onChangeText={(v)=>setformData({...formData,phone:v})}
      />

      {/* Confirm Email Input */}
      {/* <TextInput
        className="w-full bg-gray-800 text-white text-lg p-3 rounded-lg mb-4"
        placeholder="Confirm Your Email"
        placeholderTextColor="gray"
      /> */}

      <Picker
        selectedValue={selectedDistrict}
        style={{backgroundColor:"#1f2937",color:selectedDistrict?"#fff":"gray", borderRadius:10}}
        onValueChange={(itemValue, itemIndex) =>
          setselectedDistrict(itemValue)
        }>
        {/* <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" /> */}
        {districts.length>0&&districts?.map((item,index)=>{
          return <Picker.Item key={index} label={item?.district} value={item?.district} />
        })}
      </Picker>

      

      

      {/* Sign Up Button */}
      {!isLoading&&
      <TouchableOpacity onPress={signup} className="w-full mt-4 bg-green-500 py-3 rounded-lg items-center mb-6">
        <Text className="text-white text-lg font-bold">Save</Text>
      </TouchableOpacity>}

      {isLoading&&<TouchableOpacity className="w-full bg-gray-500 py-3 rounded-lg items-center mb-6">
        <Text className="text-white text-lg font-bold">Saveing</Text>
      </TouchableOpacity>}

      

      <Footer/>
    </ScrollView>
  );
};

export default Editprofile;
