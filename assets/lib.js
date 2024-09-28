import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('user', jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
      
    }
};

export const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('my-key');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
};


//Reducer
export const initialState = {
    data:{}
}

export const reducer=(state,action)=>{
    switch(action.type){
        case "login":
            return {data:action.payload}
        case "logout":
            return {data:{}}
    }
} 


export const api_URl = "https://tour-bd.vercel.app"
