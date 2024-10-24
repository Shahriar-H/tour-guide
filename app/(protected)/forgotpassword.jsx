import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import Footer from '../../components/Footer';
import Header2 from '../../components/Header2';
import { api_URl } from '../../assets/lib';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [isSend, setisSend] = useState(false);
  const sendEmail = async ({userName,password}) => {
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
      <div class="header"><h1>Password Get Request</h1></div>
      <div class="content">
        <p>Hello, ${userName}</p>
        <p>You recently requested to get your password. Check the password below.</p>
        <p class="showpass">${password}</p>
        <p>If you did not request a password request, please ignore this email.</p>
        <p>Thanks,<br/>Tour BD</p>
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
        email: email,
        subject: "Password Request",
        message: emailHtmlTemplate,
      }),
    })
    .then((res)=>res.json())
    .then((res)=>{
      setisLoading(false)
      setisSend(true)
      setEmail('')
      console.log(res);
      
      if(res?.status!==200){
        return Alert.alert("Error", "Email Failed to Send")
      }
      Alert.alert("Email Send", "Email Successfully Send")
    })
    .catch((err)=>{
      setisLoading(false)
      console.log(err);
      
      Alert.alert("Error", "Email Failed to Send")
    })
  //{email,message,subject}
    
  };

  const handleResetPassword = () => {
    // Add your password reset logic here
    if(!email){
      return ToastAndroid.show("No Email",ToastAndroid.SHORT)
    }
    setisLoading(true)
    fetch(api_URl+"/get-item",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({query:{email},table:"users"})
    })
    .then((res)=>res.json())
    .then((res)=>{
      console.log(res?.result);
      setisLoading(false)
      if(res?.result.length<1){
        return Alert.alert("Not Found", "This email has not registered!")
      }

      sendEmail({userName:res?.result[0]?.name,password:res?.result[0]?.password})
      
    })
    
  };

  return (
    <View className="flex-1 bg-black justify-center items-center p-2">
      
      {/* Logo Section */}
      {/* <View className="items-center mb-8">
        <FontAwesome name="globe" size={50} color="white" />
        <Text className="text-white text-3xl font-bold mt-2">VillageTourBD</Text>
      </View> */}
      <Header2/>
      <View className="rounded px-4 w-full bg-gray-900 p-3 min-h-[400px] pt-10">
        {/* Forgot Password Text */}
        <View className="flex justify-center items-center">
            <FontAwesome name="search" size={34} color="white" />   
        </View>
        <Text className="text-white text-2xl text-center w-full font-bold mb-8">Forgot Password</Text>
       {isSend&&<Text className="text-green-700 text-center w-full bg-green-200 p-3 mb-4">Send Success, Check your email</Text>}

        {/* Email Input */}
        <TextInput
        className="w-full bg-gray-800 text-white text-lg p-4 rounded-lg mb-4"
        placeholder="Enter Your Email"
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        />

        {/* Reset Password Button */}
        <TouchableOpacity 
        onPress={handleResetPassword}
        disabled={isLoading}
        className="w-full bg-green-500 py-4 rounded-lg items-center mb-6">
        <Text className="text-white text-lg font-bold">{isLoading?"Sending...":'Reset Password'}</Text>
        </TouchableOpacity>

        {/* Back to Sign In */}
        <Text className="text-white mb-6">
        Remembered your password?{' '}
        <Link href="/login">
            <Text className="text-blue-400">Back to Sign In</Text>
        </Link>
        </Text>
      </View>
      

      {/* Footer Section */}
      <Footer/>
    </View>
  );
};

export default ForgotPassword;
