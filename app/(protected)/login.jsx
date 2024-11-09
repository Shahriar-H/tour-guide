import React, { useContext, useReducer, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import Footer from '../../components/Footer';
import Header2 from '../../components/Header2';

import { AuthProvider } from '../_layout';
import { api_url } from '../../scripts/lib';
import { api_URl, storeData } from '../../assets/lib';




const SignIn = () => {
  const [formData, setformData] = useState({
    email:"",
    password:''
  });
  const [isLoading, setisLoading] = useState(false);
  const [isShowpassword, setisShowpassword] = useState(false);
  // const [state, dispatch] = useReducer(reducer,initialState)
  const {loginFun} = useContext(AuthProvider)
  const router = useRouter()

  const signin = ()=>{
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

    

    setisLoading(true)

    fetch(api_URl+"/get-item",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({query:formData,table:"users"})
    })
    .then((res)=>res.json())
    .then(async(res)=>{
      console.log(res,res?.result);
      setisLoading(false)
      if(res.status!==200){
        return ToastAndroid.show(res?.message,ToastAndroid.LONG)
      }

      if(res?.result?.length<1){
        return ToastAndroid.show("Wrong Info.",ToastAndroid.LONG)
      }

      await storeData(res?.result[0])
      // dispatch({type:"login",payload:res?.result[0]})
      loginFun(res?.result[0])
      // setformData({
      //   email:"",
      //   password:''
      // })
      ToastAndroid.show(res?.message,ToastAndroid.LONG)
      router.push("/")
    })
    
    
    
  }
  return (
    <ScrollView className="flex-1 bg-gray-800 p-5">
      
      {/* Logo Section */}
      {/* <View className="items-center mb-10">
        <FontAwesome name="globe" size={50} color="white" />
        <Text className="text-white text-3xl font-bold mt-2">VillageTourBD</Text>
      </View> */}
      <Header2/>
      <View className="bg-black p-4 rounded-md">
        {/* Sign In Text */}
        <Text className="text-white text-2xl font-bold mb-8">Sign In</Text>

        {/* Google Sign In Button */}
        {/* <TouchableOpacity className="flex-row bg-gray-800 py-3 px-5 rounded-lg mb-6 items-center">
          <FontAwesome name="google" size={24} color="white" />
          <Text className="text-white ml-3 text-lg">Sign-Up with Google</Text>
        </TouchableOpacity> */}

        {/* Divider */}
        {/* <View className="flex-row items-center justify-center mb-6">
          <View className="flex-1 h-0.5 bg-gray-500" />
          <Text className="text-gray-500 mx-4">or</Text>
          <View className="flex-1 h-0.5 bg-gray-500" />
        </View> */}

        {/* Email Input */}
        <TextInput
          className="w-full bg-gray-800 text-white text-lg p-3 rounded-lg mb-4"
          placeholder="Enter Your Email"
          placeholderTextColor="gray"
          value={formData?.email}
          onChangeText={(v)=>setformData({...formData,email:v})}
        />

        {/* Password Input */}
        <View className="w-full relative">
          <TextInput
            className="w-full bg-gray-800 text-white text-lg p-3 rounded-lg mb-2"
            placeholder="Enter Your Password"
            placeholderTextColor="gray"
            secureTextEntry={!isShowpassword}
            value={formData?.password}
            onChangeText={(v)=>setformData({...formData,password:v})}
          />
          <TouchableOpacity onPress={()=>setisShowpassword((prev)=>!prev)} className="absolute z-40 right-3 top-4">
            {
              isShowpassword?<FontAwesome name='eye' color={'gray'} size={23} />:
              <FontAwesome name='eye-slash' color={'gray'} size={23} />
            }
          </TouchableOpacity>
        </View>

        {/* Forgot Password Link */}
        <Link href={'/forgotpassword'} className="self-end mb-6">
          <Text className="text-gray-400">Forgot Password?</Text>
        </Link>

        {/* Sign In Button */}
        {!isLoading&&<TouchableOpacity onPress={signin} className="w-full bg-green-500 py-3 rounded-lg items-center mb-6">
          <Text className="text-white text-lg font-bold">Sign In Now</Text>
        </TouchableOpacity>}

        {isLoading&&<TouchableOpacity onPress={()=>setisLoading(false)} className="w-full bg-gray-500 py-3 rounded-lg items-center mb-6">
          <Text className="text-white text-lg font-bold">Sign In Now</Text>
        </TouchableOpacity>}

        <Text className="text-white mb-6">
          You don't have account?{' '}
          <Link href="/signup">
            <Text className="text-blue-400">Create Account</Text>
          </Link>
        </Text>
      </View>

      {/* Footer Section */}
      <Footer/>
    </ScrollView>
  );
};

export default SignIn;
