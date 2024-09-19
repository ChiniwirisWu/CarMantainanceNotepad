import { FlatList, Text, View, Pressable,  TouchableHighlight, Alert, ScrollView } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../assets/globalStyles";

export default function MantainanceList({mantainances, navigation, updateMantainancesHandler, kilometers}){
  return (
      <FlatList
        data={mantainances}
        renderItem={({item, index})=>(
          <View style={globalStyles.listItem}>
            <MaterialIcons name="car-repair" color="#213a80" size={80} />
            <View>
              <Text style={globalStyles.h2}>{item.title}</Text>
              <Text>Next change at {item.nextChange} km</Text>
            </View>
            <TouchableHighlight style={globalStyles.toDetailsPressable} underlayColor='#eee' activeOpacity={0.6} onPress={()=> navigation.navigate('details', {updateMantainancesHandler: updateMantainancesHandler, kilometers: kilometers, item: item})} >
              <AntDesign name="right" size={80} color="#ddd" />
            </TouchableHighlight>
          </View>
        )}
      />
  )
}
