import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import * as SecureStorage from 'expo-secure-store'
import Home from './screens/Home'
import Kilometers from './screens/Kilometers';
import AddMantainance from './screens/AddMantainance';

const Stack = createNativeStackNavigator()

export default function App() {
  const [mantainances, setMantainances] = useState({})
  const [kilometers, setKilometers] = useState(0)

  useEffect(()=>{
    const getValues = async () => {
      await SecureStorage.setItemAsync('mantanances', '')
      const mantainances =  await SecureStorage.getItemAsync('mantainances')
      //const kilometers = await SecureStorage.getItemAsync('kilometers')
      setMantainances(JSON.parse(mantainances))
      //setKilometers(kilometers)

    }
    getValues()
  }, [mantainances, kilometers])

  const setMantainancesHandler = async (newItem) =>{
    const newMantainances = [newItem, ...mantainances || []]
    await SecureStorage.setItemAsync('mantainances', JSON.stringify(newMantainances))
    setMantainances(newMantainances)
  } 


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='home'>
        <Stack.Screen name='home'  options={{ headerShown: false }}>
          {(props)=> <Home navigation={props.navigation} mantainances={mantainances} />}
        </Stack.Screen>

        <Stack.Screen name='kilometers' component={Kilometers} options={{headerShown: false}} />

        <Stack.Screen name='addMantainance'  options={{headerShown: false}} >
          {(props)=> <AddMantainance navigation={props.navigation} setMantainancesHandler={setMantainancesHandler} />}
        </Stack.Screen>
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
