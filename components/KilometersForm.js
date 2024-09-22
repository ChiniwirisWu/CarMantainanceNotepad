import React from "react";
import { StyleSheet, Button, TextInput, Text, View } from "react-native";
import { globalStyles } from "../assets/globalStyles";
import { Formik } from "formik";

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

export default function KilometersForm({kilometers, setKilometersHandler}){
  let kilometers_str = formatKilometers(kilometers.kilometers)
  return (
    <View style={[globalStyles.padding, {height: '74%'}]}>
      <Text style={[globalStyles.h2]}>Current kilometers: {kilometers_str}</Text>
      <Formik 
        initialValues={{kilometers: 0}}
        onSubmit={(values, actions)=>{
          setKilometersHandler(values)
          actions.resetForm()
        }}
      >
        {(props)=>(
          <View>
            <Text>New kilometers </Text>
            <TextInput keyboardType="numeric" placeholder="e.g 10000" onChangeText={props.handleChange('kilometers')} value={props.values.kilometers} />
            <Button title="submit" onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  )
}
