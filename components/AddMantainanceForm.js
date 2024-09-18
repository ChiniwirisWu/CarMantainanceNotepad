import React from "react";
import { StyleSheet, Button, TextInput, Text, CheckBox, View } from "react-native";
import { globalStyles } from "../assets/globalStyles";
import { Formik } from "formik";
import RNPickerSelect from 'react-native-picker-select'


export default function AddMantainanceForm({setMantainancesHandler, kilometers}){
  return (
    <View style={{height: '74%'}}>
      <Formik 
        initialValues={{title: '', interval: '', changeNow: 'false'}} 
        onSubmit={(values, actions)=>{
          newItem = {nextChange: parseInt(values.interval) + parseInt(kilometers.kilometers), ...values}
          setMantainancesHandler(newItem)
          actions.resetForm()
        }}>
        {(props)=>(
          <View style={globalStyles.padding}>
            <Text>Name</Text>
            <TextInput placeholder="e.g Lights broken " onChangeText={props.handleChange('title')} value={props.values.title} />
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
