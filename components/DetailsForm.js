import React from "react";
import { StyleSheet, Button, TextInput, Text, CheckBox, View } from "react-native";
import { globalStyles } from "../assets/globalStyles";
import { Formik } from "formik";
import RNPickerSelect from 'react-native-picker-select'

function formatKilometers(kilometers){
  kilometers = kilometers || 0
  let kilometers_str = kilometers.toString() 
  let counter = 0
  let result = ''
  for(let i = kilometers_str.length - 1; i >= 0; i--){
    if(counter % 3 == 0 && counter != 0){
      result += '.'
    }
      result += kilometers_str[i]
      counter++
  }
  result = result.split("").reverse()
  return result 
}

export default function DetailsForm({updateMantainancesHandler, kilometers, item, refreshNextChangeHandler, removeMantainanceHandler, navigation}){
  let kilometers_remaining = (item.nextChange - kilometers.kilometers >= 0) ? (item.nextChange - kilometers.kilometers) : (0) 
  return (
    <View style={{height: '74%'}}>
      <View style={[globalStyles.padding]}>
        <Text style={globalStyles.h4}>Mantainace status</Text>
        <Text>Next change at {formatKilometers(item.nextChange)} km ({formatKilometers(kilometers_remaining)}km left)</Text>
        <View style={{flexDirection: 'row'}}>
          <Text>Status: </Text>
          {(item.nextChange - kilometers.kilometers > 0)?(
            <Text style={{color: 'green'}}>Healthy</Text>
          ):(
            <Text style={{color: 'red'}}>Needs to be fixed</Text>
          )}
        </View>
        <Button title="refresh next change" onPress={()=>{
          refreshNextChangeHandler(item.key)
          navigation.goBack()
        }} />
      </View>
      <Formik 
        initialValues={{title: item.title, interval: item.interval, changeNow: item.changeNow, key:item.key, nextChange: item.nextChange.toString()}} 
        onSubmit={(values, actions)=>{
          updateMantainancesHandler(values)
          navigation.goBack()
        }}>
        {(props)=>(
          <View style={globalStyles.padding}>
            <Text style={globalStyles.h4}>Name</Text>
            <TextInput placeholder={item.title} onChangeText={props.handleChange('title')} value={props.values.title} />
            <Text style={globalStyles.h4}>Interval of kilometers for each mantainance (e.g 1000)</Text>
            <TextInput placeholder={item.interval} onChangeText={props.handleChange('interval')} keyboardType="numeric" value={props.values.interval} />
            <Text style={globalStyles.h4}>Next change (e.g 1000)</Text>
            <TextInput placeholder={item.nextChange.toString()} onChangeText={props.handleChange('nextChange')} keyboardType="numeric" value={props.values.nextChange} />
            <Text style={globalStyles.h4}>Have to fix now? (yes/no)</Text>
            <RNPickerSelect items={[{label: 'yes', value: 'true'}, {label:'no', value: 'false'}]} onValueChange={props.handleChange('changeNow')} value={props.values.changeNow} />
            <Button title="submit" onPress={props.handleSubmit}   />
          </View>
        )}
      </Formik>
      <View style={globalStyles.padding}>
        <Button title="Remove mantainance" onPress={()=> {
          removeMantainanceHandler(item.key)
          navigation.goBack()
        }} />
      </View>
    </View>
  )
}
