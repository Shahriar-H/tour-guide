import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import Mainbg1 from '../../components/Mainbg1';
import Footer from '../../components/Footer';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="mb-4">
      <TouchableOpacity
        className="bg-gray-800 p-4 rounded-lg flex-row justify-between items-center"
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text className="text-white font-bold">{question}</Text>
        <FontAwesome name={isOpen ? 'chevron-up' : 'chevron-down'} size={16} color="white" />
      </TouchableOpacity>

      {isOpen && (
        <View className="bg-gray-700 p-4 mt-2 rounded-lg">
          <Text className="text-gray-400">{answer}</Text>
        </View>
      )}
    </View>
  );
};

export default function FAQSection() {
  const faqs = [
    {
      question: 'How do I contribute to Village Tour BD?',
      answer: 'After registering, you can head over to our contribute page. There, you can suggest new places, upload photos, or share updates about places you’ve visited. Simply fill out the form and submit your contribution.',
    },
    {
      question: 'How do I contribute to Village Tour BD?',
      answer: 'After registering, you can head over to our contribute page. There, you can suggest new places, upload photos, or share updates about places you’ve visited. Simply fill out the form and submit your contribution.',
    },
    {
      question: 'How do I contribute to Village Tour BD?',
      answer: 'After registering, you can head over to our contribute page. There, you can suggest new places, upload photos, or share updates about places you’ve visited. Simply fill out the form and submit your contribution.',
    },
    {
      question: 'How do I contribute to Village Tour BD?',
      answer: 'After registering, you can head over to our contribute page. There, you can suggest new places, upload photos, or share updates about places you’ve visited. Simply fill out the form and submit your contribution.',
    },
  ];

  return (
    <ScrollView className="bg-black">
        <Mainbg1/>
        <View className="h-20"></View>
      <View className='flex items-center'>
        <View className="w-2/3">
            <Text className={  `text-white text-3xl font-bold text-center`}>FAQ</Text>
            <Text className={  `text-3xl font-bold mb-4 text-center text-green-400`}>Frequently Asked</Text>

        </View>
        <View className='flex items-center'>
          <TouchableOpacity className={  `flex-row items-center mb-4 bg-green-500 p-2 px-5 rounded-3xl`}>
              <Entypo name="location-pin" size={24} color="white" />
              <Text className={  `text-gray-100 ml-2`}>All of Bangladesh</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="h-32"></View>
        {/* https://cdni.iconscout.com/illustration/premium/thumb/faq-illustration-download-in-svg-png-gif-file-formats--customer-questions-and-answers-helpdesk-pack-network-communication-illustrations-3749051.png?f=webp */}
        <Image
          source={{ uri: "https://cdni.iconscout.com/illustration/premium/thumb/faq-illustration-download-in-svg-png-gif-file-formats--customer-questions-and-answers-helpdesk-pack-network-communication-illustrations-3749051.png?f=webp" }} // Replace with your own image URL
          className="w-full h-40 mb-4" // Add styles for your image, like height and width
          resizeMode="contain"
        />
      <View className="p-2">
        <Text className="text-2xl font-bold text-white mb-5">General Questions</Text>
        {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </View>

      <Footer/>
    </ScrollView>
  );
}
