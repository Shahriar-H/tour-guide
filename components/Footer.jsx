import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Footer = () => {
    return (
        <View className="py-5 pb-10">
            {/* Footer Section */}
            <View className="items-center">
                <Text className="text-gray-400 mb-4">Follow us:</Text>
                <View className="flex-row space-x-4 mb-6">
                    <FontAwesome name="facebook" size={24} color="white" />
                    <FontAwesome name="instagram" size={24} color="white" />
                    <FontAwesome name="twitter" size={24} color="white" />
                    <FontAwesome name="linkedin" size={24} color="white" />
                </View>
                <Text className="text-gray-400 text-sm">© 2024 Village Tour BD. All Rights Reserved.</Text>
                <Text className="text-gray-400 text-sm">Privacy Policy | Terms of Service</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Footer;
