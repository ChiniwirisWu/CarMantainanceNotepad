import { View, Text } from "react-native";
import { globalStyles } from "../assets/globalStyles";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DetailsForm from "../components/DetailsForm";

export default function Details({route}){

  const {updateMantainancesHandler, kilometers, item, refreshNextChangeHandler, removeMantainanceHandler, navigation} = route.params 
  
  return (
    <View style={[globalStyles.screenContainer]}>
      <Header message="CAR'S DETAILS" />
      <DetailsForm style={{height: '68%'}} refreshNextChangeHandler={refreshNextChangeHandler} removeMantainanceHandler={removeMantainanceHandler} kilometers={kilometers} item={item} updateMantainancesHandler={updateMantainancesHandler} navigation={navigation} />
    </View>
  )

}

