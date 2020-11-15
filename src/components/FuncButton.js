import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { db } from '../config';

export default class FuncButton extends React.Component {
  constructor(props) {
    super(props)
    /* this.state = {
      past: [],
      present: this.props.content,
      future: [],
      canUndo: false,
      canRedo: false,
    }; */
    /* this.updateState = this.updateState.bind(this);
    this.redo = this.redo.bind(this);
    this.undo = this.undo.bind(this); */
  }
  
  /* componentDidMount() {
    this.updateState(this.state.present)
    this.setState((state) => ({
      canUndo: state.past.length > 0,
      canRedo: state.future.length > 0,
    })
    )
    
  } */

  /* updateState(value) {
    this.setState((state) => ({
      past: [...state.past, state.present],
      present: value,
    })
    )
  };

  undo() {
    this.setState((state) => ({
      future: [...state.future, state.present],
      present: state.past.pop(),
    }))
    this.props.changeContent(this.state.present)
  };

  redo() {
    this.setState((state) => ({
      past: [...state.past, state.present],
      present: state.future.pop(),
    }))
    this.props.changeContent(this.state.present)
  }; */

  render() {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', flex: 6, justifyContent: 'space-around' }}>

        <Entypo name="text" size={24} color={COLOR5} />
        <TouchableOpacity>
          <Entypo name="image" size={24} color={COLOR5} />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="table" size={24} color={COLOR5} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', flex: 2 }} />
      <View style={{ flexDirection: 'row', flex: 4, justifyContent: 'space-around' }}>
        {this.props.canUndo &&
        <TouchableOpacity onPress={this.props.undo}  >
          <MaterialIcons name="undo" size={24} color={COLOR5} />
        </TouchableOpacity>}
        {this.props.canRedo &&
        <TouchableOpacity onPress={this.props.redo} >
          <MaterialIcons name="redo" size={24} color={COLOR5} />
        </TouchableOpacity>}
      </View>
    </View>
  )
}
}

const COLOR1 = '#28df99';
const COLOR2 = '#99f3bd';
const COLOR3 = '#d2f6c5';
const COLOR4 = '#f6f7d4';
const COLOR5 = 'white';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLOR2,
    maxHeight: 50,
    alignItems: 'center'
  },
});

