import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';

import Footer from '../../components/Footer';
import Header2 from '../../components/Header2';
import {Picker} from '@react-native-picker/picker';
import { api_URl } from '../../assets/lib';

const SignUp = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [selectedDistrict, setselectedDistrict] = useState();
  const [districts, setdistricts] = useState([]);
  const [isSelectedRule, setisSelectedRule] = useState(true);
  const [isSignupsuccess, setisSignupsuccess] = useState(false);
  const [formData, setformData] = useState({
    name:'',
    email:"",
    phone:"",
    password:'',
    confirmpassword:'',
    district:"",
    positive:"Yes",
    role:"User"
  });

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

    if(!isEnputFilled){
      return 0;
    }

    if(formData?.password!==formData?.confirmpassword){
      return ToastAndroid.show("Confirm Password Not Matched",ToastAndroid.LONG)
    }
    if(!isSelectedRule){
      return ToastAndroid.show("Please Agree with Terms",ToastAndroid.LONG)
    }

    setisLoading(true)

    fetch(api_URl+"/insert-item",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({data:formData,table:"users"})
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
        password:'',
        confirmpassword:'',
        district:"",
        positive:"Yes",
        role:"User"
      })
      setisSignupsuccess(true)
      ToastAndroid.show(res?.message,ToastAndroid.LONG)
    })
    
    
    
  }




  useEffect(() => {
    getdistrict()
  }, []);

  

  return (
    <ScrollView className="bg-black p-5">
      
      {/* Logo Section */}
      {/* <View className="items-center mb-8">
        <FontAwesome name="globe" size={50} color="white" />
        <Text className="text-white text-3xl font-bold mt-2">VillageTourBD</Text>
      </View> */}
      <Header2/>

      {/* Sign Up Text */}
      <Text className="text-white text-2xl text-center font-bold mb-8">Sign Up</Text>
      {isSignupsuccess&&<Text className="text-white bg-green-500 p-2 text-center font-bold mb-8">Registration Success- 
        <Link className='text-black' href={'/login'}> Login Now</Link>
      </Text>}

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
      />

      {/* Email Input */}
      <TextInput
        className="w-full bg-gray-800 text-white text-lg p-3 rounded-lg mb-4"
        placeholder="Enter Your Email"
        placeholderTextColor="gray"
        onChangeText={(v)=>setformData({...formData,email:v})}
      />
      {/* Phone Input */}
      <TextInput
        className="w-full bg-gray-800 text-white text-lg p-3 rounded-lg mb-4"
        placeholder="Enter Your Phone"
        placeholderTextColor="gray"
        maxLength={11}
        keyboardType='number-pad'
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

      {/* Password Input */}
      <TextInput
        className="w-full bg-gray-800 text-white text-lg p-3 rounded-lg my-4"
        placeholder="Enter Your Password"
        placeholderTextColor="gray"
        secureTextEntry
        onChangeText={(v)=>setformData({...formData,password:v})}
      />

      {/* Re-Password Input */}
      <TextInput
        className="w-full bg-gray-800 text-white text-lg p-3 rounded-lg mb-4"
        placeholder="Enter Your Re-Password"
        placeholderTextColor="gray"
        secureTextEntry
        onChangeText={(v)=>setformData({...formData,confirmpassword:v})}
      />

      {/* Terms and Conditions Checkbox */}
      <View  className="flex-row items-center mb-6">
        
        <TouchableOpacity onPress={()=>setisSelectedRule((prev)=>!prev)} className="border-2 border-gray-500 rounded-md h-6 flex justify-center items-center mr-2 w-6">
          {isSelectedRule&&<View className="bg-green-200 h-4 w-4 rounded-sm"></View>}
        </TouchableOpacity>
        <Text className="text-gray-400">I Confirm The Information is Accurate And Agree To The Privacy Policy And Terms.</Text>
      </View>

      {/* Sign Up Button */}
      {!isLoading&&
      <TouchableOpacity onPress={signup} className="w-full bg-green-500 py-3 rounded-lg items-center mb-6">
        <Text className="text-white text-lg font-bold">Sign Up Now</Text>
      </TouchableOpacity>}

      {isLoading&&<TouchableOpacity className="w-full bg-gray-500 py-3 rounded-lg items-center mb-6">
        <Text className="text-white text-lg font-bold">Sign Up Now</Text>
      </TouchableOpacity>}

      {/* Already Have Account Link */}
      <Text className="text-white mb-6">
        You Have Already Account?{' '}
        <Link href="/login">
          <Text className="text-blue-400">Click Here</Text>
        </Link>
      </Text>

      <Footer/>
    </ScrollView>
  );
};

export default SignUp;
