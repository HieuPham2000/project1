import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import {db} from './src/config';

export default class NewNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
    }
  }

  handleChangeTitle(text) {
    this.setState({
      title: text,
    })
  }
  handleChangeContent(text) {
    this.setState({
      content: text,
    })
  }
  saveNote() {
    if(this.state.title!=='' && this.state.content!=='') {
      db.ref('/notes').push({
        title: this.state.title,
        content: this.state.content,
        date: (new Date()).toISOString() // date: (new Date()).toString() có được?
      });
      Alert.alert('Thông báo!', 'Ghi chú mới đã được tạo!');
    } else {
      Alert.alert('Thông báo!', 'Ghi chú rỗng đã bị xóa!');
    }
    this.props.navigation.navigate('Home');
  }
  render() {
    return (
      <View style={styles.container}>
        {/* <StatusBar
          barStyle = "dark-content"
          // dark-content, light-content and default
          hidden = {false}
          //To hide statusBar
          backgroundColor = "#00BCD4"
          //Background color of statusBar only works for Android
          translucent = {false}
          //allowing light, but not detailed shapes
          networkActivityIndicatorVisible = {true}
        /> */}
        <ScrollView style={styles.wrapper}>
          <View style={styles.titleWrapper}> 
            <TextInput 
              style={styles.title}
              placeholder='Tiêu đề'
              multiline={true}
              numberOfLines={1}
              autoFocus={true}
              onChangeText={this.handleChangeTitle.bind(this)}
              value={this.state.title}
            />
          </View>
          <View style={styles.line} />
          <View style={styles.contentWrapper}>
            <TextInput 
                style={styles.content}
                placeholder='Ghi chú'
                multiline={true}
                numberOfLines={8}
                onChangeText={this.handleChangeContent.bind(this)}
                value={this.state.content}
            />
          </View>
          {/* test */}
          {/* <Text>{this.state.title}</Text>
          <Text>{this.state.content}</Text> */}
        </ScrollView>
        <View style={{
          position: 'absolute',
          bottom: 60,
          right: 40,
        }}>
          {/* <MaterialIcons 
            name="check"
            size={60} 
            style={styles.buttonSave}
            onPress={() => this.props.navigation.navigate(
              'Home',
              {
                newNoteTitle: this.state.title,
                newNoteContent: this.state.content,
              })} 
          /> */}
          <MaterialIcons 
            name="check"
            size={60} 
            style={styles.buttonSave}
            onPress={this.saveNote.bind(this)} 
          />
        </View>
      </View>
    );
  }
}

const COLOR1 = '#28df99';
const COLOR2 = '#99f3bd';
const COLOR3 = '#d2f6c5';
const COLOR4 = '#f6f7d4';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR4,
  },
  line: {
    borderWidth: 2,
    opacity: 0.2,
    borderColor: COLOR1,
  },
  wrapper: {
  },
  titleWrapper: {
    backgroundColor: COLOR3,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    textAlignVertical: 'top',
    padding: 10,
  },
  contentWrapper: {
    backgroundColor: COLOR4,
  },
  content: {
    fontSize: 18,
    textAlignVertical: 'top',
    padding: 10,
  },
  buttonSave: {
    borderRadius: 50,
    color: 'white',
    backgroundColor: COLOR1,
    elevation: 8,
  },
});
