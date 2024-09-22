import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
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
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
])

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

  //Looks like using "mantainances" variable throws errors, so I should use a copy of that array.
  const refreshNextChangeHandler = async (key) =>{
    let mantainances_copy = Array.from(mantainances)
    for(let i = 0; i < mantainances_copy.length; i++){
      if(mantainances_copy[i].key == key){
        mantainances_copy[i].nextChange = parseInt(mantainances_copy[i].interval) + parseInt(kilometers.kilometers) 
        await SecureStorage.setItemAsync('mantainances', JSON.stringify(mantainances_copy)) 
        setMantainances(mantainances_copy)
        setShowMantainances(mantainances_copy)
      }
    }
  }

  const removeMantainanceHandler = async (key)=>{
    let mantainances_copy = Array.from(mantainances)
    for(let i = 0; i < mantainances_copy.length; i++){
      if(mantainances_copy[i].key == key){
        mantainances_copy.splice(i,1)
        await SecureStorage.setItemAsync('mantainances', JSON.stringify(mantainances_copy)) 
        setShowMantainances(mantainances_copy)
        setMantainances(mantainances_copy)
      }
    }
  }

  const updateMantainancesHandler = async (newItem) => {
    let mantainances_copy = Array.from(mantainances)
    for(let i = 0; i < mantainances_copy.length; i++){
      if(mantainances_copy[i].key == newItem.key){
        mantainances_copy[i] = newItem
        await SecureStorage.setItemAsync('mantainances', JSON.stringify(mantainances_copy))
        setMantainances(mantainances_copy)
        setShowMantainances(mantainances_copy)
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
