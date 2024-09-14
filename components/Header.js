import { View, Text, DrawerLayoutAndroidBase } from "react-native";
import { globalStyles } from "../assets/globalStyles";
import { useFonts } from "expo-font";
import { useCallback, useEffect } from "react";
import * as SplashScreen from 'expo-splash-screen'

export default function Header({message}){
  const [loadedFonts] = useFonts({
    ptserif : require('../assets/fonts/PTSerif.ttf')    
  })

  useEffect(()=>{
    async function prepare(){
      await SplashScreen.preventAutoHideAsync()
    }
    prepare()
  }, [])

  const onLayout = useCallback(async ()=>{
    if(loadedFonts){
      await SplashScreen.hideAsync()
    }
  }, [loadedFonts])

  if(!loadedFonts) return null;


  return (
    <View onLayout={onLayout} style={[globalStyles.headerContainer, globalStyles.backgroundColor]}>
      <Text style={[globalStyles.h1, {fontFamily: 'ptserif'}, globalStyles.padding]}>{message}</Text>
    </View>
  )
}
