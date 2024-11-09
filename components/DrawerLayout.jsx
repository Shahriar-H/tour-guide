//DrwaerLayout.jsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

import { Image, Text, TouchableOpacity, View } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import useSessionget from '../hooks/useSessionget';
import { useContext, useEffect, useReducer } from 'react';
import { initialState, reducer } from '../assets/lib';
import { useIsFocused } from '@react-navigation/native';
import { AuthProvider } from '../app/_layout';
import { useRouter } from 'expo-router';


export default function DrawerLayout() {
    const {data} = useSessionget()
    const [state, dispatch] = useReducer(reducer,initialState)
    const isFocused = useIsFocused()
    const {data:sessiond,isLoading} = useContext(AuthProvider)
    const router = useRouter()
   
    const drawerController = (navigation)=>{
        navigation.openDrawer()
    }
    useEffect(() => {
        console.log('state111',sessiond);
        if(data?.name){
            dispatch({type:"login",payload:data})
        }
        console.log(isLoading);
        
    }, [sessiond?.name]);

    const controllButton =()=>{
        if(sessiond?.name){
            router.push('contribution')
        }else{
            router.push('login')
        }
    }
  return (<>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer 
        screenOptions={({ navigation }) => ({
            headerLeft:()=>{
                return <TouchableOpacity onPress={()=>navigation.navigate("index")}>
                  <Image resizeMode='contain' source={require('../assets/images/mainlogo.png')} className={ `my-2 ml-3 max-w-[200px]`} />
                </TouchableOpacity>
            },
            headerRight:()=>{
                return <View className="flex mr-3 flex-row items-center space-x-2">
                <TouchableOpacity onPress={controllButton} className={  `bg-green-500 min-w-[90px] p-2 px-5 rounded-3xl`}>
                    <Text className="text-gray-100 text-center">{sessiond?.name?"Contribute":'Login'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                    <FontAwesome name='bars' color={'#fff'} size={30} />
                </TouchableOpacity>
            </View>
            },
            headerStyle:{backgroundColor:"#000"},
            drawerStyle:{backgroundColor:'#000'},
            drawerLabelStyle:{color:'#fff'},
            headerTitleStyle:{display:'none'},
            drawerActiveBackgroundColor:'green'
        
            })}
      >
        
        <Drawer.Screen
          name={"index"} // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Home',
            

          }}
        />
        
        
        
        <Drawer.Screen
          name="contribution"
          options={{
            drawerLabel: 'Contribution',
            drawerItemStyle:{display:sessiond?.name?"block":"none"}
          }}
        />

        <Drawer.Screen
          name="resetpassword" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Reset password',
            drawerItemStyle:{display:sessiond?.name?"block":'none'}
          }}
        />
        <Drawer.Screen
          name="nearest" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Nearest Place',
            
          }}
        />
        <Drawer.Screen
          name="profile" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'My Profile',
            drawerItemStyle:{display:sessiond?.name?"block":'none'}
          }}
        />
        <Drawer.Screen
          name="catwiseplaces" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'catwiseplaces',
            drawerItemStyle:{display:'none'}
          }}
        />
        <Drawer.Screen
          name="About" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'About Us',
        
          }}
        />
        <Drawer.Screen
          name="contactus" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Contact Us',
        
          }}
        />
        <Drawer.Screen
          name="faq" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'FAQ',
        
          }}
        />
        <Drawer.Screen
          name="forgotpassword" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Forgot Password',
            drawerItemStyle:{display:'none'}
          }}
        />
        <Drawer.Screen
          name="editcontribution" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Edit Contribution',
            drawerItemStyle:{display:'none'}
          }}
        />

        {<Drawer.Screen
          name="login" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Login',
            drawerItemStyle:{display:!sessiond?.name?"block":'none'}
          }}
        />}
        {<Drawer.Screen
          name="signup" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Signup',
            drawerItemStyle:{display:!sessiond?.name?"block":'none'}
          }}
        />}
        

        {/* Hidden items */}
        <Drawer.Screen
          name="confirmationemail" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Confirmation Email',
            drawerItemStyle:{display:'none'}
          }}
        />
        <Drawer.Screen
          name="edit-profile" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Edit Profile',
            drawerItemStyle:{display:'none'}
          }}
        />
        <Drawer.Screen
          name="home" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Home',
            drawerItemStyle:{display:'none'}
          }}
        />
        <Drawer.Screen
          name="singleplace" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'singleplace',
            drawerItemStyle:{display:'none'}
          }}
        />
        
        <Drawer.Screen
          name="logout" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Logout',
            drawerItemStyle:{display:sessiond?.name?"block":'none'}
          }}
        />
        
        
        
      </Drawer>
    </GestureHandlerRootView>
    </>
  );
}
