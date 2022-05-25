import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar, Text, StyleSheet, View, TextInput, TouchableOpacity, Keyboard, ScrollView
} from 'react-native';
import Task from './../components/Task';

export const TaskDetails = (props) => {


  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <Text>{props.description}</Text>
        <Text>{props.status}</Text>
        <Text>{props.priority}</Text>
      </View>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    marginTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
});
