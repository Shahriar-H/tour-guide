import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const Mainbg = () => {
    return (
        <View>
            <View>
                <Image resizeMode='stretch' className="absolute h-[400px]" source={require("../assets/images/bg.png")} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Mainbg;
