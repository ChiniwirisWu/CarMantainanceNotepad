import { View, Pressable, Text } from "react-native";
import { globalStyles } from "../assets/globalStyles";

export default function Footer({navigation}){
  return (
    <View style={globalStyles.footerContainer}>
      <Pressable onPress={()=>navigation.navigate('home')}><Text>Home</Text></Pressable>
      <Pressable onPress={()=>navigation.navigate('kilometers')}><Text>Kilometers</Text></Pressable>
      <Pressable onPress={()=>navigation.navigate('addMantainance')}><Text>Add Mantainance</Text></Pressable>
    </View>
  )
}
