import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useTailwind } from 'nativewind';
import { FontAwesome } from '@expo/vector-icons';
import Footer from '../../components/Footer';
import Header2 from '../../components/Header2';
import { Link } from 'expo-router';



const ResetPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
  
    const handleResetPassword = () => {
      // Handle reset password logic here
    };
  
    return (
      <View className={ `flex flex-col items-center justify-center h-full bg-black`}>
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
        placeholder="Enter a Password"
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        />
        <TextInput
        className="w-full bg-gray-800 text-white text-lg p-4 rounded-lg mb-4"
        placeholder="Confirm Password"
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        />

        {/* Reset Password Button */}
        <TouchableOpacity 
        onPress={handleResetPassword}
        className="w-full bg-green-500 py-4 rounded-lg items-center mb-6">
        <Text className="text-white text-lg font-bold">Reset Password</Text>
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