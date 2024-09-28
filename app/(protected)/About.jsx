import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Mainbg from "../../components/Mainbg";
import Contactbg from "../../components/Contactbg";
import Footer from "../../components/Footer";

const About = () => {
  return (
    <ScrollView className="bg-black">
      <Mainbg />
      <View className="h-32"></View>
      <View className='flex items-center mt-10'>
        <View className="w-2/3">
            <Text className={  `text-white text-3xl font-bold text-center`}>About</Text>
            <Text className={  `text-3xl font-bold mb-4 text-center text-green-400`}>Our Services</Text>

        </View>
      </View>
      {/* Section 1: Who We Are */}
      <View className="mb-8 mt-40">
        <Image
          source={{ uri: "https://logicranks.com/wp-content/uploads/2021/04/Our-Story-About-Us-.png" }} // Replace with your own image URL
          className="w-full h-40 mb-4" // Add styles for your image, like height and width
          resizeMode="contain"
        />
        <Text className="text-2xl font-bold text-center text-white mb-2">
          Who We Are
        </Text>
        <Text className="text-gray-400 text-center">
          Village Tour BD is a platform dedicated to exploring and showcasing
          the beauty, culture, and hidden treasures of Bangladesh's villages.
          Our mission is to bring travelers closer to the vibrant heart of rural
          Bangladesh, providing them with the opportunity to discover the unique
          landscapes, traditions, and experiences that define our villages.
        </Text>
      </View>

      {/* Section 2: Our Vision */}
      <View className="mb-8 bg-gray-800 p-5 rounded-lg">
        <Text className="text-2xl font-bold text-center text-white mb-2">
          Our Vision
        </Text>
        <Text className="text-gray-400 text-center">
          We believe in sustainable tourism that highlights the authentic charm
          of village life while respecting the local environment and culture. By
          promoting lesser-known destinations, we aim to support the rural
          communities of Bangladesh and preserve their heritage for future
          generations.
        </Text>
      </View>

      {/* Section 3: Our Mission */}
      <View className="mb-8 bg-gray-800 p-5 rounded-lg">
        <Text className="text-2xl font-bold text-center text-white mb-2">
          Our Mission
        </Text>
        <Text className="text-gray-400 text-center mb-4">
          Village Tour BD is committed to:
        </Text>
        <View className="space-y-2">
          <Text className="text-green-400 text-center">
            • Connecting travelers with the untapped beauty of Bangladesh
            villages.
          </Text>
          <Text className="text-green-400 text-center">
            • Supporting rural tourism by encouraging responsible travel.
          </Text>
          <Text className="text-green-400 text-center">
            • Providing an engaging platform where locals and travelers can
            contribute their insights, stories, and recommendations.
          </Text>
        </View>
      </View>

      {/* Section 4: Why Choose Village Tour BD? */}
      <View className="bg-gray-800 p-5 rounded-lg">
        <Text className="text-2xl font-bold text-center text-white mb-2">
          Why Choose Village Tour BD?
        </Text>
        <Text className="text-gray-400 text-center">
          Whether you're looking to immerse yourself in nature, explore cultural
          landmarks, or experience the warmth of village hospitality, we offer
          curated recommendations, authentic travel guides, and unforgettable
          rural experiences.
        </Text>
      </View>
      <Contactbg/>
      <Footer/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default About;