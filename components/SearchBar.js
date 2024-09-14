import { View, TextInput } from "react-native";
import { globalStyles } from "../assets/globalStyles";
import { Feather } from "@expo/vector-icons";

export default function SearchBar({onChangeText}){
  return (
    <View style={[globalStyles.backgroundColor, globalStyles.searchBar, globalStyles.padding]}>
      <TextInput style={globalStyles.textInput} onChangeText={onChangeText} placeholder="Search mantainance" />
      <Feather style={globalStyles.searchBarIcon} name="search" size={18} color='#eee' />
    </View>
  )
}
