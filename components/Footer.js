import { View, Pressable, Text } from "react-native";
import { globalStyles } from "../assets/globalStyles";
import { FontAwesome5, Entypo } from "@expo/vector-icons";

export default function Footer({navigation}){
  return (
    <View style={globalStyles.footerContainer}>
      <Pressable style={globalStyles.footerPressable} onPress={()=>navigation.navigate('home')}><FontAwesome5 name="home" size={20} color={[globalStyles.backgroundColor ]}/><Text>Home</Text></Pressable>
      <Pressable style={globalStyles.footerPressable} onPress={()=>navigation.navigate('kilometers')}><FontAwesome5 name="tachometer-alt" size={20} color={globalStyles.backgroundColor}/><Text>Kilometers</Text></Pressable>
      <Pressable style={globalStyles.footerPressable} onPress={()=>navigation.navigate('addMantainance')}><Entypo name="tools" size={20} color={globalStyles.backgroundColor}/><Text>Add Mantainance</Text></Pressable>
    </View>
  )
}

