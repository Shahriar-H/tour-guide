import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useTailwind } from 'nativewind';
import { FontAwesome } from '@expo/vector-icons';
import Footer from '../../components/Footer';
import Header2 from '../../components/Header2';



const Confirmationemail = () => {
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
  
    const handleResetPassword = () => {
      // Handle reset password logic here
    };
  
    return (
      <View className={ `flex flex-col items-center justify-center h-full bg-black`}>
        <Header2/>
        <View className={ `rounded px-4 bg-gray-900 p-3 min-h-[400px] pt-12`}>
          <View className="flex justify-center items-center">
            <FontAwesome name="check" size={34} color="white" />   
          </View>
          <Text className={ `text-gray-100 font-bold mb-2 text-center text-2xl`}>Confirm Your Email</Text>
          <Text className={ `text-gray-400 mb-4 text-center`}>
            Please check your email to receive a verification code.
          </Text>
          
          <View className={ `flex-row mb-4 items-center justify-center`}>
            <TextInput
              value={verificationCode}
              onChangeText={setVerificationCode}
             
              keyboardType="numeric"
              className={ `bg-gray-700 text-white py-4 px-4 rounded-md mr-2`}
            />
            <TextInput
              
              keyboardType="numeric"
              className={ `bg-gray-700 text-white p-4 rounded-md mr-2`}
            />
            <TextInput
             
              keyboardType="numeric"
              className={ `bg-gray-700 text-white p-4 rounded-md mr-2`}
            />
            <TextInput
              
              keyboardType="numeric"
              className={ `bg-gray-700 text-white p-4 rounded-md`}
            />
          </View>
          <TouchableOpacity
            className={ `bg-green-500 text-white p-3 rounded-md mt-4`}
            onPress={handleResetPassword}
          >
            <Text className="text-white text-lg font-bold text-center">Verify</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={ `text-gray-400 mt-2`}
            onPress={() => {
              // Handle resend code logic here
            }}
          >
            <Text className="text-center text-gray-300">Resend Code</Text>
          </TouchableOpacity>
        </View>
        <View className='mb-24'></View>
        {/* Footer */}
        <Footer/>
        
      </View>
    );
  };
  
  export default Confirmationemail;