import React from "react";
import { StyleSheet, Button, TextInput, Text, CheckBox, View } from "react-native";
import { globalStyles } from "../assets/globalStyles";
import { Formik } from "formik";
import RNPickerSelect from 'react-native-picker-select'

function createRandomKey(length){
  const charts = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for(let i = 0; i < length; i++){
    result += charts.charAt(Math.random() * charts.length)
  }
  return result 
}

export default function AddMantainanceForm({setMantainancesHandler, kilometers}){
  return (
    <View style={{height: '74%'}}>
      <Formik 
        initialValues={{title: '', interval: '', changeNow: 'false'}} 
        onSubmit={(values, actions)=>{
          const key = createRandomKey(20) 
          newItem = {nextChange: (values.changeNow == 'true')? (0): (parseInt(values.interval) + parseInt(kilometers.kilometers)), key: key, ...values}
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
