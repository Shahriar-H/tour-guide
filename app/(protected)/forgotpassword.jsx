import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import Footer from '../../components/Footer';
import Header2 from '../../components/Header2';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    // Add your password reset logic here
    alert('Password reset link sent to: ' + email);
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
        className="w-full bg-green-500 py-4 rounded-lg items-center mb-6">
        <Text className="text-white text-lg font-bold">Reset Password</Text>
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
