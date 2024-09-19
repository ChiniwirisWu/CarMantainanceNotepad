import { View, Text } from "react-native";
import { globalStyles } from "../assets/globalStyles";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AddMantainanceForm from "../components/AddMantainanceForm";

export default function AddMantainance({navigation, setMantainancesHandler, kilometers}){

  return (
    <View style={[globalStyles.screenContainer]}>
      <Header message="ADD CAR'S MANTAINANCE" />
      <AddMantainanceForm style={{height: '68%'}} kilometers={kilometers} setMantainancesHandler={setMantainancesHandler} />
      <Footer navigation={navigation} />
    </View>
  )

}

