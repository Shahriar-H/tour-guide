import { View, Text } from 'react-native'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { initialState, reducer } from '../../assets/lib';
import { AuthProvider } from '../_layout';
import { useIsFocused } from '@react-navigation/native';

export default function logout() {
    const [isLoggingout, setisLoggingout] = useState(true);
    const [state, dispatch] = useReducer(reducer,initialState)
    const router = useRouter()
    const {logoutFun} = useContext(AuthProvider)
    const isFocused = useIsFocused()
    const logoutFunction = async ()=>{
      logoutFun()
      await AsyncStorage.removeItem('user')
      dispatch({type:"logout"})

      router.push("/login")
    }
    useEffect(() => {
      logoutFunction()
      logoutFun()
    }, [isFocused]);
  return (
    <View className="bg-black flex-1 justify-center items-center">
      <Text className="text-center text-white">Logging out...</Text>
    </View>
  )
}