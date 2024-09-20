import { createContext } from "react";
import { View, Text } from 'react-native'
import React from 'react'


const AuthContext = createContext()



export default function Provider() {
    
  return (
    <View>
      <Text>Provider</Text>
    </View>
  )
}