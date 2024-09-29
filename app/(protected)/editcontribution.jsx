import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, ToastAndroid } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import Footer from '../../components/Footer';
import Placebox from '../../components/Placebox';
import Popularcats from '../../components/Popularcats';

import Mainbg from '../../components/Mainbg';
import { api_URl } from '../../assets/lib';
import { Picker } from '@react-native-picker/picker';
import { AuthProvider } from '../_layout';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import Contactbg from '../../components/Contactbg';
import * as ImagePicker from 'expo-image-picker';
import { imageUpload } from '../../assets/imageupload';


const EditContribution = () => {
  const [region, setRegion] = useState('');
  const [placeType, setPlaceType] = useState('');
  const [title, settitle] = useState('');
  const [description, setdescription] = useState('');
  const [website, setwebsite] = useState('');
  const [phone, setphone] = useState('');
  const [googlemap, setgooglemap] = useState('');
  const [isSelectedRule, setisSelectedRule] = useState(true);
  const [districts, setdistricts] = useState([]);
  const [selectedDistrict, setselectedDistrict] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [placetypesare, setplacetypesare] = useState(null);
  const [palcesmine, setpalcesmine] = useState([]);
  const [fetchingDistrict, setfetchingDistrict] = useState(false);
  const [isFetcingType, setisFetcingType] = useState(false);
  const {data} = useContext(AuthProvider)
  const route = useRouter()
  const isFocued = useIsFocused()
  const [isUploading, setisUploading] = useState(false);

  const [image, setImage] = useState(null);
  const [uploadeImages, setuploadeImages] = useState([]);
  const queryName = useLocalSearchParams()

  const pickImage = async () => {
    if(isUploading){
      return 0;
    }
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setisUploading(true)
      imageUpload(result.assets[0].uri).then((res)=>{
        console.log("imageUped",res);
        setuploadeImages((prev)=>[...prev,res])
        setisUploading(false)
      })
      
      setImage(result.assets[0].uri);
    }
  };


  // useEffect(() => {
  //   if(!data?.name){
  //     route.navigate("login")
  //   }
  // }, [isFocued]);

  const getdistrict = ()=>{
    setfetchingDistrict(true)
    fetch("https://bdapis.com/api/v1.2/districts")
    .then((res)=>res.json())
    .then((result)=>{
        setfetchingDistrict(false)
      setdistricts(result?.data)
    })
  }


  const getplacetype = ()=>{
    setisFetcingType(true)
    fetch(api_URl+"/get-item",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({query:{},table:"place_type"})
    })
    .then((res)=>res.json())
    .then((result)=>{
        setisFetcingType(false)
        setplacetypesare(result?.result)
    })
  }

  const getMyplaces = ()=>{
    fetch(api_URl+"/get-item",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({query:{id:queryName?.id},table:"places"})
    })
    .then((res)=>res.json())
    .then((result)=>{
        console.log(result);
        
        const data = result?.result[0]
        console.log(result?.result[0]);
        
        setPlaceType(data?.placeType)
        setuploadeImages(data?.images)
        setRegion(data?.region)
        setselectedDistrict(data?.district)
        setdescription(data?.description)
        setgooglemap(data?.googlemap)
        setphone(data?.phone)
        settitle(data?.title)
        setwebsite(data?.website)
        
    })
  }

  const filtterImageDelet = (image)=>{
    
    const images = uploadeImages.filter((img)=>img!==image)
    setuploadeImages(images)
    
    
  }

  useEffect(() => {
    getdistrict()
    getplacetype()
    getMyplaces()
   
    
    
  }, [isFocued]);





  const handleFindPlace = () => {
    // Handle find place logic here
    const formData = {
        region:region,
        district:selectedDistrict,
        placeType:placeType,
        title:title,
        description:description,
        website:website,
        phone:phone,
        images:uploadeImages,
        googlemap:googlemap,
        user_info:data, //contribiutor data,
        positive:"No"
    }

    let isEnputFilled=true;
    Object.keys(formData).map((key)=>{
      if(formData[key]==='' && (key!=='website')){
        isEnputFilled=false
        return ToastAndroid.show(key+ " is empty",ToastAndroid.SHORT)
      }
    })

    if(!isEnputFilled){
      return 0;
    }
  
    
    if(!isSelectedRule){
        return ToastAndroid.show("Please Agree with Terms",ToastAndroid.LONG)
    }

    setisLoading(true)

    fetch(api_URl+"/update-item",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({data:formData,table:"places",id:queryName?.id})
    })
    .then((res)=>res.json())
    .then((result)=>{
        console.log(result);
      setisLoading(false)
      if(result.status!==200){
        return ToastAndroid.show(result?.message,ToastAndroid.LONG)
      }
      
     
      getMyplaces()
      
      ToastAndroid.show(result?.message,ToastAndroid.LONG)
    })

    
  };

  return (
    <ScrollView className={  ` bg-black`}>
      <Mainbg/>
      <View className='flex items-center mt-10'>
        <View className="w-full">
            <Text className={  `text-white text-3xl font-bold text-center`}>Do Changes</Text>
            
            <Text className={  `text-3xl font-bold  text-center text-green-400`}>Of your Places </Text>
          
        </View>
      </View>
      <View className='flex items-center'>
        {/* <TouchableOpacity className={  `flex-row items-center mb-4 bg-green-500 p-2 px-5 rounded-3xl`}>
            <Entypo name="location-pin" size={24} color="white" />
            <Text className={  `text-gray-100 ml-2`}>All of Bangladesh</Text>
        </TouchableOpacity> */}
      </View>
      <View className={  ` bg-[#2e2e2ecd] m-3 px-4 py-4`}>
        <Text className={  `text-white text-xl mb-4 font-bold`}>Share Your Village Discoveries</Text>
        <Picker
            selectedValue={selectedDistrict}
            
            style={{backgroundColor:"#374151",color:selectedDistrict?"#fff":"gray", borderRadius:10}}
            onValueChange={(itemValue, itemIndex) =>
            setselectedDistrict(itemValue)
            }>
                {/* <Picker.Item label="Java" value="java" /> */}
                {fetchingDistrict&&<Picker.Item label="Loading..." value="No Value" />}
                {!fetchingDistrict&&districts.length>0&&districts?.map((item,index)=>{
                return <Picker.Item key={index} label={item?.district} value={item?.district} />
            })}
        </Picker>
        <TextInput
          value={region}
          onChangeText={setRegion}
          placeholder="Enter Your Region/Village/Area"
          placeholderTextColor={'#a0a0a0'}
          className={  `bg-gray-700 text-white p-3 rounded-md my-4`}
        />
        {/* <TextInput
          value={city}
          onChangeText={setCity}
          placeholder="Enter Your City"
          placeholderTextColor={'#a0a0a0'}
          className={  `bg-gray-700 text-white p-3 rounded-md mb-2`}
        /> */}
        
        <Picker
            selectedValue={placeType}
            style={{backgroundColor:"#374151",color:placeType?"#fff":"gray", borderRadius:10}}
            onValueChange={(itemValue, itemIndex) =>
            setPlaceType(itemValue)
            }>
                {/* <Picker.Item label="Java" value="java" /> */}
                {isFetcingType&&<Picker.Item label="Loading..." value="No Value" />}
                {!isFetcingType&&placetypesare?.length>0&&placetypesare?.map((item,index)=>{
                return <Picker.Item key={index} label={item?.name} value={item?.name} />
            })}
        </Picker>
        <TextInput
          value={title}
          onChangeText={settitle}
          placeholder="Name of place"
          placeholderTextColor={'#a0a0a0'}
          className={  `bg-gray-700 text-white p-3 rounded-md my-4`}
        />

        <TextInput
          value={description}
          onChangeText={setdescription}
          placeholder="Place description"
          placeholderTextColor={'#a0a0a0'}
          multiline={true}
          textAlignVertical='top'
          className={  `bg-gray-700 text-white p-3 h-40 rounded-md mb-4`}
        />

        <TextInput
          value={googlemap}
          onChangeText={setgooglemap}
          placeholder="Google map link"
          placeholderTextColor={'#a0a0a0'}
          className={  `bg-gray-700 text-white p-3 rounded-md mb-4`}
        />
        <TextInput
          value={website}
          onChangeText={setwebsite}
          placeholder="Website link"
          placeholderTextColor={'#a0a0a0'}
          className={  `bg-gray-700 text-white p-3 rounded-md mb-4`}
        />
        <TextInput
          value={phone}
          onChangeText={setphone}
          placeholder="Phone Number"
          maxLength={11}
          keyboardType='number-pad'
          placeholderTextColor={'#a0a0a0'}
          className={  `bg-gray-700 text-white p-3 rounded-md mb-4`}
        />

        <TouchableOpacity onPress={pickImage} className="bg-gray-700 rounded-md p-3">
          <Text className="text-center text-gray-100">{isUploading?"Uploading...":'Select Images'}</Text>
        </TouchableOpacity>
        <View className="bg-gray-700 rounded-md p-3 mt-2 flex flex-row flex-wrap">
          {uploadeImages&&uploadeImages.map((item,index)=>{
            return <View key={index} className="relative">
              <TouchableOpacity onPress={()=>filtterImageDelet(item)} className="absolute z-30 rounded-md bg-white p-1"><FontAwesome name='trash' size={16} /></TouchableOpacity>
              <Image  resizeMode='cover' className="h-16 w-16 m-1" source={{uri:item}} />
              </View>
          })}
        </View>

        {/* Terms and Conditions Checkbox */}
        <View  className="flex-row items-center my-6">
            
            <TouchableOpacity onPress={()=>setisSelectedRule((prev)=>!prev)} className="border-2 border-gray-500 rounded-md h-6 flex justify-center items-center mr-2 w-6">
            {isSelectedRule&&<View className="bg-green-200 h-4 w-4 rounded-sm"></View>}
            </TouchableOpacity>
            <Text className="text-gray-400 w-11/12">I Confirm The Information is Accurate And Agree To The Privacy Policy And Terms.</Text>
        </View>


        {!isLoading&&<TouchableOpacity
          className={  `bg-green-500 text-white p-3 rounded-md`}
          onPress={handleFindPlace}
        >
          <Text className="text-center text-md font-bold">UPDATE THE PLACE</Text>
        </TouchableOpacity>}

        {isLoading&&<TouchableOpacity
          className={  `bg-gray-500 text-white p-3 rounded-md`}
          
        >
          <Text className="text-center text-md font-bold">ADD THE PLACE</Text>
        </TouchableOpacity>}
      </View>
      



     <Contactbg/>



      <Footer/>
    </ScrollView>
  );
};

export default EditContribution;