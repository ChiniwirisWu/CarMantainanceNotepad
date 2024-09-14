import { View, Text } from "react-native"
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { globalStyles } from "../assets/globalStyles";
import {useState, useEffect} from 'react';
import MantainanceList from "../components/MantainanceList";
import Footer from "../components/Footer";


export default function Home({navigation, mantainances}){
  const [searchedMantainace, setSearchedMantainance] = useState('')
  console.log(mantainances)

  return (
    <View style={globalStyles.screenContainer}>
      <Header message="YOUR CAR'S MANTAINANCE" />
      <SearchBar onChangeText={setSearchedMantainance} />
      {(mantainances == null)? (
        <View style={[{height: '68%'}, globalStyles.padding]}>
          <Text>No mantanances added...</Text>
        </View>
      ): (
        <MantainanceList mantainances={mantainances} />
      )}
      <Footer navigation={navigation} />
    </View>
  )
}
