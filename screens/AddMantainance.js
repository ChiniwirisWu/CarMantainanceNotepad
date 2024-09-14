import { View, Text } from "react-native";
import { globalStyles } from "../assets/globalStyles";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AddMantainanceForm from "../components/AddMantainanceForm";

export default function AddMantainance({navigation, setMantainancesHandler}){


  return (
    <View style={[globalStyles.screenContainer]}>
      <Header message="ADD CAR'S MANTAINANCE" />
      <AddMantainanceForm setMantainancesHandler={setMantainancesHandler} />
      <Footer navigation={navigation} />
    </View>
  )

}

