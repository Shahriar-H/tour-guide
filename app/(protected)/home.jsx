import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useTailwind } from 'nativewind';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import Header2 from '../../components/Header2';
import Footer from '../../components/Footer';
import Placebox from '../../components/Placebox';
import Popularcats from '../../components/Popularcats';
import Header from '../../components/Header';



const Home = () => {
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [village, setVillage] = useState('');
  const [placeType, setPlaceType] = useState('');

  const handleFindPlace = () => {
    // Handle find place logic here
  };

  return (
    <ScrollView className={  ` bg-gray-100`}>
     
      <View className='flex items-center'>
        <View className="w-2/3">
            <Text className={  `text-white text-3xl font-bold text-center`}>Welcome to</Text>
            <Text className={  `text-3xl font-bold mb-4 text-center text-green-400`}>Village Tour BD</Text>

            <Text className={  `text-gray-400 mb-2 text-center`}>Explore exciting locations around the Bangladesh village</Text>
        </View>
      </View>
      <View className='flex items-center'>
        <TouchableOpacity className={  `flex-row items-center mb-4 bg-green-500 p-2 px-5 rounded-3xl`}>
            <Entypo name="location-pin" size={24} color="white" />
            <Text className={  `text-gray-100 ml-2`}>All of Bangladesh</Text>
        </TouchableOpacity>
      </View>
      <View className={  `w-full px-4`}>
        <TextInput
          value={region}
          onChangeText={setRegion}
          placeholder="Enter Your Region"
          placeholderTextColor={'#a0a0a0'}
          className={  `bg-gray-700 text-white p-3 rounded-md mb-2`}
        />
        <TextInput
          value={city}
          onChangeText={setCity}
          placeholder="Enter Your City"
          placeholderTextColor={'#a0a0a0'}
          className={  `bg-gray-700 text-white p-3 rounded-md mb-2`}
        />
        <TextInput
          value={village}
          onChangeText={setVillage}
          placeholder="Enter Your Village (Optional)"
          placeholderTextColor={'#a0a0a0'}
          className={  `bg-gray-700 text-white p-3 rounded-md mb-2`}
        />
        <TextInput
          value={placeType}
          onChangeText={setPlaceType}
          placeholder="Enter Your Type of place"
          placeholderTextColor={'#a0a0a0'}
          className={  `bg-gray-700 text-white p-3 rounded-md mb-4`}
        />
        <TouchableOpacity
          className={  `bg-green-500 text-white p-3 rounded-md`}
          onPress={handleFindPlace}
        >
          <Text className="text-center text-md font-bold">FIND THE PLACE</Text>
        </TouchableOpacity>
      </View>
      

      {/* PlaceCard */}
      <View className="p-4">
        <Placebox/>
        <Placebox/>
        <Placebox/>

        <Popularcats/>
      </View>


      <View className="m-2 rounded bg-[#4A7D4A] p-4">
        <Text className="text-2xl mb-2 text-gray-100">Start Contributing Today!</Text>
        <Text style={{lineHeight:20}} className=" text-gray-200 ">Become a part of the Village Tour BD community! Share your hidden gems and help fellow travelers discover the beauty of Bangladesh's villages. Your contributions can make a difference.</Text>
        <TouchableOpacity className={  `w-1/2 flex-row items-center my-4 bg-[#F9D189] p-2 px-5 rounded-3xl`}>
            <Text className={  `text-gray-800 ml-2`}>Be A Contributer</Text>
        </TouchableOpacity>
      </View>
      <View className="m-2 rounded bg-[#F9D189] p-4">
        <Text className="text-2xl mb-2 text-gray-900">Visit Your Desired Places</Text>
        <Text style={{lineHeight:20}} className=" text-gray-800 ">Ready to explore the hidden treasures of Bangladesh's villages? Discover unique destinations, plan your trips, and immerse yourself in the local culture. Your adventure awaits.</Text>
        <TouchableOpacity className={  `w-1/2 flex-row items-center my-4 bg-[#4A7D4A] p-2 px-5 rounded-3xl`}>
            <Text className={  `text-gray-200 ml-2`}>Start your Journey</Text>
        </TouchableOpacity>
      </View>



      <Footer/>
    </ScrollView>
  );
};

export default Home;