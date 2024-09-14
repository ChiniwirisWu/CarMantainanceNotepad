import { View, Text } from "react-native";
import { globalStyles } from "../assets/globalStyles";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Kilometers({navigation}){
  return (
    <View style={[globalStyles.screenContainer]}>
      <Header message="YOUR CAR'S KILOMETERS" />
      <Footer navigation={navigation} />
    </View>
  )

}

