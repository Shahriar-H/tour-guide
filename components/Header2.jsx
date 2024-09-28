import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const Header2 = () => {
    return (
        <View className="flex justify-center w-full items-center ">
            <Image source={require('../assets/images/mainlogo.png')} className={ `my-5`} />
        </View>
    );
}

const styles = StyleSheet.create({})

export default Header2;
