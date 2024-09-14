import React from "react";
import { StyleSheet, Button, TextInput, Text, CheckBox, View } from "react-native";
import { globalStyles } from "../assets/globalStyles";
import { Formik } from "formik";
import RNPickerSelect from 'react-native-picker-select'


export default function AddMantainanceForm({setMantainancesHandler}){
  const kilometers = 10000
  return (
    <View>
      <Formik 
        initialValues={{title: '', interval: '', changeNow: 'false'}} 
        onSubmit={(values)=>{
          newItem = {nextChange: parseInt(values.interval) + 1000, ...values}
          setMantainancesHandler(newItem)
        }}>
        {(props)=>(
          <View style={globalStyles.padding}>
            <Text>Name</Text>
            <TextInput placeholder="e.g Lights broken " onChangeText={props.handleChange('title')} value={props.values.name} />
            <Text>Interval of kilometers for each mantainance (e.g 1000)</Text>
            <TextInput placeholder="e.g 1000" onChangeText={props.handleChange('interval')} keyboardType="numeric" value={props.values.interval} />
            <Text>Have to fix now? (yes/no)</Text>
            <RNPickerSelect items={[{label: 'yes', value: 'true'}, {label:'no', value: 'false'}]} onValueChange={props.handleChange('changeNow')} value={props.values.changeNow} />
            <Button title="submit" onPress={props.handleSubmit}   />
          </View>
        )}
      </Formik>
    </View>
  )
}
