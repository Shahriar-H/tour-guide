import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Header = () => {
    const navigation = useNavigation()
    const drawerController = ()=>{
        navigation.toggleDrawer()
    }
    return (
        <View className="flex flex-row justify-between bg-black w-full items-center px-3 pt-10 fixed top-0">
            <Image resizeMode='contain' source={require('../assets/images/mainlogo.png')} className={ `my-2 max-w-[200px]`} />
            <View className="flex flex-row items-center space-x-2">
                <TouchableOpacity className={  `flex-row items-center my-4 bg-green-500 p-2 px-5 rounded-3xl`}>
                    <Text className={  `text-gray-100`}>Signup</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={drawerController}>
                    <FontAwesome name='bars' color={'#fff'} size={30} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Header;
