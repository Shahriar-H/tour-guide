import { Link } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Contactbg = () => {
    return (
        <View className="relative h-60 m-4 overflow-hidden">
            <Image resizeMode='cover' className="w-full rounded-md h-full absolute top-0 left-0 z-30" source={require("../assets/images/contactbg.jpg")} />
            <View className="h-full w-full bg-[#0000006b] justify-center items-center p-4 absolute top-0 left-0 z-40">
                <Text className="text-2xl mb-2 text-center text-gray-100">24/7 Support</Text>
                <Text style={{lineHeight:20}} className=" text-gray-100 text-center">Ready to explore the hidden treasures of Bangladesh's villages? Discover unique destinations, plan your trips, and immerse yourself in the local culture. Your adventure awaits.</Text>
                <Link href={'/contactus'} className={  `w-1/2 text-center justify-center flex-row items-center my-4 bg-green-500 p-2 px-5 rounded-3xl`}>
                    <Text className={  `text-gray-200 text-center ml-2`}>Contact Us</Text>
                </Link>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({})

export default Contactbg;
