import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import * as SecureStorage from 'expo-secure-store'
import Home from './screens/Home'
import Kilometers from './screens/Kilometers';
import AddMantainance from './screens/AddMantainance';
import Details from './screens/Details';

const Stack = createNativeStackNavigator()

export default function App() {
  const [mantainances, setMantainances] = useState([])
  const [showMantainances, setShowMantainances] = useState([])
  const [kilometers, setKilometers] = useState(0)

  //This is to initialize the app data for the user and only ocurrs once. 
  useEffect(()=>{
    const getValues = async () => {
      //await SecureStorage.setItemAsync('mantainances', JSON.stringify([]))
      const mantainances =  await SecureStorage.getItemAsync('mantainances')
      const kilometers =  await SecureStorage.getItemAsync('kilometers')
      setMantainances(JSON.parse(mantainances) || [])
      setShowMantainances(JSON.parse(mantainances) || [])
      setKilometers(JSON.parse(kilometers) || 0)

    }
    getValues()
  }, [])

  //Create new mantainances items that goes throughout the app.
  const setMantainancesHandler = async (newItem) => {
    const newMantainances = [newItem, ...mantainances || []]
    await SecureStorage.setItemAsync('mantainances', JSON.stringify(newMantainances))
    setMantainances(newMantainances)
    setShowMantainances(newMantainances)
  } 

  const filterMantainanceHandler = (text) =>{
    let filteredMantainances = []
    for(let i = 0; i < mantainances.length; i++){
      if(text == mantainances[i].title.substring(0,text.length)){
        filteredMantainances.push(mantainances[i])
      }
    }
    setShowMantainances(filteredMantainances)
  }

  const setKilometersHandler = async (newItem) =>{
    await SecureStorage.setItemAsync('kilometers', JSON.stringify(newItem))
    setKilometers(newItem)
  } 

  const refreshNextChangeHandler = async (key) =>{
    console.log('here', key)
    for(let i = 0; i < mantainances.length; i++){
      if(mantainances[i].key == key){
        mantainances[i].nextChange = parseInt(mantainances[i].interval) + parseInt(kilometers.kilometers) 
        await SecureStorage.setItemAsync('mantainances', JSON.stringify(mantainances)) 
        setMantainances(mantainances)
        break
      }
    }
  }

  const removeMantainanceHandler = async (key)=>{
    for(let i = 0; i < mantainances.length; i++){
      if(mantainances[i].key == key){
        mantainances.splice(i,1)
        await SecureStorage.setItemAsync('mantainances', JSON.stringify(mantainances)) 
        setShowMantainances(mantainances)
        setMantainances(mantainances)
        break
      }
    }
  }

  const updateMantainancesHandler = async (newItem) => {
    for(let i = 0; i < mantainances.length; i++){
      if(mantainances[i].key == newItem.key){
        mantainances[i] = newItem
        await SecureStorage.setItemAsync('mantainances', JSON.stringify(mantainances))
        setMantainances(mantainances)
        setShowMantainances(mantainances)
        break
      }
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='home'>
        <Stack.Screen name='home'  options={{ headerShown: false }}>
          {(props)=> 
            <Home 
              removeMantainanceHandler={removeMantainanceHandler} 
              refreshNextChangeHandler={refreshNextChangeHandler} 
              updateMantainancesHandler={updateMantainancesHandler} navigation={props.navigation} 
              mantainances={showMantainances} 
              kilometers={kilometers} 
              filterMantainanceHandler={filterMantainanceHandler} />}
        </Stack.Screen>
        <Stack.Screen name='kilometers'  options={{headerShown: false}}>
          {(props)=> 
            <Kilometers 
              navigation={props.navigation} 
              kilometers={kilometers} 
              setKilometersHandler={setKilometersHandler} />}
        </Stack.Screen>

        <Stack.Screen name='addMantainance'  options={{headerShown: false}} >
          {(props)=> 
            <AddMantainance 
              navigation={props.navigation} 
              kilometers={kilometers} 
              setMantainancesHandler={setMantainancesHandler} />}
        </Stack.Screen>
        <Stack.Screen name='details' component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
