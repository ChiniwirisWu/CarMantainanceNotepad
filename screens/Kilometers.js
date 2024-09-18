import { View, Text } from "react-native";
import { globalStyles } from "../assets/globalStyles";
import Header from "../components/Header";
import Footer from "../components/Footer";
import KilometersForm from '../components/KilometersForm'

export default function Kilometers({navigation, kilometers, setKilometersHandler}){
  return (
    <View style={[globalStyles.screenContainer]}>
      <Header message="YOUR CAR'S KILOMETERS" />
      <KilometersForm kilometers={kilometers} setKilometersHandler={setKilometersHandler} />
      <Footer navigation={navigation} />
    </View>
  )

}

