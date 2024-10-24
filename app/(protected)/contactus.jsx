import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, ToastAndroid } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import Mainbg1 from '../../components/Mainbg1';
import Footer from '../../components/Footer';
import { api_URl } from '../../assets/lib';

export default function ContactForm() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [email, setemail] = useState('');
  const [name, setname] = useState('');
  const [isSaving, setisSaving] = useState(false);
  const [isSent, setisSent] = useState(false);

  const insertContact = ()=>{
    setisSaving(true)
    fetch(api_URl+"/insert-item",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({data:{
            name,email,subject,description
        },table:"contacts"})
    })
    .then((res)=>res.json())
    .then((result)=>{
        setisSaving(false)
        if(result?.status!==200){
            return ToastAndroid.show(result.message, ToastAndroid.SHORT)
        }
        ToastAndroid.show(result.message, ToastAndroid.SHORT)
        setSubject('')
        setname("")
        setemail("")
        setDescription('')
        setisSent(true)
    })
  }

  return (
    <ScrollView className="bg-gray-900 flex-1">
      <Mainbg1/>

      <View className="h-20"></View>
      <View className='flex items-center'>
        <View className="w-2/3">
            <Text className={  `text-white text-3xl font-bold text-center`}>Contact</Text>
            <Text className={  `text-3xl font-bold mb-4 text-center text-green-400`}>For any Query</Text>

        </View>
        <View className='flex items-center'>
          <TouchableOpacity className={  `flex-row items-center mb-4 bg-green-500 p-2 px-5 rounded-3xl`}>
              <Entypo name="location-pin" size={24} color="white" />
              <Text className={  `text-gray-100 ml-2`}>All of Bangladesh</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="h-32"></View>


      {/* Heading */}
      <View className="mb-8 p-4">
        <Image
          source={{ uri: "https://cdni.iconscout.com/illustration/premium/thumb/contact-us-illustration-download-in-svg-png-gif-file-formats--customer-support-service-representative-call-pack-business-illustrations-5059493.png?f=webp" }} // Replace with your own image URL
          className="w-full h-40 mb-4" // Add styles for your image, like height and width
          resizeMode="contain"
        />
        <Text className="text-2xl font-bold text-center text-white mb-2">We’d Love to Hear from You!</Text>
        <Text className="text-gray-400 text-center">
          Whether you have questions, feedback, or need assistance, we’re here to help. Reach out to us using any of the methods below, and our team will get back to you as soon as possible.
        </Text>
      </View>
      
      {/* Contact Info */}
      <View className="mb-8 p-4">
        <Text className="text-white text-xl font-bold mb-4">Contract with</Text>
        
        {/* Email */}
        <View className="flex-row items-center mb-3">
          <FontAwesome name="envelope" size={20} color="white" />
          <Text className="text-gray-400 ml-2">info@villagetourBD@gmail.com</Text>
        </View>
        
        {/* Phone */}
        <View className="flex-row items-center mb-3">
          <FontAwesome name="phone" size={20} color="white" />
          <Text className="text-gray-400 ml-2">+8801780884674</Text>
        </View>
        
        {/* Location */}
        <View className="flex-row items-center mb-3">
          <Entypo name="location-pin" size={20} color="white" />
          <Text className="text-gray-400 ml-2">Ashulia, Savar, Dhaka</Text>
        </View>
      </View>
      
      {/* Form */}
      <View className="bg-gray-800 p-5 rounded-lg m-4">
        <Text className="text-lg font-bold text-white mb-4">Have a question or suggestion?</Text>
        {isSent&&<Text className="text-center text-white bg-green-500 p-3 mb-3">Message Sent Successfull</Text>}
        {/* Subject Input */}
        <TextInput
          className="bg-gray-700 text-white p-3 mb-4 rounded-lg"
          placeholder="Enter Your Name"
          placeholderTextColor="gray"
          value={name}
          onChangeText={(v)=>setname(v)}
        />
        <TextInput
          className="bg-gray-700 text-white p-3 mb-4 rounded-lg"
          placeholder="Enter Your Email"
          placeholderTextColor="gray"
          value={email}
          onChangeText={(v)=>setemail(v)}
        />
        {/* Subject Input */}
        <TextInput
          className="bg-gray-700 text-white p-3 mb-4 rounded-lg"
          placeholder="Enter Your Subject"
          placeholderTextColor="gray"
          value={subject}
          onChangeText={(v)=>setSubject(v)}
        />
        
        {/* Description Input */}
        <TextInput
          className="bg-gray-700 text-white p-3 mb-4 h-40 rounded-lg"
          placeholder="Enter Your Description"
          placeholderTextColor="gray"
          multiline
          textAlignVertical="top"
          value={description}
          onChangeText={(v)=>setDescription(v)}
        />
        
        
        
        {/* Submit Button */}
        <TouchableOpacity disabled={isSaving} onPress={insertContact} className="bg-green-500 p-4 rounded-lg">
          <Text className="text-white text-center">{isSaving?"Submitting":'Submit'}</Text>
        </TouchableOpacity>
      </View>
      <Footer/>
    </ScrollView>
  );
}
