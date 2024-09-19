import React from "react";
import { StyleSheet, Button, TextInput, Text, CheckBox, View } from "react-native";
import { globalStyles } from "../assets/globalStyles";
import { Formik } from "formik";
import RNPickerSelect from 'react-native-picker-select'


export default function DetailsForm({updateMantainancesHandler, kilometers, item}){
  return (
    <View style={{height: '74%'}}>
      <Formik 
        initialValues={{title: item.title, interval: item.interval, changeNow: item.changeNow, key:item.key}} 
        onSubmit={(values, actions)=>{
          updateMantainancesHandler(values)
        }}>
        {(props)=>(
          <View style={globalStyles.padding}>
            <Text>Name</Text>
            <TextInput placeholder={item.title} onChangeText={props.handleChange('title')} value={props.values.title} />
            <Text>Interval of kilometers for each mantainance (e.g 1000)</Text>
            <TextInput placeholder={item.interval} onChangeText={props.handleChange('interval')} keyboardType="numeric" value={props.values.interval} />
            <Text>Have to fix now? (yes/no)</Text>
            <RNPickerSelect items={[{label: 'yes', value: 'true'}, {label:'no', value: 'false'}]} onValueChange={props.handleChange('changeNow')} value={props.values.changeNow} />
            <Button title="submit" onPress={props.handleSubmit}   />
          </View>
        )}
      </Formik>
    </View>
  )
}
