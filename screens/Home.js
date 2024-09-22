import { View, Text } from "react-native"
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { globalStyles } from "../assets/globalStyles";
import { useEffect} from 'react';
import MantainanceList from "../components/MantainanceList";
import Footer from "../components/Footer";


export default function Home({navigation, mantainances, kilometers,removeMantainanceHandler , updateMantainancesHandler, refreshNextChangeHandler, filterMantainanceHandler}){

  return (
    <View style={globalStyles.screenContainer}>
      <Header message="YOUR CAR'S MANTAINANCE" />
      <SearchBar onChangeText={filterMantainanceHandler} />
      {(mantainances == [])? (
        <View style={[{height: '68%'}, globalStyles.padding]}>
          <Text>No mantanances added...</Text>
        </View>
      ): (
       <MantainanceList 
          refreshNextChangeHandler={refreshNextChangeHandler} 
          removeMantainanceHandler={removeMantainanceHandler} 
          updateMantainancesHandler={updateMantainancesHandler} 
          mantainances={mantainances} 
          kilometers={kilometers} 
          navigation={navigation} />
      )}
      <Footer navigation={navigation} />
    </View>
  )
}
