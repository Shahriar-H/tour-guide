import React, { createContext, useEffect, useReducer } from 'react';
import { StyleSheet, View } from 'react-native';

import { Stack } from 'expo-router';
import useSessionget from '../hooks/useSessionget';
import { initialState, reducer } from '../assets/lib';
import { useIsFocused } from '@react-navigation/native';
import { useState } from 'react';
import { SplashScreen } from 'expo-router';

SplashScreen.preventAutoHideAsync()

export const AuthProvider = createContext();

const Layout = () => {
    const {data} = useSessionget()
    const [state, dispatch] = useReducer(reducer,initialState)
    const isFocused = useIsFocused()
    const [userData, setuserData] = useState(data);
    const [isLoading, setisLoading] = useState(true);

   
    useEffect(() => {
        console.log('stated35',data);
        if(data?.name){
            setuserData(data)
            
            dispatch({type:"login",payload:data})
            setisLoading(false)
        }
    }, [data?.name,isFocused]);

    setTimeout(() => {
        SplashScreen.hideAsync()
    }, 4000);
    

    const logoutFun = ()=>{
        setuserData({})
    }
    const loginFun = (data)=>{
        setuserData(data)
    }

    

    return( 
        <AuthProvider.Provider value={{data:userData,logoutFun,loginFun,isLoading}}>
            <Stack>
                <Stack.Screen name='(protected)' options={{headerShown:false}}></Stack.Screen>
            
            </Stack>
        </AuthProvider.Provider>
    )
}


export default Layout;
