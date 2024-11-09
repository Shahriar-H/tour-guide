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
  const [showPassword, setshowPassword] = useState(false);
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

  const sendEmail = async () => {
    const emailHtmlTemplate = `
    <style>
      .email-container {
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f4f4f4;
      }
      .header {
        background-color: #4caf50;
        color: white;
        text-align: center;
        padding: 20px;
        font-size: 24px;
      }
      .content {
        padding: 20px;
        background-color: white;
      }
      .button {
        display: inline-block;
        background-color: #4caf50;
        color: white;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
        font-size: 16px;
      }
      .footer {
        margin-top: 20px;
        text-align: center;
        font-size: 12px;
        color: #666;
      }
      .showpass{
        color:#fff,
        background-color:#1bc901,
        padding:5px,
      }
    </style>
    <div class="email-container">
      <div class="header"><h1>Welcome to TourBD</h1></div>
      <div class="content">
        <p>Hello, ${formData?.name}</p>
        <p>Welcome to the TourBD community. We are very happy for joining you in our community. Please 
        share and follow us.</p>
        
        <p>Very best wishes for you.</p>
       
      </div>
      <div class="footer">
        <p>Thank you to be with us.</p>
      </div>
    </div>
  `;
    setisLoading(true)
    fetch(api_URl+"/sendemail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData?.email,
        subject: "Welcome to TourBD",
        message: emailHtmlTemplate,
      }),
    })
    .then((res)=>res.json())
    .then((res)=>{
      setisLoading(false)
      console.log(res);
      
    })
    .catch((err)=>{
      setisLoading(false)
      console.log(err);
      
    })
  //{email,message,subject}
    
  };

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
      sendEmail()
      setisSignupsuccess(true)
      ToastAndroid.show(res?.message,ToastAndroid.LONG)
    })
    
    
    
  }




  useEffect(() => {
    getdistrict()
  }, []);

  

  return (
    <ScrollView className="bg-gray-900 p-5">
      
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
      <Text className="text-gray-400 text-xs mb-1">Your Name*</Text>
      <TextInput
        className="w-full bg-gray-800 text-white text-lg p-3 rounded-lg mb-3"
        placeholder="Enter Your Full Name"
        placeholderTextColor="gray"
        value={formData?.name}
        onChangeText={(v)=>setformData({...formData,name:v})}
      />

      {/* Email Input */}
      <Text className="text-gray-400 text-xs mb-1">Your Email*</Text>
      <TextInput
        className="w-full bg-gray-800 text-white text-lg p-3 rounded-lg mb-3"
        placeholder="Enter Your Email"
        placeholderTextColor="gray"
        value={formData?.email}
        onChangeText={(v)=>setformData({...formData,email:v})}
      />
      {/* Phone Input */}
      <Text className="text-gray-400 text-xs mb-1">Phone Number*</Text>
      <TextInput
        className="w-full bg-gray-800 text-white text-lg p-3 rounded-lg mb-3"
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
      <Text className="text-gray-400 text-xs mb-1">District*</Text>
      <Picker
        selectedValue={selectedDistrict}
        style={{backgroundColor:"#1f2937",color:selectedDistrict?"#fff":"gray", borderRadius:10,marginBottom:12}}
        onValueChange={(itemValue, itemIndex) =>
          setselectedDistrict(itemValue)
        }>
        {/* <Picker.Item label="Java" value="java" /> */}
        <Picker.Item label="Select District" value="" />
        {districts.length>0&&districts?.map((item,index)=>{
          return <Picker.Item key={index} label={item?.district} value={item?.district} />
        })}
      </Picker>

      {/* Password Input */}
      <Text className="text-gray-400 text-xs mb-1">Password*</Text>
      <View className="relative">
        <TextInput
          className="w-full bg-gray-800 text-white text-lg p-3 rounded-lg mb-3"
          placeholder="Enter Your Password"
          placeholderTextColor="gray"
          secureTextEntry={!showPassword}
          value={formData?.password}
          onChangeText={(v)=>setformData({...formData,password:v})}
        />
        <TouchableOpacity onPress={()=>setshowPassword((prev)=>!prev)} className="absolute z-40 right-3 top-4">
          {showPassword?<FontAwesome name='eye' color={'grey'} size={20} />:<FontAwesome name='eye-slash' color={'grey'} size={20} />}
        </TouchableOpacity>
      </View>

      {/* Re-Password Input */}
      <Text className="text-gray-400 text-xs mb-1">Confirm Password*</Text>
      <TextInput
        className="w-full bg-gray-800 text-white text-lg p-3 rounded-lg mb-4"
        placeholder="Enter Your Re-Password"
        placeholderTextColor="gray"
        secureTextEntry={!showPassword}
        value={formData?.confirmpassword}
        onChangeText={(v)=>setformData({...formData,confirmpassword:v})}
      />

      {/* Terms and Conditions Checkbox */}
      <View  className="flex-row items-center mb-6">
        
        <TouchableOpacity onPress={()=>setisSelectedRule((prev)=>!prev)} className="border-2 border-gray-500 rounded-md h-6 flex justify-center items-center mr-2 w-6">
          {isSelectedRule&&<FontAwesome name='check-square' color={'green'} size={20} />}
        </TouchableOpacity>
        <Text className="text-gray-400">I Confirm The Information is Accurate And Agree To The Privacy Policy And Terms.</Text>
      </View>

      {/* Sign Up Button */}
      {!isLoading&&
      <TouchableOpacity onPress={signup} className="w-full bg-green-500 py-3 rounded-lg items-center mb-6">
        <Text className="text-white text-lg font-bold">Sign Up Now</Text>
      </TouchableOpacity>}

      {isLoading&&<TouchableOpacity className="w-full bg-gray-500 py-3 rounded-lg items-center mb-6">
        <Text className="text-white text-lg font-bold">Creating</Text>
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
