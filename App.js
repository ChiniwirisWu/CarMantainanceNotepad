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
  const [mantainances, setMantainances] = useState({})
  const [kilometers, setKilometers] = useState(0)

  //This is to initialize the app data for the user. 
  useEffect(()=>{
    const getValues = async () => {
      //await SecureStorage.setItemAsync('mantainances', JSON.stringify([]))
      //await SecureStorage.setItemAsync('kilometers', JSON.stringify({kilometers: 0}))
      const mantainances =  await SecureStorage.getItemAsync('mantainances')
      const kilometers =  await SecureStorage.getItemAsync('kilometers')
      setMantainances(JSON.parse(mantainances))
      setKilometers(JSON.parse(kilometers))

    }
    getValues()
  }, [])

  const setMantainancesHandler = async (newItem) => {
    const newMantainances = [newItem, ...mantainances || []]
    await SecureStorage.setItemAsync('mantainances', JSON.stringify(newMantainances))
    setMantainances(newMantainances)
  } 

  const setKilometersHandler = async (newItem) =>{
    await SecureStorage.setItemAsync('kilometers', JSON.stringify(newItem))
    setKilometers(newItem)
  } 

  //TODO: Insert replace the item of an array with an object(newItem).
  const updateMantainancesHandler = async (newItem) => {
    mantainance_copy = mantainances.slice()
    for(let i = 0; i < mantainances_copy.length; i++){
      if(mantainances_copy[i].key == newItem.key){
        newItem.nextChange = mantainances_copy[i].nextChange
        mantainances_copy[i] = newItem
        await SecureStorage.setItemAsync('mantainances', mantainance_copy)
        setMantainances(mantainances_copy)
        break
      }
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='home'>
        <Stack.Screen name='home'  options={{ headerShown: false }}>
          {(props)=> <Home updateMantainancesHandler={updateMantainancesHandler} navigation={props.navigation} mantainances={mantainances} kilometers={kilometers} />}
        </Stack.Screen>
        <Stack.Screen name='kilometers'  options={{headerShown: false}}>
          {(props)=> <Kilometers navigation={props.navigation} kilometers={kilometers} setKilometersHandler={setKilometersHandler} />}
        </Stack.Screen>

        <Stack.Screen name='addMantainance'  options={{headerShown: false}} >
          {(props)=> <AddMantainance navigation={props.navigation} kilometers={kilometers} setMantainancesHandler={setMantainancesHandler} />}
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
