import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import Footer from '../../components/Footer';
import Header2 from '../../components/Header2';
import { Link } from 'expo-router';
import { api_URl } from '../../assets/lib';
import { AuthProvider } from '../_layout';



const ResetPasswordScreen = () => {
    
    const [verificationCode, setVerificationCode] = useState('');
    const [password, setpassword] = useState('');
    const [newpassword, setnewpassword] = useState('');
    const {data} = useContext(AuthProvider)
    const [isUpdating, setisUpdating] = useState(false);

    const updateData = ()=> {
      fetch(api_URl+"/update-item",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({data:{password:newpassword,confirm:newpassword},table:"users",id:data?._id})
      })
      .then((res)=>res.json())
      .then((res)=>{
        console.log(res?.result);
        setisUpdating(false)
        if(res?.status!==200){
          return Alert.alert("Not Found", "This email has not registered!")
        }
        setnewpassword('')
        setpassword('')
        return Alert.alert("Success", "Password Has been Reseted")
        
        
      })
    };
  
    const handleResetPassword = () => {
      setisUpdating(true)
      fetch(api_URl+"/get-item",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({query:{email:data?.email,password},table:"users"})
      })
      .then((res)=>res.json())
      .then((res)=>{
        console.log(res?.result);
        setisUpdating(false)

        if(res?.result.length<1){
          return Alert.alert("Not Found", "Old Password Not Matched")
        }
        updateData()
        
        
      })
    };
  
    return (
      <View className="flex flex-col items-center justify-center h-full bg-black p-3">
        <Header2/>
        <View className="rounded px-4 w-full bg-gray-900 p-3 min-h-[400px] pt-10">
        {/* Forgot Password Text */}
        <View className="flex justify-center items-center">
            <FontAwesome name="refresh" size={34} color="white" />   
        </View>
        <Text className="text-white text-2xl text-center w-full font-bold mb-8">Reset Password</Text>

        {/* Email Input */}
        <TextInput
        className="w-full bg-gray-800 text-white text-lg p-4 rounded-lg mb-4"
        placeholder="Enter OLD Password"
        placeholderTextColor="gray"
        value={password}
        onChangeText={(v)=>setpassword(v)}
      
        />
        <TextInput
        className="w-full bg-gray-800 text-white text-lg p-4 rounded-lg mb-4"
        placeholder="Enter New Password"
        placeholderTextColor="gray"
        value={newpassword}
        onChangeText={(v)=>setnewpassword(v)}
      
        />
        

        {/* Reset Password Button */}
        <TouchableOpacity 
        onPress={handleResetPassword}
        disabled={isUpdating}
        className="w-full bg-green-500 py-4 rounded-lg items-center mb-6">
        <Text className="text-white text-lg font-bold">{isUpdating?"Updating...":'Reset Password'}</Text>
        </TouchableOpacity>

        {/* Back to Sign In */}
        <Text className="text-white mb-6">
        Remembered your password?{' '}
        <Link href="/signin">
            <Text className="text-blue-400">Back to Sign In</Text>
        </Link>
        </Text>
      </View>
        <View className='mb-24'></View>
        {/* Footer */}
        <Footer/>
        
      </View>
    );
  };
  
  export default ResetPasswordScreen;